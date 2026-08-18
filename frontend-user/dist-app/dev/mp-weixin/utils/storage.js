"use strict";
const common_vendor = require("../common/vendor.js");
const TOKEN_KEY = "canteen-token";
function getToken() {
  try {
    const fromUni = common_vendor.index.getStorageSync(TOKEN_KEY);
    if (fromUni)
      return fromUni;
  } catch {
  }
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}
function setToken(token) {
  try {
    common_vendor.index.setStorageSync(TOKEN_KEY, token);
  } catch {
  }
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
  }
}
function removeToken() {
  try {
    common_vendor.index.removeStorageSync(TOKEN_KEY);
  } catch {
  }
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
  }
}
const USER_KEY = "canteen-user";
function getUserInfo() {
  try {
    const fromUni = common_vendor.index.getStorageSync(USER_KEY);
    if (fromUni)
      return JSON.parse(fromUni);
  } catch {
  }
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function setUserInfo(info) {
  const json = JSON.stringify(info);
  try {
    common_vendor.index.setStorageSync(USER_KEY, json);
  } catch {
  }
  try {
    localStorage.setItem(USER_KEY, json);
  } catch {
  }
}
function removeUserInfo() {
  try {
    common_vendor.index.removeStorageSync(USER_KEY);
  } catch {
  }
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
  }
}
exports.getToken = getToken;
exports.getUserInfo = getUserInfo;
exports.removeToken = removeToken;
exports.removeUserInfo = removeUserInfo;
exports.setToken = setToken;
exports.setUserInfo = setUserInfo;
