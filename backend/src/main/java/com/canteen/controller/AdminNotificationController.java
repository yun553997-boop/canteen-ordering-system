package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.canteen.common.R;
import com.canteen.entity.SysNotification;
import com.canteen.service.SysNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/notifications")
@RequiredArgsConstructor
@SaCheckRole(value = {"ADMIN_CANTEEN", "ADMIN_SYSTEM"}, mode = SaMode.OR)
public class AdminNotificationController {

    private final SysNotificationService sysNotificationService;

    /** 分页获取当前管理员通知列表 */
    @GetMapping("/list")
    public R<Page<SysNotification>> list(@RequestParam(defaultValue = "1") int page,
                                          @RequestParam(defaultValue = "20") int pageSize) {
        Long userId = StpUtil.getLoginIdAsLong();
        return R.ok(sysNotificationService.listByUserId(userId, page, pageSize));
    }

    /** 获取未读数量 */
    @GetMapping("/unread-count")
    public R<Map<String, Object>> unreadCount() {
        Long userId = StpUtil.getLoginIdAsLong();
        Map<String, Object> result = new HashMap<>();
        result.put("count", sysNotificationService.countUnread(userId));
        return R.ok(result);
    }

    /** 标记单条已读 */
    @PutMapping("/read/{id}")
    public R<Void> markRead(@PathVariable Long id) {
        Long userId = StpUtil.getLoginIdAsLong();
        sysNotificationService.markRead(id, userId);
        return R.ok();
    }

    /** 全部已读 */
    @PutMapping("/read-all")
    public R<Void> markAllRead() {
        Long userId = StpUtil.getLoginIdAsLong();
        sysNotificationService.markAllRead(userId);
        return R.ok();
    }
}
