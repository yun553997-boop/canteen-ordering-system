package com.canteen.ws;

import cn.dev33.satoken.stp.StpUtil;
import com.canteen.config.SpringContextUtil;
import com.canteen.entity.SysUser;
import com.canteen.service.SysUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
@ServerEndpoint("/ws")
public class WebSocketServer {

    /** userId → WebSocket Session */
    private static final Map<Long, Session> ONLINE_USERS = new ConcurrentHashMap<>();

    /** role → Set<userId>，用于按角色广播 */
    private static final Map<String, Set<Long>> ROLE_TO_USERS = new ConcurrentHashMap<>();

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private Long currentUserId;
    private String currentRole;

    @OnOpen
    public void onOpen(Session session) {
        // 从 query string 获取 token 并校验
        Map<String, java.util.List<String>> params = session.getRequestParameterMap();
        String token = null;
        if (params.containsKey("token")) {
            token = params.get("token").get(0);
        }

        if (token == null || token.isEmpty()) {
            log.warn("[WS] 连接被拒绝: 缺少 token");
            try { session.close(); } catch (IOException ignored) {}
            return;
        }

        try {
            Object loginId = StpUtil.getLoginIdByToken(token);
            if (loginId == null) {
                log.warn("[WS] 连接被拒绝: token 无效");
                try { session.close(); } catch (IOException ignored) {}
                return;
            }

            this.currentUserId = Long.parseLong(loginId.toString());
            // 直接从数据库查询用户角色（避免 Sa-Token session 跨线程读取问题）
            SysUserService sysUserService = SpringContextUtil.getBean(SysUserService.class);
            SysUser user = sysUserService.getById(this.currentUserId);
            this.currentRole = user != null ? user.getRole() : null;

            ONLINE_USERS.put(currentUserId, session);
            ROLE_TO_USERS.computeIfAbsent(currentRole, k -> ConcurrentHashMap.newKeySet())
                    .add(currentUserId);

            log.info("[WS] 连接建立: userId={}, role={}, 当前在线: {}",
                    currentUserId, currentRole, ONLINE_USERS.size());
        } catch (Exception e) {
            log.warn("[WS] 连接被拒绝: {}", e.getMessage());
            try { session.close(); } catch (IOException ignored) {}
        }
    }

    @OnClose
    public void onClose() {
        if (currentUserId != null) {
            ONLINE_USERS.remove(currentUserId);
            if (currentRole != null) {
                Set<Long> users = ROLE_TO_USERS.get(currentRole);
                if (users != null) {
                    users.remove(currentUserId);
                    if (users.isEmpty()) {
                        ROLE_TO_USERS.remove(currentRole);
                    }
                }
            }
            log.info("[WS] 连接断开: userId={}, 当前在线: {}", currentUserId, ONLINE_USERS.size());
        }
    }

    @OnError
    public void onError(Throwable error) {
        log.error("[WS] 连接异常: userId={}, error={}", currentUserId, error.getMessage());
    }

    /**
     * 向指定角色的所有在线用户广播消息
     */
    public static void sendToRole(String role, Map<String, Object> message) {
        Set<Long> userIds = ROLE_TO_USERS.get(role);
        if (userIds == null || userIds.isEmpty()) {
            return;
        }
        String json = toJson(message);
        if (json == null) return;

        for (Long userId : userIds) {
            sendToUser(userId, json);
        }
    }

    /**
     * 向指定用户点对点推送消息
     */
    public static void sendToUser(Long userId, Map<String, Object> message) {
        String json = toJson(message);
        if (json == null) return;
        sendToUser(userId, json);
    }

    private static void sendToUser(Long userId, String message) {
        Session session = ONLINE_USERS.get(userId);
        if (session != null && session.isOpen()) {
            try {
                session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                log.error("[WS] 推送失败: userId={}, error={}", userId, e.getMessage());
            }
        }
    }

    private static String toJson(Map<String, Object> map) {
        try {
            return MAPPER.writeValueAsString(map);
        } catch (Exception e) {
            log.error("[WS] JSON 序列化失败: {}", e.getMessage());
            return null;
        }
    }
}
