"use strict";
const common_vendor = require("../common/vendor.js");
const utils_storage = require("../utils/storage.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomTabBar",
  setup(__props) {
    var _a;
    const currentPath = common_vendor.ref("");
    const pages = getCurrentPages();
    if (pages.length > 0) {
      const route = pages[pages.length - 1].route;
      currentPath.value = "/" + route;
    }
    const userTabs = [
      { path: "/pages/index/index", label: "点餐", icon: "🍽️" },
      { path: "/pages/order/list", label: "订单", icon: "📋" },
      { path: "/pages/mine/mine", label: "我的", icon: "👤" }
    ];
    const adminTabs = [
      { path: "/pages/canteen/workbench/index", label: "工作台", icon: "📊" },
      { path: "/pages/canteen/dish/index", label: "菜品管理", icon: "🍳" },
      { path: "/pages/mine/mine", label: "我的", icon: "👤" }
    ];
    const role = common_vendor.computed(() => {
      const info = utils_storage.getUserInfo();
      return (info == null ? void 0 : info.role) || "";
    });
    const tabs = common_vendor.computed(() => {
      return role.value === "ADMIN_CANTEEN" ? adminTabs : userTabs;
    });
    const safeBottom = common_vendor.ref(0);
    try {
      const info = common_vendor.index.getSystemInfoSync();
      safeBottom.value = ((_a = info.safeAreaInsets) == null ? void 0 : _a.bottom) || 0;
    } catch {
    }
    function switchTab(tab) {
      common_vendor.index.reLaunch({ url: tab.path });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs.value, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab.icon),
            b: common_vendor.t(tab.label),
            c: currentPath.value === tab.path ? 1 : "",
            d: tab.path,
            e: common_vendor.o(($event) => switchTab(tab), tab.path)
          };
        }),
        b: safeBottom.value + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55a48eff"]]);
wx.createComponent(Component);
