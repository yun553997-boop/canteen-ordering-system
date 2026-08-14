package com.canteen.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.canteen.entity.SysConfig;

import java.util.Map;

public interface SysConfigService extends IService<SysConfig> {

    /** 按 key 取 value，无则 null */
    String getValue(String key);

    /** 按 key 取 int，缺失/解析失败返回默认值 */
    Integer getIntValue(String key, Integer defaultValue);

    /** 按 key 批量 upsert（存在更新 value+updateTime，不存在插入） */
    void updateValues(Map<String, String> values);
}
