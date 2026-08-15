package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.canteen.common.R;
import com.canteen.entity.BizWalletLog;
import com.canteen.service.MerchantWalletService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/merchant-wallet")
@RequiredArgsConstructor
@SaCheckRole("ADMIN_SYSTEM")
public class MerchantWalletController {

    private final MerchantWalletService merchantWalletService;

    /** 查询商家钱包余额（单位：分） */
    @GetMapping("/balance")
    public R<Map<String, Object>> balance() {
        Map<String, Object> result = new HashMap<>();
        result.put("balance", merchantWalletService.getBalance());
        return R.ok(result);
    }

    /** 提取到银行卡：入参 amount 单位为分 */
    @PostMapping("/withdraw")
    public R<Map<String, Object>> withdraw(@RequestBody Map<String, Object> params) {
        Object amountObj = params.get("amount");
        if (amountObj == null) {
            return R.fail("提取金额不能为空");
        }

        BigDecimal amount;
        try {
            amount = new BigDecimal(amountObj.toString());
        } catch (NumberFormatException e) {
            return R.fail("非法提取金额");
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            return R.fail("非法提取金额");
        }

        try {
            BigDecimal newBalance = merchantWalletService.withdraw(amount);
            Map<String, Object> result = new HashMap<>();
            result.put("balance", newBalance);
            return R.ok(result);
        } catch (RuntimeException e) {
            log.warn("[MerchantWallet] 提现失败: {}", e.getMessage());
            return R.fail(e.getMessage());
        }
    }

    /** 分页查询商家钱包流水 */
    @GetMapping("/logs")
    public R<Page<BizWalletLog>> logs(@RequestParam(defaultValue = "1") long page,
                                      @RequestParam(defaultValue = "10") long pageSize) {
        return R.ok(merchantWalletService.listLogs(page, pageSize));
    }
}
