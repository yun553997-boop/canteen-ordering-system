<template>
  <view class="notif-container">
    <!-- 顶部操作栏 -->
    <view class="notif-toolbar" v-if="list.length > 0">
      <text class="toolbar-title">消息通知</text>
      <text class="toolbar-action" @tap="handleMarkAll">全部已读</text>
    </view>

    <!-- 通知列表 -->
    <scroll-view
      class="notif-list"
      scroll-y
      :style="{ height: '100vh' }"
    >
      <view
        v-for="item in list"
        :key="item.id"
        class="notif-item"
        :class="{ unread: item.isRead === 0 }"
        @tap="handleItemClick(item)"
      >
        <view class="notif-left">
          <view v-if="item.isRead === 0" class="unread-dot" />
          <view v-else class="read-dot" />
        </view>
        <view class="notif-body">
          <view class="notif-top">
            <text class="notif-title">{{ item.title }}</text>
            <text class="notif-time">{{ formatTime(item.createTime) }}</text>
          </view>
          <text class="notif-content">{{ item.content }}</text>
        </view>
      </view>

      <!-- 空态 -->
      <view v-if="list.length === 0 && !loading" class="empty-tip">
        <text class="empty-icon">📭</text>
        <text class="empty-text">暂无通知</text>
      </view>

      <!-- 加载更多 -->
      <view v-if="hasMore && list.length > 0" class="load-more" @tap="loadMore">
        <text class="load-text">加载更多</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import {
  getNotifications,
  markRead,
  markAllRead,
  type NotificationItem,
} from '@/api/notification'

const list = ref<NotificationItem[]>([])
const loading = ref(false)
const currentPage = ref(1)
const hasMore = ref(true)
const pageSize = 20

function formatTime(time: string) {
  if (!time) return ''
  return time.replace('T', ' ').substring(0, 16)
}

async function fetchData(reset: boolean = false) {
  if (loading.value) return
  loading.value = true

  if (reset) {
    currentPage.value = 1
    hasMore.value = true
  }

  try {
    const data = await getNotifications(currentPage.value, pageSize)
    const records = data.records || []
    if (reset) {
      list.value = records
    } else {
      list.value = [...list.value, ...records]
    }
    hasMore.value = records.length >= pageSize
  } catch {
    // ignore
  } finally {
    loading.value = false
  }
}

async function handleItemClick(item: NotificationItem) {
  if (item.isRead === 0) {
    try {
      await markRead(item.id)
      item.isRead = 1
    } catch {
      // ignore
    }
  }
}

async function handleMarkAll() {
  try {
    await markAllRead()
    list.value.forEach((item) => {
      item.isRead = 1
    })
    uni.showToast({ title: '已全部标记为已读', icon: 'success' })
  } catch {
    // ignore
  }
}

async function loadMore() {
  if (!hasMore.value || loading.value) return
  currentPage.value++
  await fetchData()
}

onShow(() => {
  fetchData(true)
})

onPullDownRefresh(async () => {
  await fetchData(true)
  uni.stopPullDownRefresh()
})
</script>

<style scoped>
.notif-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.notif-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}

.toolbar-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.toolbar-action {
  font-size: 26rpx;
  color: #FF6B35;
}

.notif-list {
  padding-top: 0;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  background: #fff;
  padding: 24rpx 30rpx;
  gap: 16rpx;
}

.notif-item.unread {
  background: #FFF9F5;
}

.notif-left {
  padding-top: 6rpx;
}

.unread-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #FF3B30;
}

.read-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: transparent;
}

.notif-body {
  flex: 1;
}

.notif-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8rpx;
}

.notif-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.notif-time {
  font-size: 22rpx;
  color: #ccc;
}

.notif-content {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

/* 空态 */
.empty-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200rpx 0;
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

/* 加载更多 */
.load-more {
  text-align: center;
  padding: 24rpx;
}

.load-text {
  font-size: 26rpx;
  color: #999;
}
</style>
