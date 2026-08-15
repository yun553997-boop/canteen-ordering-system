package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.stp.StpUtil;
import com.canteen.common.R;
import com.canteen.enums.NotificationType;
import com.canteen.service.SysNotificationService;
import com.canteen.service.WalletService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/user/wallet")
@RequiredArgsConstructor
@SaCheckRole(value = {"USER_STAFF", "USER_PATIENT"}, mode = SaMode.OR)
public class WalletController {

    private final WalletService walletService;

    private final SysNotificationService sysNotificationService;

    /** 查询当前用户钱包余额（单位：分） */
    @GetMapping("/balance")
    public R<Map<String, Object>> balance() {
        Long userId = StpUtil.getLoginIdAsLong();
        Map<String, Object> result = new HashMap<>();
        result.put("balance", walletService.getBalance(userId));
        return R.ok(result);
    }

    /** 充值：入参 amount 单位为分 */
    @PostMapping("/recharge")
    public R<Map<String, Object>> recharge(@RequestBody Map<String, Object> params) {
        Object amountObj = params.get("amount");
        if (amountObj == null) {
            return R.fail("充值金额不能为空");
        }

        BigDecimal amount;
        try {
            amount = new BigDecimal(amountObj.toString());
        } catch (NumberFormatException e) {
            return R.fail("非法充值金额");
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            return R.fail("非法充值金额");
        }

        try {
            Long userId = StpUtil.getLoginIdAsLong();
            BigDecimal newBalance = walletService.recharge(userId, amount);
            Map<String, Object> result = new HashMap<>();
            result.put("balance", newBalance);
            return R.ok(result);
        } catch (RuntimeException e) {
            log.warn("[Wallet] 充值失败: {}", e.getMessage());
            return R.fail(e.getMessage());
        }
    }

    /** 申请退款（提现到微信/支付宝）：入参 amount 单位为分、channel 为 WECHAT/ALIPAY */
    @PostMapping("/withdraw")
    public R<Map<String, Object>> withdraw(@RequestBody Map<String, Object> params) {
        Object amountObj = params.get("amount");
        if (amountObj == null) {
            return R.fail("退款金额不能为空");
        }

        BigDecimal amount;
        try {
            amount = new BigDecimal(amountObj.toString());
        } catch (NumberFormatException e) {
            return R.fail("非法退款金额");
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            return R.fail("非法退款金额");
        }

        Object channelObj = params.get("channel");
        String channel = channelObj == null ? "" : channelObj.toString();
        String channelLabel = "WECHAT".equals(channel) ? "微信" : "支付宝";

        try {
            Long userId = StpUtil.getLoginIdAsLong();
            BigDecimal newBalance = walletService.withdraw(userId, amount);

            String yuan = amount.divide(new BigDecimal("100"))
                    .setScale(2, RoundingMode.HALF_UP).toPlainString();
            sysNotificationService.create(userId, NotificationType.WALLET_REFUND, "退款成功",
                    "您已成功退款 ¥" + yuan + " 到" + channelLabel + "，余额已减少");

            Map<String, Object> result = new HashMap<>();
            result.put("balance", newBalance);
            return R.ok(result);
        } catch (RuntimeException e) {
            log.warn("[Wallet] 退款失败: {}", e.getMessage());
            return R.fail(e.getMessage());
        }
    }
}
