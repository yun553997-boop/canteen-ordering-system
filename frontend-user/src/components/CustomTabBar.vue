<template>
  <view class="custom-tabbar" :style="{ paddingBottom: safeBottom + 'px' }">
    <view
      v-for="tab in tabs"
      :key="tab.path"
      class="tab-item"
      @tap="switchTab(tab)"
    >
      <text class="tab-icon">{{ tab.icon }}</text>
      <text class="tab-text" :class="{ active: currentPath === tab.path }">{{ tab.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getUserInfo } from '@/utils/storage'

const currentPath = ref('')

// 获取当前页面路径
const pages = getCurrentPages()
if (pages.length > 0) {
  const route = pages[pages.length - 1].route
  currentPath.value = '/' + route
}

// 根据角色决定显示哪些 Tab
const userTabs = [
  { path: '/pages/index/index', label: '点餐', icon: '🍽️' },
  { path: '/pages/order/list', label: '订单', icon: '📋' },
  { path: '/pages/mine/mine', label: '我的', icon: '👤' },
]

const adminTabs = [
  { path: '/pages/canteen/workbench/index', label: '工作台', icon: '📊' },
  { path: '/pages/canteen/dish/index', label: '菜品管理', icon: '🍳' },
  { path: '/pages/mine/mine', label: '我的', icon: '👤' },
]

const role = computed(() => {
  const info = getUserInfo()
  return info?.role || ''
})

const tabs = computed(() => {
  return role.value === 'ADMIN_CANTEEN' ? adminTabs : userTabs
})

// 安全区底部距离
const safeBottom = ref(0)
try {
  const info = uni.getSystemInfoSync()
  safeBottom.value = info.safeAreaInsets?.bottom || 0
} catch { /* ignore */ }

function switchTab(tab: { path: string }) {
  uni.reLaunch({ url: tab.path })
}
</script>

<style scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
}

.tab-icon {
  font-size: 36rpx;
  margin-bottom: 4rpx;
}

.tab-text {
  font-size: 22rpx;
  color: #999;
}

.tab-text.active {
  color: #FF6B35;
  font-weight: bold;
}
</style>
