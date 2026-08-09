package com.canteen.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {

    /** 餐次: BREAKFAST / LUNCH / DINNER */
    private String mealType;

    /** 菜品列表 */
    private List<OrderItemRequest> items;
}
