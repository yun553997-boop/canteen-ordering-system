package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.canteen.common.R;
import com.canteen.entity.BizDish;
import com.canteen.enums.DishStatus;
import com.canteen.service.BizDishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/user/dishes")
@RequiredArgsConstructor
@SaCheckRole(value = {"USER_STAFF", "USER_PATIENT"}, mode = SaMode.OR)
public class UserDishController {

    private final BizDishService bizDishService;

    /**
     * 获取今日可售菜品列表（仅上架状态），支持按餐次筛选
     */
    @GetMapping("/list")
    public R<List<BizDish>> list(@RequestParam(required = false) String category) {
        LambdaQueryWrapper<BizDish> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(BizDish::getStatus, DishStatus.ON);
        if (category != null && !category.isEmpty()) {
            wrapper.eq(BizDish::getCategory, category);
        }
        wrapper.orderByDesc(BizDish::getCreateTime);

        List<BizDish> dishes = bizDishService.list(wrapper);
        return R.ok(dishes);
    }
}
