import { d as defineComponent, r as ref, y as onShow, H as onPullDownRefresh, I as stopPullDownRefresh, B as navigateTo, _ as _export_sfc, f as createBlock, w as withCtx, i as index$g, h as openBlock, j as createVNode, u as index$i, m as createTextVNode, x as createCommentVNode, k as createElementBlock, F as Fragment, l as renderList, t as toDisplayString, n as normalizeClass } from "./index-Db_-Zx2q.js";
import { a as getOrderList } from "./user.BfKOqEu7.js";
import { C as CustomTabBar } from "./CustomTabBar.B_Z01zND.js";
import "./request.Dl4B2NlH.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list",
  setup(__props, { expose: __expose }) {
    __expose();
    const orders = ref([]);
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
        CANCELLED: "已取消"
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
        const data = await getOrderList();
        orders.value = data || [];
      } catch {
        orders.value = [];
      }
    }
    function goDetail(orderNo) {
      navigateTo({ url: "/pages/order/detail?orderNo=" + orderNo });
    }
    onShow(() => {
      fetchOrders();
    });
    onPullDownRefresh(async () => {
      await fetchOrders();
      stopPullDownRefresh();
    });
    const __returned__ = { orders, mealLabelMap, mealLabel, statusLabel, statusClass, fetchOrders, goDetail, CustomTabBar };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  return openBlock(), createBlock(_component_v_uni_view, { class: "order-list-container" }, {
    default: withCtx(() => [
      $setup.orders.length === 0 ? (openBlock(), createBlock(_component_v_uni_view, {
        key: 0,
        class: "empty-tip"
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "empty-icon" }, {
            default: withCtx(() => [
              createTextVNode("📋")
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_text, { class: "empty-text" }, {
            default: withCtx(() => [
              createTextVNode("暂无订单")
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_text, { class: "empty-sub" }, {
            default: withCtx(() => [
              createTextVNode("快去点餐吧～")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.orders, (item) => {
          return openBlock(), createBlock(_component_v_uni_view, {
            key: item.orderNo,
            class: "order-card",
            onClick: ($event) => $setup.goDetail(item.orderNo)
          }, {
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
                            "# " + toDisplayString(item.orderNo.slice(-8)),
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
                    createVNode(_component_v_uni_view, {
                      class: normalizeClass(["order-status", $setup.statusClass(item.status)])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString($setup.statusLabel(item.status)),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["class"])
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
                      _component_v_uni_view,
                      { class: "order-meta" },
                      {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "meta-label" }, {
                            default: withCtx(() => [
                              createTextVNode("餐次")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(
                            _component_v_uni_text,
                            { class: "meta-value" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString($setup.mealLabel(item.mealType)),
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
                      { class: "order-meta" },
                      {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "meta-label" }, {
                            default: withCtx(() => [
                              createTextVNode("金额")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(
                            _component_v_uni_text,
                            { class: "meta-value price" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  "¥" + toDisplayString((item.totalAmount * 1).toFixed(2)),
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
                      { class: "order-meta" },
                      {
                        default: withCtx(() => [
                          createVNode(_component_v_uni_text, { class: "meta-label" }, {
                            default: withCtx(() => [
                              createTextVNode("时间")
                            ]),
                            _: 1
                            /* STABLE */
                          }),
                          createVNode(
                            _component_v_uni_text,
                            { class: "meta-value" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(item.createTime),
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
                },
                1024
                /* DYNAMIC_SLOTS */
              ),
              createVNode(_component_v_uni_view, { class: "order-footer" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, { class: "arrow" }, {
                    default: withCtx(() => [
                      createTextVNode("查看详情 →")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      createVNode($setup["CustomTabBar"])
    ]),
    _: 1
    /* STABLE */
  });
}
const list = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-80f8e5f8"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/pages/order/list.vue"]]);
export {
  list as default
};
