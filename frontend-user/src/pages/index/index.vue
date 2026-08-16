<template>
  <view class="menu-container">
    <!-- 餐次切换 -->
    <view class="meal-tabs">
      <view
        v-for="meal in mealTypes"
        :key="meal.value"
        class="meal-tab"
        :class="{ active: currentMeal === meal.value }"
        @tap="switchMeal(meal.value)"
      >
        {{ meal.label }}
      </view>
    </view>

    <!-- 菜品列表 -->
    <scroll-view
      class="dish-list"
      scroll-y
      :style="{ paddingBottom: (bottomOffset + 60) + 'px' }"
    >
      <view v-for="dish in dishes" :key="dish.id" class="dish-card">
        <image
          class="dish-img"
          :src="resolveImageUrl(dish.imageUrl) || defaultImg"
          mode="aspectFill"
        />
        <view class="dish-info">
          <text class="dish-name">{{ dish.name }}</text>
          <text class="dish-desc">{{ dish.description }}</text>
          <view class="dish-meta">
            <text class="dish-price">
              <text class="price-symbol">¥</text>{{ (dish.price / 100).toFixed(2) }}
            </text>
            <text class="dish-stock">剩余: {{ dish.stock }}</text>
          </view>
          <view class="dish-bottom">
            <view v-if="dish.stock === 0" class="sold-out">已售罄</view>
            <view v-else class="cart-control">
              <button
                v-if="getQuantity(dish.id) > 0"
                class="ctrl-btn minus"
                size="mini"
                @tap="removeFromCart(dish)"
              >
                -
              </button>
              <text v-if="getQuantity(dish.id) > 0" class="cart-num">
                {{ getQuantity(dish.id) }}
              </text>
              <button
                class="ctrl-btn add"
                size="mini"
                :disabled="getQuantity(dish.id) >= dish.stock"
                @tap="addToCart(dish)"
              >
                +
              </button>
            </view>
          </view>
        </view>
      </view>
      <view v-if="dishes.length === 0" class="empty-tip">暂无菜品</view>
    </scroll-view>

    <!-- 底部购物车栏 -->
    <view v-if="cartTotalCount > 0" class="cart-bar" :style="{ bottom: bottomOffset + 'px' }">
      <view class="cart-info">
        <view class="cart-icon-wrap">
          <text class="cart-icon">🛒</text>
          <text class="cart-badge">{{ cartTotalCount }}</text>
        </view>
        <text class="cart-total">¥{{ (cartTotalPrice / 100).toFixed(2) }}</text>
      </view>
      <button class="checkout-btn" @tap="submitOrder">提交订单</button>
    </view>

    <!-- 支付确认面板 -->
    <view v-if="showPayPanel" class="pay-mask" @tap="showPayPanel = false">
      <view class="pay-sheet" @tap.stop>
        <text class="pay-title">确认支付</text>
        <view class="pay-row">
          <text class="pay-label">支付金额</text>
          <text class="pay-amount">¥{{ (cartTotalPrice / 100).toFixed(2) }}</text>
        </view>
        <view class="pay-row">
          <text class="pay-label">当前钱包余额</text>
          <text class="pay-balance">¥{{ (walletBalance / 100).toFixed(2) }}</text>
        </view>
        <button v-if="walletBalance >= cartTotalPrice" class="pay-btn confirm" @tap="confirmPay">确认支付</button>
        <button v-else class="pay-btn insufficient" @tap="goRecharge">余额不足，去充值</button>
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { getUserDishes, submitOrder as submitOrderApi } from '@/api/user'
import type { DishItem } from '@/api/user'
import { getWalletBalance } from '@/api/wallet'
import { getToken } from '@/utils/storage'
import { resolveImageUrl } from '@/utils/url'
import CustomTabBar from '@/components/CustomTabBar.vue'

interface CartEntry {
  dish: DishItem
  quantity: number
}

const mealTypes = [
  { label: '早餐', value: 'BREAKFAST' },
  { label: '午餐', value: 'LUNCH' },
  { label: '晚餐', value: 'DINNER' },
]

const currentMeal = ref('LUNCH')
const dishes = ref<DishItem[]>([])
const cart = reactive<CartEntry[]>([])
const defaultImg = '/static/logo.png'
const bottomOffset = ref(50) // tabBar 高度，px

const cartTotalCount = computed(() => cart.reduce((s, i) => s + i.quantity, 0))
const cartTotalPrice = computed(() => cart.reduce((s, i) => s + i.dish.price * i.quantity, 0))
const showPayPanel = ref(false)
const walletBalance = ref(0)

function getQuantity(dishId: number): number {
  return cart.find((c) => c.dish.id === dishId)?.quantity || 0
}

function addToCart(dish: DishItem) {
  if (dish.stock <= 0) return
  const exist = cart.find((c) => c.dish.id === dish.id)
  if (exist) {
    if (exist.quantity < dish.stock) exist.quantity++
  } else {
    cart.push({ dish, quantity: 1 })
  }
}

function removeFromCart(dish: DishItem) {
  const idx = cart.findIndex((c) => c.dish.id === dish.id)
  if (idx === -1) return
  if (cart[idx].quantity > 1) {
    cart[idx].quantity--
  } else {
    cart.splice(idx, 1)
  }
}

function clearCart() {
  cart.splice(0, cart.length)
}

async function fetchDishes() {
  try {
    const data = await getUserDishes(currentMeal.value)
    dishes.value = data || []
  } catch {
    dishes.value = []
  }
}

async function switchMeal(meal: string) {
  if (currentMeal.value === meal) return
  currentMeal.value = meal
  clearCart()
  await fetchDishes()
}

async function submitOrder() {
  // 校验登录
  const token = getToken()
  if (!token) {
    uni.showToast({ title: '请先登录', icon: 'none' })
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/login/index' })
    }, 800)
    return
  }

  if (cart.length === 0) {
    uni.showToast({ title: '请选择菜品', icon: 'none' })
    return
  }

  // 拉取钱包余额后弹出确认面板
  try {
    const data = await getWalletBalance()
    walletBalance.value = data.balance ?? 0
  } catch {
    walletBalance.value = 0
  }
  showPayPanel.value = true
}

async function confirmPay() {
  const payload = {
    mealType: currentMeal.value,
    items: cart.map((c) => ({
      dishId: c.dish.id,
      quantity: c.quantity,
    })),
  }

  try {
    await submitOrderApi(payload)
    showPayPanel.value = false
    uni.showToast({ title: '订餐成功', icon: 'success' })
    clearCart()
  } catch {
    // 错误已由 request.ts 拦截器处理（如余额不足）
    showPayPanel.value = false
  }
}

function goRecharge() {
  showPayPanel.value = false
  uni.navigateTo({ url: '/pages/wallet/index' })
}

onMounted(() => {
  const info = uni.getSystemInfoSync()
  // safeAreaInsets.bottom 适配刘海屏底部，tabBar 默认 50px
  bottomOffset.value = (info.safeAreaInsets?.bottom || 0) + 50
  fetchDishes()
})
</script>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

/* 餐次切换 */
.meal-tabs {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  padding: 20rpx;
  background: #fff;
}

.meal-tab {
  padding: 16rpx 44rpx;
  font-size: 28rpx;
  color: #666;
  border-radius: 32rpx;
  background: #f5f5f5;
  transition: all 0.3s;
}

.meal-tab.active {
  background: #FF6B35;
  color: #fff;
  font-weight: bold;
}

/* 菜品列表 */
.dish-list {
  flex: 1;
  padding: 20rpx;
}

.dish-card {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  padding: 20rpx;
}

.dish-img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  background: #eee;
  flex-shrink: 0;
}

.dish-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dish-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.dish-desc {
  font-size: 24rpx;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dish-meta {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.dish-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF6B35;
}

.price-symbol {
  font-size: 24rpx;
}

.dish-stock {
  font-size: 22rpx;
  color: #999;
}

.dish-bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.sold-out {
  font-size: 24rpx;
  color: #ccc;
  padding: 8rpx 16rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
}

.cart-control {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.ctrl-btn {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  font-size: 28rpx;
  font-weight: bold;
  line-height: 48rpx;
  padding: 0;
  border: none;
}

.ctrl-btn.add {
  background: #FF6B35;
  color: #fff;
}

.ctrl-btn.add[disabled] {
  background: #ccc;
}

.ctrl-btn.minus {
  background: #eee;
  color: #333;
}

.cart-num {
  font-size: 28rpx;
  font-weight: bold;
  min-width: 40rpx;
  text-align: center;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  padding: 100rpx 0;
}

/* 底部购物车栏 */
.cart-bar {
  position: fixed;
  left: 0;
  right: 0;
  background: #fff;
  padding: 16rpx 30rpx;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.cart-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.cart-icon-wrap {
  position: relative;
}

.cart-icon {
  font-size: 44rpx;
}

.cart-badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background: #FF6B35;
  color: #fff;
  font-size: 20rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  text-align: center;
  line-height: 32rpx;
}

.cart-total {
  font-size: 36rpx;
  font-weight: bold;
  color: #FF6B35;
}

.checkout-btn {
  background: #FF6B35;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  border: none;
  border-radius: 36rpx;
  padding: 16rpx 40rpx;
}

/* 支付确认面板 */
.pay-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.pay-sheet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 40rpx 40rpx calc(40rpx + env(safe-area-inset-bottom));
}

.pay-title {
  font-size: 34rpx;
  font-weight: bold;
  display: block;
  text-align: center;
  margin-bottom: 24rpx;
}

.pay-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 8rpx;
  border-bottom: 2rpx solid #f5f5f5;
}

.pay-label {
  font-size: 28rpx;
  color: #666;
}

.pay-amount {
  font-size: 34rpx;
  font-weight: bold;
  color: #FF6B35;
}

.pay-balance {
  font-size: 30rpx;
  color: #333;
}

.pay-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  margin-top: 32rpx;
  font-size: 30rpx;
  border: none;
  border-radius: 12rpx;
}

.pay-btn.confirm {
  background: #67C23A;
  color: #fff;
}

.pay-btn.insufficient {
  background: #ccc;
  color: #fff;
}
</style>
