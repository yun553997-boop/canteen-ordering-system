import { g as get, p as put, a as post, d as del } from "./request.Dl4B2NlH.js";
function getStatisticsOverview(params) {
  return get("/admin/statistics/overview", params);
}
function getOrderList(params) {
  return get("/admin/orders/list", params);
}
function verifyOrder(orderNo) {
  return post("/admin/orders/verify", { orderNo });
}
function updateOrderStatus(orderNo, status) {
  return put(`/admin/orders/status/${orderNo}/${status}`);
}
function getDishList(params) {
  return get("/admin/dishes/list", params);
}
function addDish(data) {
  return post("/admin/dishes/add", data);
}
function updateDish(data) {
  return put("/admin/dishes/update", data);
}
function changeDishStatus(id, status) {
  return put(`/admin/dishes/status/${id}/${status}`);
}
function deleteDish(id) {
  return del(`/admin/dishes/delete/${id}`);
}
export {
  getOrderList as a,
  getDishList as b,
  updateDish as c,
  addDish as d,
  changeDishStatus as e,
  deleteDish as f,
  getStatisticsOverview as g,
  updateOrderStatus as u,
  verifyOrder as v
};
