package com.canteen.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.dto.CreateOrderRequest;
import com.canteen.dto.OrderItemRequest;
import com.canteen.entity.BizDish;
import com.canteen.entity.BizOrder;
import com.canteen.entity.BizOrderItem;
import com.canteen.enums.OrderStatus;
import com.canteen.mapper.BizOrderMapper;
import com.canteen.service.BizDishService;
import com.canteen.service.BizOrderItemService;
import com.canteen.service.BizOrderService;
import com.canteen.service.MerchantWalletService;
import com.canteen.service.SysConfigService;
import com.canteen.service.WalletService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
public class BizOrderServiceImpl extends ServiceImpl<BizOrderMapper, BizOrder>
        implements BizOrderService {

    @Autowired
    private BizDishService bizDishService;

    @Autowired
    private SysConfigService sysConfigService;

    @Autowired
    private BizOrderItemService bizOrderItemService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private MerchantWalletService merchantWalletService;

    private static final Random RANDOM = new Random();

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String createOrder(Long userId, CreateOrderRequest request) {
        // 1. 校验订餐时间段（MEAL_{餐次}_START / MEAL_{餐次}_END）
        String mealType = request.getMealType();
        String startStr = sysConfigService.getValue("MEAL_" + mealType + "_START");
        String endStr = sysConfigService.getValue("MEAL_" + mealType + "_END");
        if (startStr != null && !startStr.isEmpty() && endStr != null && !endStr.isEmpty()) {
            try {
                LocalTime start = LocalTime.parse(startStr);
                LocalTime end = LocalTime.parse(endStr);
                LocalTime now = LocalTime.now();
                String mealLabel = mealTypeLabel(mealType);
                if (now.isBefore(start)) {
                    throw new RuntimeException("尚未到" + mealLabel + "订餐时间（" + startStr + " 开始）");
                }
                if (now.isAfter(end)) {
                    throw new RuntimeException("已超过" + mealLabel + "订餐截止时间 " + endStr);
                }
            } catch (RuntimeException e) {
                throw e;
            } catch (Exception e) {
                log.warn("[Order] 订餐时间段解析失败: start={}, end={}", startStr, endStr);
            }
        }

        // 2. 遍历菜品：校验库存、锁定价名/单价、计算总金额
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<BizOrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest item : request.getItems()) {
            BizDish dish = bizDishService.getById(item.getDishId());
            if (dish == null) {
                throw new RuntimeException("菜品不存在: id=" + item.getDishId());
            }
            if (dish.getStock() == null || dish.getStock() < item.getQuantity()) {
                throw new RuntimeException("【" + dish.getName() + "】库存不足，剩余 "
                        + (dish.getStock() == null ? 0 : dish.getStock()));
            }

            BigDecimal itemTotal = dish.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);

            BizOrderItem orderItem = new BizOrderItem();
            orderItem.setDishId(dish.getId());
            orderItem.setDishName(dish.getName());
            orderItem.setPrice(dish.getPrice());
            orderItem.setQuantity(item.getQuantity());
            orderItems.add(orderItem);
        }

        // 3. 生成订单号
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String randomPart = String.format("%06d", RANDOM.nextInt(1000000));
        String orderNo = datePart + randomPart;

        // 3.5 生成取餐码（4位随机数，当天不重复）
        String verifyCode = generateVerifyCode();

        // 3.6 扣用户余额（余额不足抛异常，整个事务回滚）
        walletService.consume(userId, totalAmount, orderNo);
        // 3.7 商家入账
        merchantWalletService.creditIncome(totalAmount, orderNo);

        // 4. 逐条扣减库存
        for (OrderItemRequest item : request.getItems()) {
            BizDish dish = bizDishService.getById(item.getDishId());
            BizDish update = new BizDish();
            update.setId(dish.getId());
            update.setStock(dish.getStock() - item.getQuantity());
            bizDishService.updateById(update);
        }

        // 5. 插入订单主表
        BizOrder order = new BizOrder();
        order.setOrderNo(orderNo);
        order.setUserId(userId);
        order.setTotalAmount(totalAmount);
        order.setMealType(request.getMealType());
        order.setStatus(OrderStatus.PENDING);
        order.setVerifyCode(verifyCode);
        save(order);

        // 6. 批量插入订单明细
        for (BizOrderItem item : orderItems) {
            item.setOrderId(order.getId());
        }
        bizOrderItemService.saveBatch(orderItems);

        log.info("[Order] 订单创建成功: orderNo={}, userId={}, mealType={}, total={}, verifyCode={}, items={}",
                orderNo, userId, request.getMealType(), totalAmount, verifyCode, orderItems.size());
        return orderNo;
    }

    /**
     * 餐次中文名映射
     */
    private String mealTypeLabel(String mealType) {
        switch (mealType) {
            case "BREAKFAST": return "早餐";
            case "LUNCH": return "午餐";
            case "DINNER": return "晚餐";
            default: return mealType;
        }
    }

    /**
     * 生成 4 位取餐码（0000-9999），保证当天不重复
     */
    private String generateVerifyCode() {
        String code;
        do {
            code = String.format("%04d", RANDOM.nextInt(10000));
        } while (isVerifyCodeUsedToday(code));
        return code;
    }

    private boolean isVerifyCodeUsedToday(String code) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        long count = count(new LambdaQueryWrapper<BizOrder>()
                .eq(BizOrder::getVerifyCode, code)
                .ge(BizOrder::getCreateTime, startOfDay));
        return count > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BizOrder cancelOrder(Long userId, String orderNo) {
        BizOrder order = getOne(new LambdaQueryWrapper<BizOrder>()
                .eq(BizOrder::getOrderNo, orderNo));
        if (order == null) {
            throw new RuntimeException("订单不存在");
        }
        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("无权操作该订单");
        }
        if (!OrderStatus.PENDING.equals(order.getStatus())) {
            throw new RuntimeException("当前状态不可取消，仅待处理状态可取消");
        }

        // 更新订单状态为 CANCELLED
        BizOrder update = new BizOrder();
        update.setId(order.getId());
        update.setStatus(OrderStatus.CANCELLED);
        updateById(update);

        // 恢复库存
        List<BizOrderItem> items = bizOrderItemService.list(
                new LambdaQueryWrapper<BizOrderItem>()
                        .eq(BizOrderItem::getOrderId, order.getId())
        );
        for (BizOrderItem item : items) {
            BizDish dish = bizDishService.getById(item.getDishId());
            if (dish != null && dish.getStock() != null) {
                BizDish dishUpdate = new BizDish();
                dishUpdate.setId(dish.getId());
                dishUpdate.setStock(dish.getStock() + item.getQuantity());
                bizDishService.updateById(dishUpdate);
            }
        }

        // 退款给用户 + 反向商家收入
        walletService.refund(userId, order.getTotalAmount(), orderNo);
        merchantWalletService.reverseIncome(order.getTotalAmount(), orderNo);

        log.info("[Order] 取消订单成功: orderNo={}, userId={}", orderNo, userId);
        return order;
    }
}
