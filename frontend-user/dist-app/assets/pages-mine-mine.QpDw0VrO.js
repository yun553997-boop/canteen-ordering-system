import { d as defineComponent, r as ref, c as computed, y as onShow, b as getToken, z as getUserInfo, A as setUserInfo, B as navigateTo, C as showModal, D as removeToken, E as removeUserInfo, G as reLaunch, _ as _export_sfc, f as createBlock, w as withCtx, i as index$g, h as openBlock, j as createVNode, u as index$i, m as createTextVNode, t as toDisplayString, x as createCommentVNode, v as index$x } from "./index-Db_-Zx2q.js";
import { g as getUnreadCount } from "./notification.BA7ssBbT.js";
import { g as getCurrentUser } from "./auth.Bo_mhVa8.js";
import { C as CustomTabBar } from "./CustomTabBar.B_Z01zND.js";
import "./request.Dl4B2NlH.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mine",
  setup(__props, { expose: __expose }) {
    __expose();
    const username = ref("未登录");
    const phone = ref("");
    const role = ref("");
    const unreadCount = ref(0);
    const avatarLetter = computed(() => {
      return username.value ? username.value.charAt(0).toUpperCase() : "U";
    });
    const maskedPhone = computed(() => {
      const p = phone.value;
      if (p && p.length === 11) {
        return p.substring(0, 3) + "****" + p.substring(7);
      }
      return p || "";
    });
    async function loadUserInfo() {
      const token = getToken();
      if (!token)
        return;
      const cached = getUserInfo();
      if (cached) {
        username.value = cached.username;
        phone.value = cached.phone || "";
        role.value = cached.role || "";
      }
      try {
        const data = await getCurrentUser();
        if (data) {
          username.value = data.username;
          phone.value = data.phone || "";
          role.value = data.role || "";
          setUserInfo(data);
        }
      } catch {
      }
    }
    async function loadUnread() {
      const token = getToken();
      if (!token)
        return;
      try {
        const data = await getUnreadCount();
        unreadCount.value = data.count || 0;
      } catch {
      }
    }
    function goNotifications() {
      navigateTo({ url: "/pages/notification/list" });
    }
    function handleLogout() {
      showModal({
        title: "提示",
        content: "确定退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            removeToken();
            removeUserInfo();
            unreadCount.value = 0;
            username.value = "未登录";
            reLaunch({ url: "/pages/login/login" });
          }
        }
      });
    }
    onShow(() => {
      loadUserInfo();
      loadUnread();
    });
    const __returned__ = { username, phone, role, unreadCount, avatarLetter, maskedPhone, loadUserInfo, loadUnread, goNotifications, handleLogout, CustomTabBar };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_v_uni_button = index$x;
  return openBlock(), createBlock(_component_v_uni_view, { class: "mine-container" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "profile-header" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "header-left" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, { class: "avatar-text" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, { class: "avatar-letter" }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.avatarLetter),
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
              createVNode(_component_v_uni_view, { class: "user-info" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_view, { class: "name-row" }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "username" }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString($setup.username),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      $setup.role === "ADMIN_CANTEEN" ? (openBlock(), createBlock(_component_v_uni_text, {
                        key: 0,
                        class: "role-tag"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("食堂管理员")
                        ]),
                        _: 1
                        /* STABLE */
                      })) : createCommentVNode("v-if", true)
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_v_uni_text, { class: "phone" }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.maskedPhone),
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
          createVNode(_component_v_uni_view, { class: "header-right" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_view, {
                class: "icon-btn",
                onClick: $setup.goNotifications
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, { class: "icon-text" }, {
                    default: withCtx(() => [
                      createTextVNode("🔔")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  $setup.unreadCount > 0 ? (openBlock(), createBlock(_component_v_uni_view, {
                    key: 0,
                    class: "badge"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_uni_text, { class: "badge-text" }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString($setup.unreadCount > 99 ? "99+" : $setup.unreadCount),
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
                  })) : createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_view, { class: "icon-btn" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_text, { class: "icon-text" }, {
                    default: withCtx(() => [
                      createTextVNode("⚙")
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
      }),
      createVNode(_component_v_uni_view, { class: "placeholder-area" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "placeholder-card" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "placeholder-icon" }, {
                default: withCtx(() => [
                  createTextVNode("🏗️")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "placeholder-text" }, {
                default: withCtx(() => [
                  createTextVNode("会员信息 / 更多功能")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_text, { class: "placeholder-sub" }, {
                default: withCtx(() => [
                  createTextVNode("敬请期待")
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
      createVNode(_component_v_uni_view, { class: "logout-area" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_button, {
            class: "logout-btn",
            onClick: $setup.handleLogout
          }, {
            default: withCtx(() => [
              createTextVNode("退出登录")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode($setup["CustomTabBar"])
    ]),
    _: 1
    /* STABLE */
  });
}
const mine = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d41d38da"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/pages/mine/mine.vue"]]);
export {
  mine as default
};
