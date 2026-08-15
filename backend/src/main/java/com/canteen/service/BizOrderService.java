package com.canteen.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.canteen.dto.CreateOrderRequest;
import com.canteen.entity.BizOrder;

public interface BizOrderService extends IService<BizOrder> {

    /**
     * 创建订单（含库存扣减、截止时间校验），事务由实现类管理
     *
     * @param userId  下单用户ID
     * @param request 订单请求（餐次 + 菜品列表）
     * @return 生成的订单号
     */
    String createOrder(Long userId, CreateOrderRequest request);

    /**
     * 用户无责取消订单：校验归属/状态 → 改 CANCELLED → 恢复库存 → 退款 + 反向商家收入，事务由实现类管理
     *
     * @return 被取消的订单（供通知）
     */
    BizOrder cancelOrder(Long userId, String orderNo);
}
