/**
 * HTTP 请求封装，基于 uni.request
 * - 自动注入 canteen-token
 * - 统一处理 R<T> 响应体
 * - 401/403 自动跳转登录页
 */

import { getToken, removeToken } from './storage'

// #ifdef H5
const BASE_URL = '/api/v1'
// #endif
// #ifndef H5
const BASE_URL = 'http://localhost:8000/api/v1'
// #endif


interface RequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, unknown>
  showLoading?: boolean
}

interface R<T> {
  code: number
  message: string
  data: T
}

function request<T>(config: RequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    if (config.showLoading !== false) {
      uni.showLoading({ title: '加载中...', mask: true })
    }

    const token = getToken()

    const header: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (token) {
      header['canteen-token'] = token
    }

    uni.request({
      url: BASE_URL + config.url,
      method: config.method || 'GET',
      data: config.data,
      header,
      success: (res) => {
        const result = res.data as R<T>
        if (result.code === 200) {
          resolve(result.data)
        } else if (result.code === 401 || result.code === 403) {
          removeToken()
          uni.reLaunch({ url: '/pages/login/login' })
          reject(new Error(result.message || '登录已过期'))
        } else {
          uni.showToast({ title: result.message || '请求失败', icon: 'none' })
          reject(new Error(result.message))
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
        reject(err)
      },
      complete: () => {
        if (config.showLoading !== false) {
          uni.hideLoading()
        }
      },
    })
  })
}

export function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  let fullUrl = url
  if (params) {
    const query = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join('&')
    if (query) {
      fullUrl += '?' + query
    }
  }
  return request<T>({ url: fullUrl, method: 'GET' })
}

export function post<T>(url: string, data?: Record<string, unknown>): Promise<T> {
  return request<T>({ url, method: 'POST', data })
}

export function put<T>(url: string, data?: Record<string, unknown>): Promise<T> {
  return request<T>({ url, method: 'PUT', data })
}

export function del<T>(url: string): Promise<T> {
  return request<T>({ url, method: 'DELETE' })
}
