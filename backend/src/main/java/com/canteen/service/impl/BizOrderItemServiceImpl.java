package com.canteen.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.entity.BizOrderItem;
import com.canteen.mapper.BizOrderItemMapper;
import com.canteen.service.BizOrderItemService;
import org.springframework.stereotype.Service;

@Service
public class BizOrderItemServiceImpl extends ServiceImpl<BizOrderItemMapper, BizOrderItem>
        implements BizOrderItemService {
}
