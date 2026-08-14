package com.canteen.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.canteen.entity.SysConfig;
import com.canteen.mapper.SysConfigMapper;
import com.canteen.service.SysConfigService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class SysConfigServiceImpl extends ServiceImpl<SysConfigMapper, SysConfig>
        implements SysConfigService {

    @Override
    public String getValue(String key) {
        SysConfig config = getOne(new LambdaQueryWrapper<SysConfig>()
                .eq(SysConfig::getConfigKey, key));
        return config == null ? null : config.getConfigValue();
    }

    @Override
    public Integer getIntValue(String key, Integer defaultValue) {
        String value = getValue(key);
        if (value == null || value.isEmpty()) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    @Override
    public void updateValues(Map<String, String> values) {
        for (Map.Entry<String, String> entry : values.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            SysConfig exist = getOne(new LambdaQueryWrapper<SysConfig>()
                    .eq(SysConfig::getConfigKey, key));
            if (exist != null) {
                SysConfig update = new SysConfig();
                update.setId(exist.getId());
                update.setConfigValue(value);
                update.setUpdateTime(LocalDateTime.now());
                updateById(update);
            } else {
                SysConfig config = new SysConfig();
                config.setConfigKey(key);
                config.setConfigValue(value);
                config.setUpdateTime(LocalDateTime.now());
                save(config);
            }
        }
    }
}
