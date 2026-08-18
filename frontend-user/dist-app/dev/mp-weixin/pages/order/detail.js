"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const statusLabels = {
      PREPARING: "制作中",
      READY: "待取餐",
      COMPLETED: "已完成",
      EXPIRED: "已作废"
    };
    const order = common_vendor.reactive({
      orderNo: "",
      status: "",
      createTime: "",
      items: []
    });
    const totalAmount = common_vendor.ref("0.00");
    const mealLabelMap = {
      BREAKFAST: "早餐",
      LUNCH: "午餐",
      DINNER: "晚餐"
    };
    const mealTypeLabel = common_vendor.ref("");
    const steps = common_vendor.reactive([
      { label: "已下单", done: false, current: false },
      { label: "制作中", done: false, current: false },
      { label: "待取餐", done: false, current: false },
      { label: "已取餐", done: false, current: false }
    ]);
    const statusText = common_vendor.computed(() => {
      const map = {
        PENDING: "等待制作",
        PREPARING: "制作中",
        READY: "制作完成",
        COMPLETED: "已取餐",
        CANCELLED: "已取消",
        EXPIRED: "已作废"
      };
      return map[order.status] || order.status || "加载中...";
    });
    const statusDesc = common_vendor.computed(() => {
      const map = {
        PENDING: "您的订单已提交，请耐心等待",
        PREPARING: "厨师正在为您精心制作",
        READY: "请前往取餐窗口取餐",
        COMPLETED: "感谢您的光临",
        EXPIRED: "订单已超时未取餐，已作废"
      };
      return map[order.status] || "";
    });
    const pickupCode = common_vendor.computed(() => {
      if (order.status !== "READY")
        return "";
      return rawVerifyCode || rawOrderNo.slice(-4);
    });
    const qrImageUrl = common_vendor.ref("");
    let rawVerifyCode = "";
    let rawOrderNo = "";
    function updateSteps(status) {
      const map = {
        PENDING: 0,
        PREPARING: 1,
        READY: 2,
        COMPLETED: 3
      };
      const activeIdx = map[status] ?? -1;
      for (let i = 0; i < steps.length; i++) {
        steps[i].done = i < activeIdx;
        steps[i].current = i === activeIdx;
      }
      if (activeIdx === 3) {
        steps[3].done = true;
        steps[3].current = false;
      }
    }
    async function fetchDetail() {
      try {
        const data = await api_user.getOrderDetail(rawOrderNo);
        const bizOrder = data.order;
        order.orderNo = bizOrder.orderNo;
        order.status = bizOrder.status;
        order.createTime = bizOrder.createTime;
        order.items = data.items || [];
        totalAmount.value = ((bizOrder.totalAmount || 0) / 100).toFixed(2);
        mealTypeLabel.value = mealLabelMap[bizOrder.mealType] || bizOrder.mealType || "";
        rawVerifyCode = bizOrder.verifyCode || "";
        updateSteps(bizOrder.status);
        if (bizOrder.status === "READY" && bizOrder.orderNo) {
          const text = encodeURIComponent(bizOrder.orderNo);
          qrImageUrl.value = "http://192.168.126.220:8000/api/v1/common/qrcode?text=" + text;
        } else {
          qrImageUrl.value = "";
        }
      } catch {
      }
    }
    function handleCancel() {
      common_vendor.index.showModal({
        title: "取消订单",
        content: "确定要取消该订单吗？取消后不可恢复",
        success: async (res) => {
          if (res.confirm) {
            try {
              await api_user.cancelOrder(rawOrderNo);
              common_vendor.index.showToast({ title: "订单已取消", icon: "success" });
              fetchDetail();
            } catch {
            }
          }
        }
      });
    }
    let pollTimer = null;
    let previousStatus = "";
    common_vendor.onLoad((options) => {
      rawOrderNo = options.orderNo || "";
      if (rawOrderNo) {
        fetchDetail().then(() => {
          previousStatus = order.status;
        });
        pollTimer = setInterval(async () => {
          await fetchDetail();
          if (order.status !== previousStatus) {
            if (order.status === "COMPLETED") {
              common_vendor.index.showToast({ title: "就餐愉快", icon: "success", duration: 3e3 });
            } else {
              const label = statusLabels[order.status] || order.status;
              common_vendor.index.showToast({
                title: `订单状态已更新：${label}`,
                icon: "none",
                duration: 3e3
              });
            }
            previousStatus = order.status;
          }
        }, 8e3);
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      if (rawOrderNo) {
        await fetchDetail();
      }
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onUnload(() => {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: order.status === "PENDING"
      }, order.status === "PENDING" ? {} : order.status === "PREPARING" ? {} : order.status === "READY" ? {} : order.status === "COMPLETED" ? {} : {}, {
        b: order.status === "PREPARING",
        c: order.status === "READY",
        d: order.status === "COMPLETED",
        e: common_vendor.t(statusText.value),
        f: common_vendor.t(statusDesc.value),
        g: common_vendor.f(steps, (step, idx, i0) => {
          return common_vendor.e({
            a: step.done
          }, step.done ? {} : {
            b: common_vendor.t(idx + 1)
          }, {
            c: common_vendor.t(step.label),
            d: idx < steps.length - 1
          }, idx < steps.length - 1 ? {
            e: step.done ? 1 : ""
          } : {}, {
            f: idx,
            g: step.done ? 1 : "",
            h: step.current ? 1 : ""
          });
        }),
        h: pickupCode.value
      }, pickupCode.value ? common_vendor.e({
        i: qrImageUrl.value
      }, qrImageUrl.value ? {
        j: qrImageUrl.value
      } : {}, {
        k: common_vendor.t(pickupCode.value)
      }) : {}, {
        l: common_vendor.f(order.items, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.dishName),
            b: common_vendor.t(item.quantity),
            c: common_vendor.t((item.price * item.quantity / 100).toFixed(2)),
            d: item.dishId
          };
        }),
        m: common_vendor.t(totalAmount.value),
        n: common_vendor.t(order.orderNo),
        o: common_vendor.t(order.createTime),
        p: common_vendor.t(mealTypeLabel.value),
        q: order.status === "PENDING"
      }, order.status === "PENDING" ? {
        r: common_vendor.o(handleCancel, "b4")
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5511cfa9"]]);
wx.createPage(MiniProgramPage);
