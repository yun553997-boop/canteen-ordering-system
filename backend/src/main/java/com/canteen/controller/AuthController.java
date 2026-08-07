package com.canteen.controller;

import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.canteen.common.R;
import com.canteen.entity.SysUser;
import com.canteen.service.SysUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final SysUserService sysUserService;
    private final StringRedisTemplate stringRedisTemplate;

    @Value("${system.is-mock-sms}")
    private boolean mockSms;

    private static final String SMS_CODE_PREFIX = "sms:code:";
    private static final long SMS_CODE_TTL = 5;
    private static final Random RANDOM = new Random();

    /**
     * 管理员账号密码登录
     */
    @PostMapping("/login/admin")
    public R<Map<String, Object>> loginAdmin(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");

        if (username == null || password == null) {
            return R.fail("用户名和密码不能为空");
        }

        SysUser user = sysUserService.getOne(
                new LambdaQueryWrapper<SysUser>()
                        .eq(SysUser::getUsername, username)
        );

        if (user == null) {
            return R.fail("用户名或密码错误");
        }

        if (!SaSecureUtil.md5(password).equals(user.getPassword())) {
            return R.fail("用户名或密码错误");
        }

        if (user.getStatus() == null || user.getStatus() == 0) {
            return R.fail("账号已被禁用");
        }

        StpUtil.login(user.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("token", StpUtil.getTokenInfo().getTokenValue());
        result.put("role", user.getRole());
        result.put("username", user.getUsername());
        result.put("userId", user.getId());

        return R.ok(result);
    }

    /**
     * 发送短信验证码
     */
    @PostMapping("/send-sms")
    public R<Void> sendSms(@RequestBody Map<String, String> params) {
        String phone = params.get("phone");

        if (phone == null || phone.isEmpty()) {
            return R.fail("手机号不能为空");
        }

        if (!mockSms) {
            return R.fail("短信服务暂未开通");
        }

        String code = String.format("%04d", RANDOM.nextInt(10000));
        String key = SMS_CODE_PREFIX + phone;

        stringRedisTemplate.opsForValue().set(key, code, SMS_CODE_TTL, TimeUnit.MINUTES);

        log.info("========================================");
        log.info("[Mock SMS] 验证码已发送到手机: {}", phone);
        log.info("[Mock SMS] 验证码: {}", code);
        log.info("[Mock SMS] 有效期: {} 分钟", SMS_CODE_TTL);
        log.info("========================================");

        return R.ok();
    }

    /**
     * 手机号验证码登录
     */
    @PostMapping("/login/mobile")
    public R<Map<String, Object>> loginMobile(@RequestBody Map<String, String> params) {
        String phone = params.get("phone");
        String code = params.get("code");

        if (phone == null || code == null) {
            return R.fail("手机号和验证码不能为空");
        }

        String key = SMS_CODE_PREFIX + phone;
        String storedCode = stringRedisTemplate.opsForValue().get(key);

        if (storedCode == null) {
            return R.fail("验证码已过期，请重新发送");
        }

        if (!storedCode.equals(code)) {
            return R.fail("验证码错误");
        }

        // 验证通过，删除验证码
        stringRedisTemplate.delete(key);

        // 查找用户
        SysUser user = sysUserService.getOne(
                new LambdaQueryWrapper<SysUser>()
                        .eq(SysUser::getPhone, phone)
        );

        if (user == null) {
            return R.fail("该手机号未注册");
        }

        if (user.getStatus() == null || user.getStatus() == 0) {
            return R.fail("账号已被禁用");
        }

        StpUtil.login(user.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("token", StpUtil.getTokenInfo().getTokenValue());
        result.put("role", user.getRole());
        result.put("username", user.getUsername());
        result.put("userId", user.getId());

        return R.ok(result);
    }
}
