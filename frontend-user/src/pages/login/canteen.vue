<template>
  <view class="login-container">
    <!-- 右上角角标：切换普通用户登录 -->
    <view class="corner-badge" @tap="goUser">普通用户登录</view>

    <view class="login-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="app-name">食堂订餐 · 食堂端</text>
    </view>

    <view class="form-box">
      <view class="input-group">
        <text class="input-label">用户名</text>
        <input
          v-model="adminForm.username"
          class="input-field"
          type="text"
          placeholder="请输入用户名"
        />
      </view>
      <view class="input-group">
        <text class="input-label">密码</text>
        <input
          v-model="adminForm.password"
          class="input-field"
          type="text"
          password
          placeholder="请输入密码"
        />
      </view>
      <view class="forgot-row">
        <text class="forgot-link" @tap="openForgot">忘记密码？</text>
      </view>
      <button class="submit-btn" @tap="handleLogin">登 录</button>
    </view>

    <!-- 忘记密码弹窗 -->
    <view v-if="showForgot" class="modal-mask" @tap="showForgot = false">
      <view class="modal-box" @tap.stop>
        <text class="modal-title">忘记密码</text>
        <view class="forgot-field">
          <input
            v-model="forgotForm.phone"
            class="input-field"
            type="number"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </view>
        <view class="forgot-field code-row">
          <input
            v-model="forgotForm.code"
            class="input-field code-input"
            type="number"
            placeholder="请输入验证码"
            maxlength="6"
          />
          <button
            class="code-btn"
            :disabled="codeCountdown > 0"
            size="mini"
            @tap="sendForgotCode"
          >
            {{ codeCountdown > 0 ? codeCountdown + 's' : '获取验证码' }}
          </button>
        </view>
        <view class="forgot-field">
          <input
            v-model="forgotForm.newPassword"
            class="input-field"
            type="text"
            password
            placeholder="请输入新密码（至少6位）"
          />
        </view>
        <button class="submit-btn" @tap="handleResetPassword">确认重置</button>
        <button class="modal-cancel" @tap="showForgot = false">取消</button>
      </view>
    </view>

    <!-- 首次登录修改密码弹窗 -->
    <view v-if="changePwdVisible" class="modal-mask">
      <view class="modal-box" @tap.stop>
        <text class="modal-title">首次登录请修改密码</text>
        <view class="forgot-field">
          <input v-model="newPassword" class="input-field" type="text" password placeholder="请输入新密码（至少6位）" />
        </view>
        <view class="forgot-field">
          <input v-model="confirmPassword" class="input-field" type="text" password placeholder="请再次输入新密码" />
        </view>
        <button class="submit-btn" @tap="handleChangePassword">确认修改</button>
        <text class="change-pwd-logout" @tap="logoutOnChangePwd">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { loginByAdmin, resetPassword, sendSms, updatePassword } from '@/api/auth'
import { getToken, setToken, setUserInfo, removeToken, removeUserInfo } from '@/utils/storage'

const codeCountdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null

const adminForm = reactive({ username: '', password: '' })
const forgotForm = reactive({ phone: '', code: '', newPassword: '' })
const showForgot = ref(false)
const changePwdVisible = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
let pendingResult: { token: string; role: string; username: string; userId: number } | null = null

function startCountdown() {
  codeCountdown.value = 60
  if (countdownTimer) clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    codeCountdown.value--
    if (codeCountdown.value <= 0 && countdownTimer) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
  }, 1000)
}

async function sendForgotCode() {
  const phone = forgotForm.phone
  if (!phone || phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  try {
    const code = await sendSms(phone)
    forgotForm.code = code
    uni.showToast({ title: `【演示环境】您的验证码是：${code}`, icon: 'none', duration: 4000 })
    startCountdown()
  } catch { /* 错误已由拦截器处理 */ }
}

async function handleLogin() {
  if (!adminForm.username || !adminForm.password) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  try {
    const result = await loginByAdmin(adminForm.username, adminForm.password)
    setToken(result.token)
    setUserInfo({ userId: result.userId, username: result.username, phone: '', role: result.role })
    if (result.isInitialPassword === 1) {
      pendingResult = result
      changePwdVisible.value = true
    } else {
      finishLogin(result)
    }
  } catch { /* 错误已由拦截器处理 */ }
}

async function handleResetPassword() {
  if (!forgotForm.phone || !forgotForm.code || !forgotForm.newPassword) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (forgotForm.phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  if (forgotForm.newPassword.length < 6) {
    uni.showToast({ title: '新密码长度不能少于6位', icon: 'none' })
    return
  }
  try {
    await resetPassword(forgotForm.phone, forgotForm.code, forgotForm.newPassword)
    uni.showToast({ title: '重置成功，请重新登录', icon: 'success' })
    showForgot.value = false
    forgotForm.phone = ''
    forgotForm.code = ''
    forgotForm.newPassword = ''
  } catch { /* 错误已由拦截器处理 */ }
}

function openForgot() {
  showForgot.value = true
}

function goUser() {
  uni.reLaunch({ url: '/pages/login/index' })
}

function finishLogin(result: { token: string; role: string; username: string; userId: number }) {
  reconnectWs(result.token)
  uni.showToast({ title: '登录成功', icon: 'success' })
  setTimeout(() => {
    if (result.role === 'ADMIN_CANTEEN') {
      uni.reLaunch({ url: '/pages/canteen/workbench/index' })
    } else if (result.role === 'ADMIN_SYSTEM') {
      uni.showToast({ title: '系统管理员请使用PC端管理后台', icon: 'none', duration: 3000 })
      setToken('')
    } else {
      uni.reLaunch({ url: '/pages/index/index' })
    }
  }, 500)
}

async function handleChangePassword() {
  if (!newPassword.value || newPassword.value.length < 6) {
    uni.showToast({ title: '新密码长度不能少于6位', icon: 'none' })
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
    return
  }
  try {
    await updatePassword(newPassword.value)
    uni.showToast({ title: '密码修改成功', icon: 'success' })
    changePwdVisible.value = false
    newPassword.value = ''
    confirmPassword.value = ''
    if (pendingResult) {
      finishLogin(pendingResult)
      pendingResult = null
    }
  } catch { /* 错误已由拦截器处理 */ }
}

function logoutOnChangePwd() {
  removeToken()
  removeUserInfo()
  changePwdVisible.value = false
  uni.reLaunch({ url: '/pages/login/canteen' })
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
  wsUrl = 'ws://192.168.126.220:8000/ws?token=' + token
  // #endif
  uni.connectSocket({ url: wsUrl })
}

onMounted(() => {
  if (getToken()) {
    uni.reLaunch({ url: '/pages/canteen/workbench/index' })
  }
})
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 60rpx 40rpx;
}

.corner-badge {
  position: absolute;
  top: 40rpx;
  right: 30rpx;
  font-size: 24rpx;
  color: #FF6B35;
  padding: 8rpx 20rpx;
  border: 2rpx solid #FF6B35;
  border-radius: 32rpx;
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

.forgot-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16rpx;
}

.forgot-link {
  font-size: 26rpx;
  color: #FF6B35;
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

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  width: 600rpx;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}

.modal-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24rpx;
}

.forgot-field {
  margin-bottom: 24rpx;
}

.modal-cancel {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  margin-top: 16rpx;
  background: #f5f5f5;
  color: #666;
  font-size: 28rpx;
  border: none;
  border-radius: 12rpx;
}

.change-pwd-logout {
  display: block;
  text-align: center;
  margin-top: 20rpx;
  font-size: 26rpx;
  color: #999;
}
</style>
