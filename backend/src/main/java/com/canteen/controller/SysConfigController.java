package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.canteen.annotation.LogRecord;
import com.canteen.common.R;
import com.canteen.entity.SysConfig;
import com.canteen.service.SysConfigService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/system/configs")
@RequiredArgsConstructor
@SaCheckRole("ADMIN_SYSTEM")
public class SysConfigController {

    private final SysConfigService sysConfigService;

    /**
     * 查询全部系统配置（configKey -> configValue）
     */
    @GetMapping
    public R<Map<String, String>> list() {
        List<SysConfig> all = sysConfigService.list();
        Map<String, String> map = new LinkedHashMap<>();
        for (SysConfig config : all) {
            map.put(config.getConfigKey(), config.getConfigValue());
        }
        return R.ok(map);
    }

    /**
     * 批量保存系统配置（按 configKey upsert）
     */
    @LogRecord(module = "系统配置", action = "修改系统配置")
    @PutMapping
    public R<Void> update(@RequestBody Map<String, String> values) {
        if (values == null || values.isEmpty()) {
            return R.fail("配置不能为空");
        }
        sysConfigService.updateValues(values);
        return R.ok();
    }
}
