import { d as defineComponent, r as ref, y as onShow, H as onPullDownRefresh, I as stopPullDownRefresh, s as showToast, _ as _export_sfc, f as createBlock, w as withCtx, i as index$g, h as openBlock, j as createVNode, u as index$i, m as createTextVNode, x as createCommentVNode, S as ScrollView, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, t as toDisplayString } from "./index-Db_-Zx2q.js";
import { a as getNotifications, m as markRead, b as markAllRead } from "./notification.BA7ssBbT.js";
import "./request.Dl4B2NlH.js";
const pageSize = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list",
  setup(__props, { expose: __expose }) {
    __expose();
    const list2 = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const hasMore = ref(true);
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
        const data = await getNotifications(currentPage.value, pageSize);
        const records = data.records || [];
        if (reset) {
          list2.value = records;
        } else {
          list2.value = [...list2.value, ...records];
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
          await markRead(item.id);
          item.isRead = 1;
        } catch {
        }
      }
    }
    async function handleMarkAll() {
      try {
        await markAllRead();
        list2.value.forEach((item) => {
          item.isRead = 1;
        });
        showToast({ title: "已全部标记为已读", icon: "success" });
      } catch {
      }
    }
    async function loadMore() {
      if (!hasMore.value || loading.value)
        return;
      currentPage.value++;
      await fetchData();
    }
    onShow(() => {
      fetchData(true);
    });
    onPullDownRefresh(async () => {
      await fetchData(true);
      stopPullDownRefresh();
    });
    const __returned__ = { list: list2, loading, currentPage, hasMore, pageSize, formatTime, fetchData, handleItemClick, handleMarkAll, loadMore };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_v_uni_scroll_view = ScrollView;
  return openBlock(), createBlock(_component_v_uni_view, { class: "notif-container" }, {
    default: withCtx(() => [
      $setup.list.length > 0 ? (openBlock(), createBlock(_component_v_uni_view, {
        key: 0,
        class: "notif-toolbar"
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "toolbar-title" }, {
            default: withCtx(() => [
              createTextVNode("消息通知")
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_text, {
            class: "toolbar-action",
            onClick: $setup.handleMarkAll
          }, {
            default: withCtx(() => [
              createTextVNode("全部已读")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createVNode(_component_v_uni_scroll_view, {
        class: "notif-list",
        "scroll-y": "",
        style: { height: "100vh" }
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.list, (item) => {
              return openBlock(), createBlock(_component_v_uni_view, {
                key: item.id,
                class: normalizeClass(["notif-item", { unread: item.isRead === 0 }]),
                onClick: ($event) => $setup.handleItemClick(item)
              }, {
                default: withCtx(() => [
                  createVNode(
                    _component_v_uni_view,
                    { class: "notif-left" },
                    {
                      default: withCtx(() => [
                        item.isRead === 0 ? (openBlock(), createBlock(_component_v_uni_view, {
                          key: 0,
                          class: "unread-dot"
                        })) : (openBlock(), createBlock(_component_v_uni_view, {
                          key: 1,
                          class: "read-dot"
                        }))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  createVNode(
                    _component_v_uni_view,
                    { class: "notif-body" },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _component_v_uni_view,
                          { class: "notif-top" },
                          {
                            default: withCtx(() => [
                              createVNode(
                                _component_v_uni_text,
                                { class: "notif-title" },
                                {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      toDisplayString(item.title),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              ),
                              createVNode(
                                _component_v_uni_text,
                                { class: "notif-time" },
                                {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      toDisplayString($setup.formatTime(item.createTime)),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        ),
                        createVNode(
                          _component_v_uni_text,
                          { class: "notif-content" },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(item.content),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["class", "onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.list.length === 0 && !$setup.loading ? (openBlock(), createBlock(_component_v_uni_view, {
            key: 0,
            class: "empty-tip"
          }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "empty-icon" }, {
                default: withCtx(() => [
                  createTextVNode("📭")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "empty-text" }, {
                default: withCtx(() => [
                  createTextVNode("暂无通知")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true),
          $setup.hasMore && $setup.list.length > 0 ? (openBlock(), createBlock(_component_v_uni_view, {
            key: 1,
            class: "load-more",
            onClick: $setup.loadMore
          }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "load-text" }, {
                default: withCtx(() => [
                  createTextVNode("加载更多")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      })
    ]),
    _: 1
    /* STABLE */
  });
}
const list = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f50c1698"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/pages/notification/list.vue"]]);
export {
  list as default
};
