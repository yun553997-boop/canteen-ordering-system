import { X as showLoading, b as getToken, Y as request$1, Z as hideLoading, s as showToast, D as removeToken, G as reLaunch } from "./index-Db_-Zx2q.js";
const BASE_URL = "/api/v1";
function request(config) {
  return new Promise((resolve, reject) => {
    if (config.showLoading !== false) {
      showLoading({ title: "加载中...", mask: true });
    }
    const token = getToken();
    const header = {
      "Content-Type": "application/json"
    };
    if (token) {
      header["canteen-token"] = token;
    }
    request$1({
      url: BASE_URL + config.url,
      method: config.method || "GET",
      data: config.data,
      header,
      success: (res) => {
        const result = res.data;
        if (result.code === 200) {
          resolve(result.data);
        } else if (result.code === 401 || result.code === 403) {
          removeToken();
          reLaunch({ url: "/pages/login/login" });
          reject(new Error(result.message || "登录已过期"));
        } else {
          showToast({ title: result.message || "请求失败", icon: "none" });
          reject(new Error(result.message));
        }
      },
      fail: (err) => {
        showToast({ title: "网络异常，请稍后重试", icon: "none" });
        reject(err);
      },
      complete: () => {
        if (config.showLoading !== false) {
          hideLoading();
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
function post(url, data) {
  return request({ url, method: "POST", data });
}
function put(url, data) {
  return request({ url, method: "PUT", data });
}
function del(url) {
  return request({ url, method: "DELETE" });
}
export {
  post as a,
  del as d,
  get as g,
  put as p
};
