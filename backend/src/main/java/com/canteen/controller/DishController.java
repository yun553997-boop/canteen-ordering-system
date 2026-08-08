package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.annotation.SaMode;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.canteen.common.R;
import com.canteen.entity.BizDish;
import com.canteen.enums.DishStatus;
import com.canteen.service.BizDishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/admin/dishes")
@RequiredArgsConstructor
@SaCheckRole(value = {"ADMIN_CANTEEN", "ADMIN_SYSTEM"}, mode = SaMode.OR)
public class DishController {

    private final BizDishService bizDishService;

    /**
     * 分页查询菜品列表，支持按名称（模糊）、分类、状态筛选
     */
    @GetMapping("/list")
    public R<Page<BizDish>> list(@RequestParam(defaultValue = "1") Integer page,
                                  @RequestParam(defaultValue = "10") Integer pageSize,
                                  @RequestParam(required = false) String name,
                                  @RequestParam(required = false) String category,
                                  @RequestParam(required = false) String status) {
        LambdaQueryWrapper<BizDish> wrapper = new LambdaQueryWrapper<>();
        if (name != null && !name.isEmpty()) {
            wrapper.like(BizDish::getName, name);
        }
        if (category != null && !category.isEmpty()) {
            wrapper.eq(BizDish::getCategory, category);
        }
        if (status != null && !status.isEmpty()) {
            wrapper.eq(BizDish::getStatus, status);
        }
        wrapper.orderByDesc(BizDish::getCreateTime);

        Page<BizDish> result = bizDishService.page(new Page<>(page, pageSize), wrapper);
        return R.ok(result);
    }

    /**
     * 新增菜品
     */
    @PostMapping("/add")
    public R<Void> add(@RequestBody BizDish dish) {
        bizDishService.save(dish);
        log.info("[Dish] 新增菜品: {}", dish.getName());
        return R.ok();
    }

    /**
     * 更新菜品信息
     */
    @PutMapping("/update")
    public R<Void> update(@RequestBody BizDish dish) {
        if (dish.getId() == null) {
            return R.fail("菜品ID不能为空");
        }
        bizDishService.updateById(dish);
        log.info("[Dish] 更新菜品: id={}", dish.getId());
        return R.ok();
    }

    /**
     * 快捷上下架：PUT /api/v1/admin/dishes/status/{id}/{status}
     */
    @PutMapping("/status/{id}/{status}")
    public R<Void> updateStatus(@PathVariable Long id, @PathVariable String status) {
        if (!DishStatus.ON.equals(status) && !DishStatus.OFF.equals(status) && !DishStatus.PAUSED.equals(status)) {
            return R.fail("无效的状态值，允许: ON / OFF / PAUSED");
        }

        BizDish dish = bizDishService.getById(id);
        if (dish == null) {
            return R.fail("菜品不存在");
        }

        BizDish update = new BizDish();
        update.setId(id);
        update.setStatus(status);
        bizDishService.updateById(update);

        log.info("[Dish] 状态更新: id={}, status={}", id, status);
        return R.ok();
    }

    /**
     * 逻辑删除菜品
     */
    @DeleteMapping("/delete/{id}")
    public R<Void> delete(@PathVariable Long id) {
        bizDishService.removeById(id);
        log.info("[Dish] 逻辑删除菜品: id={}", id);
        return R.ok();
    }
}
