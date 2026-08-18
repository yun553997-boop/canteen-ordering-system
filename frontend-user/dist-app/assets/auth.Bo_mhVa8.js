import { g as get, a as post } from "./request.Dl4B2NlH.js";
function sendSms(phone) {
  return post("/auth/send-sms", { phone });
}
function loginByMobile(phone, code) {
  return post("/auth/login/mobile", { phone, code });
}
function loginByAdmin(username, password) {
  return post("/auth/login/admin", { username, password });
}
function getCurrentUser() {
  return get("/auth/me");
}
export {
  loginByAdmin as a,
  getCurrentUser as g,
  loginByMobile as l,
  sendSms as s
};
