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

@Component
public class DataInitRunner implements ApplicationRunner {

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private SysConfigService sysConfigService;

    @Override
    public void run(ApplicationArguments args) {
        initRootUser();
        initSystemConfig();
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
