package com.canteen.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.entity.SysNotification;
import com.canteen.mapper.SysNotificationMapper;
import com.canteen.service.SysNotificationService;
import org.springframework.stereotype.Service;

@Service
public class SysNotificationServiceImpl extends ServiceImpl<SysNotificationMapper, SysNotification>
        implements SysNotificationService {
}
