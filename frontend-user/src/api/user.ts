import { get, post } from '@/utils/request'

/** 菜品项 */
export interface DishItem {
  id: number
  name: string
  price: number
  category: string
  stock: number
  dailyLimit: number
  description: string
  imageUrl: string
  status: string
}

/** 订单菜品请求 */
export interface OrderItemRequest {
  dishId: number
  quantity: number
}

/** 创建订单请求 */
export interface CreateOrderRequest {
  mealType: string
  items: OrderItemRequest[]
}

/**
 * 获取可售菜品列表
 * @param category 餐次筛选：BREAKFAST / LUNCH / DINNER，不传则返回全部
 */
export function getUserDishes(category?: string): Promise<DishItem[]> {
  return get<DishItem[]>('/user/dishes/list', category ? { category } : undefined)
}

/**
 * 提交订单
 */
export function submitOrder(data: CreateOrderRequest): Promise<{ orderNo: string }> {
  return post<{ orderNo: string }>('/user/orders/create', data as unknown as Record<string, unknown>)
}
