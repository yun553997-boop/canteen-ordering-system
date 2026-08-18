"use strict";
const utils_request = require("../utils/request.js");
function getUserDishes(category) {
  return utils_request.get("/user/dishes/list", category ? { category } : void 0);
}
function submitOrder(data) {
  return utils_request.post("/user/orders/create", data);
}
function getOrderDetail(orderNo) {
  return utils_request.get(`/user/orders/detail/${orderNo}`);
}
function getOrderList() {
  return utils_request.get("/user/orders/list");
}
function cancelOrder(orderNo) {
  return utils_request.post(`/user/orders/cancel/${orderNo}`);
}
exports.cancelOrder = cancelOrder;
exports.getOrderDetail = getOrderDetail;
exports.getOrderList = getOrderList;
exports.getUserDishes = getUserDishes;
exports.submitOrder = submitOrder;
