"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_auth = require("../../api/auth.js");
const utils_storage = require("../../utils/storage.js");
const NOTICE_CONTENT = "<p>1. 用户仅可在对应餐次订餐时间段内下单。</p><p>2. 订单备餐完成后，请及时到取餐窗口取餐。</p><p>3. 出餐后超过规定时间未取餐，订单将自动作废，<b>超时一小时不退款</b>。</p><p>4. 订单在开始备餐前可无责取消，取消后将退回已支付金额。</p>";
const PROTOCOL_CONTENT = "<p>1. 钱包余额为虚拟货币，仅用于本食堂订餐支付。</p><p>2. 请妥善保管账号，因账号保管不善造成的损失由用户自行承担。</p><p>3. 平台保留对本协议的解释与更新权利。</p>";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const authMode = common_vendor.ref("login");
    const codeCountdown = common_vendor.ref(0);
    let countdownTimer = null;
    const loginForm = common_vendor.reactive({ phone: "", password: "" });
    const regForm = common_vendor.reactive({ nickname: "", phone: "", code: "", password: "", confirmPassword: "" });
    const forgotForm = common_vendor.reactive({ phone: "", code: "", newPassword: "" });
    const showForgot = common_vendor.ref(false);
    const agreeNotice = common_vendor.ref(false);
    const agreeProtocol = common_vendor.ref(false);
    const shakeNotice = common_vendor.ref(false);
    const shakeProtocol = common_vendor.ref(false);
    const showAgreementModal = common_vendor.ref(false);
    const agreementModalTitle = common_vendor.ref("");
    const agreementModalContent = common_vendor.ref("");
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
    async function sendRegisterCode() {
      const phone = regForm.phone;
      if (!phone || phone.length !== 11) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      try {
        const code = await api_auth.sendSms(phone);
        regForm.code = code;
        common_vendor.index.showToast({ title: `【演示环境】您的验证码是：${code}`, icon: "none", duration: 4e3 });
        startCountdown();
      } catch {
      }
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
      if (!validateAgreement())
        return;
      if (!loginForm.phone || !loginForm.password) {
        common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      if (loginForm.phone.length !== 11) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      try {
        const result = await api_auth.loginByUser(loginForm.phone, loginForm.password);
        onLoginSuccess(result);
      } catch {
      }
    }
    async function handleRegister() {
      if (!validateAgreement())
        return;
      if (!regForm.nickname || !regForm.phone || !regForm.code || !regForm.password) {
        common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      if (regForm.phone.length !== 11) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      if (regForm.password.length < 6) {
        common_vendor.index.showToast({ title: "密码长度不能少于6位", icon: "none" });
        return;
      }
      if (regForm.password !== regForm.confirmPassword) {
        common_vendor.index.showToast({ title: "两次输入的密码不一致", icon: "none" });
        return;
      }
      try {
        const result = await api_auth.register({
          nickname: regForm.nickname,
          phone: regForm.phone,
          code: regForm.code,
          password: regForm.password
        });
        onLoginSuccess(result);
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
    function goCanteen() {
      common_vendor.index.reLaunch({ url: "/pages/login/canteen" });
    }
    function toggleNotice() {
      agreeNotice.value = !agreeNotice.value;
    }
    function toggleProtocol() {
      agreeProtocol.value = !agreeProtocol.value;
    }
    function openNotice() {
      agreementModalTitle.value = "订餐须知";
      agreementModalContent.value = NOTICE_CONTENT;
      showAgreementModal.value = true;
    }
    function openProtocol() {
      agreementModalTitle.value = "用户协议";
      agreementModalContent.value = PROTOCOL_CONTENT;
      showAgreementModal.value = true;
    }
    function validateAgreement() {
      let ok = true;
      if (!agreeNotice.value) {
        shakeNotice.value = true;
        ok = false;
      }
      if (!agreeProtocol.value) {
        shakeProtocol.value = true;
        ok = false;
      }
      if (!ok) {
        common_vendor.index.showToast({ title: "请先阅读并同意相关协议", icon: "none" });
        setTimeout(() => {
          shakeNotice.value = false;
          shakeProtocol.value = false;
        }, 500);
      }
      return ok;
    }
    function onLoginSuccess(result) {
      utils_storage.setToken(result.token);
      utils_storage.setUserInfo({ userId: result.userId, username: result.username, phone: "", role: result.role });
      reconnectWs(result.token);
      common_vendor.index.showToast({ title: "登录成功", icon: "success" });
      setTimeout(() => {
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      }, 500);
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
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goCanteen, "eb"),
        b: common_assets._imports_0,
        c: authMode.value === "login" ? 1 : "",
        d: common_vendor.o(($event) => authMode.value = "login", "01"),
        e: authMode.value === "register" ? 1 : "",
        f: common_vendor.o(($event) => authMode.value = "register", "35"),
        g: authMode.value === "login"
      }, authMode.value === "login" ? {
        h: loginForm.phone,
        i: common_vendor.o(($event) => loginForm.phone = $event.detail.value, "50"),
        j: loginForm.password,
        k: common_vendor.o(($event) => loginForm.password = $event.detail.value, "fe"),
        l: common_vendor.o(openForgot, "8a"),
        m: common_vendor.o(handleLogin, "b7")
      } : {
        n: regForm.nickname,
        o: common_vendor.o(($event) => regForm.nickname = $event.detail.value, "87"),
        p: regForm.phone,
        q: common_vendor.o(($event) => regForm.phone = $event.detail.value, "3e"),
        r: regForm.code,
        s: common_vendor.o(($event) => regForm.code = $event.detail.value, "19"),
        t: common_vendor.t(codeCountdown.value > 0 ? codeCountdown.value + "s" : "获取验证码"),
        v: codeCountdown.value > 0,
        w: common_vendor.o(sendRegisterCode, "bb"),
        x: regForm.password,
        y: common_vendor.o(($event) => regForm.password = $event.detail.value, "9d"),
        z: regForm.confirmPassword,
        A: common_vendor.o(($event) => regForm.confirmPassword = $event.detail.value, "b6"),
        B: common_vendor.o(handleRegister, "32")
      }, {
        C: agreeNotice.value
      }, agreeNotice.value ? {} : {}, {
        D: agreeNotice.value ? 1 : "",
        E: common_vendor.o(openNotice, "72"),
        F: shakeNotice.value ? 1 : "",
        G: common_vendor.o(toggleNotice, "c3"),
        H: agreeProtocol.value
      }, agreeProtocol.value ? {} : {}, {
        I: agreeProtocol.value ? 1 : "",
        J: common_vendor.o(openProtocol, "71"),
        K: shakeProtocol.value ? 1 : "",
        L: common_vendor.o(toggleProtocol, "d0"),
        M: showAgreementModal.value
      }, showAgreementModal.value ? {
        N: common_vendor.t(agreementModalTitle.value),
        O: agreementModalContent.value,
        P: common_vendor.o(($event) => showAgreementModal.value = false, "3e"),
        Q: common_vendor.o(() => {
        }, "41"),
        R: common_vendor.o(($event) => showAgreementModal.value = false, "ec")
      } : {}, {
        S: showForgot.value
      }, showForgot.value ? {
        T: forgotForm.phone,
        U: common_vendor.o(($event) => forgotForm.phone = $event.detail.value, "6c"),
        V: forgotForm.code,
        W: common_vendor.o(($event) => forgotForm.code = $event.detail.value, "0e"),
        X: common_vendor.t(codeCountdown.value > 0 ? codeCountdown.value + "s" : "获取验证码"),
        Y: codeCountdown.value > 0,
        Z: common_vendor.o(sendForgotCode, "2c"),
        aa: forgotForm.newPassword,
        ab: common_vendor.o(($event) => forgotForm.newPassword = $event.detail.value, "cb"),
        ac: common_vendor.o(handleResetPassword, "1e"),
        ad: common_vendor.o(($event) => showForgot.value = false, "a6"),
        ae: common_vendor.o(() => {
        }, "16"),
        af: common_vendor.o(($event) => showForgot.value = false, "00")
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-45258083"]]);
wx.createPage(MiniProgramPage);
