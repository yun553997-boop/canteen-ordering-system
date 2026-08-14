import http from "@/api";

/** 系统配置键名常量 */
export const CONFIG_KEYS = {
  TIMEOUT_MINUTES: "TIMEOUT_MINUTES",
  BREAKFAST_START: "MEAL_BREAKFAST_START",
  BREAKFAST_END: "MEAL_BREAKFAST_END",
  LUNCH_START: "MEAL_LUNCH_START",
  LUNCH_END: "MEAL_LUNCH_END",
  DINNER_START: "MEAL_DINNER_START",
  DINNER_END: "MEAL_DINNER_END"
} as const;

/** 查询全部系统配置（configKey -> configValue） */
export const getSystemConfigs = () => {
  return http.get<Record<string, string>>(`/v1/system/configs`);
};

/** 保存系统配置 */
export const saveSystemConfigs = (data: Record<string, string>) => {
  return http.put(`/v1/system/configs`, data);
};
