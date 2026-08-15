package com.canteen.config;

import cn.dev33.satoken.stp.StpUtil;
import com.canteen.annotation.LogRecord;
import com.canteen.entity.SysOperationLog;
import com.canteen.entity.SysUser;
import com.canteen.service.SysOperationLogService;
import com.canteen.service.SysUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Component
@RequiredArgsConstructor
public class LogInterceptor implements HandlerInterceptor {

    private final SysOperationLogService sysOperationLogService;
    private final SysUserService sysUserService;

    private static final String START_TIME = "LOG_START_TIME";
    private static final String OPERATOR_ID = "LOG_OPERATOR_ID";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute(START_TIME, System.currentTimeMillis());

        if (handler instanceof HandlerMethod) {
            Long operatorId = null;
            try {
                String token = request.getHeader("canteen-token");
                if (token != null && !token.isEmpty()) {
                    Object loginId = StpUtil.getLoginIdByToken(token);
                    if (loginId != null) {
                        operatorId = Long.parseLong(loginId.toString());
                    }
                }
            } catch (Exception e) {
                log.warn("[LogInterceptor] 解析 token 失败: {}", e.getMessage());
            }
            request.setAttribute(OPERATOR_ID, operatorId);
        }
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                 Object handler, Exception ex) {

        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return;
        }

        LogRecord logRecord = handlerMethod.getMethodAnnotation(LogRecord.class);
        if (logRecord == null) {
            return;
        }

        long startTime = (long) request.getAttribute(START_TIME);
        long costTime = System.currentTimeMillis() - startTime;

        Long operatorId = (Long) request.getAttribute(OPERATOR_ID);
        String operatorName = resolveOperatorName(operatorId);

        String action = buildAction(logRecord.action(), request.getRequestURI());

        SysOperationLog opLog = new SysOperationLog();
        opLog.setOperatorId(operatorId);
        opLog.setOperatorName(operatorName);
        opLog.setModule(logRecord.module());
        opLog.setAction(action);
        opLog.setRequestParams("");
        opLog.setResult(ex == null ? "成功" : "失败");
        opLog.setErrorMsg("");
        opLog.setIp("");
        opLog.setCostTime(costTime);
        opLog.setCreateTime(LocalDateTime.now());

        CompletableFuture.runAsync(() -> {
            try {
                sysOperationLogService.save(opLog);
            } catch (Exception e) {
                log.error("[LogInterceptor] 保存操作日志失败", e);
            }
        });
    }

    /**
     * 解析操作人名：优先取真实用户名，查不到回退「用户{id}」，未登录则「未登录」
     */
    private String resolveOperatorName(Long operatorId) {
        if (operatorId == null) {
            return "未登录";
        }
        try {
            SysUser user = sysUserService.getById(operatorId);
            if (user != null && user.getUsername() != null && !user.getUsername().isEmpty()) {
                return user.getUsername();
            }
        } catch (Exception e) {
            log.warn("[LogInterceptor] 查询操作人失败: operatorId={}, error={}", operatorId, e.getMessage());
        }
        return "用户" + operatorId;
    }

    private String buildAction(String baseAction, String uri) {
        if (uri.contains("/admin/orders/status/")) {
            if (uri.endsWith("/PREPARING")) return "开始备餐";
            if (uri.endsWith("/READY")) return "备餐完成";
        }
        return baseAction;
    }
}
