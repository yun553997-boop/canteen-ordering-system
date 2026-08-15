package com.canteen.runner;

import cn.dev33.satoken.secure.SaSecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
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
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;

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

        ensureWalletTable();
        ensureBalanceColumn();
        ensureMerchantWallet();
    }

    /**
     * 确保 biz_wallet_log 表结构正确：若存在旧版表（含 transaction_no 等本设计不含的列）则 drop 重建，
     * 否则幂等建表。
     */
    private void ensureWalletTable() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            boolean oldSchema = false;
            try (ResultSet rs = stmt.executeQuery(
                    "SELECT COUNT(*) FROM information_schema.COLUMNS " +
                    "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'biz_wallet_log' " +
                    "AND COLUMN_NAME = 'transaction_no'")) {
                if (rs.next() && rs.getInt(1) > 0) {
                    oldSchema = true;
                }
            }
            if (oldSchema) {
                stmt.execute("DROP TABLE biz_wallet_log");
                System.out.println("====== [DataInit] 检测到旧版 biz_wallet_log 表，已删除 ======");
            }
            stmt.execute(
                "CREATE TABLE IF NOT EXISTS biz_wallet_log (" +
                "  id BIGINT AUTO_INCREMENT PRIMARY KEY," +
                "  flow_no VARCHAR(64) NOT NULL," +
                "  user_id BIGINT NOT NULL," +
                "  change_amount DECIMAL(12,2) NOT NULL," +
                "  change_type VARCHAR(32) NOT NULL," +
                "  balance_after DECIMAL(12,2) NOT NULL," +
                "  order_no VARCHAR(64)," +
                "  remark VARCHAR(255)," +
                "  create_time DATETIME NOT NULL," +
                "  UNIQUE KEY uk_flow_no (flow_no)," +
                "  KEY idx_user_id (user_id)" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
            );
            System.out.println("====== [DataInit] biz_wallet_log 表就绪 ======");
        } catch (Exception e) {
            System.err.println("[DataInit] 钱包流水表初始化失败: " + e.getMessage());
        }
    }

    /**
     * 防御性补齐 sys_user.balance 列（MySQL 无 ADD COLUMN IF NOT EXISTS，列已存在时忽略异常）
     */
    private void ensureBalanceColumn() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute(
                "ALTER TABLE sys_user ADD COLUMN balance DECIMAL(12,2) NOT NULL DEFAULT 0.00"
            );
            System.out.println("====== [DataInit] sys_user.balance 列就绪 ======");
        } catch (Exception e) {
            // 列已存在等场景忽略，不影响启动
            System.out.println("[DataInit] balance 列已存在或无需变更: " + e.getMessage());
        }
    }

    /**
     * 建商家钱包表并种单一钱包行（id=1，余额 0）
     */
    private void ensureMerchantWallet() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute(
                "CREATE TABLE IF NOT EXISTS biz_merchant_wallet (" +
                "  id BIGINT PRIMARY KEY," +
                "  balance DECIMAL(12,2) NOT NULL DEFAULT 0.00," +
                "  update_time DATETIME" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
            );
            stmt.execute("INSERT IGNORE INTO biz_merchant_wallet (id, balance, update_time) VALUES (1, 0.00, NOW())");
            System.out.println("====== [DataInit] biz_merchant_wallet 表就绪 ======");
        } catch (Exception e) {
            System.err.println("[DataInit] 商家钱包表初始化失败: " + e.getMessage());
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
        // 清理已废弃的 DEADLINE_LUNCH 键（改为 MEAL_LUNCH_START/END）
        sysConfigService.remove(new LambdaQueryWrapper<SysConfig>()
                .eq(SysConfig::getConfigKey, "DEADLINE_LUNCH"));

        // key, 默认值, 描述
        String[][] defaults = {
            {"TIMEOUT_MINUTES", "60", "取餐超时作废时间(分钟)"},
            {"MEAL_BREAKFAST_START", "06:00", "早餐可订餐开始时间"},
            {"MEAL_BREAKFAST_END", "09:30", "早餐可订餐截止时间"},
            {"MEAL_LUNCH_START", "10:30", "午餐可订餐开始时间"},
            {"MEAL_LUNCH_END", "13:30", "午餐可订餐截止时间"},
            {"MEAL_DINNER_START", "16:30", "晚餐可订餐开始时间"},
            {"MEAL_DINNER_END", "19:00", "晚餐可订餐截止时间"},
        };

        int created = 0;
        for (String[] item : defaults) {
            if (sysConfigService.getValue(item[0]) == null) {
                SysConfig config = new SysConfig();
                config.setConfigKey(item[0]);
                config.setConfigValue(item[1]);
                config.setDescription(item[2]);
                config.setUpdateTime(LocalDateTime.now());
                sysConfigService.save(config);
                created++;
            }
        }
        System.out.println("====== [DataInit] 系统基础配置初始化完成，新增 " + created + " 项 ======");
    }
}
