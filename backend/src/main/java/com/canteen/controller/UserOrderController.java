package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.canteen.annotation.LogRecord;
import com.canteen.common.R;
import com.canteen.dto.CreateOrderRequest;
import com.canteen.entity.BizOrder;
import com.canteen.entity.BizOrderItem;
import com.canteen.entity.SysUser;
import com.canteen.enums.NotificationType;
import com.canteen.enums.UserRole;
import com.canteen.service.BizOrderItemService;
import com.canteen.service.BizOrderService;
import com.canteen.service.SysNotificationService;
import com.canteen.service.SysUserService;
import com.canteen.ws.WebSocketServer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/user/orders")
@RequiredArgsConstructor
@SaCheckRole(value = {"USER_STAFF", "USER_PATIENT"}, mode = SaMode.OR)
public class UserOrderController {

    private final BizOrderService bizOrderService;
    private final BizOrderItemService bizOrderItemService;
    private final SysNotificationService sysNotificationService;
    private final SysUserService sysUserService;

    /**
     * 用户下单：校验库存 → 计算金额 → 扣减库存 → 生成订单
     */
    @LogRecord(module = "用户订单", action = "提交订单")
    @PostMapping("/create")
    public R<Map<String, Object>> create(@RequestBody CreateOrderRequest request) {
        if (request.getMealType() == null || request.getMealType().isEmpty()) {
            return R.fail("餐次不能为空");
        }

        if (request.getItems() == null || request.getItems().isEmpty()) {
            return R.fail("菜品列表不能为空");
        }

        for (int i = 0; i < request.getItems().size(); i++) {
            if (request.getItems().get(i).getDishId() == null) {
                return R.fail("第 " + (i + 1) + " 个菜品的 dishId 不能为空");
            }
            if (request.getItems().get(i).getQuantity() == null
                    || request.getItems().get(i).getQuantity() <= 0) {
                return R.fail("第 " + (i + 1) + " 个菜品的 quantity 必须大于 0");
            }
        }

        try {
            Long userId = StpUtil.getLoginIdAsLong();
            String orderNo = bizOrderService.createOrder(userId, request);

            // 向所有在线的食堂管理员推送新订单通知
            Map<String, Object> wsMsg = new HashMap<>();
            wsMsg.put("type", "NEW_ORDER");
            wsMsg.put("message", "您有新的订餐订单，请及时处理！");
            wsMsg.put("orderNo", orderNo);
            WebSocketServer.sendToRole(UserRole.ADMIN_CANTEEN, wsMsg);

            // 持久化通知：给每个食堂管理员写入一条
            List<SysUser> canteenAdmins = sysUserService.list(
                    new LambdaQueryWrapper<SysUser>()
                            .eq(SysUser::getRole, UserRole.ADMIN_CANTEEN)
                            .eq(SysUser::getStatus, 1)
            );
            for (SysUser admin : canteenAdmins) {
                sysNotificationService.create(
                        admin.getId(),
                        NotificationType.NEW_ORDER,
                        "新订单",
                        "订单号 " + orderNo + " 有新订单待处理"
                );
            }

            Map<String, Object> result = new HashMap<>();
            result.put("orderNo", orderNo);
            return R.ok(result);
        } catch (RuntimeException e) {
            log.warn("[Order] 下单失败: {}", e.getMessage());
            return R.fail(e.getMessage());
        }
    }

    /**
     * 获取当前登录用户的所有订单，按时间倒序
     */
    @GetMapping("/list")
    public R<List<BizOrder>> list() {
        Long userId = StpUtil.getLoginIdAsLong();
        List<BizOrder> orders = bizOrderService.list(
                new LambdaQueryWrapper<BizOrder>()
                        .eq(BizOrder::getUserId, userId)
                        .orderByDesc(BizOrder::getCreateTime)
        );
        return R.ok(orders);
    }

    /**
     * 获取订单详情：主表信息 + 菜品明细列表（通过订单号查询）
     */
    @GetMapping("/detail/{orderNo}")
    public R<Map<String, Object>> detail(@PathVariable String orderNo) {
        BizOrder order = bizOrderService.getOne(
                new LambdaQueryWrapper<BizOrder>()
                        .eq(BizOrder::getOrderNo, orderNo)
        );
        if (order == null) {
            return R.fail("订单不存在");
        }

        List<BizOrderItem> items = bizOrderItemService.list(
                new LambdaQueryWrapper<BizOrderItem>()
                        .eq(BizOrderItem::getOrderId, order.getId())
        );

        Map<String, Object> result = new HashMap<>();
        result.put("order", order);
        result.put("items", items);
        return R.ok(result);
    }
}
