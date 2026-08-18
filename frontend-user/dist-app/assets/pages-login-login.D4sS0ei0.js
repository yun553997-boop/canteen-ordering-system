import { d as defineComponent, r as ref, a as reactive, o as onMounted, b as getToken, e as switchTab, J as getStorageSync, s as showToast, K as setToken, A as setUserInfo, L as closeSocket, M as connectSocket, _ as _export_sfc, f as createBlock, w as withCtx, i as index$g, h as openBlock, j as createVNode, q as index$q, u as index$i, m as createTextVNode, n as normalizeClass, N as Input, v as index$x, t as toDisplayString } from "./index-Db_-Zx2q.js";
import { s as sendSms, l as loginByMobile, a as loginByAdmin } from "./auth.Bo_mhVa8.js";
import "./request.Dl4B2NlH.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  setup(__props, { expose: __expose }) {
    __expose();
    const loginRole = ref("user");
    const codeCountdown = ref(0);
    const smsForm = reactive({ phone: "", code: "" });
    const adminForm = reactive({ username: "", password: "" });
    let countdownTimer = null;
    async function sendCode() {
      const phone = smsForm.phone;
      if (!phone || phone.length !== 11) {
        showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      try {
        await sendSms(phone);
        showToast({ title: "验证码已发送", icon: "success" });
        codeCountdown.value = 60;
        countdownTimer = setInterval(() => {
          codeCountdown.value--;
          if (codeCountdown.value <= 0 && countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
          }
        }, 1e3);
      } catch {
      }
    }
    async function handleSmsLogin() {
      if (!smsForm.phone || !smsForm.code) {
        showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      if (smsForm.phone.length !== 11) {
        showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      try {
        const result = await loginByMobile(smsForm.phone, smsForm.code);
        onLoginSuccess(result.token, result.role, result.username, result.userId);
      } catch {
      }
    }
    async function handleAdminLogin() {
      if (!adminForm.username || !adminForm.password) {
        showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      try {
        const result = await loginByAdmin(adminForm.username, adminForm.password);
        onLoginSuccess(result.token, result.role, result.username, result.userId);
      } catch {
      }
    }
    function onLoginSuccess(token, role, username, userId) {
      setToken(token);
      setUserInfo({ userId, username, phone: "", role });
      reconnectWs(token);
      showToast({ title: "登录成功", icon: "success" });
      setTimeout(() => {
        if (role === "ADMIN_CANTEEN") {
          switchTab({ url: "/pages/canteen/workbench/index" });
        } else {
          switchTab({ url: "/pages/index/index" });
        }
      }, 500);
    }
    function reconnectWs(token) {
      closeSocket({
        success() {
          connectWs(token);
        },
        fail() {
          connectWs(token);
        }
      });
    }
    function connectWs(token) {
      const protocol = location.protocol === "https:" ? "wss:" : "ws:";
      const url = protocol + "//" + location.host + "/ws?token=" + token;
      connectSocket({ url });
    }
    onMounted(() => {
      if (getToken()) {
        const info = getUserInfoFromStorage();
        if ((info == null ? void 0 : info.role) === "ADMIN_CANTEEN") {
          switchTab({ url: "/pages/canteen/workbench/index" });
        } else {
          switchTab({ url: "/pages/index/index" });
        }
      }
    });
    function getUserInfoFromStorage() {
      try {
        const raw = getStorageSync("canteen-user");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }
    const __returned__ = { loginRole, codeCountdown, smsForm, adminForm, get countdownTimer() {
      return countdownTimer;
    }, set countdownTimer(v) {
      countdownTimer = v;
    }, sendCode, handleSmsLogin, handleAdminLogin, onLoginSuccess, reconnectWs, connectWs, getUserInfoFromStorage };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _imports_0 = "/static/logo.png";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_uni_image = index$q;
  const _component_v_uni_text = index$i;
  const _component_v_uni_view = index$g;
  const _component_v_uni_input = Input;
  const _component_v_uni_button = index$x;
  return openBlock(), createBlock(_component_v_uni_view, { class: "login-container" }, {
    default: withCtx(() => [
      createVNode(_component_v_uni_view, { class: "login-header" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_image, {
            class: "logo",
            src: _imports_0,
            mode: "aspectFit"
          }),
          createVNode(_component_v_uni_text, { class: "app-name" }, {
            default: withCtx(() => [
              createTextVNode("食堂订餐")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      createVNode(_component_v_uni_view, { class: "role-tabs" }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, {
            class: normalizeClass(["role-tab", { active: $setup.loginRole === "user" }]),
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.loginRole = "user")
          }, {
            default: withCtx(() => [
              createTextVNode(" 普通用户 ")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class"]),
          createVNode(_component_v_uni_view, {
            class: normalizeClass(["role-tab", { active: $setup.loginRole === "admin" }]),
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.loginRole = "admin")
          }, {
            default: withCtx(() => [
              createTextVNode(" 食堂管理员 ")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class"])
        ]),
        _: 1
        /* STABLE */
      }),
      $setup.loginRole === "user" ? (openBlock(), createBlock(_component_v_uni_view, {
        key: 0,
        class: "form-box"
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "input-group" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "input-label" }, {
                default: withCtx(() => [
                  createTextVNode("手机号")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_input, {
                modelValue: $setup.smsForm.phone,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.smsForm.phone = $event),
                class: "input-field",
                type: "number",
                placeholder: "请输入手机号",
                maxlength: "11"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_view, { class: "input-group" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "input-label" }, {
                default: withCtx(() => [
                  createTextVNode("验证码")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_view, { class: "code-row" }, {
                default: withCtx(() => [
                  createVNode(_component_v_uni_input, {
                    modelValue: $setup.smsForm.code,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.smsForm.code = $event),
                    class: "input-field code-input",
                    type: "number",
                    placeholder: "请输入验证码",
                    maxlength: "6"
                  }, null, 8, ["modelValue"]),
                  createVNode(_component_v_uni_button, {
                    class: "code-btn",
                    disabled: $setup.codeCountdown > 0,
                    size: "mini",
                    onClick: $setup.sendCode
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString($setup.codeCountdown > 0 ? $setup.codeCountdown + "s" : "获取验证码"),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_button, {
            class: "submit-btn",
            onClick: $setup.handleSmsLogin
          }, {
            default: withCtx(() => [
              createTextVNode("登 录")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })) : (openBlock(), createBlock(_component_v_uni_view, {
        key: 1,
        class: "form-box"
      }, {
        default: withCtx(() => [
          createVNode(_component_v_uni_view, { class: "input-group" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "input-label" }, {
                default: withCtx(() => [
                  createTextVNode("用户名 / 手机号")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_input, {
                modelValue: $setup.adminForm.username,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.adminForm.username = $event),
                class: "input-field",
                type: "text",
                placeholder: "请输入用户名或手机号"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_view, { class: "input-group" }, {
            default: withCtx(() => [
              createVNode(_component_v_uni_text, { class: "input-label" }, {
                default: withCtx(() => [
                  createTextVNode("密码")
                ]),
                _: 1
                /* STABLE */
              }),
              createVNode(_component_v_uni_input, {
                modelValue: $setup.adminForm.password,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.adminForm.password = $event),
                class: "input-field",
                type: "password",
                placeholder: "请输入密码"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          createVNode(_component_v_uni_button, {
            class: "submit-btn",
            onClick: $setup.handleAdminLogin
          }, {
            default: withCtx(() => [
              createTextVNode("登 录")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })),
      createVNode(_component_v_uni_view, { class: "agreement-text" }, {
        default: withCtx(() => [
          createTextVNode(" 登录即表示同意《用户协议》和《隐私政策》 ")
        ]),
        _: 1
        /* STABLE */
      })
    ]),
    _: 1
    /* STABLE */
  });
}
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cdfe2409"], ["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/pages/login/login.vue"]]);
export {
  login as default
};
