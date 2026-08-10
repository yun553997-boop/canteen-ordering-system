package com.canteen.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.entity.SysNotification;
import com.canteen.mapper.SysNotificationMapper;
import com.canteen.service.SysNotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SysNotificationServiceImpl extends ServiceImpl<SysNotificationMapper, SysNotification>
        implements SysNotificationService {

    @Override
    public Page<SysNotification> listByUserId(Long userId, int page, int pageSize) {
        LambdaQueryWrapper<SysNotification> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysNotification::getReceiverId, userId)
                .orderByDesc(SysNotification::getCreateTime);
        return page(new Page<>(page, pageSize), wrapper);
    }

    @Override
    public long countUnread(Long userId) {
        LambdaQueryWrapper<SysNotification> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SysNotification::getReceiverId, userId)
                .eq(SysNotification::getIsRead, 0);
        return count(wrapper);
    }

    @Override
    public void markRead(Long id, Long userId) {
        LambdaUpdateWrapper<SysNotification> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(SysNotification::getId, id)
                .eq(SysNotification::getReceiverId, userId)
                .set(SysNotification::getIsRead, 1);
        update(wrapper);
    }

    @Override
    public void markAllRead(Long userId) {
        LambdaUpdateWrapper<SysNotification> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(SysNotification::getReceiverId, userId)
                .eq(SysNotification::getIsRead, 0)
                .set(SysNotification::getIsRead, 1);
        update(wrapper);
    }

    @Override
    public void create(Long receiverId, String type, String title, String content) {
        SysNotification notification = new SysNotification();
        notification.setReceiverId(receiverId);
        notification.setType(type);
        notification.setTitle(title);
        notification.setContent(content);
        notification.setIsRead(0);
        notification.setCreateTime(LocalDateTime.now());
        save(notification);
    }
}
