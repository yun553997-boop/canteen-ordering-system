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
}
