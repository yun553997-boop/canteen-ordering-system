"use strict";
const utils_request = require("../utils/request.js");
function getStatisticsOverview(params) {
  return utils_request.get("/admin/statistics/overview", params);
}
function getOrderList(params) {
  return utils_request.get("/admin/orders/list", params);
}
function verifyOrder(orderNo) {
  return utils_request.post("/admin/orders/verify", { orderNo });
}
function verifyByCode(verifyCode) {
  return utils_request.post("/admin/orders/verify", { verifyCode });
}
function updateOrderStatus(orderNo, status) {
  return utils_request.put(`/admin/orders/status/${orderNo}/${status}`);
}
function getAdminOrderDetail(orderNo) {
  return utils_request.get(`/admin/orders/detail/${orderNo}`);
}
function getDishList(params) {
  return utils_request.get("/admin/dishes/list", params);
}
function addDish(data) {
  return utils_request.post("/admin/dishes/add", data);
}
function updateDish(data) {
  return utils_request.put("/admin/dishes/update", data);
}
function changeDishStatus(id, status) {
  return utils_request.put(`/admin/dishes/status/${id}/${status}`);
}
function deleteDish(id) {
  return utils_request.del(`/admin/dishes/delete/${id}`);
}
exports.addDish = addDish;
exports.changeDishStatus = changeDishStatus;
exports.deleteDish = deleteDish;
exports.getAdminOrderDetail = getAdminOrderDetail;
exports.getDishList = getDishList;
exports.getOrderList = getOrderList;
exports.getStatisticsOverview = getStatisticsOverview;
exports.updateDish = updateDish;
exports.updateOrderStatus = updateOrderStatus;
exports.verifyByCode = verifyByCode;
exports.verifyOrder = verifyOrder;
