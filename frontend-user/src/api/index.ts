export { sendSms, loginByMobile, loginByAdmin, getCurrentUser } from './auth'
export type { LoginResult, CurrentUser } from './auth'

export {
  getStatisticsOverview,
  getOrderList,
  verifyOrder,
  updateOrderStatus,
  getDishList,
  addDish,
  updateDish,
  changeDishStatus,
  deleteDish,
  getAdminNotifications,
  getAdminUnreadCount,
  markAdminNotificationRead,
  markAdminAllNotificationsRead,
} from './admin'
export type { OverviewData, OrderInfo, OrderPage, DishInfo, DishPage, NotificationInfo } from './admin'

export { getUserDishes, submitOrder, getOrderDetail, getOrderList as getUserOrderList } from './user'
export type { DishItem, OrderDetail, OrderSummary } from './user'

export { getNotifications, getUnreadCount, markRead, markAllRead } from './notification'

export { getWalletBalance, rechargeWallet } from './wallet'
