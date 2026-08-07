<template>
  <view class="menu-container">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <view class="search-box">
        <text class="search-icon">🔍</text>
        <input
          v-model="searchKeyword"
          class="search-input"
          placeholder="搜索菜品..."
          @confirm="onSearch"
        />
      </view>
    </view>

    <!-- 分类横向滚动 -->
    <scroll-view class="category-scroll" scroll-x enable-flex>
      <view
        v-for="cat in categories"
        :key="cat.id"
        class="category-item"
        :class="{ active: activeCategory === cat.id }"
        @tap="activeCategory = cat.id"
      >
        {{ cat.name }}
      </view>
    </scroll-view>

    <!-- 菜品列表 -->
    <scroll-view class="dish-list" scroll-y>
      <view v-for="dish in filteredDishes" :key="dish.id" class="dish-card">
        <image class="dish-img" :src="dish.image" mode="aspectFill" />
        <view class="dish-info">
          <text class="dish-name">{{ dish.name }}</text>
          <text class="dish-desc">{{ dish.description }}</text>
          <view class="dish-bottom">
            <text class="dish-price">
              <text class="price-symbol">¥</text>{{ dish.price }}
            </text>
            <view class="cart-control">
              <button
                v-if="getCartCount(dish.id) > 0"
                class="ctrl-btn minus"
                size="mini"
                @tap="removeFromCart(dish)"
              >
                -
              </button>
              <text v-if="getCartCount(dish.id) > 0" class="cart-num">
                {{ getCartCount(dish.id) }}
              </text>
              <button class="ctrl-btn add" size="mini" @tap="addToCart(dish)">
                +
              </button>
            </view>
          </view>
        </view>
      </view>
      <view v-if="filteredDishes.length === 0" class="empty-tip">
        暂无菜品
      </view>
    </scroll-view>

    <!-- 底部购物车栏 -->
    <view v-if="cartTotalCount > 0" class="cart-bar">
      <view class="cart-info" @tap="showCartDetail = !showCartDetail">
        <view class="cart-icon-wrap">
          <text class="cart-icon">🛒</text>
          <text class="cart-badge">{{ cartTotalCount }}</text>
        </view>
        <text class="cart-total">¥{{ cartTotalPrice.toFixed(2) }}</text>
      </view>
      <button class="checkout-btn" @tap="goCheckout">去结算</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Dish {
  id: number
  name: string
  image: string
  description: string
  price: number
  categoryId: number
}

interface CartItem {
  dish: Dish
  count: number
}

const searchKeyword = ref('')
const activeCategory = ref(1)
const showCartDetail = ref(false)

// 模拟分类数据
const categories = reactive([
  { id: 1, name: '热菜' },
  { id: 2, name: '凉菜' },
  { id: 3, name: '主食' },
  { id: 4, name: '汤粥' },
  { id: 5, name: '饮品' }
])

// 模拟菜品数据
const dishes = ref<Dish[]>([
  { id: 1, name: '红烧肉', image: '', description: '精选五花肉，肥而不腻', price: 18.00, categoryId: 1 },
  { id: 2, name: '宫保鸡丁', image: '', description: '鸡肉嫩滑，花生香脆', price: 15.00, categoryId: 1 },
  { id: 3, name: '凉拌黄瓜', image: '', description: '清爽可口，开胃小菜', price: 6.00, categoryId: 2 },
  { id: 4, name: '米饭', image: '', description: '东北优质大米', price: 2.00, categoryId: 3 },
  { id: 5, name: '番茄蛋汤', image: '', description: '鲜美营养，暖胃好汤', price: 5.00, categoryId: 4 },
  { id: 6, name: '冰镇酸梅汤', image: '', description: '酸甜解暑', price: 4.00, categoryId: 5 }
])

// 购物车
const cart = reactive<CartItem[]>([])

const filteredDishes = computed(() => {
  let list = dishes.value.filter(d => d.categoryId === activeCategory.value)
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase()
    list = list.filter(d => d.name.includes(kw) || d.description.includes(kw))
  }
  return list
})

const cartTotalCount = computed(() => cart.reduce((sum, item) => sum + item.count, 0))
const cartTotalPrice = computed(() => cart.reduce((sum, item) => sum + item.dish.price * item.count, 0))

function getCartCount(dishId: number): number {
  const item = cart.find(c => c.dish.id === dishId)
  return item ? item.count : 0
}

function addToCart(dish: Dish) {
  const exist = cart.find(c => c.dish.id === dish.id)
  if (exist) {
    exist.count++
  } else {
    cart.push({ dish, count: 1 })
  }
}

function removeFromCart(dish: Dish) {
  const idx = cart.findIndex(c => c.dish.id === dish.id)
  if (idx === -1) return
  if (cart[idx].count > 1) {
    cart[idx].count--
  } else {
    cart.splice(idx, 1)
  }
}

function onSearch() {
  // 搜索逻辑由 computed filteredDishes 自动处理
}

function goCheckout() {
  uni.navigateTo({ url: '/pages/order/detail' })
}
</script>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

/* 搜索栏 */
.search-bar {
  padding: 20rpx;
  background: #fff;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 32rpx;
  padding: 0 24rpx;
  height: 68rpx;
}

.search-icon {
  margin-right: 12rpx;
  font-size: 28rpx;
}

.search-input {
  flex: 1;
  font-size: 26rpx;
}

/* 分类 */
.category-scroll {
  white-space: nowrap;
  background: #fff;
  padding: 16rpx 20rpx;
  border-bottom: 1rpx solid #eee;
}

.category-item {
  display: inline-block;
  padding: 12rpx 28rpx;
  font-size: 26rpx;
  color: #666;
  border-radius: 28rpx;
  margin-right: 16rpx;
  background: #f5f5f5;
  transition: all 0.3s;
}

.category-item.active {
  background: #FF6B35;
  color: #fff;
  font-weight: bold;
}

/* 菜品列表 */
.dish-list {
  flex: 1;
  padding: 20rpx;
  padding-bottom: 120rpx;
}

.dish-card {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  padding: 20rpx;
}

.dish-img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  background: #eee;
  flex-shrink: 0;
}

.dish-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dish-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.dish-desc {
  font-size: 24rpx;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dish-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dish-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF6B35;
}

.price-symbol {
  font-size: 24rpx;
}

.cart-control {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.ctrl-btn {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  font-size: 28rpx;
  font-weight: bold;
  line-height: 48rpx;
  padding: 0;
  border: none;
}

.ctrl-btn.add {
  background: #FF6B35;
  color: #fff;
}

.ctrl-btn.minus {
  background: #eee;
  color: #333;
}

.cart-num {
  font-size: 28rpx;
  font-weight: bold;
  min-width: 40rpx;
  text-align: center;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 28rpx;
  padding: 100rpx 0;
}

/* 底部购物车栏 */
.cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 16rpx 30rpx;
  padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.cart-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.cart-icon-wrap {
  position: relative;
}

.cart-icon {
  font-size: 44rpx;
}

.cart-badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background: #FF6B35;
  color: #fff;
  font-size: 20rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  text-align: center;
  line-height: 32rpx;
}

.cart-total {
  font-size: 36rpx;
  font-weight: bold;
  color: #FF6B35;
}

.checkout-btn {
  background: #FF6B35;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  border: none;
  border-radius: 36rpx;
  padding: 16rpx 40rpx;
}
</style>
