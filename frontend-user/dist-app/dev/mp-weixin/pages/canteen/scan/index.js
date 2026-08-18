"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_admin = require("../../../api/admin.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.ref("");
    async function doVerify(orderNo) {
      if (!orderNo) {
        common_vendor.index.showToast({ title: "未识别到订单号", icon: "none" });
        return;
      }
      try {
        await api_admin.verifyOrder(orderNo);
        common_vendor.index.showToast({ title: "核销成功", icon: "success" });
        setTimeout(() => common_vendor.index.navigateBack(), 1e3);
      } catch {
      }
    }
    function startScan() {
      common_vendor.index.scanCode({
        scanType: ["qrCode", "barCode"],
        success: (res) => {
          var _a;
          const orderNo = (_a = res.result) == null ? void 0 : _a.trim();
          doVerify(orderNo);
        },
        fail: () => {
          common_vendor.index.showToast({ title: "扫码取消", icon: "none" });
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(startScan, "21")
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c201b1e1"]]);
wx.createPage(MiniProgramPage);
