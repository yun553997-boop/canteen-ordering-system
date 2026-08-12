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
 * @param params username + phone
 */
export const createCanteenStaff = (params: { username: string; phone: string }) => {
  return http.post(`/v1/system/users/canteen-staff`, params);
};
