<template>
  <view class="wallet-container">
    <!-- 余额卡片 -->
    <view class="balance-card">
      <text class="balance-label">钱包余额（元）</text>
      <text class="balance-value">¥{{ (balance / 100).toFixed(2) }}</text>
    </view>

    <!-- 充值 -->
    <view class="section-card">
      <text class="section-title">充值金额</text>
      <view class="amount-grid">
        <view
          v-for="a in AMOUNTS"
          :key="a"
          class="amount-item"
          :class="{ active: selectedAmount === a }"
          @tap="selectedAmount = a"
        >
          <text class="amount-num">{{ a }}</text>
          <text class="amount-unit">元</text>
        </view>
      </view>
      <button class="recharge-btn" @tap="openRecharge">立即充值</button>
    </view>

    <!-- 申请退款（占位） -->
    <view class="section-card">
      <button class="refund-btn" @tap="applyRefund">申请退款</button>
    </view>

    <!-- 支付方式底部弹层 -->
    <view v-if="showPaySheet" class="pay-mask" @tap="showPaySheet = false">
      <view class="pay-sheet" @tap.stop>
        <text class="pay-title">选择支付方式</text>
        <view class="pay-option" @tap="choosePay">
          <text class="pay-icon">💚</text>
          <text class="pay-name">微信支付</text>
        </view>
        <view class="pay-option" @tap="choosePay">
          <text class="pay-icon">💙</text>
          <text class="pay-name">支付宝</text>
        </view>
        <button class="pay-cancel" @tap="showPaySheet = false">取消</button>
      </view>
    </view>

    <!-- 申请退款底部弹层 -->
    <view v-if="showRefundSheet" class="pay-mask" @tap="showRefundSheet = false">
      <view class="pay-sheet" @tap.stop>
        <text class="pay-title">申请退款</text>
        <view class="refund-row">
          <text class="refund-label">退款金额</text>
          <input v-model="refundAmount" class="refund-input" type="digit" placeholder="请输入退款金额" />
          <text class="refund-unit">元</text>
        </view>
        <text class="refund-channel-label">退款到</text>
        <view class="channel-row">
          <view class="channel-option" :class="{ active: refundChannel === 'WECHAT' }" @tap="refundChannel = 'WECHAT'">
            <text class="channel-icon">💚</text>
            <text class="channel-name">微信</text>
          </view>
          <view class="channel-option" :class="{ active: refundChannel === 'ALIPAY' }" @tap="refundChannel = 'ALIPAY'">
            <text class="channel-icon">💙</text>
            <text class="channel-name">支付宝</text>
          </view>
        </view>
        <button class="recharge-btn" @tap="confirmRefund">确认退款</button>
        <button class="pay-cancel" @tap="showRefundSheet = false">取消</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getWalletBalance, rechargeWallet, withdrawWallet } from '@/api/wallet'

const AMOUNTS = [50, 100, 200, 500]

const balance = ref(0)
const selectedAmount = ref<number | null>(null)
const showPaySheet = ref(false)
const showRefundSheet = ref(false)
const refundAmount = ref('')
const refundChannel = ref<'WECHAT' | 'ALIPAY' | null>(null)

async function loadBalance() {
  try {
    const data = await getWalletBalance()
    balance.value = data.balance ?? 0
  } catch {
    // 错误已由拦截器处理
  }
}

function openRecharge() {
  if (selectedAmount.value === null) {
    uni.showToast({ title: '请先选择充值金额', icon: 'none' })
    return
  }
  showPaySheet.value = true
}

function choosePay() {
  showPaySheet.value = false
  doRecharge()
}

function doRecharge() {
  const amount = selectedAmount.value as number
  uni.showLoading({ title: '支付加载中...', mask: true })
  setTimeout(async () => {
    try {
      const data = await rechargeWallet(amount * 100)
      balance.value = data.balance ?? balance.value + amount * 100
      uni.showToast({ title: '充值成功', icon: 'success' })
    } catch {
      // 错误已由拦截器处理
    } finally {
      uni.hideLoading()
    }
  }, 1500)
}

function applyRefund() {
  showRefundSheet.value = true
}

async function confirmRefund() {
  const amount = parseFloat(refundAmount.value)
  if (!amount || amount <= 0) {
    uni.showToast({ title: '请输入退款金额', icon: 'none' })
    return
  }
  if (!refundChannel.value) {
    uni.showToast({ title: '请选择退款方式', icon: 'none' })
    return
  }
  uni.showLoading({ title: '退款处理中...', mask: true })
  try {
    const data = await withdrawWallet(Math.round(amount * 100), refundChannel.value)
    balance.value = data.balance ?? 0
    uni.showToast({ title: '退款成功', icon: 'success' })
    showRefundSheet.value = false
    refundAmount.value = ''
    refundChannel.value = null
  } catch {
    // 错误已由拦截器处理
  } finally {
    uni.hideLoading()
  }
}

onShow(() => {
  loadBalance()
})
</script>

<style scoped>
.wallet-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 40rpx;
}

/* 余额卡片 */
.balance-card {
  margin: 20rpx;
  padding: 48rpx 40rpx;
  background: linear-gradient(135deg, #FF6B35, #FF8F60);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.balance-label {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
}

.balance-value {
  font-size: 64rpx;
  font-weight: bold;
  color: #fff;
}

/* 充值区 */
.section-card {
  margin: 0 20rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  padding: 32rpx;
}

.section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  display: block;
  margin-bottom: 24rpx;
}

.amount-grid {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.amount-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
  background: #f5f5f5;
  border-radius: 12rpx;
  border: 2rpx solid transparent;
}

.amount-item.active {
  background: #fff5f0;
  border-color: #FF6B35;
}

.amount-num {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

.amount-item.active .amount-num {
  color: #FF6B35;
}

.amount-unit {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.recharge-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #FF6B35;
  color: #fff;
  font-size: 30rpx;
  border-radius: 12rpx;
}

.refund-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #fff;
  color: #FF3B30;
  font-size: 30rpx;
  border: 2rpx solid #FF3B30;
  border-radius: 12rpx;
}

/* 支付方式底部弹层 */
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
  font-size: 32rpx;
  font-weight: bold;
  display: block;
  text-align: center;
  margin-bottom: 24rpx;
}

.pay-option {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 28rpx 16rpx;
  border-bottom: 2rpx solid #f5f5f5;
}

.pay-icon {
  font-size: 44rpx;
}

.pay-name {
  font-size: 30rpx;
  color: #333;
}

.pay-cancel {
  width: 100%;
  height: 84rpx;
  line-height: 84rpx;
  margin-top: 24rpx;
  background: #f5f5f5;
  color: #666;
  font-size: 28rpx;
  border-radius: 12rpx;
}

/* 申请退款弹层 */
.refund-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 24rpx;
}

.refund-label {
  font-size: 28rpx;
  color: #333;
}

.refund-input {
  flex: 1;
  height: 80rpx;
  background: #f5f5f5;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.refund-unit {
  font-size: 28rpx;
  color: #666;
}

.refund-channel-label {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin-bottom: 16rpx;
}

.channel-row {
  display: flex;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.channel-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 20rpx 0;
  background: #f5f5f5;
  border-radius: 12rpx;
  border: 2rpx solid transparent;
}

.channel-option.active {
  background: #fff5f0;
  border-color: #FF6B35;
}

.channel-icon {
  font-size: 44rpx;
}

.channel-name {
  font-size: 26rpx;
  color: #333;
}
</style>
