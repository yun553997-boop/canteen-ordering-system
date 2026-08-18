"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_admin = require("../../../api/admin.js");
const utils_storage = require("../../../utils/storage.js");
if (!Math) {
  CustomTabBar();
}
const CustomTabBar = () => "../../../components/CustomTabBar.js";
const pageSize = 10;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const stats = common_vendor.reactive({ totalOrders: 0, pendingPickup: 0, completed: 0 });
    const orderTabs = [
      { label: "待处理", value: "PENDING" },
      { label: "备餐中", value: "PREPARING" },
      { label: "待取餐", value: "READY" }
    ];
    const statusFilter = common_vendor.ref("PENDING");
    const orders = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const expandedOrderNo = common_vendor.ref("");
    const orderItemsMap = common_vendor.reactive({});
    const showManualVerify = common_vendor.ref(false);
    const manualVerifyCode = common_vendor.ref("");
    const STATUS_MAP = {
      PENDING: { label: "待处理", color: "#E6A23C" },
      PREPARING: { label: "备餐中", color: "#409EFF" },
      READY: { label: "待取餐", color: "#67C23A" },
      COMPLETED: { label: "已完成", color: "#909399" },
      CANCELLED: { label: "已取消", color: "#F56C6C" }
    };
    const MEAL_MAP = {
      BREAKFAST: "早餐",
      LUNCH: "午餐",
      DINNER: "晚餐"
    };
    function statusLabel(s) {
      var _a;
      return ((_a = STATUS_MAP[s]) == null ? void 0 : _a.label) || s;
    }
    function statusColor(s) {
      var _a;
      return ((_a = STATUS_MAP[s]) == null ? void 0 : _a.color) || "#999";
    }
    function mealLabel(m) {
      return MEAL_MAP[m || ""] || m || "";
    }
    common_vendor.onMounted(() => {
      const info = utils_storage.getUserInfo();
      if ((info == null ? void 0 : info.role) !== "ADMIN_CANTEEN") {
        common_vendor.index.showToast({ title: "无权限访问", icon: "none" });
        setTimeout(() => common_vendor.index.reLaunch({ url: "/pages/index/index" }), 800);
        return;
      }
      fetchStats();
      fetchOrders();
    });
    async function fetchStats() {
      try {
        const data = await api_admin.getStatisticsOverview({ period: "today" });
        if (data == null ? void 0 : data.cards) {
          stats.totalOrders = data.cards.totalOrders || 0;
          stats.pendingPickup = data.cards.pendingPickup || 0;
          stats.completed = data.cards.completed || 0;
        }
      } catch {
      }
    }
    async function fetchOrders() {
      try {
        const data = await api_admin.getOrderList({ page: page.value, pageSize, status: statusFilter.value || void 0 });
        const records = (data == null ? void 0 : data.records) || [];
        if (page.value === 1) {
          orders.value = records;
        } else {
          orders.value = [...orders.value, ...records];
        }
        hasMore.value = records.length >= pageSize;
      } catch {
        orders.value = [];
      }
    }
    function loadMore() {
      if (!hasMore.value)
        return;
      page.value++;
      fetchOrders();
    }
    async function startPrepare(order) {
      try {
        await api_admin.updateOrderStatus(order.orderNo, "PREPARING");
        common_vendor.index.showToast({ title: "已开始备餐", icon: "success" });
        page.value = 1;
        fetchOrders();
      } catch {
      }
    }
    async function finishPrepare(order) {
      try {
        await api_admin.updateOrderStatus(order.orderNo, "READY");
        common_vendor.index.showToast({ title: "备餐完成", icon: "success" });
        page.value = 1;
        fetchOrders();
      } catch {
      }
    }
    function scanVerify() {
      common_vendor.index.navigateTo({ url: "/pages/canteen/scan/index" });
    }
    function openManualVerify() {
      showManualVerify.value = true;
    }
    async function toggleExpand(order) {
      if (expandedOrderNo.value === order.orderNo) {
        expandedOrderNo.value = "";
        return;
      }
      expandedOrderNo.value = order.orderNo;
      if (!orderItemsMap[order.orderNo]) {
        try {
          const data = await api_admin.getAdminOrderDetail(order.orderNo);
          orderItemsMap[order.orderNo] = data.items || [];
        } catch {
          orderItemsMap[order.orderNo] = [];
        }
      }
    }
    function placeholder(name) {
      common_vendor.index.showToast({ title: `${name}（开发中）`, icon: "none" });
    }
    async function doManualVerify() {
      if (!manualVerifyCode.value.trim()) {
        common_vendor.index.showToast({ title: "请输入取餐码", icon: "none" });
        return;
      }
      await doVerify(manualVerifyCode.value.trim());
      showManualVerify.value = false;
      manualVerifyCode.value = "";
    }
    async function doVerify(verifyCode) {
      try {
        await api_admin.verifyByCode(verifyCode);
        common_vendor.index.showToast({ title: "核销成功", icon: "success" });
        page.value = 1;
        fetchOrders();
        fetchStats();
      } catch {
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(stats.totalOrders),
        b: common_vendor.t(stats.pendingPickup),
        c: common_vendor.t(stats.completed),
        d: common_vendor.o(scanVerify, "e2"),
        e: common_vendor.o(openManualVerify, "d9"),
        f: common_vendor.o(($event) => placeholder("核销明细"), "e3"),
        g: common_vendor.o(($event) => placeholder("售卖明细"), "d5"),
        h: common_vendor.f(orderTabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab.label),
            b: tab.value,
            c: statusFilter.value === tab.value ? 1 : "",
            d: common_vendor.o(($event) => {
              statusFilter.value = tab.value;
              page.value = 1;
              fetchOrders();
            }, tab.value)
          };
        }),
        i: common_vendor.f(orders.value, (order, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(order.orderNo.slice(-8)),
            b: common_vendor.t(statusLabel(order.status)),
            c: statusColor(order.status),
            d: common_vendor.t(expandedOrderNo.value === order.orderNo ? "⤡" : "⤢"),
            e: common_vendor.o(($event) => toggleExpand(order), order.orderNo),
            f: common_vendor.o(($event) => toggleExpand(order), order.orderNo),
            g: common_vendor.t(mealLabel(order.mealType)),
            h: common_vendor.t(((order.totalAmount || 0) / 100).toFixed(2)),
            i: common_vendor.o(($event) => toggleExpand(order), order.orderNo),
            j: order.status === "PENDING"
          }, order.status === "PENDING" ? {
            k: common_vendor.o(($event) => startPrepare(order), order.orderNo)
          } : {}, {
            l: order.status === "PREPARING"
          }, order.status === "PREPARING" ? {
            m: common_vendor.o(($event) => finishPrepare(order), order.orderNo)
          } : {}, {
            n: order.status === "READY"
          }, order.status === "READY" ? {
            o: common_vendor.t(order.verifyCode)
          } : {}, {
            p: expandedOrderNo.value === order.orderNo
          }, expandedOrderNo.value === order.orderNo ? common_vendor.e({
            q: common_vendor.f(orderItemsMap[order.orderNo] || [], (item, k1, i1) => {
              return {
                a: common_vendor.t(item.dishName),
                b: common_vendor.t(item.quantity),
                c: common_vendor.t((item.price * item.quantity / 100).toFixed(2)),
                d: item.dishId
              };
            }),
            r: !orderItemsMap[order.orderNo]
          }, !orderItemsMap[order.orderNo] ? {} : {}) : {}, {
            s: order.orderNo
          });
        }),
        j: orders.value.length === 0
      }, orders.value.length === 0 ? {} : {}, {
        k: common_vendor.o(loadMore, "52"),
        l: showManualVerify.value
      }, showManualVerify.value ? {
        m: manualVerifyCode.value,
        n: common_vendor.o(($event) => manualVerifyCode.value = $event.detail.value, "bc"),
        o: common_vendor.o(($event) => showManualVerify.value = false, "9f"),
        p: common_vendor.o(doManualVerify, "26"),
        q: common_vendor.o(() => {
        }, "25"),
        r: common_vendor.o(($event) => showManualVerify.value = false, "20")
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e1b2ab0a"]]);
wx.createPage(MiniProgramPage);
