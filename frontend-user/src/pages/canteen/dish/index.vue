<template>
  <view class="dish-page">
    <!-- 分类筛选 -->
    <scroll-view class="category-bar" scroll-x>
      <view
        v-for="cat in categories"
        :key="cat.value"
        class="cat-item"
        :class="{ active: filterCategory === cat.value }"
        @tap="filterCategory = cat.value; page = 1; fetchDishes()"
      >
        {{ cat.label }}
      </view>
    </scroll-view>

    <!-- 菜品列表 -->
    <scroll-view class="dish-list" scroll-y @scrolltolower="loadMore">
      <view v-for="dish in dishes" :key="dish.id" class="dish-card">
        <image
          class="dish-img"
          :src="dish.imageUrl || '/static/logo.png'"
          mode="aspectFill"
        />
        <view class="dish-info">
          <text class="dish-name">{{ dish.name }}</text>
          <text class="dish-cat">{{ catLabel(dish.category) }}</text>
          <view class="dish-meta">
            <text class="dish-price">¥{{ (dish.price / 100).toFixed(2) }}</text>
            <text class="dish-limit">限量: {{ dish.dailyLimit || '--' }}</text>
          </view>
        </view>
        <view class="dish-actions">
          <switch
            :checked="dish.status === 'ON'"
            color="#FF6B35"
            @change="toggleStatus(dish)"
          />
          <button class="edit-btn" size="mini" @tap="openDialog(dish)">编辑</button>
          <button class="del-btn" size="mini" @tap="handleDelete(dish)">删除</button>
        </view>
      </view>
      <view v-if="dishes.length === 0" class="empty-tip">暂无菜品</view>
    </scroll-view>

    <!-- 新增按钮 -->
    <view class="fab-btn" @tap="openDialog()">
      <text class="fab-icon">+</text>
    </view>

    <!-- 新增/编辑弹窗 -->
    <view v-if="dialogShow" class="modal-mask" @tap="dialogShow = false">
      <view class="modal-box" @tap.stop>
        <text class="modal-title">{{ editingId ? '编辑菜品' : '新增菜品' }}</text>
        <scroll-view scroll-y class="modal-body">
          <view class="form-item" :class="{ 'has-error': errors.name }">
            <text class="form-label">名称 <text class="required">*</text></text>
            <input v-model="form.name" class="form-input" :class="{ 'input-error': errors.name }" placeholder="菜品名称" maxlength="50" @input="errors.name = ''" />
            <text v-if="errors.name" class="error-msg">{{ errors.name }}</text>
          </view>
          <view class="form-item" :class="{ 'has-error': errors.category }">
            <text class="form-label">分类 <text class="required">*</text></text>
            <view class="selector" :class="{ 'input-error': errors.category }" @tap="showCatPicker = true">
              <text :class="{ placeholder: !form.category }">{{ catLabel(form.category) || '请选择分类' }}</text>
              <text class="arrow">▼</text>
            </view>
            <text v-if="errors.category" class="error-msg">{{ errors.category }}</text>
          </view>
          <view class="form-item" :class="{ 'has-error': errors.price }">
            <text class="form-label">价格 (元) <text class="required">*</text></text>
            <input v-model.number="priceYuan" class="form-input" :class="{ 'input-error': errors.price }" type="digit" placeholder="0.00" @input="errors.price = ''" />
            <text v-if="errors.price" class="error-msg">{{ errors.price }}</text>
          </view>
          <view class="form-item" :class="{ 'has-error': errors.dailyLimit }">
            <text class="form-label">每日限量 <text class="required">*</text></text>
            <input v-model.number="form.dailyLimit" class="form-input" :class="{ 'input-error': errors.dailyLimit }" type="number" placeholder="0 表示不限量" @input="errors.dailyLimit = ''" />
            <text v-if="errors.dailyLimit" class="error-msg">{{ errors.dailyLimit }}</text>
          </view>
          <view class="form-item">
            <text class="form-label">描述</text>
            <input v-model="form.description" class="form-input" placeholder="菜品描述" maxlength="200" />
          </view>
          <view class="form-item">
            <text class="form-label">图片</text>
            <button class="upload-btn" size="mini" @tap="chooseImage">选择图片</button>
            <image v-if="form.imageUrl" :src="form.imageUrl" class="preview-img" mode="aspectFill" />
          </view>
        </scroll-view>
        <!-- 分类下拉选择器 -->
        <view v-if="showCatPicker" class="picker-overlay" @tap="showCatPicker = false">
          <view class="picker-dropdown" @tap.stop>
            <view class="picker-title">请选择分类</view>
            <view
              v-for="cat in categories.filter(c => c.value)"
              :key="cat.value"
              class="picker-option"
              :class="{ selected: form.category === cat.value }"
              @tap="form.category = cat.value; showCatPicker = false"
            >
              <text>{{ cat.label }}</text>
              <text v-if="form.category === cat.value" class="check">✓</text>
            </view>
            <view class="picker-cancel" @tap="showCatPicker = false">取消</view>
          </view>
        </view>

        <view class="modal-btns">
          <button class="modal-btn cancel" size="mini" @tap="dialogShow = false">取消</button>
          <button class="modal-btn confirm" size="mini" @tap="handleSave">保存</button>
        </view>
      </view>
    </view>

    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  getDishList, addDish, updateDish, changeDishStatus, deleteDish,
} from '@/api/admin'
import type { DishInfo } from '@/api/admin'
import { getUserInfo, getToken } from '@/utils/storage'
import CustomTabBar from '@/components/CustomTabBar.vue'

// 分类中英文映射（DB 存英文码，UI 显示中文）
const CATEGORY_MAP: Record<string, string> = {
  BREAKFAST: '早餐', LUNCH: '午餐', DINNER: '晚餐',
}
function catLabel(val: string) { return CATEGORY_MAP[val] || val }

const categories = [
  { label: '全部', value: '' },
  { label: '早餐', value: 'BREAKFAST' },
  { label: '午餐', value: 'LUNCH' },
  { label: '晚餐', value: 'DINNER' },
]
const filterCategory = ref('')
const dishes = ref<DishInfo[]>([])
const page = ref(1)
const pageSize = 10
const hasMore = ref(true)

// 表单
const dialogShow = ref(false)
const editingId = ref<number | null>(null)
const showCatPicker = ref(false)
const form = reactive<DishInfo>({
  name: '', category: '', price: 0, dailyLimit: 0, description: '', imageUrl: '', status: 'ON',
})
const priceYuan = ref(0)

// 字段校验错误
const errors = reactive<Record<string, string>>({
  name: '', category: '', price: '', dailyLimit: '',
})

function clearErrors() {
  errors.name = ''
  errors.category = ''
  errors.price = ''
  errors.dailyLimit = ''
}

function validateForm(): boolean {
  clearErrors()
  let valid = true
  if (!form.name || !form.name.trim()) { errors.name = '请输入菜品名称'; valid = false }
  if (!form.category) { errors.category = '请选择分类'; valid = false }
  if (!priceYuan.value || priceYuan.value <= 0) { errors.price = '请输入有效价格'; valid = false }
  if (form.dailyLimit == null || form.dailyLimit < 0) { errors.dailyLimit = '请输入每日限量'; valid = false }
  return valid
}

// 角色校验
onMounted(() => {
  const info = getUserInfo()
  if (info?.role !== 'ADMIN_CANTEEN') {
    uni.showToast({ title: '无权限访问', icon: 'none' })
    setTimeout(() => uni.reLaunch({ url: '/pages/index/index' }), 800)
    return
  }
  fetchDishes()
})

async function fetchDishes() {
  try {
    const data = await getDishList({
      page: page.value, pageSize,
      category: filterCategory.value || undefined,
    })
    const records = data?.records || []
    dishes.value = page.value === 1 ? records : [...dishes.value, ...records]
    hasMore.value = records.length >= pageSize
  } catch { dishes.value = [] }
}

function loadMore() {
  if (!hasMore.value) return
  page.value++
  fetchDishes()
}

function openDialog(dish?: DishInfo) {
  if (dish) {
    editingId.value = dish.id!
    Object.assign(form, dish)
    priceYuan.value = (dish.price || 0) / 100
  } else {
    editingId.value = null
    Object.assign(form, { name: '', category: '', price: 0, dailyLimit: 0, description: '', imageUrl: '', status: 'ON' })
    priceYuan.value = 0
  }
  clearErrors()
  dialogShow.value = true
}

async function handleSave() {
  if (!validateForm()) return
  form.price = Math.round(priceYuan.value * 100)
  try {
    if (editingId.value) {
      await updateDish({ ...form, id: editingId.value })
      uni.showToast({ title: '编辑成功', icon: 'success' })
    } else {
      await addDish(form)
      uni.showToast({ title: '新增成功', icon: 'success' })
    }
    dialogShow.value = false
    page.value = 1
    fetchDishes()
  } catch { /* ignore */ }
}

async function toggleStatus(dish: DishInfo) {
  const newStatus = dish.status === 'ON' ? 'OFF' : 'ON'
  try {
    await changeDishStatus(dish.id!, newStatus)
    dish.status = newStatus
    uni.showToast({ title: newStatus === 'ON' ? '已上架' : '已下架', icon: 'success' })
  } catch { /* ignore */ }
}

async function handleDelete(dish: DishInfo) {
  const res = await new Promise<boolean>(resolve => {
    uni.showModal({ title: '确认删除', content: `删除【${dish.name}】？`, success: r => resolve(r.confirm) })
  })
  if (!res) return
  try {
    await deleteDish(dish.id!)
    uni.showToast({ title: '已删除', icon: 'success' })
    page.value = 1
    fetchDishes()
  } catch { /* ignore */ }
}

function chooseImage() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    success: (res: any) => {
      const tempPath = res.tempFilePaths?.[0]
      if (!tempPath) return
      const token = getToken()
      // #ifdef H5
      const uploadUrl = '/api/v1/common/upload'
      // #endif
      // #ifndef H5
      const uploadUrl = 'http://localhost:8000/api/v1/common/upload'
      // #endif
      uni.uploadFile({
        url: uploadUrl,
        filePath: tempPath,
        name: 'file',
        header: { 'canteen-token': token || '' },
        success: (uploadRes: any) => {
          try {
            const data = JSON.parse(uploadRes.data)
            if (data.code === 200 && data.data) {
              form.imageUrl = data.data.url || data.data
              uni.showToast({ title: '上传成功', icon: 'success' })
            } else {
              uni.showToast({ title: data.message || '上传失败', icon: 'none' })
            }
          } catch { uni.showToast({ title: '上传失败', icon: 'none' }) }
        },
        fail: () => uni.showToast({ title: '上传失败', icon: 'none' }),
      })
    },
  })
}
</script>

<style scoped>
.dish-page { min-height: 100vh; background: #f5f5f5; padding-bottom: 160rpx; }

.category-bar { white-space: nowrap; padding: 16rpx 20rpx; background: #fff; }
.cat-item {
  display: inline-block; padding: 10rpx 28rpx; font-size: 26rpx;
  color: #666; background: #f5f5f5; border-radius: 8rpx; margin-right: 12rpx;
}
.cat-item.active { background: #FF6B35; color: #fff; }

.dish-list { padding: 20rpx; }
.dish-card {
  display: flex; background: #fff; border-radius: 12rpx;
  padding: 20rpx; margin-bottom: 16rpx; align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.dish-img { width: 100rpx; height: 100rpx; border-radius: 10rpx; background: #eee; flex-shrink: 0; }
.dish-info { flex: 1; margin-left: 16rpx; }
.dish-name { font-size: 28rpx; font-weight: bold; color: #333; }
.dish-cat { font-size: 22rpx; color: #999; margin-top: 4rpx; }
.dish-meta { display: flex; gap: 16rpx; margin-top: 4rpx; }
.dish-price { font-size: 24rpx; color: #FF6B35; font-weight: bold; }
.dish-limit { font-size: 22rpx; color: #999; }
.dish-actions { display: flex; flex-direction: column; align-items: center; gap: 8rpx; flex-shrink: 0; }
.edit-btn { font-size: 20rpx; background: #ecf5ff; color: #409EFF; border: none; border-radius: 6rpx; padding: 4rpx 12rpx; }
.del-btn { font-size: 20rpx; background: #fef0f0; color: #F56C6C; border: none; border-radius: 6rpx; padding: 4rpx 12rpx; }

.fab-btn {
  position: fixed; right: 40rpx; bottom: 180rpx;
  width: 100rpx; height: 100rpx; background: #FF6B35; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(255,107,53,0.4); z-index: 100;
}
.fab-icon { font-size: 52rpx; color: #fff; line-height: 1; }

.empty-tip { text-align: center; color: #999; padding: 100rpx 0; }

/* 弹窗 */
.modal-mask { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: flex-end; }
.modal-box {
  background: #fff; border-radius: 24rpx 24rpx 0 0; width: 100%;
  max-height: 85vh; padding: 40rpx 30rpx; padding-bottom: env(safe-area-inset-bottom);
}
.modal-title { font-size: 32rpx; font-weight: bold; display: block; margin-bottom: 24rpx; }
.modal-body { max-height: 60vh; }
.form-item { margin-bottom: 24rpx; }
.form-label { font-size: 26rpx; color: #666; margin-bottom: 8rpx; display: block; }
.form-input {
  width: 100%; height: 72rpx; background: #f8f8f8;
  border-radius: 10rpx; padding: 0 16rpx; font-size: 26rpx; box-sizing: border-box;
}
.selector {
  width: 100%; height: 72rpx; background: #f8f8f8; border-radius: 10rpx;
  padding: 0 16rpx; font-size: 26rpx; box-sizing: border-box; line-height: 72rpx;
  display: flex; justify-content: space-between; align-items: center;
}
.selector .placeholder { color: #999; }
.selector .arrow { font-size: 20rpx; color: #999; }
.required { color: #F56C6C; }

/* 表单校验 */
.has-error { margin-bottom: 4rpx; }
.input-error { border: 2rpx solid #F56C6C !important; }
.error-msg { font-size: 22rpx; color: #F56C6C; margin-top: 6rpx; display: block; }

/* 分类下拉 */
.picker-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000;
  display: flex; align-items: flex-end; justify-content: center;
}
.picker-dropdown {
  width: 100%; background: #fff; border-radius: 24rpx 24rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}
.picker-title { font-size: 28rpx; color: #999; text-align: center; padding: 24rpx; border-bottom: 1rpx solid #f5f5f5; }
.picker-option {
  display: flex; justify-content: space-between; align-items: center;
  padding: 28rpx 40rpx; font-size: 30rpx; border-bottom: 1rpx solid #f5f5f5;
}
.picker-option.selected { color: #FF6B35; font-weight: bold; }
.picker-option .check { color: #FF6B35; font-weight: bold; }
.picker-cancel { text-align: center; padding: 24rpx; font-size: 28rpx; color: #999; }

.upload-btn { font-size: 24rpx; background: #f5f5f5; color: #666; border: none; border-radius: 8rpx; }
.preview-img { width: 120rpx; height: 90rpx; border-radius: 8rpx; margin-top: 10rpx; background: #eee; }
.modal-btns { display: flex; gap: 20rpx; justify-content: flex-end; margin-top: 20rpx; }
.modal-btn { font-size: 26rpx; border: none; border-radius: 8rpx; padding: 12rpx 28rpx; }
.modal-btn.cancel { background: #f5f5f5; color: #666; }
.modal-btn.confirm { background: #FF6B35; color: #fff; }
</style>
