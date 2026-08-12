import { del, get, post, put } from '@/utils/request'

// ========== 统计看板 ==========

export interface OverviewData {
  cards: {
    totalOrders: number
    pendingPickup: number
    completed: number
    cancelled: number
  }
  trend: { label: string; count: number }[]
  statusRatio: { name: string; value: number }[]
  topDishes: { dishName: string; quantity: number }[]
}

/** 获取数据看板概览 */
export function getStatisticsOverview(params?: Record<string, any>): Promise<OverviewData> {
  return get<OverviewData>('/admin/statistics/overview', params as Record<string, unknown>)
}

// ========== 订单管理 ==========

export interface OrderInfo {
  id?: number
  orderNo: string
  userId?: number
  totalAmount?: number
  mealType?: string
  status: string
  verifyCode?: string
  createTime?: string
  updateTime?: string
}

export interface OrderPage {
  records: OrderInfo[]
  total: number
  current: number
  size: number
}

/** 分页查询订单 */
export function getOrderList(params: Record<string, any>): Promise<OrderPage> {
  return get<OrderPage>('/admin/orders/list', params as Record<string, unknown>)
}

/** 核销订单 */
export function verifyOrder(orderNo: string): Promise<void> {
  return post<void>('/admin/orders/verify', { orderNo })
}

/** 更新订单状态 PENDING→PREPARING→READY */
export function updateOrderStatus(orderNo: string, status: string): Promise<void> {
  return put<void>(`/admin/orders/status/${orderNo}/${status}`)
}

// ========== 菜品管理 ==========

export interface DishInfo {
  id?: number
  name: string
  price: number
  category: string
  dailyLimit?: number
  stock?: number
  description?: string
  imageUrl?: string
  status: string
  createTime?: string
  updateTime?: string
}

export interface DishPage {
  records: DishInfo[]
  total: number
  current: number
  size: number
}

/** 分页查询菜品列表 */
export function getDishList(params: Record<string, any>): Promise<DishPage> {
  return get<DishPage>('/admin/dishes/list', params as Record<string, unknown>)
}

/** 新增菜品 */
export function addDish(data: DishInfo): Promise<void> {
  return post<void>('/admin/dishes/add', data as unknown as Record<string, unknown>)
}

/** 编辑菜品 */
export function updateDish(data: DishInfo): Promise<void> {
  return put<void>('/admin/dishes/update', data as unknown as Record<string, unknown>)
}

/** 切换菜品上下架状态 */
export function changeDishStatus(id: number, status: string): Promise<void> {
  return put<void>(`/admin/dishes/status/${id}/${status}`)
}

/** 删除菜品（逻辑删除） */
export function deleteDish(id: number): Promise<void> {
  return del<void>(`/admin/dishes/delete/${id}`)
}

// ========== 通知 ==========

export interface NotificationInfo {
  id: number
  receiverId: number
  title: string
  content: string
  type: string
  isRead: number
  createTime: string
}

/** 分页获取管理员通知 */
export function getAdminNotifications(page: number = 1, pageSize: number = 20): Promise<{ records: NotificationInfo[]; total: number }> {
  return get('/admin/notifications/list', { page, pageSize } as unknown as Record<string, unknown>)
}

/** 获取未读通知数 */
export function getAdminUnreadCount(): Promise<{ count: number }> {
  return get('/admin/notifications/unread-count')
}

/** 标记单条已读 */
export function markAdminNotificationRead(id: number): Promise<void> {
  return put(`/admin/notifications/read/${id}`)
}

/** 全部已读 */
export function markAdminAllNotificationsRead(): Promise<void> {
  return put('/admin/notifications/read-all')
}
