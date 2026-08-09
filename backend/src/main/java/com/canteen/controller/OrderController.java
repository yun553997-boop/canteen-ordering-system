package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.canteen.common.R;
import com.canteen.entity.BizOrder;
import com.canteen.enums.OrderStatus;
import com.canteen.service.BizOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
@SaCheckRole(value = {"ADMIN_CANTEEN", "ADMIN_SYSTEM"}, mode = SaMode.OR)
public class OrderController {

    private final BizOrderService bizOrderService;

    /**
     * 核销订单：校验订单存在且状态为 PENDING 或 READY，修改为 COMPLETED
     */
    @PostMapping("/verify")
    public R<Void> verify(@RequestBody Map<String, String> params) {
        String orderNo = params.get("orderNo");
        if (orderNo == null || orderNo.isEmpty()) {
            return R.fail("订单号不能为空");
        }

        BizOrder order = bizOrderService.getOne(
                new LambdaQueryWrapper<BizOrder>()
                        .eq(BizOrder::getOrderNo, orderNo)
        );

        if (order == null) {
            return R.fail("订单不存在");
        }

        if (!OrderStatus.PENDING.equals(order.getStatus())
                && !OrderStatus.READY.equals(order.getStatus())) {
            return R.fail("当前订单状态不允许核销，仅 PENDING 或 READY 状态可核销");
        }

        BizOrder update = new BizOrder();
        update.setId(order.getId());
        update.setStatus(OrderStatus.COMPLETED);
        bizOrderService.updateById(update);

        log.info("[Order] 核销订单: orderNo={}, {} → {}", orderNo, order.getStatus(), OrderStatus.COMPLETED);
        return R.ok();
    }

    /**
     * 订单状态流转：PENDING → PREPARING → READY
     */
    @PutMapping("/status/{orderNo}/{status}")
    public R<Void> updateStatus(@PathVariable String orderNo, @PathVariable String status) {
        if (!OrderStatus.PREPARING.equals(status) && !OrderStatus.READY.equals(status)) {
            return R.fail("无效的目标状态，仅允许 PREPARING 或 READY");
        }

        BizOrder order = bizOrderService.getOne(
                new LambdaQueryWrapper<BizOrder>()
                        .eq(BizOrder::getOrderNo, orderNo)
        );

        if (order == null) {
            return R.fail("订单不存在");
        }

        String current = order.getStatus();
        boolean valid = false;
        if (OrderStatus.PENDING.equals(current) && OrderStatus.PREPARING.equals(status)) {
            valid = true;
        } else if (OrderStatus.PREPARING.equals(current) && OrderStatus.READY.equals(status)) {
            valid = true;
        }

        if (!valid) {
            return R.fail("不允许从 " + current + " 转换到 " + status);
        }

        BizOrder update = new BizOrder();
        update.setId(order.getId());
        update.setStatus(status);
        bizOrderService.updateById(update);

        log.info("[Order] 状态流转: orderNo={}, {} → {}", orderNo, current, status);
        return R.ok();
    }

    /**
     * 分页查询今日订单，支持按状态筛选
     */
    @GetMapping("/list")
    public R<Page<BizOrder>> list(@RequestParam(defaultValue = "1") Integer page,
                                   @RequestParam(defaultValue = "10") Integer pageSize,
                                   @RequestParam(required = false) String status) {
        LocalDateTime todayStart = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime todayEnd = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        LambdaQueryWrapper<BizOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.between(BizOrder::getCreateTime, todayStart, todayEnd);
        if (status != null && !status.isEmpty()) {
            wrapper.eq(BizOrder::getStatus, status);
        }
        wrapper.orderByDesc(BizOrder::getCreateTime);

        Page<BizOrder> result = bizOrderService.page(new Page<>(page, pageSize), wrapper);
        return R.ok(result);
    }
}
