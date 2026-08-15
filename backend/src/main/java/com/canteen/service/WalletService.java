package com.canteen.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.canteen.entity.BizWalletLog;

import java.math.BigDecimal;

public interface WalletService extends IService<BizWalletLog> {

    /**
     * 查询用户钱包余额（单位：分），不存在视为 0
     */
    BigDecimal getBalance(Long userId);

    /**
     * 充值：增加余额并写入 RECHARGE 流水，返回变动后的余额（单位：分）
     */
    BigDecimal recharge(Long userId, BigDecimal amount);

    /**
     * 消费（下单扣款）：余额不足抛异常，写入 CONSUME 流水，返回变动后的余额（单位：分）
     */
    BigDecimal consume(Long userId, BigDecimal amount, String orderNo);

    /**
     * 退款入账：写入 REFUND 流水，返回变动后的余额（单位：分）
     */
    BigDecimal refund(Long userId, BigDecimal amount, String orderNo);

    /**
     * 提现（申请退款）：扣减余额并写入 WITHDRAW 流水，返回变动后的余额（单位：分）
     */
    BigDecimal withdraw(Long userId, BigDecimal amount);
}
