<template>
  <view class="mine-container">
    <!-- 顶部信息区 -->
    <view class="profile-header">
      <view class="header-left">
        <view class="avatar-text">
          <text class="avatar-letter">{{ avatarLetter }}</text>
        </view>
        <view class="user-info">
          <view class="name-row">
            <text class="username">{{ username }}</text>
            <text v-if="role === 'ADMIN_CANTEEN'" class="role-tag">食堂管理员</text>
          </view>
          <text class="phone">{{ maskedPhone }}</text>
        </view>
      </view>
      <view class="header-right">
        <view class="icon-btn" @tap="goNotifications">
          <text class="icon-text">🔔</text>
          <view v-if="unreadCount > 0" class="badge">
            <text class="badge-text">{{ unreadCount > 99 ? '99+' : unreadCount }}</text>
          </view>
        </view>
        <view class="icon-btn">
          <text class="icon-text">⚙</text>
        </view>
      </view>
    </view>

    <!-- 中间待开发区 -->
    <view class="placeholder-area">
      <view class="placeholder-card">
        <text class="placeholder-icon">🏗️</text>
        <text class="placeholder-text">会员信息 / 更多功能</text>
        <text class="placeholder-sub">敬请期待</text>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-area">
      <button class="logout-btn" @tap="handleLogout">退出登录</button>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getToken, getUserInfo, removeToken, removeUserInfo, setUserInfo, type UserInfo } from '@/utils/storage'
import { getUnreadCount } from '@/api/notification'
import { getCurrentUser } from '@/api/auth'
import CustomTabBar from '@/components/CustomTabBar.vue'

const username = ref('未登录')
const phone = ref('')
const role = ref('')
const unreadCount = ref(0)

const avatarLetter = computed(() => {
  return username.value ? username.value.charAt(0).toUpperCase() : 'U'
})

const maskedPhone = computed(() => {
  const p = phone.value
  if (p && p.length === 11) {
    return p.substring(0, 3) + '****' + p.substring(7)
  }
  return p || ''
})

/** 加载用户信息：优先缓存，其次请求 /auth/me */
async function loadUserInfo() {
  const token = getToken()
  if (!token) return

  // 尝试从缓存读取
  const cached = getUserInfo()
  if (cached) {
    username.value = cached.username
    phone.value = cached.phone || ''
    role.value = cached.role || ''
  }

  // 异步请求最新信息
  try {
    const data = await getCurrentUser()
    if (data) {
      username.value = data.username
      phone.value = data.phone || ''
      role.value = data.role || ''
      setUserInfo(data as UserInfo)
    }
  } catch {
    // 网络失败则用缓存值
  }
}

/** 加载未读通知数 */
async function loadUnread() {
  const token = getToken()
  if (!token) return
  try {
    const data = await getUnreadCount()
    unreadCount.value = data.count || 0
  } catch {
    // ignore
  }
}

function goNotifications() {
  uni.navigateTo({ url: '/pages/notification/list' })
}

function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        removeToken()
        removeUserInfo()
        unreadCount.value = 0
        username.value = '未登录'
        uni.reLaunch({ url: '/pages/login/login' })
      }
    },
  })
}

onShow(() => {
  loadUserInfo()
  loadUnread()
})
</script>

<style scoped>
.mine-container {
  min-height: 100vh;
  background: #f5f5f5;
}

/* 顶部信息区 */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #FF6B35, #FF8F60);
  padding: 40rpx 30rpx;
  padding-top: calc(40rpx + var(--status-bar-height, 0px));
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.avatar-text {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-letter {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.role-tag {
  font-size: 20rpx;
  background: rgba(255,255,255,0.3);
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
}

.username {
  font-size: 34rpx;
  font-weight: bold;
  color: #fff;
}

.phone {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4rpx;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
}

.icon-text {
  font-size: 40rpx;
}

.badge {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  min-width: 32rpx;
  height: 32rpx;
  background: #FF3B30;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6rpx;
}

.badge-text {
  font-size: 20rpx;
  color: #fff;
  font-weight: bold;
}

/* 中间待开发区 */
.placeholder-area {
  padding: 40rpx 30rpx;
}

.placeholder-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 80rpx 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.placeholder-icon {
  font-size: 60rpx;
}

.placeholder-text {
  font-size: 28rpx;
  color: #999;
}

.placeholder-sub {
  font-size: 24rpx;
  color: #ccc;
}

/* 退出登录 */
.logout-area {
  padding: 40rpx 30rpx;
}

.logout-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #fff;
  color: #FF3B30;
  font-size: 30rpx;
  border: 2rpx solid #FF3B30;
  border-radius: 12rpx;
}
</style>
