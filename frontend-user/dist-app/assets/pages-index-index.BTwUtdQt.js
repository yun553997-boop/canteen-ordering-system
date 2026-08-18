import { d as defineComponent, r as ref, a as reactive, c as computed, o as onMounted, g as getSystemInfoSync, b as getToken, s as showToast, e as switchTab, _ as _export_sfc, f as createBlock, w as withCtx, i as index$g, h as openBlock, j as createVNode, k as createElementBlock, F as Fragment, l as renderList, n as normalizeClass, m as createTextVNode, t as toDisplayString, S as ScrollView, p as normalizeStyle, q as index$q, u as index$i, v as index$x, x as createCommentVNode } from "./index-Db_-Zx2q.js";
import { g as getUserDishes, s as submitOrder } from "./user.BfKOqEu7.js";
import { C as CustomTabBar } from "./CustomTabBar.B_Z01zND.js";
import "./request.Dl4B2NlH.js";
const defaultImg = "/static/logo.png";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    __expose();
    const mealTypes = [
      { label: "早餐", value: "BREAKFAST" },
      { label: "午餐", value: "LUNCH" },
      { label: "晚餐", value: "DINNER" }
    ];
    const currentMeal = ref("LUNCH");
    const dishes = ref([]);
    const cart = reactive([]);
    const bottomOffset = ref(50);
    const cartTotalCount = computed(() => cart.reduce((s, i) => s + i.quantity, 0));
    const cartTotalPrice = computed(() => cart.reduce((s, i) => s + i.dish.price * i.quantity, 0));
    function getQuantity(dishId) {
      var _a;
      return ((_a = cart.find((c) => c.dish.id === dishId)) == null ? void 0 : _a.quantity) || 0;
    }
    function addToCart(dish) {
      if (dish.stock <= 0)
        return;
      const exist = cart.find((c) => c.dish.id === dish.id);
      if (exist) {
        if (exist.quantity < dish.stock)
          exist.quantity++;
      } else {
        cart.push({ dish, quantity: 1 });
      }
    }
    function removeFromCart(dish) {
      const idx = cart.findIndex((c) => c.dish.id === dish.id);
      if (idx === -1)
        return;
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
      } else {
        cart.splice(idx, 1);
      }
    }
    function clearCart() {
      cart.splice(0, cart.length);
    }
    async function fetchDishes() {
      try {
        const data = await getUserDishes(currentMeal.value);
        dishes.value = data || [];
      } catch {
        dishes.value = [];
      }
    }
    async function switchMeal(meal) {
      if (currentMeal.value === meal)
        return;
      currentMeal.value = meal;
      clearCart();
      await fetchDishes();
    }
    async function submitOrder$1() {
      const token = getToken();
      if (!token) {
        showToast({ title: "请先登录", icon: "none" });
        setTimeout(() => {
          switchTab({ url: "/pages/login/login" });
        }, 800);
        return;
      }
      if (cart.length === 0) {
        showToast({ title: "请选择菜品", icon: "none" });
        return;
      }
      const payload = {
        mealType: currentMeal.value,
        items: cart.map((c) => ({
          dishId: c.dish.id,
          quantity: c.quantity
        }))
      };
      try {
        await submitOrder(payload);
        showToast({ title: "订餐成功", icon: "success" });
        clearCart();
      } catch {
      }
    }
    onMounted(() => {
      var _a;
      const info = getSystemInfoSync();
      bottomOffset.value = (((_a = info.safeAreaInsets) == null ? void 0 : _a.bottom) || 0) + 50;
      fetchDishes();
    });
    const __returned__ = { mealTypes, currentMeal, dishes, cart, defaultImg, bottomOffset, cartTotalCount, cartTotalPrice, getQuantity, addToCart, removeFromCart, clearCart, fetchDishes, switchMeal, submitOrder: submitOrder$1, CustomTabBar };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_view = index$g;
  const _component_v_uni_image = index$q;
  const _component_v_uni_text = index$i;
  const _component_v_uni_button = index$x;
  const _component_v_uni_scroll_view = ScrollView;
  return openBlock(), createBlock(_component_v_uni_view, { class: "menu-container" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "meal-tabs" }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock(
            Fragment,
            null,
            renderList($setup.mealTypes, (meal) => {
              return createVNode(_component_v_uni_view, {
                key: meal.value,
                class: normalizeClass(["meal-tab", { active: $setup.currentMeal === meal.value }]),
                onClick: ($event) => $setup.switchMeal(meal.value)
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(meal.label),
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
        class: "dish-list",
        "scroll-y": "",
        style: normalizeStyle({ paddingBottom: $setup.bottomOffset + 60 + "px" })
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList($setup.dishes, (dish) => {
              return openBlock(), createBlock(
                _component_v_uni_view,
                {
                  key: dish.id,
                  class: "dish-card"
                },
                {
                  default: withCtx(() => [
                    createVNode(_component_v_uni_image, {
                      class: "dish-img",
                      src: dish.imageUrl || $setup.defaultImg,
                      mode: "aspectFill"
                    }, null, 8, ["src"]),
                    createVNode(
                      _component_v_uni_view,
                      { class: "dish-info" },
                      {
                        default: withCtx(() => [
                          createVNode(
                            _component_v_uni_text,
                            { class: "dish-name" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(dish.name),
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
                            { class: "dish-desc" },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(dish.description),
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
                            _component_v_uni_view,
                            { class: "dish-meta" },
                            {
                              default: withCtx(() => [
                                createVNode(
                                  _component_v_uni_text,
                                  { class: "dish-price" },
                                  {
                                    default: withCtx(() => [
                                      createVNode(_component_v_uni_text, { class: "price-symbol" }, {
                                        default: withCtx(() => [
                                          createTextVNode("¥")
                                        ]),
                                        _: 1
                                        /* STABLE */
                                      }),
                                      createTextVNode(
                                        toDisplayString(dish.price.toFixed(2)),
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
                                  { class: "dish-stock" },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        "剩余: " + toDisplayString(dish.stock),
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
                            { class: "dish-bottom" },
                            {
                              default: withCtx(() => [
                                dish.stock === 0 ? (openBlock(), createBlock(_component_v_uni_view, {
                                  key: 0,
                                  class: "sold-out"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("已售罄")
                                  ]),
                                  _: 1
                                  /* STABLE */
                                })) : (openBlock(), createBlock(
                                  _component_v_uni_view,
                                  {
                                    key: 1,
                                    class: "cart-control"
                                  },
                                  {
                                    default: withCtx(() => [
                                      $setup.getQuantity(dish.id) > 0 ? (openBlock(), createBlock(_component_v_uni_button, {
                                        key: 0,
                                        class: "ctrl-btn minus",
                                        size: "mini",
                                        onClick: ($event) => $setup.removeFromCart(dish)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" - ")
                                        ]),
                                        _: 2
                                        /* DYNAMIC */
                                      }, 1032, ["onClick"])) : createCommentVNode("v-if", true),
                                      $setup.getQuantity(dish.id) > 0 ? (openBlock(), createBlock(
                                        _component_v_uni_text,
                                        {
                                          key: 1,
                                          class: "cart-num"
                                        },
                                        {
                                          default: withCtx(() => [
                                            createTextVNode(
                                              toDisplayString($setup.getQuantity(dish.id)),
                                              1
                                              /* TEXT */
                                            )
                                          ]),
                                          _: 2
                                          /* DYNAMIC */
                                        },
                                        1024
                                        /* DYNAMIC_SLOTS */
                                      )) : createCommentVNode("v-if", true),
                                      createVNode(_component_v_uni_button, {
                                        class: "ctrl-btn add",
                                        size: "mini",
                                        disabled: $setup.getQuantity(dish.id) >= dish.stock,
                                        onClick: ($event) => $setup.addToCart(dish)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" + ")
                                        ]),
                                        _: 2
                                        /* DYNAMIC */
                                      }, 1032, ["disabled", "onClick"])
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
          )),
          $setup.dishes.length === 0 ? (openBlock(), createBlock(_component_v_uni_view, {
            key: 0,
            class: "empty-tip"
          }, {
            default: withCtx(() => [
              createTextVNode("暂无菜品")
            ]),
            _: 1
            /* STABLE */
          })) : createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["style"]),
      $setup.cartTotalCount > 0 ? (openBlock(), createBlock(_component_v_uni_view, {
        key: 0,
        class: "cart-bar",
        style: normalizeStyle({ bottom: $setup.bottomOffset + "px" })
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "cart-info" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, { class: "cart-icon-wrap" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, { class: "cart-icon" }, {
                    default: withCtx(() => [
                      createTextVNode("🛒")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_text, { class: "cart-badge" }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.cartTotalCount),
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
              createVNode(_component_v_uni_text, { class: "cart-total" }, {
                default: withCtx(() => [
                  createTextVNode(
                    "¥" + toDisplayString($setup.cartTotalPrice.toFixed(2)),
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
          createVNode(_component_v_uni_button, {
            class: "checkout-btn",
            onClick: $setup.submitOrder
          }, {
            default: withCtx(() => [
              createTextVNode("提交订单")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["style"])) : createCommentVNode("v-if", true),
      createVNode($setup["CustomTabBar"])
    ]),
    _: 1
    /* STABLE */
  });
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-83a5a03c"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/pages/index/index.vue"]]);
export {
  index as default
};
