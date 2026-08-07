<template>
  <view class="order-container">
    <!-- 订单状态 -->
    <view class="status-card">
      <view class="status-icon">
        <text v-if="order.status === 'pending'" class="icon-text">⏳</text>
        <text v-else-if="order.status === 'cooking'" class="icon-text">👨‍🍳</text>
        <text v-else-if="order.status === 'done'" class="icon-text">✅</text>
        <text v-else class="icon-text">📦</text>
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

    <!-- 取餐码 -->
    <view class="pickup-card" v-if="order.pickupCode">
      <text class="pickup-label">取餐码</text>
      <text class="pickup-code">{{ order.pickupCode }}</text>
      <text class="pickup-tip">请在取餐窗口出示此码</text>
    </view>

    <!-- 菜品清单 -->
    <view class="section">
      <text class="section-title">菜品清单</text>
      <view v-for="item in order.items" :key="item.id" class="order-item">
        <image class="item-img" :src="item.image" mode="aspectFill" />
        <view class="item-info">
          <text class="item-name">{{ item.name }}</text>
        </view>
        <view class="item-right">
          <text class="item-count">×{{ item.count }}</text>
          <text class="item-price">¥{{ (item.price * item.count).toFixed(2) }}</text>
        </view>
      </view>
    </view>

    <!-- 金额汇总 -->
    <view class="section">
      <text class="section-title">金额明细</text>
      <view class="price-row">
        <text class="price-label">商品合计</text>
        <text class="price-value">¥{{ order.subtotal.toFixed(2) }}</text>
      </view>
      <view class="price-row">
        <text class="price-label">配送费</text>
        <text class="price-value">¥{{ order.deliveryFee.toFixed(2) }}</text>
      </view>
      <view class="price-row total">
        <text class="price-label">实付金额</text>
        <text class="price-value total-price">¥{{ order.total.toFixed(2) }}</text>
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
        <text class="info-label">取餐地点</text>
        <text class="info-value">{{ order.pickupLocation }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface OrderItem {
  id: number
  name: string
  image: string
  price: number
  count: number
}

interface Order {
  orderNo: string
  status: 'pending' | 'cooking' | 'done' | 'picked'
  createTime: string
  pickupCode: string
  pickupLocation: string
  subtotal: number
  deliveryFee: number
  total: number
  items: OrderItem[]
}

// 模拟订单数据
const order = reactive<Order>({
  orderNo: '202408060001',
  status: 'cooking',
  createTime: '2024-08-06 12:30',
  pickupCode: 'A088',
  pickupLocation: '一楼食堂 3号窗口',
  subtotal: 50.00,
  deliveryFee: 0.00,
  total: 50.00,
  items: [
    { id: 1, name: '红烧肉', image: '', price: 18.00, count: 1 },
    { id: 2, name: '宫保鸡丁', image: '', price: 15.00, count: 1 },
    { id: 3, name: '凉拌黄瓜', image: '', price: 6.00, count: 1 },
    { id: 4, name: '米饭', image: '', price: 2.00, count: 2 },
    { id: 5, name: '番茄蛋汤', image: '', price: 5.00, count: 1 }
  ]
})

const steps = [
  { label: '已下单', done: true, current: false },
  { label: '制作中', done: true, current: true },
  { label: '已完成', done: false, current: false },
  { label: '已取餐', done: false, current: false }
]

const statusText = computed(() => {
  const map: Record<string, string> = {
    pending: '等待制作',
    cooking: '制作中',
    done: '制作完成',
    picked: '已取餐'
  }
  return map[order.status] || '未知'
})

const statusDesc = computed(() => {
  const map: Record<string, string> = {
    pending: '您的订单已提交，请耐心等待',
    cooking: '厨师正在为您精心制作',
    done: '请前往取餐窗口取餐',
    picked: '感谢您的光临'
  }
  return map[order.status] || ''
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

.item-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 8rpx;
  background: #eee;
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
  border-top: 1rpx solid #eee;
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
