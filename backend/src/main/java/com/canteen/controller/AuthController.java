package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.canteen.common.R;
import com.canteen.entity.SysUser;
import com.canteen.enums.UserRole;
import com.canteen.service.SysUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

        // 管理员登录仅限 ADMIN_CANTEEN / ADMIN_SYSTEM 角色
        if (!UserRole.ADMIN_CANTEEN.equals(user.getRole()) && !UserRole.ADMIN_SYSTEM.equals(user.getRole())) {
            return R.fail("非管理员账号，请使用手机验证码登录");
        }

        StpUtil.login(user.getId());
        StpUtil.getSession().set("role", user.getRole());

        Map<String, Object> result = new HashMap<>();
        result.put("token", StpUtil.getTokenInfo().getTokenValue());
        result.put("role", user.getRole());
        result.put("username", user.getUsername());
        result.put("userId", user.getId());
        result.put("isInitialPassword", user.getIsInitialPassword());

        return R.ok(result);
    }

    /**
     * 修改密码（含首次登录强制修改）
     */
    @PutMapping("/update-password")
    public R<Void> updatePassword(@RequestBody Map<String, String> params) {
        String newPassword = params.get("newPassword");
        String oldPassword = params.get("oldPassword");

        if (newPassword == null || newPassword.length() < 6) {
            return R.fail("新密码长度不能少于6位");
        }

        long userId = StpUtil.getLoginIdAsLong();
        SysUser user = sysUserService.getById(userId);
        if (user == null) {
            return R.fail("用户不存在");
        }

        // 如果提供了旧密码，校验是否正确
        if (oldPassword != null && !oldPassword.isEmpty()) {
            if (!SaSecureUtil.md5(oldPassword).equals(user.getPassword())) {
                return R.fail("原密码错误");
            }
        }

        // 使用 LambdaUpdateWrapper 显式更新，确保 isInitialPassword 被持久化
        LambdaUpdateWrapper<SysUser> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(SysUser::getId, userId)
                .set(SysUser::getPassword, SaSecureUtil.md5(newPassword))
                .set(SysUser::getIsInitialPassword, 0);
        sysUserService.update(updateWrapper);

        log.info("[Auth] 用户修改密码成功: userId={}", userId);
        return R.ok();
    }

    /**
     * 发送短信验证码
     */
    @PostMapping("/send-sms")
    public R<String> sendSms(@RequestBody Map<String, String> params) {
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

        return R.ok(code);
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

        // 手机验证码登录仅限普通用户角色
        if (!UserRole.USER_STAFF.equals(user.getRole()) && !UserRole.USER_PATIENT.equals(user.getRole())) {
            return R.fail("管理员请使用账号密码登录");
        }

        StpUtil.login(user.getId());
        StpUtil.getSession().set("role", user.getRole());

        Map<String, Object> result = new HashMap<>();
        result.put("token", StpUtil.getTokenInfo().getTokenValue());
        result.put("role", user.getRole());
        result.put("username", user.getUsername());
        result.put("userId", user.getId());

        return R.ok(result);
    }

    /**
     * 普通用户密码登录
     */
    @PostMapping("/login/user")
    public R<Map<String, Object>> loginUser(@RequestBody Map<String, String> params) {
        String phone = params.get("phone");
        String password = params.get("password");

        if (phone == null || phone.isEmpty()) {
            return R.fail("手机号不能为空");
        }
        if (password == null || password.isEmpty()) {
            return R.fail("密码不能为空");
        }

        SysUser user = sysUserService.getOne(
                new LambdaQueryWrapper<SysUser>().eq(SysUser::getPhone, phone)
        );
        if (user == null) {
            return R.fail("该手机号未注册");
        }
        if (!SaSecureUtil.md5(password).equals(user.getPassword())) {
            return R.fail("密码错误");
        }
        if (user.getStatus() == null || user.getStatus() == 0) {
            return R.fail("账号已被禁用");
        }
        if (!UserRole.USER_STAFF.equals(user.getRole()) && !UserRole.USER_PATIENT.equals(user.getRole())) {
            return R.fail("请使用食堂管理员登录");
        }

        StpUtil.login(user.getId());
        StpUtil.getSession().set("role", user.getRole());

        Map<String, Object> result = new HashMap<>();
        result.put("token", StpUtil.getTokenInfo().getTokenValue());
        result.put("role", user.getRole());
        result.put("username", user.getUsername());
        result.put("userId", user.getId());

        return R.ok(result);
    }

    /**
     * 用户自助注册（默认角色 USER_PATIENT）
     */
    @PostMapping("/register")
    public R<Map<String, Object>> register(@RequestBody Map<String, String> params) {
        String nickname = params.get("nickname");
        String phone = params.get("phone");
        String code = params.get("code");
        String password = params.get("password");

        if (nickname == null || nickname.isEmpty()) {
            return R.fail("昵称不能为空");
        }
        if (phone == null || phone.isEmpty()) {
            return R.fail("手机号不能为空");
        }
        if (password == null || password.length() < 6) {
            return R.fail("密码长度不能少于6位");
        }

        String smsError = checkSmsCode(phone, code);
        if (smsError != null) {
            return R.fail(smsError);
        }

        long usernameCount = sysUserService.count(
                new LambdaQueryWrapper<SysUser>().eq(SysUser::getUsername, nickname)
        );
        if (usernameCount > 0) {
            return R.fail("昵称已存在: " + nickname);
        }

        long phoneCount = sysUserService.count(
                new LambdaQueryWrapper<SysUser>().eq(SysUser::getPhone, phone)
        );
        if (phoneCount > 0) {
            return R.fail("手机号已被注册: " + phone);
        }

        SysUser user = new SysUser();
        user.setUsername(nickname);
        user.setPhone(phone);
        user.setPassword(SaSecureUtil.md5(password));
        user.setRole(UserRole.USER_PATIENT);
        user.setIsInitialPassword(0);
        user.setStatus(1);
        sysUserService.save(user);

        // 注册成功自动登录
        StpUtil.login(user.getId());
        StpUtil.getSession().set("role", user.getRole());

        Map<String, Object> result = new HashMap<>();
        result.put("token", StpUtil.getTokenInfo().getTokenValue());
        result.put("role", user.getRole());
        result.put("username", user.getUsername());
        result.put("userId", user.getId());

        log.info("[Auth] 用户注册成功: phone={}, nickname={}", phone, nickname);
        return R.ok(result);
    }

    /**
     * 忘记密码：验证码重置
     */
    @PostMapping("/reset-password")
    public R<Void> resetPassword(@RequestBody Map<String, String> params) {
        String phone = params.get("phone");
        String code = params.get("code");
        String newPassword = params.get("newPassword");

        if (phone == null || phone.isEmpty()) {
            return R.fail("手机号不能为空");
        }
        if (newPassword == null || newPassword.length() < 6) {
            return R.fail("新密码长度不能少于6位");
        }

        String smsError = checkSmsCode(phone, code);
        if (smsError != null) {
            return R.fail(smsError);
        }

        SysUser user = sysUserService.getOne(
                new LambdaQueryWrapper<SysUser>().eq(SysUser::getPhone, phone)
        );
        if (user == null) {
            return R.fail("该手机号未注册");
        }

        LambdaUpdateWrapper<SysUser> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(SysUser::getId, user.getId())
                .set(SysUser::getPassword, SaSecureUtil.md5(newPassword))
                .set(SysUser::getIsInitialPassword, 0);
        sysUserService.update(updateWrapper);

        log.info("[Auth] 用户重置密码成功: phone={}", phone);
        return R.ok();
    }

    /** 校验短信验证码：成功返回 null，失败返回错误信息 */
    private String checkSmsCode(String phone, String code) {
        if (code == null || code.isEmpty()) {
            return "验证码不能为空";
        }
        String key = SMS_CODE_PREFIX + phone;
        String storedCode = stringRedisTemplate.opsForValue().get(key);
        if (storedCode == null) {
            return "验证码已过期，请重新发送";
        }
        if (!storedCode.equals(code)) {
            return "验证码错误";
        }
        stringRedisTemplate.delete(key);
        return null;
    }

    /**
     * 获取当前登录用户信息（用于 token 校验）
     */
    @SaCheckLogin
    @GetMapping("/me")
    public R<Map<String, Object>> me() {
        long userId = StpUtil.getLoginIdAsLong();
        SysUser user = sysUserService.getById(userId);
        if (user == null) {
            return R.fail("用户不存在");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("userId", user.getId());
        result.put("username", user.getUsername());
        result.put("phone", user.getPhone());
        result.put("role", user.getRole());

        return R.ok(result);
    }
}
