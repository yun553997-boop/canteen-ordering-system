package com.canteen.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.canteen.entity.SysNotification;

public interface SysNotificationService extends IService<SysNotification> {

    /** 分页查询用户通知 */
    Page<SysNotification> listByUserId(Long userId, int page, int pageSize);

    /** 未读数量 */
    long countUnread(Long userId);

    /** 标记单条已读 */
    void markRead(Long id, Long userId);

    /** 全部已读 */
    void markAllRead(Long userId);

    /** 创建通知 */
    void create(Long receiverId, String type, String title, String content);
}
