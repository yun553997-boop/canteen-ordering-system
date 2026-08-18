"use strict";
const utils_request = require("../utils/request.js");
function sendSms(phone) {
  return utils_request.post("/auth/send-sms", { phone });
}
function loginByUser(phone, password) {
  return utils_request.post("/auth/login/user", { phone, password });
}
function register(data) {
  return utils_request.post("/auth/register", data);
}
function resetPassword(phone, code, newPassword) {
  return utils_request.post("/auth/reset-password", { phone, code, newPassword });
}
function updatePassword(newPassword, oldPassword) {
  return utils_request.put("/auth/update-password", { newPassword, oldPassword });
}
function loginByAdmin(username, password) {
  return utils_request.post("/auth/login/admin", { username, password });
}
function getCurrentUser() {
  return utils_request.get("/auth/me");
}
exports.getCurrentUser = getCurrentUser;
exports.loginByAdmin = loginByAdmin;
exports.loginByUser = loginByUser;
exports.register = register;
exports.resetPassword = resetPassword;
exports.sendSms = sendSms;
exports.updatePassword = updatePassword;
