import { d as defineComponent, a as reactive, r as ref, o as onMounted, z as getUserInfo, s as showToast, e as switchTab, _ as _export_sfc, f as createBlock, w as withCtx, i as index$g, h as openBlock, j as createVNode, u as index$i, m as createTextVNode, t as toDisplayString, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, S as ScrollView, p as normalizeStyle, v as index$x, x as createCommentVNode, Q as withModifiers, N as Input } from "./index-Db_-Zx2q.js";
import { g as getStatisticsOverview, a as getOrderList, u as updateOrderStatus, v as verifyOrder } from "./admin.Dnnlhti-.js";
import { C as CustomTabBar } from "./CustomTabBar.B_Z01zND.js";
import "./request.Dl4B2NlH.js";
const pageSize = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    __expose();
    const stats = reactive({ totalOrders: 0, pendingPickup: 0, completed: 0 });
    const orderTabs = [
      { label: "全部", value: "" },
      { label: "待处理", value: "PENDING" },
      { label: "备餐中", value: "PREPARING" },
      { label: "待取餐", value: "READY" }
    ];
    const statusFilter = ref("");
    const orders = ref([]);
    const page = ref(1);
    const hasMore = ref(true);
    const showManualVerify = ref(false);
    const manualOrderNo = ref("");
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
    onMounted(() => {
      const info = getUserInfo();
      if ((info == null ? void 0 : info.role) !== "ADMIN_CANTEEN") {
        showToast({ title: "无权限访问", icon: "none" });
        setTimeout(() => switchTab({ url: "/pages/index/index" }), 800);
        return;
      }
      fetchStats();
      fetchOrders();
    });
    async function fetchStats() {
      try {
        const data = await getStatisticsOverview({ period: "today" });
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
        const data = await getOrderList({ page: page.value, pageSize, status: statusFilter.value || void 0 });
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
        await updateOrderStatus(order.orderNo, "PREPARING");
        showToast({ title: "已开始备餐", icon: "success" });
        page.value = 1;
        fetchOrders();
      } catch {
      }
    }
    async function finishPrepare(order) {
      try {
        await updateOrderStatus(order.orderNo, "READY");
        showToast({ title: "备餐完成", icon: "success" });
        page.value = 1;
        fetchOrders();
      } catch {
      }
    }
    function scanVerify() {
      showManualVerify.value = true;
    }
    async function doManualVerify() {
      if (!manualOrderNo.value.trim()) {
        showToast({ title: "请输入订单号", icon: "none" });
        return;
      }
      await doVerify(manualOrderNo.value.trim());
      showManualVerify.value = false;
      manualOrderNo.value = "";
    }
    async function doVerify(orderNo) {
      try {
        await verifyOrder(orderNo);
        showToast({ title: "核销成功", icon: "success" });
        page.value = 1;
        fetchOrders();
        fetchStats();
      } catch {
      }
    }
    const __returned__ = { stats, orderTabs, statusFilter, orders, page, pageSize, hasMore, showManualVerify, manualOrderNo, STATUS_MAP, MEAL_MAP, statusLabel, statusColor, mealLabel, fetchStats, fetchOrders, loadMore, startPrepare, finishPrepare, scanVerify, doManualVerify, doVerify, CustomTabBar };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_v_uni_button = index$x;
  const _component_v_uni_scroll_view = ScrollView;
  const _component_v_uni_input = Input;
  return openBlock(), createBlock(_component_v_uni_view, { class: "workbench" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "stats-row" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "stat-card" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "stat-num" }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.stats.totalOrders),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "stat-label" }, {
                default: withCtx(() => [
                  createTextVNode("今日订单")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_view, { class: "stat-card pending" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "stat-num" }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.stats.pendingPickup),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "stat-label" }, {
                default: withCtx(() => [
                  createTextVNode("待取餐")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_view, { class: "stat-card done" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "stat-num" }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.stats.completed),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "stat-label" }, {
                default: withCtx(() => [
                  createTextVNode("已完成")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_v_uni_view, { class: "order-tabs" }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(
            Fragment,
            null,
            renderList($setup.orderTabs, (tab) => {
              return createVNode(_component_v_uni_view, {
                key: tab.value,
                class: normalizeClass(["order-tab", { active: $setup.statusFilter === tab.value }]),
                onClick: ($event) => {
                  $setup.statusFilter = tab.value;
                  $setup.page = 1;
                  $setup.fetchOrders();
                }
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(tab.label),
                    1
                    /* TEXT */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["class", "onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_v_uni_scroll_view, {
        class: "order-list",
        "scroll-y": "",
        onScrolltolower: $setup.loadMore
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.orders, (order) => {
              return openBlock(), createBlock(
                _component_v_uni_view,
                {
                  key: order.orderNo,
                  class: "order-card"
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _component_v_uni_view,
                      { class: "order-header" },
                      {
                        default: withCtx(() => [
                          createVNode(
                            _component_v_uni_text,
                            { class: "order-no" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  "#" + toDisplayString(order.orderNo.slice(-8)),
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
                          createVNode(_component_v_uni_text, {
                            class: "order-status",
                            style: normalizeStyle({ color: $setup.statusColor(order.status) })
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString($setup.statusLabel(order.status)),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["style"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    ),
                    createVNode(
                      _component_v_uni_view,
                      { class: "order-body" },
                      {
                        default: withCtx(() => [
                          createVNode(
                            _component_v_uni_text,
                            { class: "order-meal" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString($setup.mealLabel(order.mealType)),
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
                            { class: "order-amount" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  "¥" + toDisplayString((order.totalAmount || 0).toFixed(2)),
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
                      _component_v_uni_view,
                      { class: "order-actions" },
                      {
                        default: withCtx(() => [
                          order.status === "PENDING" ? (openBlock(), createBlock(_component_v_uni_button, {
                            key: 0,
                            class: "action-btn primary",
                            size: "mini",
                            onClick: ($event) => $setup.startPrepare(order)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 开始备餐 ")
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["onClick"])) : createCommentVNode("v-if", true),
                          order.status === "PREPARING" ? (openBlock(), createBlock(_component_v_uni_button, {
                            key: 1,
                            class: "action-btn success",
                            size: "mini",
                            onClick: ($event) => $setup.finishPrepare(order)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 备餐完成 ")
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["onClick"])) : createCommentVNode("v-if", true),
                          order.status === "READY" ? (openBlock(), createBlock(_component_v_uni_button, {
                            key: 2,
                            class: "action-btn warning",
                            size: "mini",
                            onClick: $setup.scanVerify
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 扫码核销 ")
                            ]),
                            _: 1
                            /* STABLE */
                          })) : createCommentVNode("v-if", true),
                          order.status === "PENDING" || order.status === "READY" ? (openBlock(), createBlock(
                            _component_v_uni_text,
                            {
                              key: 3,
                              class: "verify-hint"
                            },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(order.verifyCode),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )) : createCommentVNode("v-if", true)
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
              );
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $setup.orders.length === 0 ? (openBlock(), createBlock(_component_v_uni_view, {
            key: 0,
            class: "empty-tip"
          }, {
            default: withCtx(() => [
              createTextVNode("暂无订单")
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }),
      $setup.showManualVerify ? (openBlock(), createBlock(_component_v_uni_view, {
        key: 0,
        class: "modal-mask",
        onClick: _cache[3] || (_cache[3] = ($event) => $setup.showManualVerify = false)
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, {
            class: "modal-box",
            onClick: _cache[2] || (_cache[2] = withModifiers(() => {
            }, ["stop"]))
          }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "modal-title" }, {
                default: withCtx(() => [
                  createTextVNode("手动核销")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_input, {
                modelValue: $setup.manualOrderNo,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.manualOrderNo = $event),
                class: "modal-input",
                placeholder: "请输入订单号"
              }, null, 8, ["modelValue"]),
              createVNode(_component_v_uni_view, { class: "modal-btns" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_button, {
                    class: "modal-btn cancel",
                    size: "mini",
                    onClick: _cache[1] || (_cache[1] = ($event) => $setup.showManualVerify = false)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_button, {
                    class: "modal-btn confirm",
                    size: "mini",
                    onClick: $setup.doManualVerify
                  }, {
                    default: withCtx(() => [
                      createTextVNode("确认核销")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createVNode($setup["CustomTabBar"])
    ]),
    _: 1
    /* STABLE */
  });
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e1b2ab0a"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/pages/canteen/workbench/index.vue"]]);
export {
  index as default
};
