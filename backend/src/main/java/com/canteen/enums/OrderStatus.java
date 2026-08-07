package com.canteen.enums;

public final class OrderStatus {

    private OrderStatus() {}

    public static final String PENDING = "PENDING";
    public static final String PREPARING = "PREPARING";
    public static final String READY = "READY";
    public static final String COMPLETED = "COMPLETED";
    public static final String CANCELLED = "CANCELLED";
    public static final String EXPIRED = "EXPIRED";
}
