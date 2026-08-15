<template>
  <view class="workbench">
    <!-- 统计卡片 -->
    <view class="stats-row">
      <view class="stat-card">
        <text class="stat-num">{{ stats.totalOrders }}</text>
        <text class="stat-label">今日订单</text>
      </view>
      <view class="stat-card pending">
        <text class="stat-num">{{ stats.pendingPickup }}</text>
        <text class="stat-label">待取餐</text>
      </view>
      <view class="stat-card done">
        <text class="stat-num">{{ stats.completed }}</text>
        <text class="stat-label">已完成</text>
      </view>
    </view>

    <!-- 功能入口图标行 -->
    <view class="func-row">
      <view class="func-item" @tap="scanVerify">
        <text class="func-icon">📷</text>
        <text class="func-label">扫码核销</text>
      </view>
      <view class="func-item" @tap="openManualVerify">
        <text class="func-icon">⌨️</text>
        <text class="func-label">输码核销</text>
      </view>
      <view class="func-item" @tap="placeholder('核销明细')">
        <text class="func-icon">📋</text>
        <text class="func-label">核销明细</text>
      </view>
      <view class="func-item" @tap="placeholder('售卖明细')">
        <text class="func-icon">📊</text>
        <text class="func-label">售卖明细</text>
      </view>
    </view>

    <!-- 订单状态 Tab -->
    <view class="order-tabs">
      <view
        v-for="tab in orderTabs"
        :key="tab.value"
        class="order-tab"
        :class="{ active: statusFilter === tab.value }"
        @tap="statusFilter = tab.value; page = 1; fetchOrders()"
      >
        {{ tab.label }}
      </view>
    </view>

    <!-- 订单列表 -->
    <scroll-view class="order-list" scroll-y @scrolltolower="loadMore">
      <view v-for="order in orders" :key="order.orderNo" class="order-card">
        <view class="order-header">
          <text class="order-no">#{{ order.orderNo.slice(-8) }}</text>
          <view class="order-header-right">
            <text class="order-status" :style="{ color: statusColor(order.status) }">
              {{ statusLabel(order.status) }}
            </text>
            <text class="expand-icon" @tap="goOrderDetail(order)">⤢</text>
          </view>
        </view>
        <view class="order-body">
          <text class="order-meal">{{ mealLabel(order.mealType) }}</text>
          <text class="order-amount">¥{{ ((order.totalAmount || 0) / 100).toFixed(2) }}</text>
        </view>
        <view class="order-actions">
          <button
            v-if="order.status === 'PENDING'"
            class="action-btn primary"
            size="mini"
            @tap="startPrepare(order)"
          >
            开始备餐
          </button>
          <button
            v-if="order.status === 'PREPARING'"
            class="action-btn success"
            size="mini"
            @tap="finishPrepare(order)"
          >
            备餐完成
          </button>
          <text v-if="order.status === 'READY'" class="verify-hint">
            待核销 · {{ order.verifyCode }}
          </text>
        </view>
      </view>
      <view v-if="orders.length === 0" class="empty-tip">暂无订单</view>
    </scroll-view>

    <!-- 输码核销弹窗 -->
    <view v-if="showManualVerify" class="modal-mask" @tap="showManualVerify = false">
      <view class="modal-box" @tap.stop>
        <text class="modal-title">输码核销</text>
        <input
          v-model="manualOrderNo"
          class="modal-input"
          placeholder="请输入订单号"
        />
        <view class="modal-btns">
          <button class="modal-btn cancel" size="mini" @tap="showManualVerify = false">取消</button>
          <button class="modal-btn confirm" size="mini" @tap="doManualVerify">确认核销</button>
        </view>
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getStatisticsOverview, getOrderList, updateOrderStatus, verifyOrder } from '@/api/admin'
import type { OrderInfo } from '@/api/admin'
import { getUserInfo } from '@/utils/storage'
import CustomTabBar from '@/components/CustomTabBar.vue'

// 统计
const stats = reactive({ totalOrders: 0, pendingPickup: 0, completed: 0 })

// 订单
const orderTabs = [
  { label: '待处理', value: 'PENDING' },
  { label: '备餐中', value: 'PREPARING' },
  { label: '待取餐', value: 'READY' },
]
const statusFilter = ref('PENDING')
const orders = ref<OrderInfo[]>([])
const page = ref(1)
const pageSize = 10
const hasMore = ref(true)

// 核销
const showManualVerify = ref(false)
const manualOrderNo = ref('')

// 状态映射
const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING: { label: '待处理', color: '#E6A23C' },
  PREPARING: { label: '备餐中', color: '#409EFF' },
  READY: { label: '待取餐', color: '#67C23A' },
  COMPLETED: { label: '已完成', color: '#909399' },
  CANCELLED: { label: '已取消', color: '#F56C6C' },
}
const MEAL_MAP: Record<string, string> = {
  BREAKFAST: '早餐', LUNCH: '午餐', DINNER: '晚餐',
}

function statusLabel(s: string) { return STATUS_MAP[s]?.label || s }
function statusColor(s: string) { return STATUS_MAP[s]?.color || '#999' }
function mealLabel(m?: string) { return MEAL_MAP[m || ''] || m || '' }

// 角色校验
onMounted(() => {
  const info = getUserInfo()
  if (info?.role !== 'ADMIN_CANTEEN') {
    uni.showToast({ title: '无权限访问', icon: 'none' })
    setTimeout(() => uni.reLaunch({ url: '/pages/index/index' }), 800)
    return
  }
  fetchStats()
  fetchOrders()
})

async function fetchStats() {
  try {
    const data = await getStatisticsOverview({ period: 'today' })
    if (data?.cards) {
      stats.totalOrders = data.cards.totalOrders || 0
      stats.pendingPickup = data.cards.pendingPickup || 0
      stats.completed = data.cards.completed || 0
    }
  } catch { /* ignore */ }
}

async function fetchOrders() {
  try {
    const data = await getOrderList({ page: page.value, pageSize, status: statusFilter.value || undefined })
    const records = data?.records || []
    if (page.value === 1) {
      orders.value = records
    } else {
      orders.value = [...orders.value, ...records]
    }
    hasMore.value = records.length >= pageSize
  } catch { orders.value = [] }
}

function loadMore() {
  if (!hasMore.value) return
  page.value++
  fetchOrders()
}

async function startPrepare(order: OrderInfo) {
  try {
    await updateOrderStatus(order.orderNo, 'PREPARING')
    uni.showToast({ title: '已开始备餐', icon: 'success' })
    page.value = 1
    fetchOrders()
  } catch { /* ignore */ }
}

async function finishPrepare(order: OrderInfo) {
  try {
    await updateOrderStatus(order.orderNo, 'READY')
    uni.showToast({ title: '备餐完成', icon: 'success' })
    page.value = 1
    fetchOrders()
  } catch { /* ignore */ }
}

function scanVerify() {
  uni.navigateTo({ url: '/pages/canteen/scan/index' })
}

function openManualVerify() {
  showManualVerify.value = true
}

function goOrderDetail(order: OrderInfo) {
  placeholder('订单详情')
}

function placeholder(name: string) {
  uni.showToast({ title: `${name}（开发中）`, icon: 'none' })
}

async function doManualVerify() {
  if (!manualOrderNo.value.trim()) {
    uni.showToast({ title: '请输入订单号', icon: 'none' })
    return
  }
  await doVerify(manualOrderNo.value.trim())
  showManualVerify.value = false
  manualOrderNo.value = ''
}

async function doVerify(orderNo: string) {
  try {
    await verifyOrder(orderNo)
    uni.showToast({ title: '核销成功', icon: 'success' })
    page.value = 1
    fetchOrders()
    fetchStats()
  } catch { /* ignore */ }
}
</script>

<style scoped>
.workbench { min-height: 100vh; background: #f5f5f5; padding-bottom: 120rpx; }

.stats-row { display: flex; gap: 16rpx; padding: 20rpx; }
.stat-card {
  flex: 1; background: #fff; border-radius: 12rpx; padding: 24rpx;
  text-align: center; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.stat-num { font-size: 40rpx; font-weight: bold; color: #FF6B35; display: block; }
.stat-label { font-size: 24rpx; color: #999; margin-top: 4rpx; }
.stat-card.pending .stat-num { color: #E6A23C; }
.stat-card.done .stat-num { color: #67C23A; }

.func-row {
  display: flex; margin: 20rpx; padding: 24rpx 8rpx;
  background: #fff; border-radius: 12rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.func-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8rpx; }
.func-icon { font-size: 44rpx; }
.func-label { font-size: 24rpx; color: #666; }

.order-tabs { display: flex; padding: 0 20rpx; gap: 12rpx; margin-bottom: 16rpx; }
.order-tab {
  padding: 12rpx 24rpx; font-size: 26rpx; color: #666;
  background: #fff; border-radius: 8rpx;
}
.order-tab.active { background: #FF6B35; color: #fff; font-weight: bold; }

.order-list { padding: 0 20rpx; }
.order-card {
  background: #fff; border-radius: 12rpx; padding: 24rpx;
  margin-bottom: 16rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12rpx; }
.order-no { font-size: 26rpx; color: #999; }
.order-header-right { display: flex; align-items: center; gap: 12rpx; }
.order-status { font-size: 26rpx; font-weight: bold; }
.expand-icon { font-size: 36rpx; color: #999; padding: 0 4rpx; }
.order-body { display: flex; justify-content: space-between; margin-bottom: 16rpx; }
.order-meal { font-size: 28rpx; color: #333; }
.order-amount { font-size: 32rpx; font-weight: bold; color: #FF6B35; }

.order-actions { display: flex; align-items: center; gap: 16rpx; }
.action-btn { font-size: 24rpx; border: none; border-radius: 8rpx; padding: 8rpx 20rpx; }
.action-btn.primary { background: #409EFF; color: #fff; }
.action-btn.success { background: #67C23A; color: #fff; }
.action-btn.warning { background: #E6A23C; color: #fff; }
.verify-hint { font-size: 24rpx; color: #999; }

.empty-tip { text-align: center; color: #999; padding: 100rpx 0; }

/* 手动核销弹窗 */
.modal-mask {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.modal-box { background: #fff; border-radius: 16rpx; padding: 40rpx; width: 560rpx; }
.modal-title { font-size: 32rpx; font-weight: bold; display: block; margin-bottom: 20rpx; }
.modal-input {
  width: 100%; height: 80rpx; background: #f5f5f5; border-radius: 12rpx;
  padding: 0 20rpx; font-size: 28rpx; box-sizing: border-box; margin-bottom: 24rpx;
}
.modal-btns { display: flex; gap: 20rpx; justify-content: flex-end; }
.modal-btn { font-size: 26rpx; border: none; border-radius: 8rpx; padding: 12rpx 28rpx; }
.modal-btn.cancel { background: #f5f5f5; color: #666; }
.modal-btn.confirm { background: #FF6B35; color: #fff; }
</style>
