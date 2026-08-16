import { get, post, put } from '@/utils/request'

export interface LoginResult {
  token: string
  role: string
  username: string
  userId: number
  isInitialPassword?: number
}

export interface CurrentUser {
  userId: number
  username: string
  phone: string
  role: string
}

/**
 * 发送短信验证码
 */
export function sendSms(phone: string): Promise<string> {
  return post<string>('/auth/send-sms', { phone })
}

/**
 * 手机号 + 验证码登录（普通用户）
 */
export function loginByMobile(phone: string, code: string): Promise<LoginResult> {
  return post<LoginResult>('/auth/login/mobile', { phone, code })
}

/**
 * 普通用户密码登录
 */
export function loginByUser(phone: string, password: string): Promise<LoginResult> {
  return post<LoginResult>('/auth/login/user', { phone, password })
}

/**
 * 用户自助注册（自动登录）
 */
export function register(data: { nickname: string; phone: string; code: string; password: string }): Promise<LoginResult> {
  return post<LoginResult>('/auth/register', data as unknown as Record<string, unknown>)
}

/**
 * 忘记密码（验证码重置）
 */
export function resetPassword(phone: string, code: string, newPassword: string): Promise<void> {
  return post<void>('/auth/reset-password', { phone, code, newPassword })
}

/**
 * 修改密码（登录后）
 */
export function updatePassword(newPassword: string, oldPassword?: string): Promise<void> {
  return put<void>('/auth/update-password', { newPassword, oldPassword })
}

/**
 * 管理员用户名/手机号 + 密码登录
 */
export function loginByAdmin(username: string, password: string): Promise<LoginResult> {
  return post<LoginResult>('/auth/login/admin', { username, password })
}

/** 获取当前登录用户信息 */
export function getCurrentUser(): Promise<CurrentUser> {
  return get<CurrentUser>('/auth/me')
}
