<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="app-name">食堂订餐</text>
    </view>

    <!-- 登录/注册 Tab 切换 -->
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ active: activeTab === 'login' }"
        @tap="activeTab = 'login'"
      >
        登录
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 'register' }"
        @tap="activeTab = 'register'"
      >
        注册
      </view>
    </view>

    <!-- 登录表单 -->
    <view v-if="activeTab === 'login'" class="form-box">
      <view class="input-group">
        <text class="input-label">手机号</text>
        <input
          v-model="loginForm.phone"
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
            v-model="loginForm.code"
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
      <button class="submit-btn" @tap="handleLogin">登 录</button>
    </view>

    <!-- 注册表单 -->
    <view v-else class="form-box">
      <view class="input-group">
        <text class="input-label">手机号</text>
        <input
          v-model="registerForm.phone"
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
            v-model="registerForm.code"
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
      <view class="input-group">
        <text class="input-label">昵称</text>
        <input
          v-model="registerForm.nickname"
          class="input-field"
          type="text"
          placeholder="请输入昵称"
        />
      </view>
      <button class="submit-btn" @tap="handleRegister">注 册</button>
    </view>

    <view class="agreement-text">
      登录即表示同意《用户协议》和《隐私政策》
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { sendSms, loginByMobile } from '@/api/auth'

const activeTab = ref<'login' | 'register'>('login')
const codeCountdown = ref(0)

const loginForm = reactive({
  phone: '',
  code: ''
})

const registerForm = reactive({
  phone: '',
  code: '',
  nickname: ''
})

let countdownTimer: ReturnType<typeof setInterval> | null = null

async function sendCode() {
  const phone = activeTab.value === 'login' ? loginForm.phone : registerForm.phone
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
  } catch {
    // 错误信息已由 request.ts 拦截器 showToast 处理
  }
}

async function handleLogin() {
  if (!loginForm.phone || !loginForm.code) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (loginForm.phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  try {
    const result = await loginByMobile(loginForm.phone, loginForm.code)
    uni.setStorageSync('canteen-token', result.token)
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      uni.switchTab({ url: '/pages/index/index' })
    }, 500)
  } catch {
    // 错误信息已由 request.ts 拦截器 showToast 处理
  }
}

function handleRegister() {
  if (!registerForm.phone || !registerForm.code) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  uni.showToast({ title: '该功能暂未开放', icon: 'none' })
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
  margin-bottom: 60rpx;
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

.tab-bar {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  font-size: 30rpx;
  color: #999;
  transition: all 0.3s;
}

.tab-item.active {
  background: #FF6B35;
  color: #fff;
  font-weight: bold;
}

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
