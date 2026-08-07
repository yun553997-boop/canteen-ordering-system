package com.canteen.scripts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class InitRootUserRunner implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        // 1. 查询是否已经存在系统管理员账号
        String checkSql = "SELECT COUNT(*) FROM sys_user WHERE username = 'admin'";
        Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class);

        // 2. 如果不存在，则初始化一个最高权限的 root 账号
        if (count != null && count == 0) {
            String insertSql = "INSERT INTO sys_user (username, phone, password, role, is_initial_password, status, is_deleted) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";

            // 注意：真实生产环境中，"123456" 应该被替换为 BCrypt 或者 MD5 加密后的密文。
            // 这里为了 Demo 测试方便，暂时写入明文或初始密码。
            jdbcTemplate.update(insertSql,
                    "admin",                  // username (用户名)
                    "13800000000",            // phone (手机号，表结构要求必填)
                    "123456",                 // password (密码)
                    "ADMIN_SYSTEM",           // role (角色枚举)
                    1,                        // is_initial_password (是初始密码)
                    1,                        // status (状态正常)
                    0                         // is_deleted (未删除)
            );
            System.out.println("====== [系统初始化] 默认系统管理员账号 (admin / 123456) 创建成功！ ======");
        } else {
            System.out.println("====== [系统初始化] 检测到管理员账号已存在，跳过创建。 ======");
        }
    }
}