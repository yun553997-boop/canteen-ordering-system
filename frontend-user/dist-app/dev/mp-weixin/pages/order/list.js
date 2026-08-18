"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "list",
  setup(__props) {
    const orders = common_vendor.ref([]);
    const mealLabelMap = {
      BREAKFAST: "早餐",
      LUNCH: "午餐",
      DINNER: "晚餐"
    };
    const mealLabel = (val) => mealLabelMap[val] || val;
    const statusLabel = (val) => {
      const map = {
        PENDING: "待确认",
        PREPARING: "制作中",
        READY: "待取餐",
        COMPLETED: "已完成",
        CANCELLED: "已取消",
        EXPIRED: "已作废"
      };
      return map[val] || val;
    };
    const statusClass = (val) => {
      const map = {
        PENDING: "status-pending",
        PREPARING: "status-preparing",
        READY: "status-ready",
        COMPLETED: "status-done"
      };
      return map[val] || "";
    };
    async function fetchOrders() {
      try {
        const data = await api_user.getOrderList();
        orders.value = data || [];
      } catch {
        orders.value = [];
      }
    }
    function goDetail(orderNo) {
      common_vendor.index.navigateTo({ url: "/pages/order/detail?orderNo=" + orderNo });
    }
    common_vendor.onShow(() => {
      fetchOrders();
    });
    common_vendor.onPullDownRefresh(async () => {
      await fetchOrders();
      common_vendor.index.stopPullDownRefresh();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: orders.value.length === 0
      }, orders.value.length === 0 ? {} : {}, {
        b: common_vendor.f(orders.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.orderNo.slice(-8)),
            b: common_vendor.t(statusLabel(item.status)),
            c: common_vendor.n(statusClass(item.status)),
            d: common_vendor.t(mealLabel(item.mealType)),
            e: common_vendor.t((item.totalAmount / 100).toFixed(2)),
            f: common_vendor.t(item.createTime),
            g: item.orderNo,
            h: common_vendor.o(($event) => goDetail(item.orderNo), item.orderNo)
          };
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80f8e5f8"]]);
wx.createPage(MiniProgramPage);
