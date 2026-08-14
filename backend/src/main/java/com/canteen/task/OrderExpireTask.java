package com.canteen.task;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.canteen.entity.BizOrder;
import com.canteen.enums.NotificationType;
import com.canteen.enums.OrderStatus;
import com.canteen.service.BizOrderService;
import com.canteen.service.SysNotificationService;
import com.canteen.ws.WebSocketServer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 订单超时作废 + 提前取餐提醒定时任务
 * 出餐（READY）后 40 分钟发提前提醒，60 分钟作废（不退款，金额交易待开发）
 */
@Slf4j
@Component
public class OrderExpireTask {

    /** 提前提醒阈值（分钟） */
    private static final long REMIND_MINUTES = 40;

    /** 超时作废阈值（分钟） */
    private static final long EXPIRE_MINUTES = 60;

    /** Redis 提醒标记 key 前缀 */
    private static final String REMIND_PREFIX = "order:remind:";

    @Autowired
    private BizOrderService bizOrderService;

    @Autowired
    private SysNotificationService sysNotificationService;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 每 60 秒扫描一次 READY 状态订单
     */
    @Scheduled(fixedRate = 60000)
    public void expireOrders() {
        List<BizOrder> readyOrders = bizOrderService.list(
                new LambdaQueryWrapper<BizOrder>()
                        .eq(BizOrder::getStatus, OrderStatus.READY)
                        .isNotNull(BizOrder::getUpdateTime)
        );

        if (readyOrders.isEmpty()) {
            return;
        }

        LocalDateTime now = LocalDateTime.now();
        for (BizOrder order : readyOrders) {
            try {
                long minutes = Duration.between(order.getUpdateTime(), now).toMinutes();

                if (minutes >= EXPIRE_MINUTES) {
                    // 超时作废
                    expireOrder(order);
                } else if (minutes >= REMIND_MINUTES) {
                    // 提前提醒（Redis 标记去重，只发一次）
                    remindOrder(order);
                }
            } catch (Exception e) {
                log.error("[OrderExpireTask] 处理订单异常: orderNo={}, error={}",
                        order.getOrderNo(), e.getMessage());
            }
        }
    }

    /**
     * 订单超时作废：状态改 EXPIRED，通知用户
     */
    private void expireOrder(BizOrder order) {
        BizOrder update = new BizOrder();
        update.setId(order.getId());
        update.setStatus(OrderStatus.EXPIRED);
        bizOrderService.updateById(update);

        // WebSocket 推送
        Map<String, Object> wsMsg = new HashMap<>();
        wsMsg.put("type", "ORDER_EXPIRED");
        wsMsg.put("message", "您的订单已超时作废");
        wsMsg.put("orderNo", order.getOrderNo());
        wsMsg.put("status", OrderStatus.EXPIRED);
        WebSocketServer.sendToUser(order.getUserId(), wsMsg);

        // 持久化通知
        sysNotificationService.create(
                order.getUserId(),
                NotificationType.ORDER_EXPIRED,
                "订单作废",
                "订单号 " + order.getOrderNo() + " 已超时作废"
        );

        log.info("[OrderExpireTask] 订单超时作废: orderNo={}", order.getOrderNo());
    }

    /**
     * 提前取餐提醒（每个订单只发一次，Redis 标记去重）
     */
    private void remindOrder(BizOrder order) {
        String key = REMIND_PREFIX + order.getOrderNo();
        Boolean exists = stringRedisTemplate.hasKey(key);
        if (exists != null && exists) {
            return;
        }

        // 标记已提醒（24 小时过期）
        stringRedisTemplate.opsForValue().set(key, "1", 24, TimeUnit.HOURS);

        Map<String, Object> wsMsg = new HashMap<>();
        wsMsg.put("type", "ORDER_REMIND");
        wsMsg.put("message", "您的餐品已备好，请尽快前来取餐");
        wsMsg.put("orderNo", order.getOrderNo());
        WebSocketServer.sendToUser(order.getUserId(), wsMsg);

        sysNotificationService.create(
                order.getUserId(),
                NotificationType.ORDER_READY,
                "取餐提醒",
                "订单号 " + order.getOrderNo() + " 已备好，请尽快前来取餐"
        );

        log.info("[OrderExpireTask] 发送提前取餐提醒: orderNo={}", order.getOrderNo());
    }
}
