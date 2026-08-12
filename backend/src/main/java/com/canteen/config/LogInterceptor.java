package com.canteen.config;

import com.canteen.annotation.LogRecord;
import com.canteen.entity.SysOperationLog;
import com.canteen.service.SysOperationLogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Component
@RequiredArgsConstructor
public class LogInterceptor implements HandlerInterceptor {

    private final SysOperationLogService sysOperationLogService;
    private final ObjectMapper objectMapper = new ObjectMapper();

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
                    operatorId = parseLoginIdFromJwt(token);
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
        String operatorName = operatorId != null ? "用户" + operatorId : "未登录";

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
     * 手动解析 Sa-Token JWT，提取 loginId
     * JWT 格式：header.payload.signature
     * payload 中 Sa-Token 存储 loginId 字段
     */
    private Long parseLoginIdFromJwt(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length < 2) return null;

            String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            @SuppressWarnings("unchecked")
            Map<String, Object> map = objectMapper.readValue(payload, Map.class);

            Object loginId = map.get("loginId");
            if (loginId != null) {
                return Long.parseLong(loginId.toString());
            }
        } catch (Exception e) {
            log.debug("[LogInterceptor] JWT 解析失败: {}", e.getMessage());
        }
        return null;
    }

    private String buildAction(String baseAction, String uri) {
        if (uri.contains("/admin/orders/status/")) {
            if (uri.endsWith("/PREPARING")) return "开始备餐";
            if (uri.endsWith("/READY")) return "备餐完成";
        }
        return baseAction;
    }
}
