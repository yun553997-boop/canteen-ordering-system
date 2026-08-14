package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.canteen.annotation.LogRecord;
import com.canteen.common.R;
import com.canteen.entity.BizOrder;
import com.canteen.enums.NotificationType;
import com.canteen.enums.OrderStatus;
import com.canteen.service.BizOrderService;
import com.canteen.service.SysNotificationService;
import com.canteen.ws.WebSocketServer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
@SaCheckRole(value = {"ADMIN_CANTEEN", "ADMIN_SYSTEM"}, mode = SaMode.OR)
public class OrderController {

    private final SysNotificationService sysNotificationService;
    private final BizOrderService bizOrderService;

    /**
     * 核销订单（幂等）：仅允许 READY 状态，防重复核销
     */
    @LogRecord(module = "订单管理", action = "核销订单")
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

        // 状态防重：已核销的订单不允许重复操作
        if (OrderStatus.COMPLETED.equals(order.getStatus())) {
            return R.fail("该订单已核销，请勿重复操作");
        }

        // 状态强校验：仅允许 READY（待取餐）状态核销
        if (!OrderStatus.READY.equals(order.getStatus())) {
            return R.fail("当前订单状态不允许核销，仅 READY（待取餐）状态可核销");
        }

        BizOrder update = new BizOrder();
        update.setId(order.getId());
        update.setStatus(OrderStatus.COMPLETED);
        bizOrderService.updateById(update);

        // 推送状态变更通知给下单用户
        Map<String, Object> wsMsg = new HashMap<>();
        wsMsg.put("type", "ORDER_STATUS_CHANGE");
        wsMsg.put("message", "就餐愉快");
        wsMsg.put("orderNo", orderNo);
        wsMsg.put("status", OrderStatus.COMPLETED);
        WebSocketServer.sendToUser(order.getUserId(), wsMsg);

        // 持久化通知
        sysNotificationService.create(
                order.getUserId(),
                NotificationType.ORDER_READY,
                "订单核销",
                "订单号 " + orderNo + " 已核销完成"
        );

        log.info("[Order] 核销订单: orderNo={}, {} → {}", orderNo, order.getStatus(), OrderStatus.COMPLETED);
        return R.ok();
    }

    /**
     * 订单状态流转：PENDING → PREPARING → READY
     */
    @LogRecord(module = "订单管理", action = "更新订单状态")
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

        // 推送状态变更通知给下单用户
        String statusLabel = OrderStatus.PREPARING.equals(status) ? "制作中" : "待取餐";
        Map<String, Object> wsMsg = new HashMap<>();
        wsMsg.put("type", "ORDER_STATUS_CHANGE");
        wsMsg.put("message", "您的订单状态已更新为：" + statusLabel);
        wsMsg.put("orderNo", orderNo);
        wsMsg.put("status", status);
        WebSocketServer.sendToUser(order.getUserId(), wsMsg);

        // 持久化通知
        String notifType = OrderStatus.PREPARING.equals(status)
                ? NotificationType.ORDER_READY : "ORDER_READY";
        sysNotificationService.create(
                order.getUserId(),
                notifType,
                "订单状态更新",
                "订单号 " + orderNo + " 状态已更新为：" + statusLabel
        );

        log.info("[Order] 状态流转: orderNo={}, {} → {}", orderNo, current, status);
        return R.ok();
    }

    /**
     * 分页查询订单，支持按订单号、状态、时间段筛选（默认查询今日）
     */
    @GetMapping("/list")
    public R<Page<BizOrder>> list(@RequestParam(defaultValue = "1") Integer page,
                                   @RequestParam(defaultValue = "10") Integer pageSize,
                                   @RequestParam(required = false) String status,
                                   @RequestParam(required = false) String orderNo,
                                   @RequestParam(required = false) String startTime,
                                   @RequestParam(required = false) String endTime) {
        LocalDateTime start = (startTime != null && !startTime.isEmpty())
                ? LocalDateTime.parse(startTime)
                : LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime end = (endTime != null && !endTime.isEmpty())
                ? LocalDateTime.parse(endTime)
                : LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        LambdaQueryWrapper<BizOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.between(BizOrder::getCreateTime, start, end);
        if (status != null && !status.isEmpty()) {
            wrapper.eq(BizOrder::getStatus, status);
        }
        if (orderNo != null && !orderNo.isEmpty()) {
            wrapper.like(BizOrder::getOrderNo, orderNo);
        }
        wrapper.orderByDesc(BizOrder::getCreateTime);

        Page<BizOrder> result = bizOrderService.page(new Page<>(page, pageSize), wrapper);
        return R.ok(result);
    }
}
