package com.canteen.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.canteen.entity.BizMerchantWallet;
import com.canteen.entity.BizWalletLog;

import java.math.BigDecimal;

public interface MerchantWalletService extends IService<BizMerchantWallet> {

    /**
     * 查询商家钱包余额（单位：分），不存在视为 0
     */
    BigDecimal getBalance();

    /**
     * 提取到银行卡：扣减余额并写入 WITHDRAW 流水，返回变动后的余额（单位：分）
     */
    BigDecimal withdraw(BigDecimal amount);

    /**
     * 订单收入入账：增加余额并写入 INCOME 流水（正），返回变动后的余额（单位：分）
     */
    BigDecimal creditIncome(BigDecimal amount, String orderNo);

    /**
     * 订单取消冲正：扣减余额并写入 INCOME 流水（负），返回变动后的余额（单位：分）
     */
    BigDecimal reverseIncome(BigDecimal amount, String orderNo);

    /**
     * 分页查询商家钱包流水
     */
    Page<BizWalletLog> listLogs(long page, long pageSize);
}
