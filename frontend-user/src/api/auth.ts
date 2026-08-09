import { post } from '@/utils/request'

export interface LoginResult {
  token: string
  role: string
  username: string
  userId: number
}

/**
 * 发送短信验证码
 */
export function sendSms(phone: string): Promise<void> {
  return post<void>('/auth/send-sms', { phone })
}

/**
 * 手机号 + 验证码登录
 */
export function loginByMobile(phone: string, code: string): Promise<LoginResult> {
  return post<LoginResult>('/auth/login/mobile', { phone, code })
}
