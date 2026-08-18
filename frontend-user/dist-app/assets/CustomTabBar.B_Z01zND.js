import { d as defineComponent, r as ref, W as getCurrentPages$1, c as computed, g as getSystemInfoSync, e as switchTab, z as getUserInfo, _ as _export_sfc, f as createBlock, w as withCtx, k as createElementBlock, l as renderList, F as Fragment, p as normalizeStyle, i as index$g, h as openBlock, j as createVNode, u as index$i, m as createTextVNode, t as toDisplayString, n as normalizeClass } from "./index-Db_-Zx2q.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomTabBar",
  setup(__props, { expose: __expose }) {
    var _a;
    __expose();
    const currentPath = ref("");
    const pages = getCurrentPages$1();
    if (pages.length > 0) {
      const route = pages[pages.length - 1].route;
      currentPath.value = "/" + route;
    }
    const userTabs = [
      { path: "/pages/index/index", label: "点餐", icon: "🍽️" },
      { path: "/pages/order/list", label: "订单", icon: "📋" },
      { path: "/pages/mine/mine", label: "我的", icon: "👤" }
    ];
    const adminTabs = [
      { path: "/pages/canteen/workbench/index", label: "工作台", icon: "📊" },
      { path: "/pages/canteen/dish/index", label: "菜品管理", icon: "🍳" },
      { path: "/pages/mine/mine", label: "我的", icon: "👤" }
    ];
    const role = computed(() => {
      const info = getUserInfo();
      return (info == null ? void 0 : info.role) || "";
    });
    const tabs = computed(() => {
      return role.value === "ADMIN_CANTEEN" ? adminTabs : userTabs;
    });
    const safeBottom = ref(0);
    try {
      const info = getSystemInfoSync();
      safeBottom.value = ((_a = info.safeAreaInsets) == null ? void 0 : _a.bottom) || 0;
    } catch {
    }
    function switchTab$1(tab) {
      switchTab({ url: tab.path });
    }
    const __returned__ = { currentPath, pages, userTabs, adminTabs, role, tabs, safeBottom, switchTab: switchTab$1 };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  return openBlock(), createBlock(_component_v_uni_view, {
    class: "custom-tabbar",
    style: normalizeStyle({ paddingBottom: $setup.safeBottom + "px" })
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList($setup.tabs, (tab) => {
          return openBlock(), createBlock(_component_v_uni_view, {
            key: tab.path,
            class: "tab-item",
            onClick: ($event) => $setup.switchTab(tab)
          }, {
            default: withCtx(() => [
              createVNode(
                _component_v_uni_text,
                { class: "tab-icon" },
                {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString(tab.icon),
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
                class: normalizeClass(["tab-text", { active: $setup.currentPath === tab.path }])
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
              }, 1032, ["class"])
            ]),
            _: 2
            /* DYNAMIC */
          }, 1032, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]),
    _: 1
    /* STABLE */
  }, 8, ["style"]);
}
const CustomTabBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-55a48eff"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/components/CustomTabBar.vue"]]);
export {
  CustomTabBar as C
};
