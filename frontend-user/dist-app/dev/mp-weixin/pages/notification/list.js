"use strict";
const common_vendor = require("../../common/vendor.js");
const api_notification = require("../../api/notification.js");
const pageSize = 20;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "list",
  setup(__props) {
    const list = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const currentPage = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    function formatTime(time) {
      if (!time)
        return "";
      return time.replace("T", " ").substring(0, 16);
    }
    async function fetchData(reset = false) {
      if (loading.value)
        return;
      loading.value = true;
      if (reset) {
        currentPage.value = 1;
        hasMore.value = true;
      }
      try {
        const data = await api_notification.getNotifications(currentPage.value, pageSize);
        const records = data.records || [];
        if (reset) {
          list.value = records;
        } else {
          list.value = [...list.value, ...records];
        }
        hasMore.value = records.length >= pageSize;
      } catch {
      } finally {
        loading.value = false;
      }
    }
    async function handleItemClick(item) {
      if (item.isRead === 0) {
        try {
          await api_notification.markRead(item.id);
          item.isRead = 1;
        } catch {
        }
      }
    }
    async function handleMarkAll() {
      try {
        await api_notification.markAllRead();
        list.value.forEach((item) => {
          item.isRead = 1;
        });
        common_vendor.index.showToast({ title: "已全部标记为已读", icon: "success" });
      } catch {
      }
    }
    async function loadMore() {
      if (!hasMore.value || loading.value)
        return;
      currentPage.value++;
      await fetchData();
    }
    common_vendor.onShow(() => {
      fetchData(true);
    });
    common_vendor.onPullDownRefresh(async () => {
      await fetchData(true);
      common_vendor.index.stopPullDownRefresh();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: list.value.length > 0
      }, list.value.length > 0 ? {
        b: common_vendor.o(handleMarkAll, "36")
      } : {}, {
        c: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.isRead === 0
          }, item.isRead === 0 ? {} : {}, {
            b: common_vendor.t(item.title),
            c: common_vendor.t(formatTime(item.createTime)),
            d: common_vendor.t(item.content),
            e: item.id,
            f: item.isRead === 0 ? 1 : "",
            g: common_vendor.o(($event) => handleItemClick(item), item.id)
          });
        }),
        d: list.value.length === 0 && !loading.value
      }, list.value.length === 0 && !loading.value ? {} : {}, {
        e: hasMore.value && list.value.length > 0
      }, hasMore.value && list.value.length > 0 ? {
        f: common_vendor.o(loadMore, "30")
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f50c1698"]]);
wx.createPage(MiniProgramPage);
