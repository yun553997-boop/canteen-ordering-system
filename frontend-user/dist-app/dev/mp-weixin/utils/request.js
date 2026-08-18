"use strict";
const common_vendor = require("../common/vendor.js");
const utils_storage = require("./storage.js");
const BASE_URL = "http://192.168.126.220:8000/api/v1";
function request(config) {
  return new Promise((resolve, reject) => {
    if (config.showLoading !== false) {
      common_vendor.index.showLoading({ title: "加载中...", mask: true });
    }
    const token = utils_storage.getToken();
    const header = {
      "Content-Type": "application/json"
    };
    if (token) {
      header["canteen-token"] = token;
    }
    common_vendor.index.request({
      url: BASE_URL + config.url,
      method: config.method || "GET",
      data: config.data,
      header,
      success: (res) => {
        const result = res.data;
        if (result.code === 200) {
          resolve(result.data);
        } else if (result.code === 401 || result.code === 403) {
          utils_storage.removeToken();
          common_vendor.index.reLaunch({ url: "/pages/login/index" });
          reject(new Error(result.message || "登录已过期"));
        } else {
          common_vendor.index.showToast({ title: result.message || "请求失败", icon: "none" });
          reject(new Error(result.message));
        }
      },
      fail: (err) => {
        common_vendor.index.showToast({ title: "网络异常，请稍后重试", icon: "none" });
        reject(err);
      },
      complete: () => {
        if (config.showLoading !== false) {
          common_vendor.index.hideLoading();
        }
      }
    });
  });
}
function get(url, params) {
  let fullUrl = url;
  if (params) {
    const query = Object.entries(params).filter(([, v]) => v !== void 0 && v !== null && v !== "").map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&");
    if (query) {
      fullUrl += "?" + query;
    }
  }
  return request({ url: fullUrl, method: "GET" });
}
function post(url, data, options) {
  return request({ url, method: "POST", data, showLoading: options == null ? void 0 : options.showLoading });
}
function put(url, data) {
  return request({ url, method: "PUT", data });
}
function del(url) {
  return request({ url, method: "DELETE" });
}
exports.del = del;
exports.get = get;
exports.post = post;
exports.put = put;
