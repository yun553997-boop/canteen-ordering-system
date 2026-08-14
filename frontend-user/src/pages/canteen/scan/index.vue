<template>
  <view class="scan-page">
    <view class="scan-box">
      <text class="scan-icon">📷</text>
      <text class="scan-title">扫码核销</text>
      <text class="scan-tip">扫描用户出示的取餐二维码，自动核销订单</text>
      <button class="scan-btn" @tap="startScan">开始扫码</button>
    </view>

    <!-- H5 降级：手动输入订单号 -->
    <!-- #ifdef H5 -->
    <view class="manual-box">
      <text class="manual-title">H5 端暂不支持摄像头扫码，可手动输入订单号核销</text>
      <input v-model="manualOrderNo" class="manual-input" placeholder="请输入订单号" />
      <button class="manual-btn" @tap="manualVerify">核销</button>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { verifyOrder } from '@/api/admin'

const manualOrderNo = ref('')

async function doVerify(orderNo: string) {
  if (!orderNo) {
    uni.showToast({ title: '未识别到订单号', icon: 'none' })
    return
  }
  try {
    await verifyOrder(orderNo)
    uni.showToast({ title: '核销成功', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 1000)
  } catch {
    // 错误已由 request.ts 拦截器处理
  }
}

function startScan() {
  // #ifdef H5
  uni.showToast({ title: '请使用下方输入框核销', icon: 'none' })
  // #endif
  // #ifndef H5
  uni.scanCode({
    scanType: ['qrCode', 'barCode'],
    success: (res: any) => {
      const orderNo = res.result?.trim()
      doVerify(orderNo)
    },
    fail: () => {
      uni.showToast({ title: '扫码取消', icon: 'none' })
    },
  })
  // #endif
}

function manualVerify() {
  const orderNo = manualOrderNo.value.trim()
  if (!orderNo) {
    uni.showToast({ title: '请输入订单号', icon: 'none' })
    return
  }
  doVerify(orderNo)
  manualOrderNo.value = ''
}
</script>

<style scoped>
.scan-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 40rpx;
}

.scan-box {
  width: 100%;
  background: #fff;
  border-radius: 16rpx;
  padding: 60rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.scan-icon { font-size: 100rpx; margin-bottom: 20rpx; }
.scan-title { font-size: 36rpx; font-weight: bold; color: #333; }
.scan-tip { font-size: 24rpx; color: #999; margin: 16rpx 0 40rpx; text-align: center; }

.scan-btn {
  width: 400rpx; height: 88rpx; line-height: 88rpx;
  background: #FF6B35; color: #fff; font-size: 30rpx; font-weight: bold;
  border: none; border-radius: 44rpx;
}

.manual-box {
  width: 100%;
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.manual-title { font-size: 24rpx; color: #999; margin-bottom: 20rpx; }
.manual-input {
  width: 100%; height: 80rpx; background: #f8f8f8; border-radius: 12rpx;
  padding: 0 20rpx; font-size: 28rpx; box-sizing: border-box; margin-bottom: 24rpx;
}
.manual-btn {
  width: 100%; height: 80rpx; line-height: 80rpx;
  background: #FF6B35; color: #fff; font-size: 28rpx; font-weight: bold;
  border: none; border-radius: 12rpx;
}
</style>
