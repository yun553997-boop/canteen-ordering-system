package com.canteen.enums;

/**
 * 钱包流水变动类型
 */
public final class WalletChangeType {

    private WalletChangeType() {
    }

    /** 充值 */
    public static final String RECHARGE = "RECHARGE";

    /** 消费（下单扣款） */
    public static final String CONSUME = "CONSUME";

    /** 退款 */
    public static final String REFUND = "REFUND";

    /** 提取（商家提现到银行卡） */
    public static final String WITHDRAW = "WITHDRAW";

    /** 收入（订单付款入账商家） */
    public static final String INCOME = "INCOME";
}
