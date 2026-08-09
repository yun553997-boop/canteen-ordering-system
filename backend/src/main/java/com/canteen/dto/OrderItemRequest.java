package com.canteen.dto;

import lombok.Data;

@Data
public class OrderItemRequest {

    /** 菜品ID */
    private Long dishId;

    /** 购买数量 */
    private Integer quantity;
}
