<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="app-name">食堂订餐</text>
    </view>

    <!-- 角色切换 Tab -->
    <view class="role-tabs">
      <view
        class="role-tab"
        :class="{ active: loginRole === 'user' }"
        @tap="loginRole = 'user'"
      >
        普通用户
      </view>
      <view
        class="role-tab"
        :class="{ active: loginRole === 'admin' }"
        @tap="loginRole = 'admin'"
      >
        食堂管理员
      </view>
    </view>

    <!-- 普通用户：手机号 + 验证码登录 -->
    <view v-if="loginRole === 'user'" class="form-box">
      <view class="input-group">
        <text class="input-label">手机号</text>
        <input
          v-model="smsForm.phone"
          class="input-field"
          type="number"
          placeholder="请输入手机号"
          maxlength="11"
        />
      </view>
      <view class="input-group">
        <text class="input-label">验证码</text>
        <view class="code-row">
          <input
            v-model="smsForm.code"
            class="input-field code-input"
            type="number"
            placeholder="请输入验证码"
            maxlength="6"
          />
          <button
            class="code-btn"
            :disabled="codeCountdown > 0"
            size="mini"
            @tap="sendCode"
          >
            {{ codeCountdown > 0 ? codeCountdown + 's' : '获取验证码' }}
          </button>
        </view>
      </view>
      <button class="submit-btn" @tap="handleSmsLogin">登 录</button>
    </view>

    <!-- 食堂管理员：用户名/手机号 + 密码登录 -->
    <view v-else class="form-box">
      <view class="input-group">
        <text class="input-label">用户名 / 手机号</text>
        <input
          v-model="adminForm.username"
          class="input-field"
          type="text"
          placeholder="请输入用户名或手机号"
        />
      </view>
      <view class="input-group">
        <text class="input-label">密码</text>
        <input
          v-model="adminForm.password"
          class="input-field"
          type="text"
          placeholder="请输入密码"
          password
        />
      </view>
      <button class="submit-btn" @tap="handleAdminLogin">登 录</button>
    </view>

    <view class="agreement-text">
      登录即表示同意《用户协议》和《隐私政策》
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { sendSms, loginByMobile, loginByAdmin } from '@/api/auth'
import { getToken, setToken, setUserInfo } from '@/utils/storage'

const loginRole = ref<'user' | 'admin'>('user')
const codeCountdown = ref(0)

const smsForm = reactive({ phone: '', code: '' })
const adminForm = reactive({ username: '', password: '' })

let countdownTimer: ReturnType<typeof setInterval> | null = null

// ========== 发送验证码 ==========

async function sendCode() {
  const phone = smsForm.phone
  if (!phone || phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  try {
    await sendSms(phone)
    uni.showToast({ title: '验证码已发送', icon: 'success' })
    codeCountdown.value = 60
    countdownTimer = setInterval(() => {
      codeCountdown.value--
      if (codeCountdown.value <= 0 && countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }, 1000)
  } catch { /* 错误已由拦截器处理 */ }
}

// ========== 普通用户登录 ==========

async function handleSmsLogin() {
  if (!smsForm.phone || !smsForm.code) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (smsForm.phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  try {
    const result = await loginByMobile(smsForm.phone, smsForm.code)
    onLoginSuccess(result.token, result.role, result.username, result.userId)
  } catch { /* 错误已由拦截器处理 */ }
}

// ========== 管理员登录 ==========

async function handleAdminLogin() {
  if (!adminForm.username || !adminForm.password) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  try {
    const result = await loginByAdmin(adminForm.username, adminForm.password)
    onLoginSuccess(result.token, result.role, result.username, result.userId)
  } catch { /* 错误已由拦截器处理 */ }
}

// ========== 登录成功统一处理 ==========

function onLoginSuccess(token: string, role: string, username: string, userId: number) {
  setToken(token)
  setUserInfo({ userId, username, phone: '', role })

  // 重连 WebSocket
  reconnectWs(token)

  uni.showToast({ title: '登录成功', icon: 'success' })

  // 根据角色跳转不同首页
  setTimeout(() => {
    if (role === 'ADMIN_CANTEEN') {
      uni.reLaunch({ url: '/pages/canteen/workbench/index' })
    } else if (role === 'ADMIN_SYSTEM') {
      uni.showToast({ title: '系统管理员请使用PC端管理后台', icon: 'none', duration: 3000 })
      setToken('')
    } else {
      uni.reLaunch({ url: '/pages/index/index' })
    }
  }, 500)
}

function reconnectWs(token: string) {
  uni.closeSocket({
    success() { connectWs(token) },
    fail() { connectWs(token) },
  })
}

function connectWs(token: string) {
  let wsUrl: string
  // #ifdef H5
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
  wsUrl = protocol + '//' + location.host + '/ws?token=' + token
  // #endif
  // #ifndef H5
  wsUrl = 'ws://localhost:8000/ws?token=' + token
  // #endif
  uni.connectSocket({ url: wsUrl })
}

// ========== 已登录自动跳转 ==========

onMounted(() => {
  if (getToken()) {
    const info = getUserInfoFromStorage()
    if (info?.role === 'ADMIN_CANTEEN') {
      uni.reLaunch({ url: '/pages/canteen/workbench/index' })
    } else {
      uni.reLaunch({ url: '/pages/index/index' })
    }
  }
})

function getUserInfoFromStorage() {
  try {
    const raw = uni.getStorageSync('canteen-user')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 60rpx 40rpx;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
}

.app-name {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

/* 角色切换 */
.role-tabs {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
}

.role-tab {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  font-size: 30rpx;
  color: #999;
  transition: all 0.3s;
}

.role-tab.active {
  background: #FF6B35;
  color: #fff;
  font-weight: bold;
}

/* 表单 */
.form-box {
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx 30rpx;
}

.input-group {
  margin-bottom: 30rpx;
}

.input-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  display: block;
}

.input-field {
  width: 100%;
  height: 80rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.code-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.code-input {
  flex: 1;
}

.code-btn {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 24rpx;
  background: #FF6B35;
  color: #fff;
  border: none;
  border-radius: 12rpx;
  padding: 0;
}

.code-btn[disabled] {
  background: #ccc;
  color: #999;
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #FF6B35;
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  border-radius: 12rpx;
  margin-top: 20rpx;
}

.agreement-text {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  margin-top: 40rpx;
}
</style>
