package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.canteen.common.R;
import com.canteen.entity.SysOperationLog;
import com.canteen.service.SysOperationLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("/api/v1/system/logs")
@RequiredArgsConstructor
@SaCheckRole("ADMIN_SYSTEM")
public class SysOperationLogController {

    private final SysOperationLogService sysOperationLogService;

    /**
     * 分页查询操作日志
     * @param page       页码（默认 1）
     * @param pageSize   每页条数（默认 20）
     * @param module     操作模块（可选筛选）
     * @param action     操作动作（可选筛选）
     * @param operatorName 操作人（可选筛选，模糊匹配）
     * @param result     操作结果（可选筛选：成功/失败）
     * @param startTime  开始时间（可选）
     * @param endTime    结束时间（可选）
     */
    @GetMapping("/list")
    public R<Page<SysOperationLog>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer pageSize,
            @RequestParam(required = false) String module,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String operatorName,
            @RequestParam(required = false) String result,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {

        LambdaQueryWrapper<SysOperationLog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(module != null && !module.isEmpty(), SysOperationLog::getModule, module);
        wrapper.eq(action != null && !action.isEmpty(), SysOperationLog::getAction, action);
        wrapper.like(operatorName != null && !operatorName.isEmpty(), SysOperationLog::getOperatorName, operatorName);
        wrapper.eq(result != null && !result.isEmpty(), SysOperationLog::getResult, result);
        wrapper.ge(startTime != null, SysOperationLog::getCreateTime, startTime);
        wrapper.le(endTime != null, SysOperationLog::getCreateTime, endTime);
        wrapper.orderByDesc(SysOperationLog::getCreateTime);

        Page<SysOperationLog> resultPage = sysOperationLogService.page(new Page<>(page, pageSize), wrapper);
        return R.ok(resultPage);
    }
}
