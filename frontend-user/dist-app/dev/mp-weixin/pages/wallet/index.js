"use strict";
const common_vendor = require("../../common/vendor.js");
const api_wallet = require("../../api/wallet.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const AMOUNTS = [50, 100, 200, 500];
    const balance = common_vendor.ref(0);
    const selectedAmount = common_vendor.ref(null);
    const showPaySheet = common_vendor.ref(false);
    const showRefundSheet = common_vendor.ref(false);
    const refundAmount = common_vendor.ref("");
    const refundChannel = common_vendor.ref(null);
    async function loadBalance() {
      try {
        const data = await api_wallet.getWalletBalance();
        balance.value = data.balance ?? 0;
      } catch {
      }
    }
    function openRecharge() {
      if (selectedAmount.value === null) {
        common_vendor.index.showToast({ title: "请先选择充值金额", icon: "none" });
        return;
      }
      showPaySheet.value = true;
    }
    function choosePay() {
      showPaySheet.value = false;
      doRecharge();
    }
    function doRecharge() {
      const amount = selectedAmount.value;
      common_vendor.index.showLoading({ title: "支付加载中...", mask: true });
      setTimeout(async () => {
        try {
          const data = await api_wallet.rechargeWallet(amount * 100);
          balance.value = data.balance ?? balance.value + amount * 100;
          common_vendor.index.showToast({ title: "充值成功", icon: "success" });
        } catch {
        } finally {
          common_vendor.index.hideLoading();
        }
      }, 1500);
    }
    function applyRefund() {
      showRefundSheet.value = true;
    }
    async function confirmRefund() {
      const amount = parseFloat(refundAmount.value);
      if (!amount || amount <= 0) {
        common_vendor.index.showToast({ title: "请输入退款金额", icon: "none" });
        return;
      }
      if (!refundChannel.value) {
        common_vendor.index.showToast({ title: "请选择退款方式", icon: "none" });
        return;
      }
      common_vendor.index.showLoading({ title: "退款处理中...", mask: true });
      try {
        const data = await api_wallet.withdrawWallet(Math.round(amount * 100), refundChannel.value);
        balance.value = data.balance ?? 0;
        common_vendor.index.showToast({ title: "退款成功", icon: "success" });
        showRefundSheet.value = false;
        refundAmount.value = "";
        refundChannel.value = null;
      } catch {
      } finally {
        common_vendor.index.hideLoading();
      }
    }
    common_vendor.onShow(() => {
      loadBalance();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t((balance.value / 100).toFixed(2)),
        b: common_vendor.f(AMOUNTS, (a, k0, i0) => {
          return {
            a: common_vendor.t(a),
            b: a,
            c: selectedAmount.value === a ? 1 : "",
            d: common_vendor.o(($event) => selectedAmount.value = a, a)
          };
        }),
        c: common_vendor.o(openRecharge, "97"),
        d: common_vendor.o(applyRefund, "d6"),
        e: showPaySheet.value
      }, showPaySheet.value ? {
        f: common_vendor.o(choosePay, "5c"),
        g: common_vendor.o(choosePay, "e1"),
        h: common_vendor.o(($event) => showPaySheet.value = false, "45"),
        i: common_vendor.o(() => {
        }, "f6"),
        j: common_vendor.o(($event) => showPaySheet.value = false, "ec")
      } : {}, {
        k: showRefundSheet.value
      }, showRefundSheet.value ? {
        l: refundAmount.value,
        m: common_vendor.o(($event) => refundAmount.value = $event.detail.value, "1e"),
        n: refundChannel.value === "WECHAT" ? 1 : "",
        o: common_vendor.o(($event) => refundChannel.value = "WECHAT", "62"),
        p: refundChannel.value === "ALIPAY" ? 1 : "",
        q: common_vendor.o(($event) => refundChannel.value = "ALIPAY", "74"),
        r: common_vendor.o(confirmRefund, "55"),
        s: common_vendor.o(($event) => showRefundSheet.value = false, "0e"),
        t: common_vendor.o(() => {
        }, "81"),
        v: common_vendor.o(($event) => showRefundSheet.value = false, "ec")
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9914b066"]]);
wx.createPage(MiniProgramPage);
