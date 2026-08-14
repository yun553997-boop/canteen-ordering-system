/**
 * 图片/资源 URL 处理工具
 * 后端返回的相对路径（如 /uploads/dishes/xxx.jpg）在小程序里会被解析成本地资源，
 * 需要转成绝对路径；H5 走 Vite proxy 用相对路径即可。
 */

const SERVER_BASE = 'http://192.168.126.220:8000'

export function resolveImageUrl(url: string | undefined): string {
  if (!url) return ''
  // 已是绝对路径（http/https/data/blob），直接返回
  if (/^(https?:|data:|blob:|\/\/)/.test(url)) return url
  // #ifdef H5
  return url
  // #endif
  // #ifndef H5
  return SERVER_BASE + url
  // #endif
}
