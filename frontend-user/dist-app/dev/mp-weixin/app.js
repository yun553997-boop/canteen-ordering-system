"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_storage = require("./utils/storage.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/mine/mine.js";
  "./pages/wallet/index.js";
  "./pages/notification/list.js";
  "./pages/login/index.js";
  "./pages/login/canteen.js";
  "./pages/order/list.js";
  "./pages/order/detail.js";
  "./pages/canteen/workbench/index.js";
  "./pages/canteen/dish/index.js";
  "./pages/canteen/scan/index.js";
}
const BASE_URL = "http://192.168.126.220:8000/api/v1";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    function getWsUrl(token) {
      return "ws://192.168.126.220:8000/ws?token=" + token;
    }
    let wsConnected = false;
    function connectWebSocket() {
      const token = utils_storage.getToken();
      if (!token || wsConnected)
        return;
      common_vendor.index.connectSocket({
        url: getWsUrl(token),
        success: () => {
          console.log("[WS] connecting...");
        },
        fail: (err) => {
          console.error("[WS] connect fail:", err);
        }
      });
    }
    common_vendor.index.onSocketOpen(() => {
      console.log("[WS] connected");
      wsConnected = true;
    });
    common_vendor.index.onSocketMessage((res) => {
      console.log("[WS] message:", res.data);
      try {
        const msg = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
        if (msg.type === "ORDER_STATUS_CHANGE") {
          if (msg.status === "COMPLETED") {
            common_vendor.index.showToast({ title: "就餐愉快", icon: "success", duration: 3e3 });
          } else {
            common_vendor.index.showToast({ title: msg.message || "订单状态已更新", icon: "none", duration: 3e3 });
          }
        } else if (msg.type === "NEW_ORDER") {
          common_vendor.index.showToast({ title: msg.message || "有新订单", icon: "none", duration: 3e3 });
        } else if (msg.type === "ORDER_EXPIRED") {
          common_vendor.index.showToast({ title: msg.message || "订单已超时作废", icon: "none", duration: 3e3 });
        } else if (msg.type === "ORDER_REMIND") {
          common_vendor.index.showToast({ title: msg.message || "请尽快前来取餐", icon: "none", duration: 4e3 });
        }
      } catch {
      }
    });
    common_vendor.index.onSocketError((err) => {
      console.error("[WS] error:", err);
      wsConnected = false;
    });
    common_vendor.index.onSocketClose(() => {
      console.log("[WS] closed");
      wsConnected = false;
      setTimeout(() => {
        if (utils_storage.getToken()) {
          connectWebSocket();
        }
      }, 5e3);
    });
    common_vendor.onLaunch(() => {
      console.log("App Launch");
      const token = utils_storage.getToken();
      if (token) {
        common_vendor.index.request({
          url: BASE_URL + "/auth/me",
          method: "GET",
          header: { "canteen-token": token },
          success: (res) => {
            var _a;
            if (((_a = res.data) == null ? void 0 : _a.code) !== 200) {
              utils_storage.removeToken();
            } else {
              connectWebSocket();
            }
          },
          fail: () => {
          }
        });
      }
    });
    common_vendor.onShow(() => {
      console.log("App Show");
      if (utils_storage.getToken() && !wsConnected) {
        connectWebSocket();
      }
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
