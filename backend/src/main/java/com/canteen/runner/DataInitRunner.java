package com.canteen.runner;

import cn.dev33.satoken.secure.SaSecureUtil;
import com.canteen.entity.SysConfig;
import com.canteen.entity.SysUser;
import com.canteen.service.SysConfigService;
import com.canteen.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Component
public class DataInitRunner implements ApplicationRunner {

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private SysConfigService sysConfigService;

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(ApplicationArguments args) {
        initTables();
        initRootUser();
        initSystemConfig();
    }

    private void initTables() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute(
                "CREATE TABLE IF NOT EXISTS sys_operation_log (" +
                "  id BIGINT AUTO_INCREMENT PRIMARY KEY," +
                "  operator_id BIGINT," +
                "  operator_name VARCHAR(64)," +
                "  module VARCHAR(64)," +
                "  action VARCHAR(64)," +
                "  method VARCHAR(255)," +
                "  request_params TEXT," +
                "  result VARCHAR(16)," +
                "  error_msg VARCHAR(512)," +
                "  ip VARCHAR(64)," +
                "  cost_time BIGINT," +
                "  create_time DATETIME" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
            );
            System.out.println("====== [DataInit] sys_operation_log 表就绪 ======");
        } catch (Exception e) {
            System.err.println("[DataInit] 建表失败: " + e.getMessage());
        }
    }

    private void initRootUser() {
        long count = sysUserService.count();
        if (count == 0) {
            SysUser user = new SysUser();
            user.setUsername("admin");
            user.setPhone("13800000000");
            user.setPassword(SaSecureUtil.md5("123456"));
            user.setRole("ADMIN_SYSTEM");
            user.setIsInitialPassword(1);
            user.setStatus(1);
            sysUserService.save(user);
            System.out.println("====== [DataInit] 默认系统管理员账号 (admin / 123456) 创建成功！ ======");
        } else {
            System.out.println("====== [DataInit] 检测到用户表非空，跳过管理员账号初始化。 ======");
        }
    }

    private void initSystemConfig() {
        long count = sysConfigService.count();
        if (count == 0) {
            SysConfig deadlineConfig = new SysConfig();
            deadlineConfig.setConfigKey("DEADLINE_LUNCH");
            deadlineConfig.setConfigValue("10:30");
            deadlineConfig.setDescription("午餐订餐截止时间");
            sysConfigService.save(deadlineConfig);

            SysConfig timeoutConfig = new SysConfig();
            timeoutConfig.setConfigKey("TIMEOUT_MINUTES");
            timeoutConfig.setConfigValue("120");
            timeoutConfig.setDescription("取餐超时作废时间(分钟)");
            sysConfigService.save(timeoutConfig);

            System.out.println("====== [DataInit] 系统基础配置初始化完成！ ======");
        } else {
            System.out.println("====== [DataInit] 检测到配置表非空，跳过配置初始化。 ======");
        }
    }
}
