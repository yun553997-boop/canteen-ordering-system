"use strict";
const utils_request = require("../utils/request.js");
function getNotifications(page = 1, pageSize = 20) {
  return utils_request.get(`/user/notifications/list?page=${page}&pageSize=${pageSize}`);
}
function getUnreadCount() {
  return utils_request.get("/user/notifications/unread-count");
}
function markRead(id) {
  return utils_request.put(`/user/notifications/read/${id}`);
}
function markAllRead() {
  return utils_request.put("/user/notifications/read-all");
}
exports.getNotifications = getNotifications;
exports.getUnreadCount = getUnreadCount;
exports.markAllRead = markAllRead;
exports.markRead = markRead;
