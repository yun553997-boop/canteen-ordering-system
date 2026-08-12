import http from "@/api";
import { Login } from "@/api/interface/index";

/**
 * @description 用户登录（管理员）
 */
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/v1/auth/login/admin`, params, { loading: false });
};

/**
 * @description 修改密码（含首次登录强制修改）
 */
export const changePasswordApi = (params: { newPassword: string; oldPassword?: string }) => {
  return http.put(`/v1/auth/update-password`, params, { loading: false });
};

/**
 * @description 获取当前用户信息
 */
export const getCurrentUserApi = () => {
  return http.get<Login.ResLogin>(`/v1/auth/me`, {}, { loading: false });
};

/**
 * @description 退出登录
 */
export const logoutApi = () => {
  return http.post(`/v1/auth/logout`, {}, { loading: false });
};
