<template>
  <view class="order-list-container">
    <view v-if="orders.length === 0" class="empty-tip">
      <text class="empty-icon">📋</text>
      <text class="empty-text">暂无订单</text>
      <text class="empty-sub">快去点餐吧～</text>
    </view>

    <view
      v-for="item in orders"
      :key="item.orderNo"
      class="order-card"
      @tap="goDetail(item.orderNo)"
    >
      <view class="order-header">
        <text class="order-no"># {{ item.orderNo.slice(-8) }}</text>
        <view class="order-status" :class="statusClass(item.status)">
          {{ statusLabel(item.status) }}
        </view>
      </view>
      <view class="order-body">
        <view class="order-meta">
          <text class="meta-label">餐次</text>
          <text class="meta-value">{{ mealLabel(item.mealType) }}</text>
        </view>
        <view class="order-meta">
          <text class="meta-label">金额</text>
          <text class="meta-value price">¥{{ (item.totalAmount * 1).toFixed(2) }}</text>
        </view>
        <view class="order-meta">
          <text class="meta-label">时间</text>
          <text class="meta-value">{{ item.createTime }}</text>
        </view>
      </view>
      <view class="order-footer">
        <text class="arrow">查看详情 →</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { getOrderList } from '@/api/user'
import type { OrderSummary } from '@/api/user'

const orders = ref<OrderSummary[]>([])

const mealLabelMap: Record<string, string> = {
  BREAKFAST: '早餐',
  LUNCH: '午餐',
  DINNER: '晚餐',
}
const mealLabel = (val: string) => mealLabelMap[val] || val

const statusLabel = (val: string) => {
  const map: Record<string, string> = {
    PENDING: '待确认',
    PREPARING: '制作中',
    READY: '待取餐',
    COMPLETED: '已完成',
    CANCELLED: '已取消',
  }
  return map[val] || val
}

const statusClass = (val: string) => {
  const map: Record<string, string> = {
    PENDING: 'status-pending',
    PREPARING: 'status-preparing',
    READY: 'status-ready',
    COMPLETED: 'status-done',
  }
  return map[val] || ''
}

async function fetchOrders() {
  try {
    const data = await getOrderList()
    orders.value = data || []
  } catch {
    orders.value = []
  }
}

function goDetail(orderNo: string) {
  uni.navigateTo({ url: '/pages/order/detail?orderNo=' + orderNo })
}

onShow(() => {
  fetchOrders()
})

onPullDownRefresh(async () => {
  await fetchOrders()
  uni.stopPullDownRefresh()
})
</script>

<style scoped>
.order-list-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.empty-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 0;
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 30rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.empty-sub {
  font-size: 24rpx;
  color: #ccc;
}

.order-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.order-no {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.order-status {
  font-size: 24rpx;
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
  font-weight: bold;
}

.status-pending {
  background: #FFF3E0;
  color: #E65100;
}

.status-preparing {
  background: #E3F2FD;
  color: #1565C0;
}

.status-ready {
  background: #E8F5E9;
  color: #2E7D32;
}

.status-done {
  background: #EEEEEE;
  color: #666;
}

.order-body {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.order-meta {
  display: flex;
  justify-content: space-between;
}

.meta-label {
  font-size: 24rpx;
  color: #999;
}

.meta-value {
  font-size: 26rpx;
  color: #333;
}

.meta-value.price {
  font-weight: bold;
  color: #FF6B35;
}

.order-footer {
  text-align: right;
  margin-top: 12rpx;
  padding-top: 12rpx;
  border-top: 1rpx solid #f5f5f5;
}

.arrow {
  font-size: 24rpx;
  color: #FF6B35;
}
</style>
