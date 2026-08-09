<template>
  <view class="order-container">
    <!-- 订单状态 -->
    <view class="status-card">
      <view class="status-icon">
        <text v-if="order.status === 'PENDING'" class="icon-text">⏳</text>
        <text v-else-if="order.status === 'PREPARING'" class="icon-text">👨‍🍳</text>
        <text v-else-if="order.status === 'READY'" class="icon-text">✅</text>
        <text v-else-if="order.status === 'COMPLETED'" class="icon-text">📦</text>
        <text v-else class="icon-text">📋</text>
      </view>
      <text class="status-title">{{ statusText }}</text>
      <text class="status-desc">{{ statusDesc }}</text>
    </view>

    <!-- 订单进度条 -->
    <view class="progress-bar">
      <view
        v-for="(step, idx) in steps"
        :key="idx"
        class="step-item"
        :class="{ done: step.done, current: step.current }"
      >
        <view class="step-dot">
          <text v-if="step.done" class="dot-check">✓</text>
          <text v-else class="dot-num">{{ idx + 1 }}</text>
        </view>
        <text class="step-label">{{ step.label }}</text>
        <view v-if="idx < steps.length - 1" class="step-line" :class="{ filled: step.done }" />
      </view>
    </view>

    <!-- 取餐码（仅 READY 或 COMPLETED 状态显示） -->
    <view class="pickup-card" v-if="pickupCode">
      <text class="pickup-label">取餐码</text>
      <text class="pickup-code">{{ pickupCode }}</text>
      <text class="pickup-tip">请在取餐窗口出示此码</text>
    </view>

    <!-- 菜品清单 -->
    <view class="section">
      <text class="section-title">菜品清单</text>
      <view v-for="item in order.items" :key="item.dishId" class="order-item">
        <view class="item-img-placeholder">🍽️</view>
        <view class="item-info">
          <text class="item-name">{{ item.dishName }}</text>
        </view>
        <view class="item-right">
          <text class="item-count">×{{ item.quantity }}</text>
          <text class="item-price">¥{{ (item.price * item.quantity).toFixed(2) }}</text>
        </view>
      </view>
    </view>

    <!-- 金额明细 -->
    <view class="section">
      <text class="section-title">金额明细</text>
      <view class="price-row total">
        <text class="price-label">实付金额</text>
        <text class="price-value total-price">¥{{ totalAmount }}</text>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="section">
      <text class="section-title">订单信息</text>
      <view class="info-row">
        <text class="info-label">订单编号</text>
        <text class="info-value">{{ order.orderNo }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">下单时间</text>
        <text class="info-value">{{ order.createTime }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">餐次</text>
        <text class="info-value">{{ mealTypeLabel }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onPullDownRefresh, onUnload } from '@dcloudio/uni-app'

const statusLabels: Record<string, string> = {
  PREPARING: '制作中',
  READY: '待取餐',
  COMPLETED: '已完成',
}
import { getOrderDetail } from '@/api/user'
import type { OrderDetail } from '@/api/user'

interface OrderItemDisplay {
  dishId: number
  dishName: string
  price: number
  quantity: number
}

interface OrderDisplay {
  orderNo: string
  status: string
  createTime: string
  items: OrderItemDisplay[]
}

const order = reactive<OrderDisplay>({
  orderNo: '',
  status: '',
  createTime: '',
  items: []
})

const totalAmount = ref('0.00')

// 餐次映射
const mealLabelMap: Record<string, string> = {
  BREAKFAST: '早餐',
  LUNCH: '午餐',
  DINNER: '晚餐',
}
const mealTypeLabel = ref('')

// 步骤进度条
const steps = reactive([
  { label: '已下单', done: false, current: false },
  { label: '制作中', done: false, current: false },
  { label: '待取餐', done: false, current: false },
  { label: '已取餐', done: false, current: false },
])

const statusText = computed(() => {
  const map: Record<string, string> = {
    PENDING: '等待制作',
    PREPARING: '制作中',
    READY: '制作完成',
    COMPLETED: '已取餐',
    CANCELLED: '已取消',
  }
  return map[order.status] || order.status || '加载中...'
})

const statusDesc = computed(() => {
  const map: Record<string, string> = {
    PENDING: '您的订单已提交，请耐心等待',
    PREPARING: '厨师正在为您精心制作',
    READY: '请前往取餐窗口取餐',
    COMPLETED: '感谢您的光临',
  }
  return map[order.status] || ''
})

const pickupCode = computed(() => {
  if (order.status !== 'READY' && order.status !== 'COMPLETED') return ''
  return rawVerifyCode || rawOrderNo.slice(-4)
})

let rawVerifyCode = ''
let rawOrderNo = ''

function updateSteps(status: string) {
  const map: Record<string, number> = {
    PENDING: 0,
    PREPARING: 1,
    READY: 2,
    COMPLETED: 3,
  }
  const activeIdx = map[status] ?? -1
  for (let i = 0; i < steps.length; i++) {
    steps[i].done = i < activeIdx
    steps[i].current = i === activeIdx
  }
  if (activeIdx === 3) {
    steps[3].done = true
    steps[3].current = false
  }
}

async function fetchDetail() {
  try {
    const data = await getOrderDetail(rawOrderNo)
    const bizOrder = data.order
    order.orderNo = bizOrder.orderNo
    order.status = bizOrder.status
    order.createTime = bizOrder.createTime
    order.items = data.items || []
    totalAmount.value = ((bizOrder.totalAmount || 0) * 1).toFixed(2)
    mealTypeLabel.value = mealLabelMap[bizOrder.mealType] || bizOrder.mealType || ''
    rawVerifyCode = bizOrder.verifyCode || ''
    updateSteps(bizOrder.status)
  } catch {
    // 错误已由 request.ts 拦截器处理
  }
}

let pollTimer: ReturnType<typeof setInterval> | null = null
let previousStatus = ''

onLoad((options) => {
  rawOrderNo = (options as Record<string, string>).orderNo || ''
  if (rawOrderNo) {
    fetchDetail().then(() => {
      previousStatus = order.status
    })

    // 定时轮询订单状态（每 8 秒）
    pollTimer = setInterval(async () => {
      await fetchDetail()
      if (order.status !== previousStatus) {
        const label = statusLabels[order.status] || order.status
        uni.showToast({
          title: `订单状态已更新：${label}`,
          icon: 'none',
          duration: 3000,
        })
        previousStatus = order.status
      }
    }, 8000)
  }
})

// 下拉刷新
onPullDownRefresh(async () => {
  if (rawOrderNo) {
    await fetchDetail()
  }
  uni.stopPullDownRefresh()
})

// 离开页面时停止轮询
onUnload(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
})
</script>

<style scoped>
.order-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 40rpx;
}

/* 状态卡片 */
.status-card {
  background: linear-gradient(135deg, #FF6B35, #FF8C42);
  padding: 40rpx;
  text-align: center;
  color: #fff;
}

.status-icon {
  margin-bottom: 16rpx;
}

.icon-text {
  font-size: 64rpx;
}

.status-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.status-desc {
  font-size: 26rpx;
  opacity: 0.85;
}

/* 进度条 */
.progress-bar {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 30rpx 40rpx;
  margin: 20rpx;
  border-radius: 16rpx;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.step-dot {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
}

.step-item.done .step-dot,
.step-item.current .step-dot {
  background: #FF6B35;
  color: #fff;
}

.dot-check {
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
}

.dot-num {
  font-size: 24rpx;
  color: #999;
}

.step-item.done .dot-num,
.step-item.current .dot-num {
  color: #fff;
}

.step-label {
  font-size: 22rpx;
  color: #999;
}

.step-item.done .step-label,
.step-item.current .step-label {
  color: #FF6B35;
  font-weight: bold;
}

.step-line {
  position: absolute;
  top: 24rpx;
  left: calc(50% + 32rpx);
  right: calc(-50% + 32rpx);
  height: 4rpx;
  background: #eee;
}

.step-line.filled {
  background: #FF6B35;
}

/* 取餐码卡片 */
.pickup-card {
  background: linear-gradient(135deg, #FFF8E1, #FFF3CD);
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  text-align: center;
  border: 2rpx dashed #FF6B35;
}

.pickup-label {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 12rpx;
}

.pickup-code {
  display: block;
  font-size: 72rpx;
  font-weight: bold;
  color: #FF6B35;
  letter-spacing: 12rpx;
  margin-bottom: 8rpx;
}

.pickup-tip {
  font-size: 22rpx;
  color: #999;
}

/* 通用区块 */
.section {
  background: #fff;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

/* 菜品清单 */
.order-item {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.order-item:last-child {
  border-bottom: none;
}

.item-img-placeholder {
  width: 80rpx;
  height: 80rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
}

.item-info {
  flex: 1;
  margin-left: 16rpx;
}

.item-name {
  font-size: 28rpx;
  color: #333;
}

.item-right {
  text-align: right;
}

.item-count {
  font-size: 24rpx;
  color: #999;
  margin-right: 12rpx;
}

.item-price {
  font-size: 28rpx;
  color: #333;
}

/* 金额明细 */
.price-row {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
}

.price-label {
  font-size: 26rpx;
  color: #666;
}

.price-value {
  font-size: 26rpx;
  color: #333;
}

.price-row.total {
  padding-top: 20rpx;
  margin-top: 8rpx;
}

.total-price {
  font-size: 36rpx;
  font-weight: bold;
  color: #FF6B35;
}

/* 订单信息 */
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
}

.info-label {
  font-size: 26rpx;
  color: #999;
}

.info-value {
  font-size: 26rpx;
  color: #333;
}
</style>
