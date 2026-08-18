"use strict";
const utils_request = require("../utils/request.js");
function getWalletBalance() {
  return utils_request.get("/user/wallet/balance");
}
function rechargeWallet(amount) {
  return utils_request.post(
    "/user/wallet/recharge",
    { amount },
    { showLoading: false }
  );
}
function withdrawWallet(amount, channel) {
  return utils_request.post(
    "/user/wallet/withdraw",
    { amount, channel },
    { showLoading: false }
  );
}
exports.getWalletBalance = getWalletBalance;
exports.rechargeWallet = rechargeWallet;
exports.withdrawWallet = withdrawWallet;
