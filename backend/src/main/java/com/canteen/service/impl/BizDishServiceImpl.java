package com.canteen.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.entity.BizDish;
import com.canteen.mapper.BizDishMapper;
import com.canteen.service.BizDishService;
import org.springframework.stereotype.Service;

@Service
public class BizDishServiceImpl extends ServiceImpl<BizDishMapper, BizDish>
        implements BizDishService {
}
