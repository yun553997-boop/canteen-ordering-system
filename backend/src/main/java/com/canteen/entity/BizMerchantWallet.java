package com.canteen.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("biz_merchant_wallet")
public class BizMerchantWallet {

    /** 单一商家钱包固定主键（恒为 1） */
    @TableId(type = IdType.INPUT)
    private Long id;

    /** 商家余额（单位：分） */
    private BigDecimal balance;

    private LocalDateTime updateTime;
}
