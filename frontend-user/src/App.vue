<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { getToken, removeToken } from "@/utils/storage";

const BASE_URL = '/api/v1'

// 解析 WebSocket URL
function getWsUrl(token: string): string {
  // #ifdef H5
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
  return protocol + '//' + location.host + '/ws?token=' + token
  // #endif
  // #ifndef H5
  return 'ws://localhost:8000/ws?token=' + token
  // #endif
}

let wsConnected = false

function connectWebSocket() {
  const token = getToken()
  if (!token || wsConnected) return

  uni.connectSocket({
    url: getWsUrl(token),
    success: () => {
      console.log('[WS] connecting...')
    },
    fail: (err: any) => {
      console.error('[WS] connect fail:', err)
    },
  })
}

// 注册 WebSocket 事件
uni.onSocketOpen(() => {
  console.log('[WS] connected')
  wsConnected = true
})

uni.onSocketMessage((res: any) => {
  console.log('[WS] message:', res.data)
  try {
    const msg = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
    // 只处理用户侧相关消息（排除食堂端的新订单提醒）
    if (msg.type === 'ORDER_STATUS_CHANGE') {
      uni.showToast({ title: msg.message || '订单状态已更新', icon: 'none', duration: 3000 })
    }
  } catch {
    // ignore parse error
  }
})

uni.onSocketError((err: any) => {
  console.error('[WS] error:', err)
  wsConnected = false
})

uni.onSocketClose(() => {
  console.log('[WS] closed')
  wsConnected = false
  // 5 秒后尝试重连
  setTimeout(() => {
    if (getToken()) {
      connectWebSocket()
    }
  }, 5000)
})

onLaunch(() => {
  console.log("App Launch");
  // 校验已有 token
  const token = getToken()
  if (token) {
    uni.request({
      url: BASE_URL + '/auth/me',
      method: 'GET',
      header: { 'canteen-token': token },
      success: (res: any) => {
        if (res.data?.code !== 200) {
          removeToken()
        } else {
          // token 有效，建立 WebSocket 连接
          connectWebSocket()
        }
      },
      fail: () => {
        // 网络异常，保留 token 下次重试
      },
    })
  }
});

onShow(() => {
  console.log("App Show");
  // 回到前台时尝试重连 WebSocket
  if (getToken() && !wsConnected) {
    connectWebSocket()
  }
});

onHide(() => {
  console.log("App Hide");
});
</script>

<style></style>
