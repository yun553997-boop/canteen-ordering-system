"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_auth = require("../../api/auth.js");
const utils_storage = require("../../utils/storage.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "canteen",
  setup(__props) {
    const codeCountdown = common_vendor.ref(0);
    let countdownTimer = null;
    const adminForm = common_vendor.reactive({ username: "", password: "" });
    const forgotForm = common_vendor.reactive({ phone: "", code: "", newPassword: "" });
    const showForgot = common_vendor.ref(false);
    const changePwdVisible = common_vendor.ref(false);
    const newPassword = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    let pendingResult = null;
    function startCountdown() {
      codeCountdown.value = 60;
      if (countdownTimer)
        clearInterval(countdownTimer);
      countdownTimer = setInterval(() => {
        codeCountdown.value--;
        if (codeCountdown.value <= 0 && countdownTimer) {
          clearInterval(countdownTimer);
          countdownTimer = null;
        }
      }, 1e3);
    }
    async function sendForgotCode() {
      const phone = forgotForm.phone;
      if (!phone || phone.length !== 11) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      try {
        const code = await api_auth.sendSms(phone);
        forgotForm.code = code;
        common_vendor.index.showToast({ title: `【演示环境】您的验证码是：${code}`, icon: "none", duration: 4e3 });
        startCountdown();
      } catch {
      }
    }
    async function handleLogin() {
      if (!adminForm.username || !adminForm.password) {
        common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      try {
        const result = await api_auth.loginByAdmin(adminForm.username, adminForm.password);
        utils_storage.setToken(result.token);
        utils_storage.setUserInfo({ userId: result.userId, username: result.username, phone: "", role: result.role });
        if (result.isInitialPassword === 1) {
          pendingResult = result;
          changePwdVisible.value = true;
        } else {
          finishLogin(result);
        }
      } catch {
      }
    }
    async function handleResetPassword() {
      if (!forgotForm.phone || !forgotForm.code || !forgotForm.newPassword) {
        common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      if (forgotForm.phone.length !== 11) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      if (forgotForm.newPassword.length < 6) {
        common_vendor.index.showToast({ title: "新密码长度不能少于6位", icon: "none" });
        return;
      }
      try {
        await api_auth.resetPassword(forgotForm.phone, forgotForm.code, forgotForm.newPassword);
        common_vendor.index.showToast({ title: "重置成功，请重新登录", icon: "success" });
        showForgot.value = false;
        forgotForm.phone = "";
        forgotForm.code = "";
        forgotForm.newPassword = "";
      } catch {
      }
    }
    function openForgot() {
      showForgot.value = true;
    }
    function goUser() {
      common_vendor.index.reLaunch({ url: "/pages/login/index" });
    }
    function finishLogin(result) {
      reconnectWs(result.token);
      common_vendor.index.showToast({ title: "登录成功", icon: "success" });
      setTimeout(() => {
        if (result.role === "ADMIN_CANTEEN") {
          common_vendor.index.reLaunch({ url: "/pages/canteen/workbench/index" });
        } else if (result.role === "ADMIN_SYSTEM") {
          common_vendor.index.showToast({ title: "系统管理员请使用PC端管理后台", icon: "none", duration: 3e3 });
          utils_storage.setToken("");
        } else {
          common_vendor.index.reLaunch({ url: "/pages/index/index" });
        }
      }, 500);
    }
    async function handleChangePassword() {
      if (!newPassword.value || newPassword.value.length < 6) {
        common_vendor.index.showToast({ title: "新密码长度不能少于6位", icon: "none" });
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        common_vendor.index.showToast({ title: "两次输入的密码不一致", icon: "none" });
        return;
      }
      try {
        await api_auth.updatePassword(newPassword.value);
        common_vendor.index.showToast({ title: "密码修改成功", icon: "success" });
        changePwdVisible.value = false;
        newPassword.value = "";
        confirmPassword.value = "";
        if (pendingResult) {
          finishLogin(pendingResult);
          pendingResult = null;
        }
      } catch {
      }
    }
    function logoutOnChangePwd() {
      utils_storage.removeToken();
      utils_storage.removeUserInfo();
      changePwdVisible.value = false;
      common_vendor.index.reLaunch({ url: "/pages/login/canteen" });
    }
    function reconnectWs(token) {
      common_vendor.index.closeSocket({
        success() {
          connectWs(token);
        },
        fail() {
          connectWs(token);
        }
      });
    }
    function connectWs(token) {
      let wsUrl;
      wsUrl = "ws://192.168.126.220:8000/ws?token=" + token;
      common_vendor.index.connectSocket({ url: wsUrl });
    }
    common_vendor.onMounted(() => {
      if (utils_storage.getToken()) {
        common_vendor.index.reLaunch({ url: "/pages/canteen/workbench/index" });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goUser, "1d"),
        b: common_assets._imports_0,
        c: adminForm.username,
        d: common_vendor.o(($event) => adminForm.username = $event.detail.value, "e1"),
        e: adminForm.password,
        f: common_vendor.o(($event) => adminForm.password = $event.detail.value, "6f"),
        g: common_vendor.o(openForgot, "2d"),
        h: common_vendor.o(handleLogin, "8c"),
        i: showForgot.value
      }, showForgot.value ? {
        j: forgotForm.phone,
        k: common_vendor.o(($event) => forgotForm.phone = $event.detail.value, "74"),
        l: forgotForm.code,
        m: common_vendor.o(($event) => forgotForm.code = $event.detail.value, "37"),
        n: common_vendor.t(codeCountdown.value > 0 ? codeCountdown.value + "s" : "获取验证码"),
        o: codeCountdown.value > 0,
        p: common_vendor.o(sendForgotCode, "15"),
        q: forgotForm.newPassword,
        r: common_vendor.o(($event) => forgotForm.newPassword = $event.detail.value, "7e"),
        s: common_vendor.o(handleResetPassword, "6e"),
        t: common_vendor.o(($event) => showForgot.value = false, "65"),
        v: common_vendor.o(() => {
        }, "e4"),
        w: common_vendor.o(($event) => showForgot.value = false, "ac")
      } : {}, {
        x: changePwdVisible.value
      }, changePwdVisible.value ? {
        y: newPassword.value,
        z: common_vendor.o(($event) => newPassword.value = $event.detail.value, "af"),
        A: confirmPassword.value,
        B: common_vendor.o(($event) => confirmPassword.value = $event.detail.value, "64"),
        C: common_vendor.o(handleChangePassword, "63"),
        D: common_vendor.o(logoutOnChangePwd, "f3"),
        E: common_vendor.o(() => {
        }, "60")
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aa9b5f87"]]);
wx.createPage(MiniProgramPage);
