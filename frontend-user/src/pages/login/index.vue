<template>
  <view class="login-container">
    <!-- 右上角角标：切换食堂登录 -->
    <view class="corner-badge" @tap="goCanteen">食堂人员登录</view>

    <view class="login-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="app-name">食堂订餐</text>
    </view>

    <!-- 登录 / 注册 Tab -->
    <view class="role-tabs">
      <view
        class="role-tab"
        :class="{ active: authMode === 'login' }"
        @tap="authMode = 'login'"
      >
        登录
      </view>
      <view
        class="role-tab"
        :class="{ active: authMode === 'register' }"
        @tap="authMode = 'register'"
      >
        注册
      </view>
    </view>

    <!-- 登录表单 -->
    <view v-if="authMode === 'login'" class="form-box">
      <view class="input-group">
        <text class="input-label">手机号</text>
        <view class="phone-row">
          <text class="phone-prefix">+86</text>
          <input
            v-model="loginForm.phone"
            class="input-field"
            type="number"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </view>
      </view>
      <view class="input-group">
        <text class="input-label">密码</text>
        <input
          v-model="loginForm.password"
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

    <!-- 注册表单 -->
    <view v-else class="form-box">
      <view class="input-group">
        <text class="input-label">昵称</text>
        <input
          v-model="regForm.nickname"
          class="input-field"
          type="text"
          placeholder="请输入昵称"
        />
      </view>
      <view class="input-group">
        <text class="input-label">手机号</text>
        <view class="phone-row">
          <text class="phone-prefix">+86</text>
          <input
            v-model="regForm.phone"
            class="input-field"
            type="number"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </view>
      </view>
      <view class="input-group">
        <text class="input-label">验证码</text>
        <view class="code-row">
          <input
            v-model="regForm.code"
            class="input-field code-input"
            type="number"
            placeholder="请输入验证码"
            maxlength="6"
          />
          <button
            class="code-btn"
            :disabled="codeCountdown > 0"
            size="mini"
            @tap="sendRegisterCode"
          >
            {{ codeCountdown > 0 ? codeCountdown + 's' : '获取验证码' }}
          </button>
        </view>
      </view>
      <view class="input-group">
        <text class="input-label">密码</text>
        <input
          v-model="regForm.password"
          class="input-field"
          type="text"
          password
          placeholder="请输入密码（至少6位）"
        />
      </view>
      <view class="input-group">
        <text class="input-label">确认密码</text>
        <input
          v-model="regForm.confirmPassword"
          class="input-field"
          type="text"
          password
          placeholder="请再次输入密码"
        />
      </view>
      <button class="submit-btn" @tap="handleRegister">注 册</button>
    </view>

    <!-- 协议勾选 -->
    <view class="agreement-box">
      <view class="agreement-row" :class="{ shake: shakeNotice }" @tap="toggleNotice">
        <view class="checkbox" :class="{ checked: agreeNotice }">
          <text v-if="agreeNotice" class="check-icon">✓</text>
        </view>
        <text class="agreement-label">我已阅读并同意</text>
        <text class="agreement-link" @tap.stop="openNotice">《订餐须知》</text>
      </view>
      <view class="agreement-row" :class="{ shake: shakeProtocol }" @tap="toggleProtocol">
        <view class="checkbox" :class="{ checked: agreeProtocol }">
          <text v-if="agreeProtocol" class="check-icon">✓</text>
        </view>
        <text class="agreement-label">我已阅读并同意</text>
        <text class="agreement-link" @tap.stop="openProtocol">《用户协议》</text>
      </view>
    </view>

    <!-- 协议弹窗 -->
    <view v-if="showAgreementModal" class="modal-mask" @tap="showAgreementModal = false">
      <view class="modal-box" @tap.stop>
        <text class="modal-title">{{ agreementModalTitle }}</text>
        <rich-text class="modal-content" :nodes="agreementModalContent" />
        <button class="modal-close" @tap="showAgreementModal = false">我知道了</button>
      </view>
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
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { sendSms, loginByUser, register, resetPassword } from '@/api/auth'
import { getToken, setToken, setUserInfo } from '@/utils/storage'

const authMode = ref<'login' | 'register'>('login')
const codeCountdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null

const loginForm = reactive({ phone: '', password: '' })
const regForm = reactive({ nickname: '', phone: '', code: '', password: '', confirmPassword: '' })
const forgotForm = reactive({ phone: '', code: '', newPassword: '' })
const showForgot = ref(false)

const agreeNotice = ref(false)
const agreeProtocol = ref(false)
const shakeNotice = ref(false)
const shakeProtocol = ref(false)
const showAgreementModal = ref(false)
const agreementModalTitle = ref('')
const agreementModalContent = ref('')

const NOTICE_CONTENT =
  '<p>1. 用户仅可在对应餐次订餐时间段内下单。</p>' +
  '<p>2. 订单备餐完成后，请及时到取餐窗口取餐。</p>' +
  '<p>3. 出餐后超过规定时间未取餐，订单将自动作废，<b>超时一小时不退款</b>。</p>' +
  '<p>4. 订单在开始备餐前可无责取消，取消后将退回已支付金额。</p>'

const PROTOCOL_CONTENT =
  '<p>1. 钱包余额为虚拟货币，仅用于本食堂订餐支付。</p>' +
  '<p>2. 请妥善保管账号，因账号保管不善造成的损失由用户自行承担。</p>' +
  '<p>3. 平台保留对本协议的解释与更新权利。</p>'

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

async function sendRegisterCode() {
  const phone = regForm.phone
  if (!phone || phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  try {
    const code = await sendSms(phone)
    regForm.code = code
    uni.showToast({ title: `【演示环境】您的验证码是：${code}`, icon: 'none', duration: 4000 })
    startCountdown()
  } catch { /* 错误已由拦截器处理 */ }
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
  if (!validateAgreement()) return
  if (!loginForm.phone || !loginForm.password) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (loginForm.phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  try {
    const result = await loginByUser(loginForm.phone, loginForm.password)
    onLoginSuccess(result)
  } catch { /* 错误已由拦截器处理 */ }
}

async function handleRegister() {
  if (!validateAgreement()) return
  if (!regForm.nickname || !regForm.phone || !regForm.code || !regForm.password) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }
  if (regForm.phone.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  if (regForm.password.length < 6) {
    uni.showToast({ title: '密码长度不能少于6位', icon: 'none' })
    return
  }
  if (regForm.password !== regForm.confirmPassword) {
    uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
    return
  }
  try {
    const result = await register({
      nickname: regForm.nickname,
      phone: regForm.phone,
      code: regForm.code,
      password: regForm.password,
    })
    onLoginSuccess(result)
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

function goCanteen() {
  uni.reLaunch({ url: '/pages/login/canteen' })
}

function toggleNotice() {
  agreeNotice.value = !agreeNotice.value
}

function toggleProtocol() {
  agreeProtocol.value = !agreeProtocol.value
}

function openNotice() {
  agreementModalTitle.value = '订餐须知'
  agreementModalContent.value = NOTICE_CONTENT
  showAgreementModal.value = true
}

function openProtocol() {
  agreementModalTitle.value = '用户协议'
  agreementModalContent.value = PROTOCOL_CONTENT
  showAgreementModal.value = true
}

function validateAgreement(): boolean {
  let ok = true
  if (!agreeNotice.value) { shakeNotice.value = true; ok = false }
  if (!agreeProtocol.value) { shakeProtocol.value = true; ok = false }
  if (!ok) {
    uni.showToast({ title: '请先阅读并同意相关协议', icon: 'none' })
    setTimeout(() => { shakeNotice.value = false; shakeProtocol.value = false }, 500)
  }
  return ok
}

function onLoginSuccess(result: { token: string; role: string; username: string; userId: number }) {
  setToken(result.token)
  setUserInfo({ userId: result.userId, username: result.username, phone: '', role: result.role })
  reconnectWs(result.token)
  uni.showToast({ title: '登录成功', icon: 'success' })
  setTimeout(() => {
    uni.reLaunch({ url: '/pages/index/index' })
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
  wsUrl = 'ws://192.168.126.220:8000/ws?token=' + token
  // #endif
  uni.connectSocket({ url: wsUrl })
}

onMounted(() => {
  if (getToken()) {
    uni.reLaunch({ url: '/pages/index/index' })
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

/* 登录/注册切换 */
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

.phone-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.phone-prefix {
  font-size: 28rpx;
  color: #666;
  flex-shrink: 0;
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

/* 协议勾选 */
.agreement-box {
  margin-top: 40rpx;
}

.agreement-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 20rpx;
  font-size: 24rpx;
}

.checkbox {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 2rpx solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8rpx;
  flex-shrink: 0;
}

.checkbox.checked {
  background: #FF6B35;
  border-color: #FF6B35;
}

.check-icon {
  color: #fff;
  font-size: 20rpx;
}

.agreement-label {
  color: #999;
}

.agreement-link {
  color: #FF6B35;
}

.shake {
  animation: shake 0.4s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-12rpx); }
  40% { transform: translateX(12rpx); }
  60% { transform: translateX(-12rpx); }
  80% { transform: translateX(12rpx); }
}

/* 弹窗 */
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

.modal-content {
  font-size: 26rpx;
  color: #333;
  line-height: 1.6;
  overflow-y: auto;
}

.forgot-field {
  margin-bottom: 24rpx;
}

.modal-close {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  margin-top: 24rpx;
  background: #FF6B35;
  color: #fff;
  font-size: 28rpx;
  border: none;
  border-radius: 12rpx;
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
</style>
