package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.secure.SaSecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.canteen.annotation.LogRecord;
import com.canteen.common.R;
import com.canteen.entity.SysUser;
import com.canteen.enums.UserRole;
import com.canteen.service.SysUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/system/users")
@RequiredArgsConstructor
@SaCheckRole("ADMIN_SYSTEM")
public class SysUserController {

    private final SysUserService sysUserService;

    private final StringRedisTemplate stringRedisTemplate;

    private static final String SMS_CODE_PREFIX = "sms:code:";

    /**
     * 开通食堂管理员账号
     */
    @LogRecord(module = "人员管理", action = "开通食堂账号")
    @PostMapping("/canteen-staff")
    public R<Void> createCanteenStaff(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String phone = params.get("phone");
        String code = params.get("code");

        if (username == null || username.isEmpty()) {
            return R.fail("用户名不能为空");
        }
        if (phone == null || phone.isEmpty()) {
            return R.fail("手机号不能为空");
        }

        String smsError = verifySmsCode(phone, code);
        if (smsError != null) {
            return R.fail(smsError);
        }

        // 校验用户名唯一
        long usernameCount = sysUserService.count(
                new LambdaQueryWrapper<SysUser>().eq(SysUser::getUsername, username)
        );
        if (usernameCount > 0) {
            return R.fail("用户名已存在: " + username);
        }

        // 校验手机号唯一
        long phoneCount = sysUserService.count(
                new LambdaQueryWrapper<SysUser>().eq(SysUser::getPhone, phone)
        );
        if (phoneCount > 0) {
            return R.fail("手机号已被注册: " + phone);
        }

        SysUser user = new SysUser();
        user.setUsername(username);
        user.setPhone(phone);
        user.setPassword(SaSecureUtil.md5("123456"));
        user.setRole(UserRole.ADMIN_CANTEEN);
        user.setIsInitialPassword(1);
        user.setStatus(1);
        sysUserService.save(user);

        log.info("[System] 开通食堂管理员账号: username={}, phone={}", username, phone);
        return R.ok();
    }

    /**
     * 注销食堂管理员账号（禁用，需本人手机号验证码确认）
     */
    @LogRecord(module = "人员管理", action = "注销食堂账号")
    @PostMapping("/deactivate")
    public R<Void> deactivate(@RequestBody Map<String, String> params) {
        String userIdStr = params.get("userId");
        String code = params.get("code");

        if (userIdStr == null || userIdStr.isEmpty()) {
            return R.fail("用户ID不能为空");
        }

        Long userId;
        try {
            userId = Long.parseLong(userIdStr);
        } catch (NumberFormatException e) {
            return R.fail("非法的用户ID");
        }

        SysUser user = sysUserService.getById(userId);
        if (user == null) {
            return R.fail("账号不存在");
        }
        if (!UserRole.ADMIN_CANTEEN.equals(user.getRole())) {
            return R.fail("仅食堂管理员账号可注销");
        }
        if (user.getStatus() != null && user.getStatus() == 0) {
            return R.fail("账号已禁用");
        }

        String smsError = verifySmsCode(user.getPhone(), code);
        if (smsError != null) {
            return R.fail(smsError);
        }

        SysUser update = new SysUser();
        update.setId(userId);
        update.setStatus(0);
        sysUserService.updateById(update);

        log.info("[System] 注销食堂管理员账号: userId={}, username={}", userId, user.getUsername());
        return R.ok();
    }

    /** 校验短信验证码：成功返回 null，失败返回错误信息 */
    private String verifySmsCode(String phone, String code) {
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
     * 分页查询食堂管理员账号列表
     */
    @GetMapping("/list")
    public R<Page<SysUser>> list(@RequestParam(defaultValue = "1") Integer page,
                                  @RequestParam(defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<SysUser> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysUser::getRole, UserRole.ADMIN_CANTEEN);
        wrapper.orderByDesc(SysUser::getCreateTime);

        Page<SysUser> result = sysUserService.page(new Page<>(page, pageSize), wrapper);
        return R.ok(result);
    }
}
