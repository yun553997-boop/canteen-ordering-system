import { get, post } from '@/utils/request'

export interface LoginResult {
  token: string
  role: string
  username: string
  userId: number
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
export function sendSms(phone: string): Promise<void> {
  return post<void>('/auth/send-sms', { phone })
}

/**
 * 手机号 + 验证码登录（普通用户）
 */
export function loginByMobile(phone: string, code: string): Promise<LoginResult> {
  return post<LoginResult>('/auth/login/mobile', { phone, code })
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
