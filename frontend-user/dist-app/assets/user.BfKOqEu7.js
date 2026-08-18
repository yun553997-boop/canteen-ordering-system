import { g as get, a as post } from "./request.Dl4B2NlH.js";
function getUserDishes(category) {
  return get("/user/dishes/list", category ? { category } : void 0);
}
function submitOrder(data) {
  return post("/user/orders/create", data);
}
function getOrderDetail(orderNo) {
  return get(`/user/orders/detail/${orderNo}`);
}
function getOrderList() {
  return get("/user/orders/list");
}
export {
  getOrderList as a,
  getOrderDetail as b,
  getUserDishes as g,
  submitOrder as s
};
