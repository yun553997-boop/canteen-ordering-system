import { get, post } from '@/utils/request'

/** 钱包余额与充值金额单位均为「分」 */

/**
 * 获取当前用户钱包余额（单位：分）
 */
export function getWalletBalance(): Promise<{ balance: number }> {
  return get<{ balance: number }>('/user/wallet/balance')
}

/**
 * 充值（amount 单位：分），返回变动后的余额
 */
export function rechargeWallet(amount: number): Promise<{ balance: number }> {
  return post<{ balance: number }>(
    '/user/wallet/recharge',
    { amount } as unknown as Record<string, unknown>,
    { showLoading: false }
  )
}

/**
 * 申请退款（提现到微信/支付宝），amount 单位：分，channel 为 WECHAT / ALIPAY
 */
export function withdrawWallet(amount: number, channel: string): Promise<{ balance: number }> {
  return post<{ balance: number }>(
    '/user/wallet/withdraw',
    { amount, channel } as unknown as Record<string, unknown>,
    { showLoading: false }
  )
}
