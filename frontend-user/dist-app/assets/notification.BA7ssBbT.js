import { g as get, p as put } from "./request.Dl4B2NlH.js";
function getNotifications(page = 1, pageSize = 20) {
  return get(`/user/notifications/list?page=${page}&pageSize=${pageSize}`);
}
function getUnreadCount() {
  return get("/user/notifications/unread-count");
}
function markRead(id) {
  return put(`/user/notifications/read/${id}`);
}
function markAllRead() {
  return put("/user/notifications/read-all");
}
export {
  getNotifications as a,
  markAllRead as b,
  getUnreadCount as g,
  markRead as m
};
