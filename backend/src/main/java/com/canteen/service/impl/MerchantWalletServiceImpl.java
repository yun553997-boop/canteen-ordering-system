package com.canteen.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.entity.BizMerchantWallet;
import com.canteen.entity.BizWalletLog;
import com.canteen.enums.WalletChangeType;
import com.canteen.mapper.BizMerchantWalletMapper;
import com.canteen.mapper.BizWalletLogMapper;
import com.canteen.service.MerchantWalletService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Slf4j
@Service
public class MerchantWalletServiceImpl extends ServiceImpl<BizMerchantWalletMapper, BizMerchantWallet>
        implements MerchantWalletService {

    /** 单一商家钱包固定主键 */
    private static final long MERCHANT_ID = 1L;

    /** 商家流水在 biz_wallet_log 中的哨兵 user_id（0 = 商家） */
    private static final long MERCHANT_USER_ID = 0L;

    @Autowired
    private BizWalletLogMapper bizWalletLogMapper;

    private static final Random RANDOM = new Random();

    @Override
    public BigDecimal getBalance() {
        BizMerchantWallet wallet = getById(MERCHANT_ID);
        if (wallet == null || wallet.getBalance() == null) {
            return BigDecimal.ZERO;
        }
        return wallet.getBalance();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BigDecimal withdraw(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("提取金额必须大于 0");
        }
        if (getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("商家余额不足");
        }
        return changeBalance(amount.negate(), WalletChangeType.WITHDRAW, null, "商家提现");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BigDecimal creditIncome(BigDecimal amount, String orderNo) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("收入金额必须大于 0");
        }
        return changeBalance(amount, WalletChangeType.INCOME, orderNo, "订单收入");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BigDecimal reverseIncome(BigDecimal amount, String orderNo) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("冲正金额必须大于 0");
        }
        return changeBalance(amount.negate(), WalletChangeType.INCOME, orderNo, "订单取消冲正");
    }

    @Override
    public Page<BizWalletLog> listLogs(long page, long pageSize) {
        return bizWalletLogMapper.selectPage(
                new Page<>(page, pageSize),
                new LambdaQueryWrapper<BizWalletLog>()
                        .eq(BizWalletLog::getUserId, MERCHANT_USER_ID)
                        .orderByDesc(BizWalletLog::getCreateTime)
        );
    }

    /**
     * 通用商家余额变动：读余额 → 加 changeAmount → 写回 → 写流水（user_id=0 哨兵）
     */
    private BigDecimal changeBalance(BigDecimal changeAmount, String changeType,
                                     String orderNo, String remark) {
        BizMerchantWallet wallet = getById(MERCHANT_ID);
        BigDecimal oldBalance = (wallet == null || wallet.getBalance() == null)
                ? BigDecimal.ZERO : wallet.getBalance();
        BigDecimal newBalance = oldBalance.add(changeAmount);

        BizMerchantWallet update = new BizMerchantWallet();
        update.setId(MERCHANT_ID);
        update.setBalance(newBalance);
        update.setUpdateTime(LocalDateTime.now());
        updateById(update);

        BizWalletLog logEntry = new BizWalletLog();
        logEntry.setFlowNo(generateFlowNo());
        logEntry.setUserId(MERCHANT_USER_ID);
        logEntry.setChangeAmount(changeAmount);
        logEntry.setChangeType(changeType);
        logEntry.setBalanceAfter(newBalance);
        logEntry.setOrderNo(orderNo);
        logEntry.setRemark(remark);
        logEntry.setCreateTime(LocalDateTime.now());
        bizWalletLogMapper.insert(logEntry);

        log.info("[MerchantWallet] {}: change={}, old={}, new={}", changeType, changeAmount, oldBalance, newBalance);
        return newBalance;
    }

    /**
     * 生成流水号：W + 时间戳 + 6 位随机（唯一键 uk_flow_no 兜底）
     */
    private String generateFlowNo() {
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String randomPart = String.format("%06d", RANDOM.nextInt(1000000));
        return "W" + datePart + randomPart;
    }
}
