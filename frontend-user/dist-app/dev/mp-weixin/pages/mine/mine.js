"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
const api_notification = require("../../api/notification.js");
const api_auth = require("../../api/auth.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    const username = common_vendor.ref("未登录");
    const phone = common_vendor.ref("");
    const role = common_vendor.ref("");
    const unreadCount = common_vendor.ref(0);
    const isLoggedIn = common_vendor.ref(false);
    const avatarLetter = common_vendor.computed(() => {
      return username.value ? username.value.charAt(0).toUpperCase() : "U";
    });
    const maskedPhone = common_vendor.computed(() => {
      const p = phone.value;
      if (p && p.length === 11) {
        return p.substring(0, 3) + "****" + p.substring(7);
      }
      return p || "";
    });
    async function loadUserInfo() {
      const token = utils_storage.getToken();
      if (!token)
        return;
      const cached = utils_storage.getUserInfo();
      if (cached) {
        username.value = cached.username;
        phone.value = cached.phone || "";
        role.value = cached.role || "";
      }
      try {
        const data = await api_auth.getCurrentUser();
        if (data) {
          username.value = data.username;
          phone.value = data.phone || "";
          role.value = data.role || "";
          utils_storage.setUserInfo(data);
        }
      } catch {
      }
    }
    async function loadUnread() {
      const token = utils_storage.getToken();
      if (!token)
        return;
      try {
        const data = await api_notification.getUnreadCount();
        unreadCount.value = data.count || 0;
      } catch {
      }
    }
    function goNotifications() {
      common_vendor.index.navigateTo({ url: "/pages/notification/list" });
    }
    function goWallet() {
      common_vendor.index.navigateTo({ url: "/pages/wallet/index" });
    }
    function goLogin() {
      common_vendor.index.reLaunch({ url: "/pages/login/index" });
    }
    function placeholder(name) {
      common_vendor.index.showToast({ title: `${name}（开发中）`, icon: "none" });
    }
    function handleLogout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            utils_storage.removeToken();
            utils_storage.removeUserInfo();
            unreadCount.value = 0;
            username.value = "未登录";
            common_vendor.index.reLaunch({ url: "/pages/login/index" });
          }
        }
      });
    }
    common_vendor.onShow(() => {
      isLoggedIn.value = !!utils_storage.getToken();
      loadUserInfo();
      loadUnread();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(avatarLetter.value),
        b: common_vendor.t(username.value),
        c: role.value === "ADMIN_CANTEEN"
      }, role.value === "ADMIN_CANTEEN" ? {} : {}, {
        d: common_vendor.t(maskedPhone.value),
        e: unreadCount.value > 0
      }, unreadCount.value > 0 ? {
        f: common_vendor.t(unreadCount.value > 99 ? "99+" : unreadCount.value)
      } : {}, {
        g: common_vendor.o(goNotifications, "8e"),
        h: common_vendor.o(goWallet, "94"),
        i: common_vendor.o(($event) => placeholder("活动中心"), "9c"),
        j: isLoggedIn.value
      }, isLoggedIn.value ? {
        k: common_vendor.o(handleLogout, "ad")
      } : {
        l: common_vendor.o(goLogin, "60")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d41d38da"]]);
wx.createPage(MiniProgramPage);
