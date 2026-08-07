package com.canteen.scripts;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Slf4j
@Component
@RequiredArgsConstructor
@Order(1)
public class InitRootUserRunner implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    private static final String CHECK_SQL = "SELECT COUNT(*) FROM sys_user WHERE username = 'root'";
    private static final String INSERT_SQL =
            "INSERT INTO sys_user (username, password, salt, real_name, role, status, created_at, updated_at) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    @Override
    public void run(String... args) {
        try {
            Integer count = jdbcTemplate.queryForObject(CHECK_SQL, Integer.class);
            if (count != null && count > 0) {
                log.info("[InitRootUser] root 管理员账号已存在，跳过初始化");
                return;
            }
        } catch (Exception e) {
            log.warn("[InitRootUser] sys_user 表不存在或尚未创建，跳过初始化。将在表创建后生效。");
            return;
        }

        String salt = generateSalt();
        String defaultPassword = "root123456";
        String hashedPassword = hashPassword(defaultPassword, salt);

        LocalDateTime now = LocalDateTime.now();
        jdbcTemplate.update(INSERT_SQL,
                "root",
                hashedPassword,
                salt,
                "系统管理员",
                "ROOT_ADMIN",
                1,
                now,
                now
        );

        log.info("========================================");
        log.info("[InitRootUser] root 管理员账号初始化完成");
        log.info("[InitRootUser] 用户名: root");
        log.info("[InitRootUser] 默认密码: {}", defaultPassword);
        log.info("[InitRootUser] 请登录后立即修改密码！");
        log.info("========================================");
    }

    private String generateSalt() {
        byte[] saltBytes = new byte[16];
        new SecureRandom().nextBytes(saltBytes);
        return Base64.getEncoder().encodeToString(saltBytes);
    }

    private String hashPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt.getBytes());
            byte[] hashed = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashed);
        } catch (Exception e) {
            throw new RuntimeException("密码哈希失败", e);
        }
    }
}
