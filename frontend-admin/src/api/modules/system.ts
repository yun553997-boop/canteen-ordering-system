import http from "@/api";
import { ResPage, System } from "@/api/interface/index";

/**
 * @description 获取系统用户列表（食堂管理员）
 * @param params 分页 + 搜索参数
 */
export const getSystemUserList = (params: System.ReqUserParams & Record<string, any>) => {
  return http.get<ResPage<System.SysUserInfo>>(`/v1/system/users/list`, params);
};

/**
 * @description 开通食堂管理员账号
 * @param params username + phone + code
 */
export const createCanteenStaff = (params: { username: string; phone: string; code: string }) => {
  return http.post(`/v1/system/users/canteen-staff`, params);
};

/**
 * @description 注销（禁用）食堂管理员账号
 * @param params userId + code
 */
export const deactivateCanteenStaff = (params: { userId: number; code: string }) => {
  return http.post(`/v1/system/users/deactivate`, params);
};

/**
 * @description 发送短信验证码（mock，返回验证码）
 */
export const sendSmsCode = (phone: string) => {
  return http.post<string>(`/v1/auth/send-sms`, { phone });
};
