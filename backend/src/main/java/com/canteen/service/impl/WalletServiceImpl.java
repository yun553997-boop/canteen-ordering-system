package com.canteen.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.entity.BizWalletLog;
import com.canteen.entity.SysUser;
import com.canteen.enums.WalletChangeType;
import com.canteen.mapper.BizWalletLogMapper;
import com.canteen.service.SysUserService;
import com.canteen.service.WalletService;
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
public class WalletServiceImpl extends ServiceImpl<BizWalletLogMapper, BizWalletLog>
        implements WalletService {

    @Autowired
    private SysUserService sysUserService;

    private static final Random RANDOM = new Random();

    @Override
    public BigDecimal getBalance(Long userId) {
        SysUser user = sysUserService.getById(userId);
        if (user == null || user.getBalance() == null) {
            return BigDecimal.ZERO;
        }
        return user.getBalance();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BigDecimal recharge(Long userId, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("充值金额必须大于 0");
        }
        return changeBalance(userId, amount, WalletChangeType.RECHARGE, null, "钱包充值");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BigDecimal consume(Long userId, BigDecimal amount, String orderNo) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("支付金额必须大于 0");
        }
        if (getBalance(userId).compareTo(amount) < 0) {
            throw new RuntimeException("钱包余额不足");
        }
        return changeBalance(userId, amount.negate(), WalletChangeType.CONSUME, orderNo, "下单支付");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BigDecimal refund(Long userId, BigDecimal amount, String orderNo) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("退款金额必须大于 0");
        }
        return changeBalance(userId, amount, WalletChangeType.REFUND, orderNo, "订单退款");
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BigDecimal withdraw(Long userId, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("退款金额必须大于 0");
        }
        if (getBalance(userId).compareTo(amount) < 0) {
            throw new RuntimeException("钱包余额不足");
        }
        return changeBalance(userId, amount.negate(), WalletChangeType.WITHDRAW, null, "余额退款");
    }

    /**
     * 通用余额变动：读余额 → 加 changeAmount → 写回 → 写流水
     */
    private BigDecimal changeBalance(Long userId, BigDecimal changeAmount, String changeType,
                                     String orderNo, String remark) {
        SysUser user = sysUserService.getById(userId);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }

        BigDecimal oldBalance = user.getBalance() == null ? BigDecimal.ZERO : user.getBalance();
        BigDecimal newBalance = oldBalance.add(changeAmount);

        SysUser update = new SysUser();
        update.setId(userId);
        update.setBalance(newBalance);
        sysUserService.updateById(update);

        BizWalletLog logEntry = new BizWalletLog();
        logEntry.setFlowNo(generateFlowNo());
        logEntry.setUserId(userId);
        logEntry.setChangeAmount(changeAmount);
        logEntry.setChangeType(changeType);
        logEntry.setBalanceAfter(newBalance);
        logEntry.setOrderNo(orderNo);
        logEntry.setRemark(remark);
        logEntry.setCreateTime(LocalDateTime.now());
        save(logEntry);

        log.info("[Wallet] {}: userId={}, change={}, old={}, new={}", changeType, userId, changeAmount, oldBalance, newBalance);
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
