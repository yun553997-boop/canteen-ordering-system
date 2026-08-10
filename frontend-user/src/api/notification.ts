import { get, put } from '@/utils/request'

export interface NotificationItem {
  id: number
  receiverId: number
  title: string
  content: string
  type: string
  isRead: number
  createTime: string
}

export interface NotificationPage {
  records: NotificationItem[]
  total: number
  size: number
  current: number
}

/** 分页获取通知列表 */
export function getNotifications(page: number = 1, pageSize: number = 20): Promise<NotificationPage> {
  return get<NotificationPage>(`/user/notifications/list?page=${page}&pageSize=${pageSize}`)
}

/** 获取未读数量 */
export function getUnreadCount(): Promise<{ count: number }> {
  return get<{ count: number }>('/user/notifications/unread-count')
}

/** 标记单条已读 */
export function markRead(id: number): Promise<void> {
  return put<void>(`/user/notifications/read/${id}`)
}

/** 全部已读 */
export function markAllRead(): Promise<void> {
  return put<void>('/user/notifications/read-all')
}
