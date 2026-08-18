"use strict";
const SERVER_BASE = "http://192.168.126.220:8000";
function resolveImageUrl(url) {
  if (!url)
    return "";
  if (/^(https?:|data:|blob:|\/\/)/.test(url))
    return url;
  return SERVER_BASE + url;
}
exports.resolveImageUrl = resolveImageUrl;
