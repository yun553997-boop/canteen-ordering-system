package com.canteen.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("biz_wallet_log")
public class BizWalletLog {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 流水号（唯一） */
    private String flowNo;

    /** 用户 ID */
    private Long userId;

    /** 变动金额（单位：分，正=增加/负=减少） */
    private BigDecimal changeAmount;

    /** 变动类型：RECHARGE / CONSUME / REFUND */
    private String changeType;

    /** 变动后余额（单位：分） */
    private BigDecimal balanceAfter;

    /** 关联订单号（消费/退款时，充值可为空） */
    private String orderNo;

    /** 备注 */
    private String remark;

    /** 创建时间 */
    private LocalDateTime createTime;
}
