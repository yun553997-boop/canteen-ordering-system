package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.secure.SaSecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.canteen.common.R;
import com.canteen.entity.SysUser;
import com.canteen.enums.UserRole;
import com.canteen.service.SysUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/system/users")
@RequiredArgsConstructor
@SaCheckRole("ADMIN_SYSTEM")
public class SysUserController {

    private final SysUserService sysUserService;

    /**
     * 开通食堂管理员账号
     */
    @PostMapping("/canteen-staff")
    public R<Void> createCanteenStaff(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String phone = params.get("phone");

        if (username == null || username.isEmpty()) {
            return R.fail("用户名不能为空");
        }
        if (phone == null || phone.isEmpty()) {
            return R.fail("手机号不能为空");
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
