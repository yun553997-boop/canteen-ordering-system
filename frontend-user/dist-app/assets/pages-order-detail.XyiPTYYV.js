import { d as defineComponent, a as reactive, r as ref, c as computed, O as onLoad, s as showToast, H as onPullDownRefresh, I as stopPullDownRefresh, P as onUnload, _ as _export_sfc, f as createBlock, w as withCtx, i as index$g, h as openBlock, j as createVNode, u as index$i, m as createTextVNode, t as toDisplayString, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, x as createCommentVNode } from "./index-Db_-Zx2q.js";
import { b as getOrderDetail } from "./user.BfKOqEu7.js";
import "./request.Dl4B2NlH.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "detail",
  setup(__props, { expose: __expose }) {
    __expose();
    const statusLabels = {
      PREPARING: "制作中",
      READY: "待取餐",
      COMPLETED: "已完成"
    };
    const order = reactive({
      orderNo: "",
      status: "",
      createTime: "",
      items: []
    });
    const totalAmount = ref("0.00");
    const mealLabelMap = {
      BREAKFAST: "早餐",
      LUNCH: "午餐",
      DINNER: "晚餐"
    };
    const mealTypeLabel = ref("");
    const steps = reactive([
      { label: "已下单", done: false, current: false },
      { label: "制作中", done: false, current: false },
      { label: "待取餐", done: false, current: false },
      { label: "已取餐", done: false, current: false }
    ]);
    const statusText = computed(() => {
      const map = {
        PENDING: "等待制作",
        PREPARING: "制作中",
        READY: "制作完成",
        COMPLETED: "已取餐",
        CANCELLED: "已取消"
      };
      return map[order.status] || order.status || "加载中...";
    });
    const statusDesc = computed(() => {
      const map = {
        PENDING: "您的订单已提交，请耐心等待",
        PREPARING: "厨师正在为您精心制作",
        READY: "请前往取餐窗口取餐",
        COMPLETED: "感谢您的光临"
      };
      return map[order.status] || "";
    });
    const pickupCode = computed(() => {
      if (order.status !== "READY" && order.status !== "COMPLETED")
        return "";
      return rawVerifyCode || rawOrderNo.slice(-4);
    });
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
        const data = await getOrderDetail(rawOrderNo);
        const bizOrder = data.order;
        order.orderNo = bizOrder.orderNo;
        order.status = bizOrder.status;
        order.createTime = bizOrder.createTime;
        order.items = data.items || [];
        totalAmount.value = ((bizOrder.totalAmount || 0) * 1).toFixed(2);
        mealTypeLabel.value = mealLabelMap[bizOrder.mealType] || bizOrder.mealType || "";
        rawVerifyCode = bizOrder.verifyCode || "";
        updateSteps(bizOrder.status);
      } catch {
      }
    }
    let pollTimer = null;
    let previousStatus = "";
    onLoad((options) => {
      rawOrderNo = options.orderNo || "";
      if (rawOrderNo) {
        fetchDetail().then(() => {
          previousStatus = order.status;
        });
        pollTimer = setInterval(async () => {
          await fetchDetail();
          if (order.status !== previousStatus) {
            const label = statusLabels[order.status] || order.status;
            showToast({
              title: `订单状态已更新：${label}`,
              icon: "none",
              duration: 3e3
            });
            previousStatus = order.status;
          }
        }, 8e3);
      }
    });
    onPullDownRefresh(async () => {
      if (rawOrderNo) {
        await fetchDetail();
      }
      stopPullDownRefresh();
    });
    onUnload(() => {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    });
    const __returned__ = { statusLabels, order, totalAmount, mealLabelMap, mealTypeLabel, steps, statusText, statusDesc, pickupCode, get rawVerifyCode() {
      return rawVerifyCode;
    }, set rawVerifyCode(v) {
      rawVerifyCode = v;
    }, get rawOrderNo() {
      return rawOrderNo;
    }, set rawOrderNo(v) {
      rawOrderNo = v;
    }, updateSteps, fetchDetail, get pollTimer() {
      return pollTimer;
    }, set pollTimer(v) {
      pollTimer = v;
    }, get previousStatus() {
      return previousStatus;
    }, set previousStatus(v) {
      previousStatus = v;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  return openBlock(), createBlock(_component_v_uni_view, { class: "order-container" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "status-card" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "status-icon" }, {
            default: withCtx(() => [
              $setup.order.status === "PENDING" ? (openBlock(), createBlock(_component_v_uni_text, {
                key: 0,
                class: "icon-text"
              }, {
                default: withCtx(() => [
                  createTextVNode("⏳")
                ]),
                _: 1
                /* STABLE */
              })) : $setup.order.status === "PREPARING" ? (openBlock(), createBlock(_component_v_uni_text, {
                key: 1,
                class: "icon-text"
              }, {
                default: withCtx(() => [
                  createTextVNode("👨‍🍳")
                ]),
                _: 1
                /* STABLE */
              })) : $setup.order.status === "READY" ? (openBlock(), createBlock(_component_v_uni_text, {
                key: 2,
                class: "icon-text"
              }, {
                default: withCtx(() => [
                  createTextVNode("✅")
                ]),
                _: 1
                /* STABLE */
              })) : $setup.order.status === "COMPLETED" ? (openBlock(), createBlock(_component_v_uni_text, {
                key: 3,
                class: "icon-text"
              }, {
                default: withCtx(() => [
                  createTextVNode("📦")
                ]),
                _: 1
                /* STABLE */
              })) : (openBlock(), createBlock(_component_v_uni_text, {
                key: 4,
                class: "icon-text"
              }, {
                default: withCtx(() => [
                  createTextVNode("📋")
                ]),
                _: 1
                /* STABLE */
              }))
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_text, { class: "status-title" }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.statusText),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_text, { class: "status-desc" }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.statusDesc),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_v_uni_view, { class: "progress-bar" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.steps, (step, idx) => {
              return openBlock(), createBlock(_component_v_uni_view, {
                key: idx,
                class: normalizeClass(["step-item", { done: step.done, current: step.current }])
              }, {
                default: withCtx(() => [
                  createVNode(
                    _component_v_uni_view,
                    { class: "step-dot" },
                    {
                      default: withCtx(() => [
                        step.done ? (openBlock(), createBlock(_component_v_uni_text, {
                          key: 0,
                          class: "dot-check"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("✓")
                          ]),
                          _: 1
                          /* STABLE */
                        })) : (openBlock(), createBlock(
                          _component_v_uni_text,
                          {
                            key: 1,
                            class: "dot-num"
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(idx + 1),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          },
                          1024
                          /* DYNAMIC_SLOTS */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  ),
                  createVNode(
                    _component_v_uni_text,
                    { class: "step-label" },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(step.label),
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
                  idx < $setup.steps.length - 1 ? (openBlock(), createBlock(_component_v_uni_view, {
                    key: 0,
                    class: normalizeClass(["step-line", { filled: step.done }])
                  }, null, 8, ["class"])) : createCommentVNode("v-if", true)
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["class"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }),
      $setup.pickupCode ? (openBlock(), createBlock(_component_v_uni_view, {
        key: 0,
        class: "pickup-card"
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "pickup-label" }, {
            default: withCtx(() => [
              createTextVNode("取餐码")
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_text, { class: "pickup-code" }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString($setup.pickupCode),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_text, { class: "pickup-tip" }, {
            default: withCtx(() => [
              createTextVNode("请在取餐窗口出示此码")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : createCommentVNode("v-if", true),
      createVNode(_component_v_uni_view, { class: "section" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "section-title" }, {
            default: withCtx(() => [
              createTextVNode("菜品清单")
            ]),
            _: 1
            /* STABLE */
          }),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.order.items, (item) => {
              return openBlock(), createBlock(
                _component_v_uni_view,
                {
                  key: item.dishId,
                  class: "order-item"
                },
                {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_view, { class: "item-img-placeholder" }, {
                      default: withCtx(() => [
                        createTextVNode("🍽️")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(
                      _component_v_uni_view,
                      { class: "item-info" },
                      {
                        default: withCtx(() => [
                          createVNode(
                            _component_v_uni_text,
                            { class: "item-name" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(item.dishName),
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
                      { class: "item-right" },
                      {
                        default: withCtx(() => [
                          createVNode(
                            _component_v_uni_text,
                            { class: "item-count" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  "×" + toDisplayString(item.quantity),
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
                            { class: "item-price" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  "¥" + toDisplayString((item.price * item.quantity).toFixed(2)),
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
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_v_uni_view, { class: "section" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "section-title" }, {
            default: withCtx(() => [
              createTextVNode("金额明细")
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_view, { class: "price-row total" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "price-label" }, {
                default: withCtx(() => [
                  createTextVNode("实付金额")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "price-value total-price" }, {
                default: withCtx(() => [
                  createTextVNode(
                    "¥" + toDisplayString($setup.totalAmount),
                    1
                    /* TEXT */
                  )
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
      createVNode(_component_v_uni_view, { class: "section" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_text, { class: "section-title" }, {
            default: withCtx(() => [
              createTextVNode("订单信息")
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_view, { class: "info-row" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "info-label" }, {
                default: withCtx(() => [
                  createTextVNode("订单编号")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "info-value" }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.order.orderNo),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_view, { class: "info-row" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "info-label" }, {
                default: withCtx(() => [
                  createTextVNode("下单时间")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "info-value" }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.order.createTime),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_view, { class: "info-row" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "info-label" }, {
                default: withCtx(() => [
                  createTextVNode("餐次")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "info-value" }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString($setup.mealTypeLabel),
                    1
                    /* TEXT */
                  )
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
  });
}
const detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5511cfa9"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/pages/order/detail.vue"]]);
export {
  detail as default
};
