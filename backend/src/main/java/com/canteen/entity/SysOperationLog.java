package com.canteen.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("sys_operation_log")
public class SysOperationLog {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 操作人 ID */
    private Long operatorId;

    /** 操作人用户名 */
    private String operatorName;

    /** 操作模块（如：订单管理、菜品管理） */
    private String module;

    /** 操作动作（如：取消订单、核销订单） */
    private String action;

    /** 请求方法 + 路径 */
    private String method;

    /** 请求参数（JSON） */
    private String requestParams;

    /** 操作结果：成功 / 失败 */
    private String result;

    /** 错误信息 */
    private String errorMsg;

    /** 请求 IP */
    private String ip;

    /** 耗时（毫秒） */
    private Long costTime;

    /** 操作时间 */
    private LocalDateTime createTime;
}
