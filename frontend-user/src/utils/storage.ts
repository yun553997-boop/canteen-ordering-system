/**
 * Token 存储工具
 * - 同时读写 uni.storage 和原生 localStorage，解决 H5 模式下的持久化不可靠问题
 * - H5 下 uni.getStorageSync 依赖 appid 做 key 映射，appid 为空时可能不稳定
 */

const TOKEN_KEY = 'canteen-token'

/** 获取 token，优先 uni.storage，回退原生 localStorage */
export function getToken(): string | null {
  try {
    const fromUni = uni.getStorageSync(TOKEN_KEY)
    if (fromUni) return fromUni
  } catch {
    // uni.storage 不可用
  }
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

/** 设置 token，双写 uni.storage + 原生 localStorage */
export function setToken(token: string): void {
  try {
    uni.setStorageSync(TOKEN_KEY, token)
  } catch {
    // uni.storage 不可用
  }
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // localStorage 不可用
  }
}

/** 移除 token，同步清除两端 */
export function removeToken(): void {
  try {
    uni.removeStorageSync(TOKEN_KEY)
  } catch {
    // uni.storage 不可用
  }
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // localStorage 不可用
  }
}

// --- 用户信息 ---

export interface UserInfo {
  userId: number
  username: string
  phone: string
  role: string
}

const USER_KEY = 'canteen-user'

/** 获取缓存用户信息 */
export function getUserInfo(): UserInfo | null {
  try {
    const fromUni = uni.getStorageSync(USER_KEY)
    if (fromUni) return JSON.parse(fromUni)
  } catch { /* ignore */ }
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/** 设置用户信息，双写 */
export function setUserInfo(info: UserInfo): void {
  const json = JSON.stringify(info)
  try { uni.setStorageSync(USER_KEY, json) } catch { /* ignore */ }
  try { localStorage.setItem(USER_KEY, json) } catch { /* ignore */ }
}

/** 移除用户信息 */
export function removeUserInfo(): void {
  try { uni.removeStorageSync(USER_KEY) } catch { /* ignore */ }
  try { localStorage.removeItem(USER_KEY) } catch { /* ignore */ }
}
