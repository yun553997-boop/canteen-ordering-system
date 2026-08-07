package com.canteen.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.entity.BizOrder;
import com.canteen.mapper.BizOrderMapper;
import com.canteen.service.BizOrderService;
import org.springframework.stereotype.Service;

@Service
public class BizOrderServiceImpl extends ServiceImpl<BizOrderMapper, BizOrder>
        implements BizOrderService {
}
