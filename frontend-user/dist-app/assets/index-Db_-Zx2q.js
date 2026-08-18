function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/pages-index-index.BTwUtdQt.js","assets/user.BfKOqEu7.js","assets/request.Dl4B2NlH.js","assets/CustomTabBar.B_Z01zND.js","assets/CustomTabBar-D3RU8n4D.css","assets/index-DHgB4LGq.css","assets/pages-mine-mine.QpDw0VrO.js","assets/notification.BA7ssBbT.js","assets/auth.Bo_mhVa8.js","assets/mine-thvZJp42.css","assets/pages-notification-list.ebWMArGi.js","assets/list-aNwulyJX.css","assets/pages-login-login.D4sS0ei0.js","assets/login-BTehG0Vg.css","assets/pages-order-list.BVREQZcW.js","assets/list-DueCrwFm.css","assets/pages-order-detail.XyiPTYYV.js","assets/detail-COiBr43o.css","assets/pages-canteen-workbench-index.DkXUDMcN.js","assets/admin.Dnnlhti-.js","assets/index-DAgyAmyr.css","assets/pages-canteen-dish-index.C-faDGpd.js","assets/index-BVe3itAf.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.all(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen)
        return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
        return;
      }
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) {
        link.as = "script";
        link.crossOrigin = "";
      }
      link.href = dep;
      if (cspNonce) {
        link.setAttribute("nonce", cspNonce);
      }
      document.head.appendChild(link);
      if (isCss) {
        return new Promise((res, rej) => {
          link.addEventListener("load", res);
          link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
        });
      }
    }));
  }
  return promise.then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$2.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle$1(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle$1(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number") {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass$1(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass$1(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};
var define_process_env_default = {};
const BUILT_IN_TAG_NAMES = [
  "ad",
  "ad-content-page",
  "ad-draw",
  "audio",
  "button",
  "camera",
  "canvas",
  "checkbox",
  "checkbox-group",
  "cover-image",
  "cover-view",
  "editor",
  "form",
  "functional-page-navigator",
  "icon",
  "image",
  "input",
  "label",
  "live-player",
  "live-pusher",
  "map",
  "movable-area",
  "movable-view",
  "navigator",
  "official-account",
  "open-data",
  "picker",
  "picker-view",
  "picker-view-column",
  "progress",
  "radio",
  "radio-group",
  "rich-text",
  "scroll-view",
  "slider",
  "swiper",
  "swiper-item",
  "switch",
  "text",
  "textarea",
  "video",
  "view",
  "web-view",
  "location-picker",
  "location-view"
];
const BUILT_IN_TAGS = BUILT_IN_TAG_NAMES.map((tag) => "uni-" + tag);
const UVUE_WEB_BUILT_IN_TAGS = [
  "page-container",
  "list-view",
  "list-item",
  "sticky-section",
  "sticky-header",
  "cloud-db-element",
  "loading-element",
  "loading"
].map((tag) => "uni-" + tag);
const UNI_UI_CONFLICT_TAGS = ["list-item"].map((tag) => "uni-" + tag);
function isBuiltInComponent(tag) {
  if (UNI_UI_CONFLICT_TAGS.indexOf(tag) !== -1) {
    return false;
  }
  const realTag = "uni-" + tag.replace("v-uni-", "");
  if (define_process_env_default.UNI_APP_X !== "true") {
    return BUILT_IN_TAGS.indexOf(realTag) !== -1;
  }
  return BUILT_IN_TAGS.indexOf(realTag) !== -1 || UVUE_WEB_BUILT_IN_TAGS.indexOf(realTag) !== -1;
}
const LINEFEED = "\n";
const NAVBAR_HEIGHT = 44;
const ON_REACH_BOTTOM_DISTANCE = 50;
const UNI_STORAGE_LOCALE = "UNI_LOCALE";
const PRIMARY_COLOR = "#007aff";
const SCHEME_RE = /^([a-z-]+:)?\/\//i;
const DATA_RE = /^data:.*,.*/;
const WEB_INVOKE_APPSERVICE = "WEB_INVOKE_APPSERVICE";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LAST_PAGE_BACK_PRESS = "onLastPageBackPress";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_UPLOAD_DOUYIN_VIDEO = "onUploadDouyinVideo";
const ON_LIVE_MOUNT = "onLiveMount";
const ON_TITLE_CLICK = "onTitleClick";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_SHARE_CHAT = "onShareChat";
const ON_COPY_URL = "onCopyUrl";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_CHANGE = "onNavigationBarChange";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const ON_APP_ENTER_FOREGROUND = "onAppEnterForeground";
const ON_APP_ENTER_BACKGROUND = "onAppEnterBackground";
const ON_WEB_INVOKE_APP_SERVICE = "onWebInvokeAppService";
const ON_WXS_INVOKE_CALL_METHOD = "onWxsInvokeCallMethod";
function initUTSJSONObjectProperties(obj) {
  const propertyList = [
    "_resolveKeyPath",
    "_getValue",
    "toJSON",
    "get",
    "set",
    "getAny",
    "getString",
    "getNumber",
    "getBoolean",
    "getJSON",
    "getArray",
    "toMap",
    "forEach"
  ];
  const propertyDescriptorMap = {};
  for (let i = 0; i < propertyList.length; i++) {
    const property = propertyList[i];
    propertyDescriptorMap[property] = {
      enumerable: false,
      value: obj[property]
    };
  }
  Object.defineProperties(obj, propertyDescriptorMap);
}
function getRealDefaultValue(defaultValue) {
  return defaultValue === void 0 ? null : defaultValue;
}
class UTSJSONObject {
  static keys(obj) {
    return Object.keys(obj);
  }
  static assign(target, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      for (let key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  constructor(content = {}) {
    if (content instanceof Map) {
      content.forEach((value, key) => {
        this[key] = value;
      });
    } else {
      for (const key in content) {
        if (Object.prototype.hasOwnProperty.call(content, key)) {
          this[key] = content[key];
        }
      }
    }
    initUTSJSONObjectProperties(this);
  }
  _resolveKeyPath(keyPath) {
    let token = "";
    const keyPathArr = [];
    let inOpenParentheses = false;
    for (let i = 0; i < keyPath.length; i++) {
      const word = keyPath[i];
      switch (word) {
        case ".":
          if (token.length > 0) {
            keyPathArr.push(token);
            token = "";
          }
          break;
        case "[": {
          inOpenParentheses = true;
          if (token.length > 0) {
            keyPathArr.push(token);
            token = "";
          }
          break;
        }
        case "]":
          if (inOpenParentheses) {
            if (token.length > 0) {
              const tokenFirstChar = token[0];
              const tokenLastChar = token[token.length - 1];
              if (tokenFirstChar === '"' && tokenLastChar === '"' || tokenFirstChar === "'" && tokenLastChar === "'" || tokenFirstChar === "`" && tokenLastChar === "`") {
                if (token.length > 2) {
                  token = token.slice(1, -1);
                } else {
                  return [];
                }
              } else if (!/^\d+$/.test(token)) {
                return [];
              }
              keyPathArr.push(token);
              token = "";
            } else {
              return [];
            }
            inOpenParentheses = false;
          } else {
            return [];
          }
          break;
        default:
          token += word;
          break;
      }
      if (i === keyPath.length - 1) {
        if (token.length > 0) {
          keyPathArr.push(token);
          token = "";
        }
      }
    }
    return keyPathArr;
  }
  _getValue(keyPath, defaultValue) {
    const keyPathArr = this._resolveKeyPath(keyPath);
    const realDefaultValue = getRealDefaultValue(defaultValue);
    if (keyPathArr.length === 0) {
      return realDefaultValue;
    }
    let value = this;
    for (let i = 0; i < keyPathArr.length; i++) {
      const key = keyPathArr[i];
      if (value instanceof Object) {
        if (key in value) {
          value = value[key];
        } else {
          return realDefaultValue;
        }
      } else {
        return realDefaultValue;
      }
    }
    return value;
  }
  get(key) {
    return this._getValue(key);
  }
  set(key, value) {
    this[key] = value;
  }
  getAny(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    return this._getValue(key, realDefaultValue);
  }
  getString(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    const value = this._getValue(key, realDefaultValue);
    if (typeof value === "string") {
      return value;
    } else {
      return realDefaultValue;
    }
  }
  getNumber(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    const value = this._getValue(key, realDefaultValue);
    if (typeof value === "number") {
      return value;
    } else {
      return realDefaultValue;
    }
  }
  getBoolean(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    const boolean = this._getValue(key, realDefaultValue);
    if (typeof boolean === "boolean") {
      return boolean;
    } else {
      return realDefaultValue;
    }
  }
  getJSON(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    let value = this._getValue(key, realDefaultValue);
    if (value instanceof Object) {
      return value;
    } else {
      return realDefaultValue;
    }
  }
  getArray(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    let value = this._getValue(key, realDefaultValue);
    if (value instanceof Array) {
      return value;
    } else {
      return realDefaultValue;
    }
  }
  toMap() {
    let map2 = /* @__PURE__ */ new Map();
    for (let key in this) {
      map2.set(key, this[key]);
    }
    return map2;
  }
  forEach(callback) {
    for (let key in this) {
      callback(this[key], key);
    }
  }
}
function resolveOwnerVm(vm) {
  if (!vm) {
    return;
  }
  let componentName = vm.type.name;
  while (componentName && isBuiltInComponent(hyphenate(componentName))) {
    vm = vm.parent;
    componentName = vm.type.name;
  }
  return vm.proxy;
}
function isElement(el) {
  return el.nodeType === 1;
}
function resolveOwnerEl(instance2, multi = false) {
  const { vnode } = instance2;
  if (isElement(vnode.el)) {
    return multi ? vnode.el ? [vnode.el] : [] : vnode.el;
  }
  const { subTree } = instance2;
  if (subTree.shapeFlag & 16) {
    const elemVNodes = subTree.children.filter((vnode2) => vnode2.el && isElement(vnode2.el));
    if (elemVNodes.length > 0) {
      if (multi) {
        return elemVNodes.map((node) => node.el);
      }
      return elemVNodes[0].el;
    }
  }
  return multi ? vnode.el ? [vnode.el] : [] : vnode.el;
}
function normalizeStyle(value) {
  if (value instanceof UTSJSONObject) {
    const styleObject = {};
    UTSJSONObject.keys(value).forEach((key) => {
      styleObject[key] = value[key];
    });
    return normalizeStyle$1(styleObject);
  } else if (value instanceof Map) {
    const styleObject = {};
    value.forEach((value2, key) => {
      styleObject[key] = value2;
    });
    return normalizeStyle$1(styleObject);
  } else if (isString(value)) {
    return parseStringStyle(value);
  } else if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else {
    return normalizeStyle$1(value);
  }
}
function normalizeClass(value) {
  let res = "";
  if (value instanceof UTSJSONObject) {
    UTSJSONObject.keys(value).forEach((key) => {
      if (value[key]) {
        res += key + " ";
      }
    });
  } else if (value instanceof Map) {
    value.forEach((value2, key) => {
      if (value2) {
        res += key + " ";
      }
    });
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else {
    res = normalizeClass$1(value);
  }
  return res.trim();
}
function getLen(str = "") {
  return ("" + str).replace(/[^\x00-\xff]/g, "**").length;
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
function removeLeadingSlash(str) {
  return hasLeadingSlash(str) ? str.slice(1) : str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
const invokeArrayFnsWithResults = (fns, arg) => {
  return fns.map((fn) => fn(arg));
};
function updateElementStyle(element, styles) {
  for (const attrName in styles) {
    element.style[attrName] = styles[attrName];
  }
}
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
const _completeValue = (value) => value > 9 ? value : "0" + value;
function formatDateTime({ date = /* @__PURE__ */ new Date(), mode: mode2 = "date" }) {
  if (mode2 === "time") {
    return _completeValue(date.getHours()) + ":" + _completeValue(date.getMinutes());
  } else {
    return date.getFullYear() + "-" + _completeValue(date.getMonth() + 1) + "-" + _completeValue(date.getDate());
  }
}
function callOptions(options, data) {
  options = options || {};
  if (isString(data)) {
    data = {
      errMsg: data
    };
  }
  if (/:ok$/.test(data.errMsg)) {
    if (isFunction(options.success)) {
      options.success(data);
    }
  } else {
    if (isFunction(options.fail)) {
      options.fail(data);
    }
  }
  if (isFunction(options.complete)) {
    options.complete(data);
  }
}
function formatKey(key) {
  return camelize(key.substring(5));
}
const initCustomDatasetOnce = /* @__PURE__ */ once((isBuiltInElement2) => {
  isBuiltInElement2 = isBuiltInElement2 || ((el) => el.tagName.startsWith("UNI-"));
  const prototype = HTMLElement.prototype;
  const setAttribute = prototype.setAttribute;
  prototype.setAttribute = function(key, value) {
    if (key.startsWith("data-") && isBuiltInElement2(this)) {
      const dataset = this.__uniDataset || (this.__uniDataset = {});
      dataset[formatKey(key)] = value;
    }
    if (!/^\d/.test(key)) {
      setAttribute.call(this, key, value);
    }
  };
  const removeAttribute = prototype.removeAttribute;
  prototype.removeAttribute = function(key) {
    if (this.__uniDataset && key.startsWith("data-") && isBuiltInElement2(this)) {
      delete this.__uniDataset[formatKey(key)];
    }
    removeAttribute.call(this, key);
  };
});
function getCustomDataset(el) {
  return extend$1({}, el.dataset, el.__uniDataset);
}
const unitRE = new RegExp(`"[^"]+"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px`, "g");
function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}
const defaultRpx2Unit = {
  unit: "rem",
  unitRatio: 10 / 320,
  unitPrecision: 5
};
function createRpx2Unit(unit2, unitRatio2, unitPrecision2) {
  return (val) => val.replace(unitRE, (m, $1) => {
    if (!$1) {
      return m;
    }
    const value = toFixed(parseFloat($1) * unitRatio2, unitPrecision2);
    return value === 0 ? "0" : `${value}${unit2}`;
  });
}
function passive(passive2) {
  return { passive: passive2 };
}
function normalizeTarget(el) {
  const { id: id2, offsetTop, offsetLeft } = el;
  return {
    id: id2,
    dataset: getCustomDataset(el),
    offsetTop,
    offsetLeft
  };
}
function decode$1(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
function decodedQuery(query = {}) {
  const decodedQuery2 = {};
  Object.keys(query).forEach((name) => {
    try {
      decodedQuery2[name] = decode$1(query[name]);
    } catch (e) {
      decodedQuery2[name] = query[name];
    }
  });
  return decodedQuery2;
}
const PLUS_RE$1 = /\+/g;
function parseQuery$1(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE$1, " ");
    let eqPos = searchParam.indexOf("=");
    let key = decode$1(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    let value = eqPos < 0 ? null : decode$1(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray$1(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function parseUrl(url) {
  const [path, querystring] = url.split("?", 2);
  return {
    path,
    query: parseQuery$1(querystring || "")
  };
}
function debounce(fn, delay, { clearTimeout: clearTimeout2, setTimeout: setTimeout2 }) {
  let timeout;
  const newFn = function() {
    clearTimeout2(timeout);
    const timerFn = () => fn.apply(this, arguments);
    timeout = setTimeout2(timerFn, delay);
  };
  newFn.cancel = function() {
    clearTimeout2(timeout);
  };
  return newFn;
}
class EventChannel {
  constructor(id2, events) {
    this.id = id2;
    this.listener = {};
    this.emitCache = [];
    if (events) {
      Object.keys(events).forEach((name) => {
        this.on(name, events[name]);
      });
    }
  }
  emit(eventName, ...args) {
    const fns = this.listener[eventName];
    if (!fns) {
      return this.emitCache.push({
        eventName,
        args
      });
    }
    fns.forEach((opt) => {
      opt.fn.apply(opt.fn, args);
    });
    this.listener[eventName] = fns.filter((opt) => opt.type !== "once");
  }
  on(eventName, fn) {
    this._addListener(eventName, "on", fn);
    this._clearCache(eventName);
  }
  once(eventName, fn) {
    this._addListener(eventName, "once", fn);
    this._clearCache(eventName);
  }
  off(eventName, fn) {
    const fns = this.listener[eventName];
    if (!fns) {
      return;
    }
    if (fn) {
      for (let i = 0; i < fns.length; ) {
        if (fns[i].fn === fn) {
          fns.splice(i, 1);
          i--;
        }
        i++;
      }
    } else {
      delete this.listener[eventName];
    }
  }
  _clearCache(eventName) {
    for (let index2 = 0; index2 < this.emitCache.length; index2++) {
      const cache2 = this.emitCache[index2];
      const _name = eventName ? cache2.eventName === eventName ? eventName : null : cache2.eventName;
      if (!_name)
        continue;
      const location2 = this.emit.apply(this, [_name, ...cache2.args]);
      if (typeof location2 === "number") {
        this.emitCache.pop();
        continue;
      }
      this.emitCache.splice(index2, 1);
      index2--;
    }
  }
  _addListener(eventName, type, fn) {
    (this.listener[eventName] || (this.listener[eventName] = [])).push({
      fn,
      type
    });
  }
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_COPY_URL,
  ON_UPLOAD_DOUYIN_VIDEO,
  ON_LIVE_MOUNT,
  ON_TITLE_CLICK,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootImmediateHook(name) {
  const PAGE_SYNC_HOOKS = [ON_LOAD, ON_SHOW];
  return PAGE_SYNC_HOOKS.indexOf(name) > -1;
}
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_COPY_URL,
  ON_UPLOAD_DOUYIN_VIDEO,
  ON_LIVE_MOUNT,
  ON_TITLE_CLICK,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
  ON_LAST_PAGE_BACK_PRESS
];
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
const createVueAppHooks = [];
function invokeCreateVueAppHook(app) {
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  return createErrorHandler2(app);
});
const E = function() {
};
E.prototype = {
  _id: 1,
  on: function(name, callback, ctx) {
    var e = this.e || (this.e = {});
    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx,
      _id: this._id
    });
    return this._id++;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, event) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];
    if (evts && event) {
      for (var i = evts.length - 1; i >= 0; i--) {
        if (evts[i].fn === event || evts[i].fn._ === event || evts[i]._id === event) {
          evts.splice(i, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return this;
  }
};
var E$1 = E;
const borderStyles = {
  black: "rgba(0,0,0,0.4)",
  white: "rgba(255,255,255,0.4)"
};
function normalizeTabBarStyles(borderStyle) {
  if (borderStyle && borderStyle in borderStyles) {
    return borderStyles[borderStyle];
  }
  return borderStyle;
}
function normalizeTitleColor(titleColor) {
  return titleColor === "black" ? "#000000" : "#ffffff";
}
function resolveStringStyleItem(modeStyle, styleItem, key) {
  if (isString(styleItem) && styleItem.startsWith("@")) {
    const _key = styleItem.replace("@", "");
    let _styleItem = modeStyle[_key] || styleItem;
    switch (key) {
      case "titleColor":
        _styleItem = normalizeTitleColor(_styleItem);
        break;
      case "borderStyle":
        _styleItem = normalizeTabBarStyles(_styleItem);
        break;
    }
    return _styleItem;
  }
  return styleItem;
}
function normalizeStyles(pageStyle, themeConfig2 = {}, mode2 = "light") {
  const modeStyle = themeConfig2[mode2];
  const styles = {};
  if (typeof modeStyle === "undefined" || !pageStyle)
    return pageStyle;
  Object.keys(pageStyle).forEach((key) => {
    const styleItem = pageStyle[key];
    const parseStyleItem = () => {
      if (isPlainObject(styleItem))
        return normalizeStyles(styleItem, themeConfig2, mode2);
      if (isArray$1(styleItem))
        return styleItem.map((item) => {
          if (isPlainObject(item))
            return normalizeStyles(item, themeConfig2, mode2);
          return resolveStringStyleItem(modeStyle, item);
        });
      return resolveStringStyleItem(modeStyle, styleItem, key);
    };
    styles[key] = parseStyleItem();
  });
  return styles;
}
/**
* @dcloudio/uni-h5-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect2, scope2 = activeEffectScope) {
  if (scope2 && scope2.active) {
    scope2.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope2) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope2);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0; i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend$1({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend$1({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty$1(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$1;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn$1(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$1(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance2 = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance2 && instance2.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    if (args.length) {
      args[0] = String(args[0]);
    }
    callWithErrorHandling(
      appWarnHandler,
      instance2,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance2 && instance2.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance2, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props2) {
  const res = [];
  const keys = Object.keys(props2);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props2[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function assertNumber(val, type) {
  if (val === void 0) {
    return;
  } else if (typeof val !== "number") {
    warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$1(`${type} is NaN - the duration expression might be incorrect.`);
  }
}
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  // fixed by xxxxxx
  ["ba"]: "beforeActivate hook",
  ["a"]: "activated hook",
  // fixed by xxxxxx
  ["bda"]: "beforeDeactivate hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance2, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance2, type);
  }
}
function callWithAsyncErrorHandling(fn, instance2, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance2, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance2, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance2, type, args));
  }
  return values;
}
function handleError(err, instance2, type, throwInDev = true) {
  const contextVNode = instance2 ? instance2.vnode : null;
  if (instance2) {
    let cur = instance2.parent;
    const exposedInstance = instance2.proxy;
    const errorInfo = ErrorTypeStrings$1[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance2.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings$1[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex$1(id2) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id2 || middleJobId === id2 && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex$1(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue$1.indexOf(job);
  if (i > flushIndex) {
    queue$1.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance2, seen2, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  for (; i < queue$1.length; i++) {
    const cb = queue$1[i];
    if (cb && cb.pre) {
      if (instance2 && cb.id !== instance2.uid) {
        continue;
      }
      if (checkRecursiveUpdates(seen2, cb)) {
        continue;
      }
      queue$1.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a2, b) => getId(a2) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen2 = seen2 || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen2, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b) => {
  const diff = getId(a2) - getId(b);
  if (diff === 0) {
    if (a2.pre && !b.pre)
      return -1;
    if (b.pre && !a2.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen2, job);
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen2);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs(seen2);
    }
  }
}
function checkRecursiveUpdates(seen2, fn) {
  if (!seen2.has(fn)) {
    seen2.set(fn, 1);
  } else {
    const count = seen2.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance2 = fn.ownerInstance;
      const componentName = instance2 && getComponentName(instance2.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen2.set(fn, count + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload$1)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance2) {
  const id2 = instance2.type.__hmrId;
  let record = map.get(id2);
  if (!record) {
    createRecord(id2, instance2.type);
    record = map.get(id2);
  }
  record.instances.add(instance2);
}
function unregisterHMR(instance2) {
  map.get(instance2.type.__hmrId).instances.delete(instance2);
}
function createRecord(id2, initialDef) {
  if (map.has(id2)) {
    return false;
  }
  map.set(id2, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id2, newRender) {
  const record = map.get(id2);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance2) => {
    if (newRender) {
      instance2.render = newRender;
      normalizeClassComponent(instance2.type).render = newRender;
    }
    instance2.renderCache = [];
    isHmrUpdating = true;
    instance2.effect.dirty = true;
    instance2.update();
    isHmrUpdating = false;
  });
}
function reload$1(id2, newComp) {
  const record = map.get(id2);
  if (!record)
    return;
  if (typeof window !== "undefined" && window.__setupPage && record.initialDef.__mpType === "page") {
    newComp = window.__setupPage(newComp);
  }
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance2 of instances) {
    const oldComp = normalizeClassComponent(instance2.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance2.appContext.propsCache.delete(instance2.type);
    instance2.appContext.emitsCache.delete(instance2.type);
    instance2.appContext.optionsCache.delete(instance2.type);
    if (instance2.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance2.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance2.parent) {
      instance2.parent.effect.dirty = true;
      queueJob(instance2.parent.update);
    } else if (instance2.appContext.reload) {
      instance2.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb(() => {
    for (const instance2 of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance2.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend$1(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id2, arg) => {
    try {
      return fn(id2, arg);
    } catch (e) {
      console.error(e);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
let devtools$1;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1$1(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook$1(hook, target) {
  var _a, _b;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook$1(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit$1$1("app:unmount", app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1$1(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : void 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit$2(instance2, event, ...rawArgs) {
  if (instance2.isUnmounted)
    return;
  const props2 = instance2.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance2;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator2 = emitsOptions[event];
        if (isFunction(validator2)) {
          const isValid = validator2(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props2) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props2[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance2, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props2[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance2,
          instance2.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props2[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props2[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props2[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance2,
      6,
      // fixed by xxxxxx
      normalizeWxsEventArgs(instance2, handler, args)
    );
  }
  const onceHandler = props2[handlerName + `Once`];
  if (onceHandler) {
    if (!instance2.emitted) {
      instance2.emitted = {};
    } else if (instance2.emitted[handlerName]) {
      return;
    }
    instance2.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance2,
      6,
      // fixed by xxxxxx
      normalizeWxsEventArgs(instance2, onceHandler, args)
    );
  }
}
function normalizeWxsEventArgs(instance2, handler, args) {
  if (args.length !== 1) {
    return args;
  }
  if (isFunction(handler)) {
    if (handler.length < 2) {
      return args;
    }
  } else {
    if (!handler.find((item) => item.length >= 2)) {
      return args;
    }
  }
  const $sysEvent = args[0];
  if ($sysEvent && hasOwn$1($sysEvent, "type") && hasOwn$1($sysEvent, "timeStamp") && hasOwn$1($sysEvent, "target") && hasOwn$1($sysEvent, "currentTarget") && hasOwn$1($sysEvent, "detail")) {
    const proxy = instance2.proxy;
    const $ownerInstance = proxy.$gcd(proxy, true);
    if ($ownerInstance) {
      args.push($ownerInstance);
    }
  }
  return args;
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend$1(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance2) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance2;
  currentScopeId = instance2 && instance2.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance2) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props: props2,
    propsOptions: [propsOptions],
    slots,
    attrs: attrs2,
    emit: emit2,
    render: render2,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance2;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance2);
  {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render2.call(
          thisProxy,
          proxyToUse,
          renderCache,
          props2,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs2;
    } else {
      const render22 = Component;
      if (attrs2 === props2) {
        markAttrsAccessed();
      }
      result = normalizeVNode(
        render22.length > 1 ? render22(
          props2,
          true ? {
            get attrs() {
              markAttrsAccessed();
              return attrs2;
            },
            slots,
            emit: emit2
          } : { attrs: attrs2, slots, emit: emit2 }
        ) : render22(
          props2,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs2 : getFunctionalFallthrough(attrs2);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance2, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs2);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1(
            `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
          );
        }
        if (eventAttrs.length) {
          warn$1(
            `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root)) {
      warn$1(
        `Runtime directive used on component with non-element root node. The directives will not function as intended.`
      );
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn$1(
        `Component inside <Transition> renders non-element root node that cannot be animated.`
      );
    }
    root.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren, false);
  if (!childRoot) {
    return [vnode, void 0];
  } else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
    return getChildRoot(childRoot);
  }
  const index2 = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index2] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children, recurse = true) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
          if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
            return filterSingleRoot(singleRoot.children);
          }
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs2) => {
  let res;
  for (const key in attrs2) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs2[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs2, props2) => {
  const res = {};
  for (const key in attrs2) {
    if (!isModelListener(key) || !(key.slice(9) in props2)) {
      res[key] = attrs2[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance2 = currentRenderingInstance || currentInstance;
  if (instance2) {
    const Component = instance2.type;
    {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance2[type] || Component[type], name) || // global registration
      resolve(instance2.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (warnMissing && !res) {
      const extra = `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.`;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      warn$1(
        `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
      );
    }
    return ctx;
  }
};
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s) => {
    warn$1(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance2 = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance2, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance2, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance2,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance2, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance2, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance2, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance2 && instance2.suspense);
  } else {
    job.pre = true;
    if (instance2)
      job.id = instance2.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope2 = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope2) {
      remove(scope2.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect2.run.bind(effect2),
      instance2 && instance2.suspense
    );
  } else {
    effect2.run();
  }
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen2) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen2);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, currentDepth, seen2);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen2);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    warn$1(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance2 = getExposeProxy(currentRenderingInstance) || currentRenderingInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance: instance2,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance2, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance2, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const leaveCbKey = Symbol("_leaveCb");
const enterCbKey$1 = Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props2, { slots }) {
    const instance2 = getCurrentInstance();
    const state = useTransitionState();
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment) {
            if (hasFound) {
              warn$1(
                "<transition> can only be used on a single element or component. Use <transition-group> for lists."
              );
              break;
            }
            child = c;
            hasFound = true;
          }
        }
      }
      const rawProps = toRaw(props2);
      const { mode: mode2 } = rawProps;
      if (mode2 && mode2 !== "in-out" && mode2 !== "out-in" && mode2 !== "default") {
        warn$1(`invalid <transition> mode: ${mode2}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance2
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance2.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance2
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode2 === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance2.update.active !== false) {
              instance2.effect.dirty = true;
              instance2.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode2 === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props2, state, instance2) {
  const {
    appear,
    mode: mode2,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props2;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance2,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode: mode2,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el[enterCbKey$1] = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey$1] = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el[enterCbKey$1]) {
        el[enterCbKey$1](
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el[leaveCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props2, state, instance2);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    vnode.component ? vnode.component.subTree : vnode.children ? vnode.children[0] : void 0
  ) : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend$1({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (!comp) {
        warn$1(
          `Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`
        );
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if (comp && !isObject$1(comp) && !isFunction(comp)) {
        throw new Error(`Invalid async component load result: ${comp}`);
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return /* @__PURE__ */ defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance2 = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance2);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(
          err,
          instance2,
          13,
          !errorComponent
        );
      };
      if (suspensible && instance2.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance2);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(
              `Async component timed out after ${timeout}ms.`
            );
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance2.parent && isKeepAlive(instance2.parent.vnode)) {
          instance2.parent.effect.dirty = true;
          queueJob(instance2.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance2);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  const { ref: ref2, props: props2, children, ce } = parent.vnode;
  const vnode = createVNode(comp, props2, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
class Cache {
  constructor(max) {
    this.max = max;
    this._cache = /* @__PURE__ */ new Map();
    this._keys = /* @__PURE__ */ new Set();
    this._max = parseInt(max, 10);
  }
  get(key) {
    const { _cache, _keys, _max } = this;
    const cached = _cache.get(key);
    if (cached) {
      _keys.delete(key);
      _keys.add(key);
    } else {
      _keys.add(key);
      if (_max && _keys.size > _max) {
        const staleKey = _keys.values().next().value;
        this.pruneCacheEntry(_cache.get(staleKey));
        this.delete(staleKey);
      }
    }
    return cached;
  }
  set(key, value) {
    this._cache.set(key, value);
  }
  delete(key) {
    this._cache.delete(key);
    this._keys.delete(key);
  }
  forEach(fn, thisArg) {
    this._cache.forEach(fn.bind(thisArg));
  }
}
const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number],
    matchBy: {
      type: String,
      default: "name"
    },
    cache: Object
  },
  setup(props2, { slots }) {
    const instance2 = getCurrentInstance();
    const sharedContext = instance2.ctx;
    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    if (props2.cache && props2.max) {
      warn$1(
        "The `max` prop will be ignored if you provide a custom caching strategy"
      );
    }
    const cache = props2.cache || new Cache(props2.max);
    cache.pruneCacheEntry = pruneCacheEntry;
    let current = null;
    function pruneCacheEntry(cached) {
      if (!current || !isSameVNodeType(cached, current) || props2.matchBy === "key" && cached.key !== current.key) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
    }
    const parentSuspense = instance2.suspense;
    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement }
      }
    } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
      const instance22 = vnode.component;
      if (instance22.ba) {
        const currentState = instance22.isDeactivated;
        instance22.isDeactivated = false;
        invokeArrayFns$1(instance22.ba);
        instance22.isDeactivated = currentState;
      }
      move(vnode, container, anchor, 0, parentSuspense);
      patch(
        instance22.vnode,
        vnode,
        container,
        anchor,
        instance22,
        parentSuspense,
        namespace,
        vnode.slotScopeIds,
        optimized
      );
      queuePostRenderEffect(() => {
        instance22.isDeactivated = false;
        if (instance22.a) {
          invokeArrayFns$1(instance22.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance22.parent, vnode);
        }
      }, parentSuspense);
      {
        devtoolsComponentAdded(instance22);
      }
    };
    sharedContext.deactivate = (vnode) => {
      const instance22 = vnode.component;
      if (instance22.bda) {
        invokeKeepAliveHooks(instance22.bda);
      }
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance22.bda) {
          resetHookState(instance22.bda);
        }
        if (instance22.da) {
          invokeArrayFns$1(instance22.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance22.parent, vnode);
        }
        instance22.isDeactivated = true;
      }, parentSuspense);
      {
        devtoolsComponentAdded(instance22);
      }
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance2, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getMatchingName(vnode, props2.matchBy);
        if (name && (!filter || !filter(name))) {
          cache.delete(key);
          pruneCacheEntry(vnode);
        }
      });
    }
    watch(
      () => [props2.include, props2.exclude, props2.matchBy],
      ([include2, exclude]) => {
        include2 && pruneCache((name) => matches(include2, name));
        exclude && pruneCache((name) => !matches(exclude, name));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: true }
    );
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance2.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached, key) => {
        cache.delete(key);
        pruneCacheEntry(cached);
        const { subTree, suspense } = instance2;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type && (props2.matchBy !== "key" || cached.key === vnode.key)) {
          if (vnode.component.bda) {
            invokeArrayFns$1(vnode.component.bda);
          }
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        {
          warn$1(`KeepAlive should contain exactly one component child.`);
        }
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !isSuspense(rawVNode.type)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type;
      const name = getMatchingName(vnode, props2.matchBy);
      const { include: include2, exclude } = props2;
      if (include2 && (!name || !matches(include2, name)) || exclude && name && matches(exclude, name)) {
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (isSuspense(rawVNode.type)) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
  if (isArray$1(pattern)) {
    return pattern.some((p2) => matches(p2, name));
  } else if (isString(pattern)) {
    return pattern.split(",").includes(name);
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function onBeforeActivate(hook, target) {
  registerKeepAliveHook(hook, "ba", target);
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onBeforeDeactivate(hook, target) {
  registerKeepAliveHook(hook, "bda", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  wrappedHook.__called = false;
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= -257;
  vnode.shapeFlag &= -513;
}
function getInnerChild(vnode) {
  return isSuspense(vnode.type) ? vnode.ssContent : vnode;
}
function getMatchingName(vnode, matchBy) {
  if (matchBy === "name") {
    const comp = vnode.type;
    return getComponentName(
      isAsyncWrapper(vnode) ? comp.__asyncResolved || {} : comp
    );
  }
  return String(vnode.key);
}
function invokeKeepAliveHooks(hooks) {
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (!hook.__called) {
      hook();
      hook.__called = true;
    }
  }
}
function resetHookState(hooks) {
  hooks.forEach((hook) => hook.__called = false);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type) && target.$pageInstance) {
      if (target.type.__reserved) {
        return;
      }
      if (target !== target.$pageInstance) {
        target = target.$pageInstance;
        if (isRootImmediateHook(type)) {
          const proxy = target.proxy;
          callWithAsyncErrorHandling(
            hook.bind(proxy),
            target,
            type,
            ON_LOAD === type ? [proxy.$page.options] : []
          );
        }
      }
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings$1[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache;
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$1(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function renderSlot(slots, name, props2 = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props2.name = name;
    return createVNode("slot", props2, fallback);
  }
  let slot = slots[name];
  if (slot && slot.length > 1) {
    warn$1(
      `SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`
    );
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props2));
  const rendered = createBlock(
    Fragment,
    {
      key: props2.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || [],
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i)) {
    const p2 = getExposeProxy(i) || i.proxy;
    return p2;
  }
  return getPublicInstance(i.parent);
};
const createForceUpdate = (i) => {
  return function() {
    i.effect.dirty = true;
    queueJob(i.update);
    {
      return;
    }
  };
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    // fixed by xxxxxx
    $forceUpdate: (i) => i.f || (i.f = createForceUpdate(i)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance2 }, key) {
    const { ctx, setupState, data, props: props2, accessCache, type, appContext } = instance2;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props2[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance2.propsOptions[0]) && hasOwn$1(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props2[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance2, "get", key);
        markAttrsAccessed();
      } else if (key === "$slots") {
        track(instance2, "get", key);
      }
      return publicGetter(instance2);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$1(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance2 === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance2 }, key, value) {
    const { data, setupState, ctx } = instance2;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance2.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance2) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance2.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance2) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance2
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance2),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance2) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance2;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance2.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance2) {
  const { ctx, setupState } = instance2;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props2) {
  return isArray$1(props2) ? props2.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props2;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance2) {
  const options = resolveMergedOptions(instance2);
  const publicThis = instance2.proxy;
  const ctx = instance2.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance2, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance2.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$1(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance2.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance2, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance2.exposed || (instance2.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance2.exposed) {
      instance2.exposed = {};
    }
  }
  if (render2 && instance2.render === NOOP) {
    instance2.render = render2;
  }
  if (inheritAttrs != null) {
    instance2.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance2.components = components;
  if (directives)
    instance2.directives = directives;
  const customApplyOptions = instance2.appContext.config.globalProperties.$applyOptions;
  if (customApplyOptions) {
    customApplyOptions(options, instance2, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance2, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance2.proxy)) : hook.bind(instance2.proxy),
    instance2,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance2) {
  const base = instance2.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance2.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions$1(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend$1(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend$1(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend$1(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render2, hydrate2) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend$1({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$1(
              `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
            );
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            context.reload = () => {
              render2(
                cloneVNode(vnode),
                rootContainer,
                namespace
              );
            };
          }
          {
            render2(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          app._instance = vnode.component;
          {
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else {
          warn$1(
            `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app._container);
          {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else {
          warn$1(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance2 = currentInstance || currentRenderingInstance;
  if (instance2 || currentApp) {
    const provides = instance2 ? instance2.parent == null ? instance2.vnode.appContext && instance2.vnode.appContext.provides : instance2.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance2 && instance2.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
function initProps(instance2, rawProps, isStateful, isSSR = false) {
  const props2 = {};
  const attrs2 = {};
  def(attrs2, InternalObjectKey, 1);
  instance2.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance2, rawProps, props2, attrs2);
  for (const key in instance2.propsOptions[0]) {
    if (!(key in props2)) {
      props2[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props2, instance2);
  }
  if (isStateful) {
    instance2.props = isSSR ? props2 : shallowReactive(props2);
  } else {
    if (!instance2.type.props) {
      instance2.props = attrs2;
    } else {
      instance2.props = props2;
    }
  }
  instance2.attrs = attrs2;
}
function isInHmrContext(instance2) {
  while (instance2) {
    if (instance2.type.__hmrId)
      return true;
    instance2 = instance2.parent;
  }
}
function updateProps(instance2, rawProps, rawPrevProps, optimized) {
  const {
    props: props2,
    attrs: attrs2,
    vnode: { patchFlag }
  } = instance2;
  const rawCurrentProps = toRaw(props2);
  const [options] = instance2.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance2) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance2.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance2.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs2, key)) {
            if (value !== attrs2[key]) {
              attrs2[key] = normalizeInheritAttrsValue(instance2, key, value);
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props2[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance2,
              false
            );
          }
        } else {
          if (value !== attrs2[key]) {
            attrs2[key] = normalizeInheritAttrsValue(instance2, key, value);
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance2, rawProps, props2, attrs2)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props2[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance2,
              true
            );
          }
        } else {
          delete props2[key];
        }
      }
    }
    if (attrs2 !== rawCurrentProps) {
      for (const key in attrs2) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs2[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance2, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props2, instance2);
  }
}
function setFullProps(instance2, rawProps, props2, attrs2) {
  const [options, needCastKeys] = instance2.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          {
            props2[camelKey] = value;
          }
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance2.emitsOptions, key)) {
        if (!(key in attrs2) || value !== attrs2[key]) {
          attrs2[key] = normalizeInheritAttrsValue(instance2, key, value);
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props2);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props2[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance2,
        !hasOwn$1(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function normalizeInheritAttrsValue(instance2, key, value) {
  return value;
}
function resolvePropValue(options, props2, key, value, instance2, isAbsent) {
  const result = _resolvePropValue(
    options,
    props2,
    key,
    value,
    instance2,
    isAbsent
  );
  return result;
}
function _resolvePropValue(options, props2, key, value, instance2, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance2;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance2);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props2
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props2, keys] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props2);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend$1({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType$1(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a2, b) {
  return getType$1(a2) === getType$1(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props2, instance2) {
  const resolvedValues = toRaw(props2);
  const options = instance2.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp$1(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key))
    );
  }
}
function validateProp$1(name, value, prop, props2, isAbsent) {
  const { type, required, validator: validator2, skipCheck, default: defaultValue } = prop;
  if (defaultValue == null && required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage$1(name, value, expectedTypes));
      return;
    }
  }
  if (validator2 && !validator2(value, props2)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance && (!ctx || ctx.root === currentInstance.root)) {
      warn$1(
        `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
      );
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance2) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      {
        warn$1(
          `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
        );
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance2, children) => {
  if (!isKeepAlive(instance2.vnode) && true) {
    warn$1(
      `Non-function value encountered for default slot. Prefer function slots for better performance.`
    );
  }
  const normalized = normalizeSlotValue(children);
  instance2.slots.default = () => normalized;
};
const initSlots = (instance2, children) => {
  if (instance2.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance2.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance2.slots = {}
      );
    }
  } else {
    instance2.slots = {};
    if (children) {
      normalizeVNodeSlots(instance2, children);
    }
  }
  def(instance2.slots, InternalObjectKey, 1);
};
const updateSlots = (instance2, children, optimized) => {
  const { vnode, slots } = instance2;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating) {
        extend$1(slots, children);
        trigger(instance2, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend$1(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance2, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 && true ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn$1(
      `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
    );
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn$1(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn$1(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn$1(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn$1(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else {
          warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else {
      warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let supported$1;
let perf$1;
function startMeasure(instance2, type) {
  if (instance2.appContext.config.performance && isSupported()) {
    perf$1.mark(`vue-${type}-${instance2.uid}`);
  }
  {
    devtoolsPerfStart(instance2, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function endMeasure(instance2, type) {
  if (instance2.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance2.uid}`;
    const endTag = startTag + `:end`;
    perf$1.mark(endTag);
    perf$1.measure(
      `<${formatComponentName(instance2, instance2.type)}> ${type}`,
      startTag,
      endTag
    );
    perf$1.clearMarks(startTag);
    perf$1.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance2, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function isSupported() {
  if (supported$1 !== void 0) {
    return supported$1;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported$1 = true;
    perf$1 = window.performance;
  } else {
    supported$1 = false;
  }
  return supported$1;
}
function initFeatureFlags() {
  const needWarn = [];
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(
      `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    forcePatchProp: hostForcePatchProp,
    // fixed by xxxxxx
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        } else {
          patchStaticNode(n1, n2, container, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else {
          warn$1("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, namespace) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props: props2, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props2 && props2.is,
      props2
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props2) {
      for (const key in props2) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props2[key],
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props2) {
        hostPatchProp(el, "value", null, props2.value, namespace);
      }
      if (vnodeHook = props2.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
    }
    Object.defineProperty(el, "__vueParentComponent", {
      value: parentComponent,
      enumerable: false
    });
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props2 && props2.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
      {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          namespace
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value" || hostForcePatchProp && hostForcePatchProp(el, key)) {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                namespace,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        namespace
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value" || hostForcePatchProp && hostForcePatchProp(el, key)) {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (
      // #5523 dev root fragment may inherit directives
      isHmrUpdating || patchFlag & 2048
    ) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        {
          traverseStaticChildren(n1, n2);
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance2 = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (instance2.type.__hmrId) {
      registerHMR(instance2);
    }
    {
      pushWarningContext(initialVNode);
      startMeasure(instance2, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance2.ctx.renderer = internals;
    }
    {
      {
        startMeasure(instance2, `init`);
      }
      setupComponent$1(instance2);
      {
        endMeasure(instance2, `init`);
      }
    }
    if (instance2.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance2, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance2.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance2,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
    {
      popWarningContext();
      endMeasure(instance2, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance2 = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance2.asyncDep && !instance2.asyncResolved) {
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance2, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        instance2.next = n2;
        invalidateJob(instance2.update);
        instance2.effect.dirty = true;
        instance2.update();
      }
    } else {
      n2.el = n1.el;
      instance2.vnode = n2;
    }
  };
  const setupRenderEffect = (instance2, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance2.isMounted) {
        let vnodeHook;
        const { el, props: props2 } = initialVNode;
        const { bm, m, parent } = instance2;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance2, false);
        if (bm) {
          invokeArrayFns$1(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance2, true);
        {
          {
            startMeasure(instance2, `render`);
          }
          const subTree = instance2.subTree = renderComponentRoot(instance2);
          {
            endMeasure(instance2, `render`);
          }
          {
            startMeasure(instance2, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance2,
            parentSuspense,
            namespace
          );
          {
            endMeasure(instance2, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance2.ba && invokeKeepAliveHooks(instance2.ba);
          instance2.a && queuePostRenderEffect(instance2.a, parentSuspense);
        }
        instance2.isMounted = true;
        {
          devtoolsComponentAdded(instance2);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance2;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance2);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance2, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance2.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        {
          pushWarningContext(next || instance2.vnode);
        }
        toggleRecurse(instance2, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance2, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns$1(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance2, true);
        {
          startMeasure(instance2, `render`);
        }
        const nextTree = renderComponentRoot(instance2);
        {
          endMeasure(instance2, `render`);
        }
        const prevTree = instance2.subTree;
        instance2.subTree = nextTree;
        {
          startMeasure(instance2, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance2,
          parentSuspense,
          namespace
        );
        {
          endMeasure(instance2, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance2, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        {
          devtoolsComponentUpdated(instance2);
        }
        {
          popWarningContext();
        }
      }
    };
    const effect2 = instance2.effect = new ReactiveEffect(
      componentUpdateFn,
      NOOP,
      () => queueJob(update),
      instance2.scope
      // track it in component's effect scope
    );
    const update = instance2.update = () => {
      if (effect2.dirty) {
        effect2.run();
      }
    };
    update.id = instance2.uid;
    toggleRecurse(instance2, true);
    {
      effect2.onTrack = instance2.rtc ? (e) => invokeArrayFns$1(instance2.rtc, e) : void 0;
      effect2.onTrigger = instance2.rtg ? (e) => invokeArrayFns$1(instance2.rtg, e) : void 0;
      update.ownerInstance = instance2;
    }
    update();
  };
  const updateComponentPreRender = (instance2, nextVNode, optimized) => {
    nextVNode.component = instance2;
    const prevProps = instance2.vnode.props;
    instance2.vnode = nextVNode;
    instance2.next = null;
    updateProps(instance2, nextVNode.props, prevProps, optimized);
    updateSlots(instance2, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance2);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$1(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            );
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props: props2,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance2, parentSuspense, doRemove) => {
    if (instance2.type.__hmrId) {
      unregisterHMR(instance2);
    }
    const { bum, scope: scope2, update, subTree, um } = instance2;
    if (bum) {
      invokeArrayFns$1(bum);
    }
    scope2.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance2, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance2.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance2.asyncDep && !instance2.asyncResolved && instance2.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    {
      devtoolsComponentRemoved(instance2);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  let isFlushing2 = false;
  const render2 = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    if (!isFlushing2) {
      isFlushing2 = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing2 = false;
    }
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate2;
  return {
    render: render2,
    hydrate: hydrate2,
    createApp: createAppAPI(render2)
  };
}
function resolveChildrenNamespace({ type, props: props2 }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props2 && props2.encoding && props2.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance2) {
  const subComponent = instance2.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props2, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props2,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props2, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props2,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= -257;
    n2.shapeFlag &= -513;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...args
  );
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props: props2,
    key: props2 && normalizeKey(props2),
    ref: props2 && normalizeRef(props2),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props2,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props2) {
    props2 = guardReactiveProps(props2);
    let { class: klass, style } = props2;
    if (klass && !isString(klass)) {
      props2.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend$1({}, style);
      }
      props2.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1(
      `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props2,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props2) {
  if (!props2)
    return null;
  return isProxy(props2) || InternalObjectKey in props2 ? extend$1({}, props2) : props2;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props: props2, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props2 || {}, extraProps) : props2;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$1(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray$1(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance2, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance2, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance2 = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    // fixed by xxxxxx
    // @ts-expect-error
    get renderer() {
      if (type.mpType === "app") {
        return "app";
      }
      if (this.$pageInstance) {
        return this.$pageInstance == instance2 ? "page" : "component";
      }
      return "component";
    },
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    bda: null,
    da: null,
    ba: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance2.ctx = createDevRenderContext(instance2);
  }
  instance2.root = parent ? parent.root : instance2;
  instance2.emit = emit$2.bind(null, instance2);
  instance2.$pageInstance = parent && parent.$pageInstance;
  if (vnode.ce) {
    vnode.ce(instance2);
  }
  return instance2;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key]))
      setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1)
        setters.forEach((set2) => set2(v));
      else
        setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance2) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance2);
  instance2.scope.on();
  return () => {
    instance2.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance2) {
  return instance2.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent$1(instance2, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props: props2, children } = instance2.vnode;
  const isStateful = isStatefulComponent(instance2);
  initProps(instance2, props2, isStateful, isSSR);
  initSlots(instance2, children);
  const setupResult = isStateful ? setupStatefulComponent(instance2, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance2, isSSR) {
  var _a;
  const Component = instance2.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance2.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance2.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance2.accessCache = /* @__PURE__ */ Object.create(null);
  instance2.proxy = markRaw(new Proxy(instance2.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance2);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance2.setupContext = setup.length > 1 ? createSetupContext(instance2) : null;
    const reset = setCurrentInstance(instance2);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance2,
      0,
      [
        shallowReadonly(instance2.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance2, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance2, 0);
        });
      } else {
        instance2.asyncDep = setupResult;
        if (!instance2.suspense) {
          const name = (_a = Component.name) != null ? _a : "Anonymous";
          warn$1(
            `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      }
    } else {
      handleSetupResult(instance2, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance2, isSSR);
  }
}
function handleSetupResult(instance2, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance2.type.__ssrInlineRender) {
      instance2.ssrRender = setupResult;
    } else {
      instance2.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance2.devtoolsRawSetupState = setupResult;
    }
    instance2.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance2);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance2, isSSR);
}
const isRuntimeOnly = () => true;
function finishComponentSetup(instance2, isSSR, skipOptions) {
  const Component = instance2.type;
  if (!instance2.render) {
    instance2.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance2);
    pauseTracking();
    try {
      applyOptions$1(instance2);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component.render && instance2.render === NOOP && !isSSR) {
    if (Component.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance2) {
  return instance2.attrsProxy || (instance2.attrsProxy = new Proxy(
    instance2.attrs,
    {
      get(target, key) {
        markAttrsAccessed();
        track(instance2, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance2) {
  return instance2.slotsProxy || (instance2.slotsProxy = new Proxy(instance2.slots, {
    get(target, key) {
      track(instance2, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance2) {
  const expose = (exposed) => {
    {
      if (instance2.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$1(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance2.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance2);
      },
      get slots() {
        return getSlotsProxy(instance2);
      },
      get emit() {
        return (event, ...args) => instance2.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance2) {
  if (instance2.exposed) {
    return instance2.exposeProxy || (instance2.exposeProxy = new Proxy(proxyRefs(markRaw(instance2.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance2);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance2, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance2 && instance2.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance2.components || instance2.parent.type.components
    ) || inferFromRegistry(instance2.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c._warnRecursive = true;
    }
  }
  return c;
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#1677ff" };
  const stringStyle = { style: "color:#f5222d" };
  const keywordStyle = { style: "color:#eb2f96" };
  const formatter = {
    header(obj) {
      if (!isObject$1(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance2) {
    const blocks = [];
    if (instance2.type.props && instance2.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance2.props)));
    }
    if (instance2.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance2.setupState));
    }
    if (instance2.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance2.data)));
    }
    const computed2 = extractKeys(instance2, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance2, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance2 }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend$1({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject$1(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance2, type) {
    const Comp = instance2.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance2.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance2.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$1(opts) && opts.includes(key) || isObject$1(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version = "3.4.21";
const warn$3 = warn$1;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props2) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : (
      // fixed by xxxxxx
      is ? doc.createElement(tag, { is }) : doc.createElement(tag)
    );
    if (tag === "select" && props2 && props2.multiple != null) {
      el.setAttribute("multiple", props2.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id2) {
    el.setAttribute(id2, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = Symbol("_vtc");
const Transition = (props2, { slots }) => h(BaseTransition, resolveTransitionProps(props2), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend$1(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend$1(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$1(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  {
    assertNumber(res, "<transition> explicit duration");
  }
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id2 = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id2 === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto")
    return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
function patchClass(el, value, isSVG) {
  const { __wxsAddClass, __wxsRemoveClass } = el;
  if (__wxsRemoveClass && __wxsRemoveClass.length) {
    value = (value || "").split(/\s+/).filter((v) => __wxsRemoveClass.indexOf(v) === -1).join(" ");
    __wxsRemoveClass.length = 0;
  }
  if (__wxsAddClass && __wxsAddClass.length) {
    value = (value || "") + " " + __wxsAddClass.join(" ");
  }
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    {
      el.className = value;
    }
  }
}
const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
{
  vShow.name = "show";
}
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
const CSS_VAR_TEXT = Symbol("CSS_VAR_TEXT");
const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
  const { __wxsStyle } = el;
  if (__wxsStyle) {
    for (const key in __wxsStyle) {
      setStyle(style, key, __wxsStyle[key]);
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    val = normalizeRpx(val);
    {
      if (semicolonRE.test(val)) {
        warn$3(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const { unit, unitRatio, unitPrecision } = defaultRpx2Unit;
const rpx2Unit = createRpx2Unit(unit, unitRatio, unitPrecision);
const normalizeRpx = (val) => {
  if (isString(val)) {
    return rpx2Unit(val);
  }
  return val;
};
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance2) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!needRemove) {
      warn$3(
        `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
        e
      );
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance2 = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance2);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance2) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    const proxy = instance2 && instance2.proxy;
    const normalizeNativeEvent = proxy && proxy.$nne;
    const { value } = invoker;
    if (normalizeNativeEvent && isArray$1(value)) {
      const fns = patchStopImmediatePropagation(e, value);
      for (let i = 0; i < fns.length; i++) {
        const fn = fns[i];
        callWithAsyncErrorHandling(
          fn,
          instance2,
          5,
          !fn.__wwe ? normalizeNativeEvent(e) : [e]
        );
      }
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance2,
      5,
      // fixed by xxxxxx
      normalizeNativeEvent && !value.__wwe ? normalizeNativeEvent(e, value, instance2) : [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => {
      const patchedFn = (e2) => !e2._stopped && fn && fn(e2);
      patchedFn.__wwe = fn.__wwe;
      return patchedFn;
    });
  } else {
    return value;
  }
}
function patchWxs(el, rawName, nextValue, instance2 = null) {
  if (!nextValue || !instance2) {
    return;
  }
  const propName = rawName.replace("change:", "");
  const { attrs: attrs2 } = instance2;
  const nextPropValue = attrs2[propName];
  const prevPropValue = (el.__wxsProps || (el.__wxsProps = {}))[propName];
  if (prevPropValue === nextPropValue) {
    return;
  }
  el.__wxsProps[propName] = nextPropValue;
  const proxy = instance2.proxy;
  nextTick(() => {
    nextValue(
      nextPropValue,
      prevPropValue,
      proxy.$gcd(proxy, true),
      proxy.$gcd(proxy, false)
    );
  });
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const forcePatchProp = (el, key) => {
  if (key.indexOf("change:") === 0) {
    return true;
  }
  if (key === "class" && el.__wxsClassChanged) {
    el.__wxsClassChanged = false;
    return true;
  }
  if (key === "style" && el.__wxsStyleChanged) {
    el.__wxsStyleChanged = false;
    return true;
  }
  return false;
};
const patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key.indexOf("change:") === 0) {
    return patchWxs(el, key, nextValue, parentComponent);
  }
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  });
};
const rendererOptions = /* @__PURE__ */ extend$1(
  { patchProp, forcePatchProp },
  nodeOps
);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp$1 = (...args) => {
  const app = ensureRenderer().createApp(...args);
  {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn$3(
          `The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`
        );
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn$3(msg);
        return compilerOptions;
      },
      set() {
        warn$3(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn$3(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn$3(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    );
  }
  return container;
}
function initDev() {
  {
    initCustomFormatter();
  }
}
{
  initDev();
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof globalThis !== "undefined" && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
    supported = true;
    perf = globalThis.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id2 in plugin.settings) {
        const item = plugin.settings[id2];
        defaultSettings[id2] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve2) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: resolve2
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy) {
      setupFn(proxy.proxiedTarget);
    }
  }
}
/*!
  * vue-router v4.4.4
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
  // add the Module string tag
  obj.default && isRouteComponent(obj.default);
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function warn(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
    warn(`Error decoding "${text}". Using original value`);
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a2, b) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b.params) && stringifyQuery2(a2.query) === stringifyQuery2(b.query) && a2.hash === b.hash;
}
function isSameRouteRecord(a2, b) {
  return (a2.aliasOf || a2) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a2, b) {
  if (Object.keys(a2).length !== Object.keys(b).length)
    return false;
  for (const key in a2) {
    if (!isSameRouteLocationParamsValue(a2[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a2, b) {
  return isArray(a2) ? isEquivalentArray(a2, b) : isArray(b) ? isEquivalentArray(b, a2) : a2 === b;
}
function isEquivalentArray(a2, b) {
  return isArray(b) ? a2.length === b.length && a2.every((value, i) => value === b[i]) : a2.length === 1 && a2[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!from.startsWith("/")) {
    warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") {
    toSegments.push("");
  }
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  // TODO: could we use a symbol in the future?
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (typeof position.el === "string") {
      if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
        try {
          const foundEl = document.querySelector(position.el);
          if (isIdSelector && foundEl) {
            warn(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
            return;
          }
        } catch (err) {
          warn(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
          return;
        }
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      warn(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener, {
    passive: true
  });
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history2.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        warn("Error with push/replace State", err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      // keep back and forward entries but override current position
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    if (!history2.state) {
      warn(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state`);
    }
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    // it's overridden right after
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#"))
    base += "#";
  if (!base.endsWith("#/") && !base.endsWith("#")) {
    warn(`A hash base must end with a "#":
"${base}" should be "${base.replace(/#.*$/, "#")}".`);
  }
  return createWebHistory(base);
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const NavigationFailureSymbol = Symbol("navigation failure");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
const ErrorTypeMessages = {
  [
    1
    /* ErrorTypes.MATCHER_NOT_FOUND */
  ]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [
    2
    /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
  ]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [
    4
    /* ErrorTypes.NAVIGATION_ABORTED */
  ]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [
    8
    /* ErrorTypes.NAVIGATION_CANCELLED */
  ]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [
    16
    /* ErrorTypes.NAVIGATION_DUPLICATED */
  ]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  {
    return assign(new Error(ErrorTypeMessages[type](params)), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string")
    return to;
  if (to.path != null)
    return to.path;
  const location2 = {};
  for (const key of propertiesToLog) {
    if (key in to)
      location2[key] = to[key];
  }
  return JSON.stringify(location2, null, 2);
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse2(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse: parse2,
    stringify
  };
}
function compareScoreArray(a2, b) {
  let i = 0;
  while (i < a2.length && i < b.length) {
    const diff = b[i] - a2[i];
    if (diff)
      return diff;
    i++;
  }
  if (a2.length < b.length) {
    return a2.length === 1 && a2[0] === 40 + 40 ? -1 : 1;
  } else if (a2.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a2, b) {
  let i = 0;
  const aScore = a2.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Route paths should start with a "/": "${path}" should be "/${path}".`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer2}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer2 = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer2)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer2
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer2}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer2,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer2 = "";
  }
  function addCharToBuffer() {
    buffer2 += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer2) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer2}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name))
        warn(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    }
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          // we might be the child of an alias
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (normalizedRecord.path === "*") {
        throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.');
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (parent && path[0] === "/")
        checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (isMatchable(matcher)) {
        insertMatcher(matcher);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index2 = findInsertionIndex(matcher, matchers);
    matchers.splice(index2, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      {
        const invalidParams = Object.keys(location2.params || {}).filter((paramName) => !matcher.keys.find((k) => k.name === paramName));
        if (invalidParams.length) {
          warn(`Discarded invalid param(s) "${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
        }
      }
      name = matcher.record.name;
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
      );
      path = matcher.stringify(params);
    } else if (location2.path != null) {
      path = location2.path;
      if (!path.startsWith("/")) {
        warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`);
      }
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve: resolve2,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    mods: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props2 = record.props || false;
  if ("component" in record) {
    propsObject.default = props2;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props2 === "object" ? props2[name] : props2;
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isSameParam(a2, b) {
  return a2.name === b.name && a2.optional === b.optional && a2.repeatable === b.repeatable;
}
function checkSameParams(a2, b) {
  for (const key of a2.keys) {
    if (!key.optional && !b.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b.record.path}" and the original record: "${a2.record.path}" must have the exact same param named "${key.name}"`);
  }
  for (const key of b.keys) {
    if (!key.optional && !a2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b.record.path}" and the original record: "${a2.record.path}" must have the exact same param named "${key.name}"`);
  }
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) {
    if (!record.keys.find(isSameParam.bind(null, key)))
      return warn(`Absolute path "${record.record.path}" must have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
  }
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    const sortOrder = comparePathParserScore(matcher, matchers[mid]);
    if (sortOrder < 0) {
      upper = mid;
    } else {
      lower = mid + 1;
    }
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
    if (upper < 0) {
      warn(`Finding ancestor route "${insertionAncestor.record.path}" failed for "${matcher.record.path}"`);
    }
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) {
    if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) {
      return ancestor;
    }
  }
  return;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery$1(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("router view location matched");
const viewDepthKey = Symbol("router view depth");
const routerKey = Symbol("router");
const routeLocationKey = Symbol("route location");
const routerViewLocationKey = Symbol("router view location");
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1)
        handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, canOnlyBeCalledOnce(next, to, from)));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    if (guard.length > 2) {
      const message = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) {
        guardCall = guardCall.then((resolvedValue) => {
          if (!next._called) {
            warn(message);
            return Promise.reject(new Error("Invalid navigation guard"));
          }
          return resolvedValue;
        });
      } else if (guardReturn !== void 0) {
        if (!next._called) {
          warn(message);
          reject(new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err) => reject(err));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1)
      warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1)
      next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    if (!record.components && !record.children.length) {
      warn(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    }
    for (const name in record.components) {
      let rawComponent = record.components[name];
      {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise = rawComponent;
          rawComponent = () => promise;
        } else if (rawComponent.__asyncLoader && // warn only once per component
        !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        if (!("catch" in componentPromise)) {
          warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function useLink(props2) {
  const router2 = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  let hasPrevious = false;
  let previousTo = null;
  const route = computed(() => {
    const to = unref(props2.to);
    if (!hasPrevious || to !== previousTo) {
      if (!isRouteLocation(to)) {
        if (hasPrevious) {
          warn(`Invalid value for prop "to" in useLink()
- to:`, to, `
- previous to:`, previousTo, `
- props:`, props2);
        } else {
          warn(`Invalid value for prop "to" in useLink()
- to:`, to, `
- props:`, props2);
        }
      }
      previousTo = to;
      hasPrevious = true;
    }
    return router2.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate2(e = {}) {
    if (guardEvent(e)) {
      return router2[unref(props2.replace) ? "replace" : "push"](
        unref(props2.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop);
    }
    return Promise.resolve();
  }
  if (isBrowser) {
    const instance2 = getCurrentInstance();
    if (instance2) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value,
        error: null
      };
      instance2.__vrl_devtools = instance2.__vrl_devtools || [];
      instance2.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
        linkContextDevtools.error = isRouteLocation(unref(props2.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate: navigate2
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props2, { slots }) {
    const link = reactive(useLink(props2));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props2.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props2.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props2.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props2.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props2, { attrs: attrs2, slots }) {
    warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props2.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props2.name], ([instance2, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance2;
        if (from && from !== to && instance2 && instance2 === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance2 && to && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance2));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props2.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs2, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (isBrowser && component.ref) {
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        const internalInstances = isArray(component.ref) ? component.ref.map((r) => r.i) : [component.ref.i];
        internalInstances.forEach((instance2) => {
          instance2.__vrv_devtools = info;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance2 = getCurrentInstance();
  const parentName = instance2.parent && instance2.parent.type.name;
  const parentSubTreeType = instance2.parent && instance2.parent.subTree && instance2.parent.subTree.type;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition")) && typeof parentSubTreeType === "object" && parentSubTreeType.name === "RouterView") {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy = assign({}, routeLocation, {
    // remove variables that can contain vue instances
    matched: routeLocation.matched.map((matched) => omit(matched, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: true,
      display: routeLocation.fullPath,
      tooltip,
      value: copy
    }
  };
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
let routerId = 0;
function addDevtools(app, router2, matcher) {
  if (router2.__hasDevtools)
    return;
  router2.__hasDevtools = true;
  const id2 = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (id2 ? "." + id2 : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) {
        payload.instanceData.state.push({
          type: "Routing",
          key: "$route",
          editable: false,
          value: formatRouteLocation(router2.currentRoute.value, "Current Route")
        });
      }
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info.name ? `${info.name.toString()}: ` : "") + info.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let label = devtoolsData.route.path;
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          let textColor = 0;
          if (devtoolsData.error) {
            label = devtoolsData.error;
            backgroundColor = RED_100;
            textColor = RED_700;
          } else if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label,
            textColor,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router2.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id2;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id2 ? " " + id2 : ""} Navigations`,
      color: 4237508
    });
    router2.onError((error, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router2.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", {
        value: navigationId++
      });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router2.afterEach((to, from, failure) => {
      const data = {
        guard: formatDisplay("afterEach")
      };
      if (failure) {
        data.failure = {
          _custom: {
            type: Error,
            readOnly: true,
            display: failure ? failure.message : "",
            tooltip: "Navigation Failure",
            value: failure
          }
        };
        data.status = formatDisplay("❌");
      } else {
        data.status = formatDisplay("✅");
      }
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id2;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id2 ? " " + id2 : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload)
        return;
      const payload = activeRoutesPayload;
      let routes = matcher.getRoutes().filter((route) => !route.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !route.parent.record.components);
      routes.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) {
        routes = routes.filter((route) => (
          // save matches state based on the payload
          isRouteMatching(route, payload.filter.toLowerCase())
        ));
      }
      routes.forEach((route) => markRouteRecordActive(route, router2.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        refreshRoutesView();
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        const routes = matcher.getRoutes();
        const route = routes.find((route2) => route2.record.__vd_id === payload.nodeId);
        if (route) {
          payload.state = {
            options: formatRouteRecordMatcherForStateInspector(route)
          };
        }
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) {
    return key.repeatable ? "*" : "?";
  } else {
    return key.repeatable ? "+" : "";
  }
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields2 = [
    { editable: false, key: "path", value: record.path }
  ];
  if (record.name != null) {
    fields2.push({
      editable: false,
      key: "name",
      value: record.name
    });
  }
  fields2.push({ editable: false, key: "regexp", value: route.re });
  if (route.keys.length) {
    fields2.push({
      editable: false,
      key: "keys",
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
          tooltip: "Param keys",
          value: route.keys
        }
      }
    });
  }
  if (record.redirect != null) {
    fields2.push({
      editable: false,
      key: "redirect",
      value: record.redirect
    });
  }
  if (route.alias.length) {
    fields2.push({
      editable: false,
      key: "aliases",
      value: route.alias.map((alias) => alias.record.path)
    });
  }
  if (Object.keys(route.record.meta).length) {
    fields2.push({
      editable: false,
      key: "meta",
      value: route.record.meta
    });
  }
  fields2.push({
    key: "score",
    editable: false,
    value: {
      _custom: {
        type: null,
        readOnly: true,
        display: route.score.map((score) => score.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: route.score
      }
    }
  });
  return fields2;
}
const PINK_500 = 15485081;
const BLUE_600 = 2450411;
const LIME_500 = 8702998;
const CYAN_400 = 2282478;
const ORANGE_400 = 16486972;
const DARK = 6710886;
const RED_100 = 16704226;
const RED_700 = 12131356;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) {
    tags.push({
      label: String(record.name),
      textColor: 0,
      backgroundColor: CYAN_400
    });
  }
  if (record.aliasOf) {
    tags.push({
      label: "alias",
      textColor: 0,
      backgroundColor: ORANGE_400
    });
  }
  if (route.__vd_match) {
    tags.push({
      label: "matches",
      textColor: 0,
      backgroundColor: PINK_500
    });
  }
  if (route.__vd_exactActive) {
    tags.push({
      label: "exact",
      textColor: 0,
      backgroundColor: LIME_500
    });
  }
  if (route.__vd_active) {
    tags.push({
      label: "active",
      textColor: 0,
      backgroundColor: BLUE_600
    });
  }
  if (record.redirect) {
    tags.push({
      label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
      textColor: 16777215,
      backgroundColor: DARK
    });
  }
  let id2 = record.__vd_id;
  if (id2 == null) {
    id2 = String(routeRecordId++);
    record.__vd_id = id2;
  }
  return {
    id: id2,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) {
    route.__vd_active = currentRoute.matched.some((match) => isSameRouteRecord(match, route.record));
  }
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) {
    return false;
  }
  const nonEndingRE = new RegExp(found[1].replace(/\$$/, ""), found[2]);
  if (nonEndingRE.test(filter)) {
    route.children.forEach((child) => isRouteMatching(child, filter));
    if (route.record.path !== "/" || filter === "/") {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter.startsWith("/") && (decodedPath.includes(filter) || path.includes(filter)))
    return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter))
    return true;
  if (route.record.name && String(route.record.name).includes(filter))
    return true;
  return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys) {
  const ret = {};
  for (const key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$12 = options.parseQuery || parseQuery;
  const stringifyQuery$1$1 = options.stringifyQuery || stringifyQuery$1;
  const routerHistory = options.history;
  if (!routerHistory)
    throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      if (!parent) {
        warn(`Parent route "${String(parentOrRoute)}" not found when adding child route`, route);
      }
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else {
      warn(`Cannot remove non-existent route "${String(name)}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$12, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      {
        if (href2.startsWith("//"))
          warn(`Location "${rawLocation}" resolved to "${href2}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute2.matched.length) {
          warn(`No match found for location with path "${rawLocation}"`);
        }
      }
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    if (!isRouteLocation(rawLocation)) {
      warn(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, rawLocation);
      return resolve2({});
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      if ("params" in rawLocation && !("name" in rawLocation) && // @ts-expect-error: the type is never
      Object.keys(rawLocation.params).length) {
        warn(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      }
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$12, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(targetParams)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    if (hash && !hash.startsWith("#")) {
      warn(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
    }
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    {
      if (href.startsWith("//")) {
        warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      } else if (!matchedRoute.matched.length) {
        warn(`No match found for location with path "${rawLocation.path != null ? rawLocation.path : rawLocation}"`);
      }
    }
    return assign({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1$1 === stringifyQuery$1 ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$12, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      if (newTargetLocation.path == null && !("name" in newTargetLocation)) {
        warn(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate2(toLocation, from)).catch((error) => isNavigationFailure(error) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error : markAsReady(error)
    ) : (
      // reject any unknown error
      triggerError(error, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          if (
            // we are redirecting to the same location we were already at
            isSameRouteLocation(stringifyQuery$1$1, resolve2(failure2.to), toLocation) && // and we have done it a couple of times
            redirectedFrom && // @ts-expect-error: added only in dev
            (redirectedFrom._count = redirectedFrom._count ? (
              // @ts-expect-error
              redirectedFrom._count + 1
            ) : 1) > 30
          ) {
            warn(`Detected a possibly infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`);
            return Promise.reject(new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate2(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) {
        if (record.beforeEnter) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router2.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate2(toLocation, from).catch((error) => {
        if (isNavigationFailure(
          error,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error;
        }
        if (isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            error.to,
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      {
        warn("uncaught error during route navigation:");
      }
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve22, reject) => {
      readyHandlers.add([resolve22, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve22, reject]) => err ? reject(err) : resolve22());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior: scrollBehavior2 } = options;
    if (!isBrowser || !scrollBehavior2)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior2(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router2 = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      const router22 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router22;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
          warn("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key],
          enumerable: true
        });
      }
      app.provide(routerKey, router22);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if (isBrowser) {
        addDevtools(app, router22, matcher);
      }
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router2;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute(_name) {
  return inject(routeLocationKey);
}
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode2 = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode2 === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode2 === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode2}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale2, messages) {
  if (!locale2) {
    return;
  }
  locale2 = locale2.trim().replace(/_/g, "-");
  if (messages && messages[locale2]) {
    return locale2;
  }
  locale2 = locale2.toLowerCase();
  if (locale2 === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale2.indexOf("zh") === 0) {
    if (locale2.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale2.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale2, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales2 = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales2 = Object.keys(messages);
  }
  const lang = startsWith(locale2, locales2);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale: locale2, fallbackLocale: fallbackLocale2, messages, watcher, formater: formater2 }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale2) {
      this.fallbackLocale = fallbackLocale2;
    }
    this.formater = formater2 || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale2 || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale2) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale2, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale2, message, override = true) {
    const curMessages = this.messages[locale2];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale2] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale2, values) {
    let message = this.message;
    if (typeof locale2 === "string") {
      locale2 = normalizeLocale(locale2, this.messages);
      locale2 && (message = this.messages[locale2]);
    } else {
      values = locale2;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm2, i18n2) {
  if (appVm2.$watchLocale) {
    appVm2.$watchLocale((newLocale) => {
      i18n2.setLocale(newLocale);
    });
  } else {
    appVm2.$watch(() => appVm2.$locale, (newLocale) => {
      i18n2.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== "undefined" && getLocale) {
    return getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale2, messages = {}, fallbackLocale2, watcher) {
  if (typeof locale2 !== "string") {
    const options = [
      messages,
      locale2
    ];
    locale2 = options[0];
    messages = options[1];
  }
  if (typeof locale2 !== "string") {
    locale2 = getDefaultLocale();
  }
  if (typeof fallbackLocale2 !== "string") {
    fallbackLocale2 = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n2 = new I18n({
    locale: locale2,
    fallbackLocale: fallbackLocale2,
    messages,
    watcher
  });
  let t = (key, values) => {
    if (typeof getApp$1 !== "function") {
      t = function(key2, values2) {
        return i18n2.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t = function(key2, values2) {
        const appVm2 = getApp$1().$vm;
        if (appVm2) {
          appVm2.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm2, i18n2);
          }
        }
        return i18n2.t(key2, values2);
      };
    }
    return t(key, values);
  };
  return {
    i18n: i18n2,
    f(message, values, delimiters) {
      return i18n2.f(message, values, delimiters);
    },
    t(key, values) {
      return t(key, values);
    },
    add(locale22, message, override = true) {
      return i18n2.add(locale22, message, override);
    },
    watch(fn) {
      return i18n2.watchLocale(fn);
    },
    getLocale() {
      return i18n2.getLocale();
    },
    setLocale(newLocale) {
      return i18n2.setLocale(newLocale);
    }
  };
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const isEnableLocale = /* @__PURE__ */ once(
  () => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length
);
let i18n;
function useI18n() {
  if (!i18n) {
    let locale2;
    {
      {
        locale2 = navigator.cookieEnabled && window.localStorage && localStorage[UNI_STORAGE_LOCALE] || __uniConfig.locale || navigator.language;
      }
    }
    i18n = initVueI18n(locale2);
    if (isEnableLocale()) {
      const localeKeys = Object.keys(__uniConfig.locales || {});
      if (localeKeys.length) {
        localeKeys.forEach(
          (locale22) => i18n.add(locale22, __uniConfig.locales[locale22])
        );
      }
      i18n.setLocale(locale2);
    }
  }
  return i18n;
}
function normalizeMessages(module, keys, values) {
  return keys.reduce((res, name, index2) => {
    res[module + name] = values[index2];
    return res;
  }, {});
}
const initI18nAsyncMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.async.";
  const keys = ["error"];
  {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        "The connection timed out, click the screen to try again."
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        "Se agotó el tiempo de conexión, haga clic en la pantalla para volver a intentarlo."
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        "La connexion a expiré, cliquez sur l'écran pour réessayer."
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["连接服务器超时，点击屏幕重试"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["連接服務器超時，點擊屏幕重試"]),
      false
    );
  }
});
const initI18nShowToastMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.showToast.";
  const keys = ["unpaired"];
  {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        "Please note showToast must be paired with hideToast"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        "Tenga en cuenta que showToast debe estar emparejado con hideToast"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        "Veuillez noter que showToast doit être associé à hideToast"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, [
        "请注意 showToast 与 hideToast 必须配对使用"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, [
        "請注意 showToast 與 hideToast 必須配對使用"
      ]),
      false
    );
  }
});
const initI18nShowLoadingMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.showLoading.";
  const keys = ["unpaired"];
  {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        "Please note showLoading must be paired with hideLoading"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        "Tenga en cuenta que showLoading debe estar emparejado con hideLoading"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        "Veuillez noter que showLoading doit être associé à hideLoading"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, [
        "请注意 showLoading 与 hideLoading 必须配对使用"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, [
        "請注意 showLoading 與 hideLoading 必須配對使用"
      ]),
      false
    );
  }
});
const initI18nShowModalMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.showModal.";
  const keys = ["cancel", "confirm"];
  {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ["Cancel", "OK"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ["Cancelar", "OK"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ["Annuler", "OK"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["取消", "确定"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["取消", "確定"]),
      false
    );
  }
});
const initI18nChooseFileMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.chooseFile.";
  const keys = ["notUserActivation"];
  {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, [
        "File chooser dialog can only be shown with a user activation"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, [
        "El cuadro de diálogo del selector de archivos solo se puede mostrar con la activación del usuario"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, [
        "La boîte de dialogue du sélecteur de fichier ne peut être affichée qu'avec une activation par l'utilisateur"
      ]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["文件选择器对话框只能在由用户激活时显示"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["文件選擇器對話框只能在由用戶激活時顯示"]),
      false
    );
  }
});
const initI18nPickerMsgsOnce = /* @__PURE__ */ once(() => {
  const name = "uni.picker.";
  const keys = ["done", "cancel"];
  {
    useI18n().add(
      LOCALE_EN,
      normalizeMessages(name, keys, ["Done", "Cancel"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ES,
      normalizeMessages(name, keys, ["OK", "Cancelar"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_FR,
      normalizeMessages(name, keys, ["OK", "Annuler"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANS,
      normalizeMessages(name, keys, ["完成", "取消"]),
      false
    );
  }
  {
    useI18n().add(
      LOCALE_ZH_HANT,
      normalizeMessages(name, keys, ["完成", "取消"]),
      false
    );
  }
});
function initBridge(subscribeNamespace) {
  const emitter = new E$1();
  return {
    on(event, callback) {
      return emitter.on(event, callback);
    },
    once(event, callback) {
      return emitter.once(event, callback);
    },
    off(event, callback) {
      return emitter.off(event, callback);
    },
    emit(event, ...args) {
      return emitter.emit(event, ...args);
    },
    subscribe(event, callback, once2 = false) {
      emitter[once2 ? "once" : "on"](`${subscribeNamespace}.${event}`, callback);
    },
    unsubscribe(event, callback) {
      emitter.off(`${subscribeNamespace}.${event}`, callback);
    },
    subscribeHandler(event, args, pageId) {
      emitter.emit(`${subscribeNamespace}.${event}`, args, pageId);
    }
  };
}
const INVOKE_VIEW_API = "invokeViewApi";
const INVOKE_SERVICE_API = "invokeServiceApi";
let invokeServiceMethodId = 1;
const invokeServiceMethod = (name, args, callback) => {
  const { subscribe, publishHandler } = UniViewJSBridge$1;
  const id2 = callback ? invokeServiceMethodId++ : 0;
  callback && subscribe(INVOKE_SERVICE_API + "." + id2, callback, true);
  publishHandler(INVOKE_SERVICE_API, { id: id2, name, args });
};
const viewMethods = /* @__PURE__ */ Object.create(null);
function normalizeViewMethodName(pageId, name) {
  return pageId + "." + name;
}
function subscribeViewMethod(pageId, wrapper2) {
  UniViewJSBridge$1.subscribe(
    normalizeViewMethodName(pageId, INVOKE_VIEW_API),
    onInvokeViewMethod
  );
}
function unsubscribeViewMethod(pageId) {
  UniViewJSBridge$1.unsubscribe(normalizeViewMethodName(pageId, INVOKE_VIEW_API));
  Object.keys(viewMethods).forEach((name) => {
    if (name.indexOf(pageId + ".") === 0) {
      delete viewMethods[name];
    }
  });
}
function registerViewMethod(pageId, name, fn) {
  name = normalizeViewMethodName(pageId, name);
  if (!viewMethods[name]) {
    viewMethods[name] = fn;
  }
}
function onInvokeViewMethod({
  id: id2,
  name,
  args
}, pageId) {
  name = normalizeViewMethodName(pageId, name);
  const publish = (res) => {
    id2 && UniViewJSBridge$1.publishHandler(INVOKE_VIEW_API + "." + id2, res);
  };
  const handler = viewMethods[name];
  if (handler) {
    handler(args, publish);
  } else {
    publish({});
  }
}
const ViewJSBridge = /* @__PURE__ */ extend$1(
  /* @__PURE__ */ initBridge("service"),
  {
    invokeServiceMethod
  }
);
const LONGPRESS_TIMEOUT = 350;
const LONGPRESS_THRESHOLD = 10;
const passiveOptions$3 = /* @__PURE__ */ passive(true);
let longPressTimer;
function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}
let startPageX = 0;
let startPageY = 0;
function touchstart(evt) {
  clearLongPressTimer();
  if (evt.touches.length !== 1) {
    return;
  }
  const { pageX, pageY } = evt.touches[0];
  startPageX = pageX;
  startPageY = pageY;
  longPressTimer = setTimeout(function() {
    const customEvent = new CustomEvent("longpress", {
      bubbles: true,
      cancelable: true,
      // @ts-expect-error
      target: evt.target,
      currentTarget: evt.currentTarget
    });
    customEvent.touches = evt.touches;
    customEvent.changedTouches = evt.changedTouches;
    evt.target.dispatchEvent(customEvent);
  }, LONGPRESS_TIMEOUT);
}
function touchmove(evt) {
  if (!longPressTimer) {
    return;
  }
  if (evt.touches.length !== 1) {
    return clearLongPressTimer();
  }
  const { pageX, pageY } = evt.touches[0];
  if (Math.abs(pageX - startPageX) > LONGPRESS_THRESHOLD || Math.abs(pageY - startPageY) > LONGPRESS_THRESHOLD) {
    return clearLongPressTimer();
  }
}
function initLongPress() {
  window.addEventListener("touchstart", touchstart, passiveOptions$3);
  window.addEventListener("touchmove", touchmove, passiveOptions$3);
  window.addEventListener("touchend", clearLongPressTimer, passiveOptions$3);
  window.addEventListener("touchcancel", clearLongPressTimer, passiveOptions$3);
}
function checkValue$1(value, defaultValue) {
  const newValue = Number(value);
  return isNaN(newValue) ? defaultValue : newValue;
}
const isApple$1 = () => /^Apple/.test(navigator.vendor);
function getWindowWidth$1() {
  const isApple2 = /^Apple/.test(navigator.vendor);
  const screenFix = isApple2 && window.matchMedia("(orientation:landscape)").matches;
  var screenWidth = screenFix ? Math.max(screen.width, screen.height) : screen.width;
  var windowWidth = isApple2 ? Math.min(
    window.innerWidth,
    document.documentElement.clientWidth,
    screenWidth
  ) || screenWidth : Math.min(window.innerWidth, document.documentElement.clientWidth);
  return windowWidth;
}
function useRem() {
  const config = __uniConfig.globalStyle || {};
  const maxWidth2 = checkValue$1(config.rpxCalcMaxDeviceWidth, 960);
  const baseWidth2 = checkValue$1(config.rpxCalcBaseDeviceWidth, 375);
  function updateRem() {
    let width = getWindowWidth$1();
    width = width <= maxWidth2 ? width : baseWidth2;
    document.documentElement.style.fontSize = width / 23.4375 + "px";
  }
  updateRem();
  document.addEventListener("DOMContentLoaded", updateRem);
  window.addEventListener("load", updateRem);
  window.addEventListener("resize", updateRem);
  if (isApple$1()) {
    window.addEventListener("orientationchange", () => {
      updateRem();
      setTimeout(updateRem, 50);
    });
  }
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var attrs = ["top", "left", "right", "bottom"];
var inited$1;
var elementComputedStyle = {};
var support;
function getSupport() {
  if (!("CSS" in window) || typeof CSS.supports != "function") {
    support = "";
  } else if (CSS.supports("top: env(safe-area-inset-top)")) {
    support = "env";
  } else if (CSS.supports("top: constant(safe-area-inset-top)")) {
    support = "constant";
  } else {
    support = "";
  }
  return support;
}
function init() {
  support = typeof support === "string" ? support : getSupport();
  if (!support) {
    attrs.forEach(function(attr2) {
      elementComputedStyle[attr2] = 0;
    });
    return;
  }
  function setStyle2(el, style) {
    var elStyle = el.style;
    Object.keys(style).forEach(function(key) {
      var val = style[key];
      elStyle[key] = val;
    });
  }
  var cbs = [];
  function parentReady(callback) {
    if (callback) {
      cbs.push(callback);
    } else {
      cbs.forEach(function(cb) {
        cb();
      });
    }
  }
  var passiveEvents = false;
  try {
    var opts = Object.defineProperty({}, "passive", {
      get: function() {
        passiveEvents = { passive: true };
      }
    });
    window.addEventListener("test", null, opts);
  } catch (e2) {
  }
  function addChild(parent, attr2) {
    var a1 = document.createElement("div");
    var a2 = document.createElement("div");
    var a1Children = document.createElement("div");
    var a2Children = document.createElement("div");
    var W = 100;
    var MAX = 1e4;
    var aStyle = {
      position: "absolute",
      width: W + "px",
      height: "200px",
      boxSizing: "border-box",
      overflow: "hidden",
      paddingBottom: support + "(safe-area-inset-" + attr2 + ")"
    };
    setStyle2(a1, aStyle);
    setStyle2(a2, aStyle);
    setStyle2(a1Children, {
      transition: "0s",
      animation: "none",
      width: "400px",
      height: "400px"
    });
    setStyle2(a2Children, {
      transition: "0s",
      animation: "none",
      width: "250%",
      height: "250%"
    });
    a1.appendChild(a1Children);
    a2.appendChild(a2Children);
    parent.appendChild(a1);
    parent.appendChild(a2);
    parentReady(function() {
      a1.scrollTop = a2.scrollTop = MAX;
      var a1LastScrollTop = a1.scrollTop;
      var a2LastScrollTop = a2.scrollTop;
      function onScroll() {
        if (this.scrollTop === (this === a1 ? a1LastScrollTop : a2LastScrollTop)) {
          return;
        }
        a1.scrollTop = a2.scrollTop = MAX;
        a1LastScrollTop = a1.scrollTop;
        a2LastScrollTop = a2.scrollTop;
        attrChange(attr2);
      }
      a1.addEventListener("scroll", onScroll, passiveEvents);
      a2.addEventListener("scroll", onScroll, passiveEvents);
    });
    var computedStyle = getComputedStyle(a1);
    Object.defineProperty(elementComputedStyle, attr2, {
      configurable: true,
      get: function() {
        return parseFloat(computedStyle.paddingBottom);
      }
    });
  }
  var parentDiv = document.createElement("div");
  setStyle2(parentDiv, {
    position: "absolute",
    left: "0",
    top: "0",
    width: "0",
    height: "0",
    zIndex: "-1",
    overflow: "hidden",
    visibility: "hidden"
  });
  attrs.forEach(function(key) {
    addChild(parentDiv, key);
  });
  document.body.appendChild(parentDiv);
  parentReady();
  inited$1 = true;
}
function getAttr(attr2) {
  if (!inited$1) {
    init();
  }
  return elementComputedStyle[attr2];
}
var changeAttrs = [];
function attrChange(attr2) {
  if (!changeAttrs.length) {
    setTimeout(function() {
      var style = {};
      changeAttrs.forEach(function(attr3) {
        style[attr3] = elementComputedStyle[attr3];
      });
      changeAttrs.length = 0;
      callbacks.forEach(function(callback) {
        callback(style);
      });
    }, 0);
  }
  changeAttrs.push(attr2);
}
var callbacks = [];
function onChange(callback) {
  if (!getSupport()) {
    return;
  }
  if (!inited$1) {
    init();
  }
  if (typeof callback === "function") {
    callbacks.push(callback);
  }
}
function offChange(callback) {
  var index2 = callbacks.indexOf(callback);
  if (index2 >= 0) {
    callbacks.splice(index2, 1);
  }
}
var safeAreaInsets = {
  get support() {
    return (typeof support === "string" ? support : getSupport()).length != 0;
  },
  get top() {
    return getAttr("top");
  },
  get left() {
    return getAttr("left");
  },
  get right() {
    return getAttr("right");
  },
  get bottom() {
    return getAttr("bottom");
  },
  onChange,
  offChange
};
var out = safeAreaInsets;
const safeAreaInsets$1 = /* @__PURE__ */ getDefaultExportFromCjs(out);
const onEventPrevent = /* @__PURE__ */ withModifiers(() => {
}, ["prevent"]);
const onEventStop = /* @__PURE__ */ withModifiers(
  (_event) => {
  },
  ["stop"]
);
function getWindowOffsetCssVar(style, name) {
  return parseInt((style.getPropertyValue(name).match(/\d+/) || ["0"])[0]);
}
function getWindowTop() {
  const style = document.documentElement.style;
  const top = getWindowOffsetCssVar(style, "--window-top");
  return top ? top + safeAreaInsets$1.top : 0;
}
function getWindowOffset() {
  const style = document.documentElement.style;
  const top = getWindowTop();
  const bottom = getWindowOffsetCssVar(style, "--window-bottom");
  const left = getWindowOffsetCssVar(style, "--window-left");
  const right = getWindowOffsetCssVar(style, "--window-right");
  const topWindowHeight = getWindowOffsetCssVar(style, "--top-window-height");
  return {
    top,
    bottom: bottom ? bottom + safeAreaInsets$1.bottom : 0,
    left: left ? left + safeAreaInsets$1.left : 0,
    right: right ? right + safeAreaInsets$1.right : 0,
    topWindowHeight: topWindowHeight || 0
  };
}
function updateCssVar(cssVars) {
  const style = document.documentElement.style;
  Object.keys(cssVars).forEach((name) => {
    style.setProperty(name, cssVars[name]);
  });
}
function updatePageCssVar(cssVars) {
  return updateCssVar(cssVars);
}
function PolySymbol(name) {
  return Symbol("[uni-app]: " + name);
}
function get$pageByPage(page) {
  return page.$page;
}
function isBuiltInElement(target) {
  return target.tagName.indexOf("UNI-") === 0;
}
const ICON_PATH_SUCCESS_NO_CIRCLE = "M1.952 18.080q-0.32-0.352-0.416-0.88t0.128-0.976l0.16-0.352q0.224-0.416 0.64-0.528t0.8 0.176l6.496 4.704q0.384 0.288 0.912 0.272t0.88-0.336l17.312-14.272q0.352-0.288 0.848-0.256t0.848 0.352l-0.416-0.416q0.32 0.352 0.32 0.816t-0.32 0.816l-18.656 18.912q-0.32 0.352-0.8 0.352t-0.8-0.32l-7.936-8.064z";
const ICON_PATH_WARN = "M15.808 0.16q-4.224 0-7.872 2.176-3.552 2.112-5.632 5.728-2.144 3.744-2.144 8.128 0 4.192 2.144 7.872 2.112 3.52 5.632 5.632 3.68 2.144 7.872 2.144 4.384 0 8.128-2.144 3.616-2.080 5.728-5.632 2.176-3.648 2.176-7.872 0-4.384-2.176-8.128-2.112-3.616-5.728-5.728-3.744-2.176-8.128-2.176zM15.136 8.672h1.728q0.128 0 0.224 0.096t0.096 0.256l-0.384 10.24q0 0.064-0.048 0.112t-0.112 0.048h-1.248q-0.096 0-0.144-0.048t-0.048-0.112l-0.384-10.24q0-0.16 0.096-0.256t0.224-0.096zM16 23.328q-0.48 0-0.832-0.352t-0.352-0.848 0.352-0.848 0.832-0.352 0.832 0.352 0.352 0.848-0.352 0.848-0.832 0.352z";
const ICON_PATH_BACK = "M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z";
function createSvgIconVNode(path, color = "#000", size2 = 27) {
  return createVNode(
    "svg",
    {
      width: size2,
      height: size2,
      viewBox: "0 0 32 32"
    },
    [
      createVNode(
        "path",
        {
          d: path,
          fill: color
        },
        null,
        8,
        ["d", "fill"]
      )
    ],
    8,
    ["width", "height"]
  );
}
function useCurrentPageId() {
  {
    const { $pageInstance } = getCurrentInstance();
    return $pageInstance && getPageProxyId($pageInstance.proxy);
  }
}
function getCurrentPage() {
  const pages = getCurrentPages$1();
  const len = pages.length;
  if (len) {
    return pages[len - 1];
  }
}
function getCurrentPageMeta() {
  var _c;
  const $page = (_c = getCurrentPage()) == null ? void 0 : _c.$page;
  if ($page) {
    return $page.meta;
  }
}
function getCurrentPageId() {
  const meta = getCurrentPageMeta();
  if (meta) {
    return meta.id;
  }
  return -1;
}
function getCurrentPageVm() {
  const page = getCurrentPage();
  if (page) {
    return page.$vm;
  }
}
const PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
function initGlobalStyle() {
  return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id2) {
  const globalStyle = initGlobalStyle();
  const res = extend$1({ id: id2 }, globalStyle, pageMeta);
  PAGE_META_KEYS.forEach((name) => {
    res[name] = extend$1({}, globalStyle[name], pageMeta[name]);
  });
  const { navigationBar } = res;
  navigationBar.titleText && navigationBar.titleImage && (navigationBar.titleText = "");
  return res;
}
function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel, themeMode) {
  const { id: id2, route } = meta;
  const titleColor = normalizeStyles(
    meta.navigationBar,
    __uniConfig.themeConfig,
    themeMode
  ).titleColor;
  return {
    id: id2,
    path: addLeadingSlash(route),
    route,
    fullPath: url,
    options: pageQuery,
    meta,
    openType,
    eventChannel,
    statusBarStyle: titleColor === "#ffffff" ? "light" : "dark"
  };
}
function getPageProxyId(proxy) {
  var _a, _b;
  return ((_a = proxy.$page) == null ? void 0 : _a.id) || ((_b = proxy.$basePage) == null ? void 0 : _b.id);
}
function invokeHook(vm, name, args) {
  if (isString(vm)) {
    args = name;
    name = vm;
    vm = getCurrentPageVm();
  } else if (typeof vm === "number") {
    const page = getCurrentPages$1().find(
      (page2) => get$pageByPage(page2).id === vm
    );
    if (page) {
      vm = page.$vm;
    } else {
      vm = getCurrentPageVm();
    }
  }
  if (!vm) {
    return;
  }
  const hooks = vm.$[name];
  if (name === ON_BACK_PRESS) {
    return hooks && invokeArrayFnsWithResults(hooks, args).some((ret) => ret === true);
  }
  return hooks && invokeArrayFns(hooks, args);
}
function disableScrollListener(evt) {
  evt.preventDefault();
}
let testReachBottomTimer;
let lastScrollHeight = 0;
function createScrollListener({
  onPageScroll,
  onReachBottom,
  onReachBottomDistance
}) {
  let ticking = false;
  let hasReachBottom = false;
  let reachBottomLocking = true;
  const isReachBottom = () => {
    const { scrollHeight } = document.documentElement;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const isBottom = scrollY > 0 && scrollHeight > windowHeight && scrollY + windowHeight + onReachBottomDistance >= scrollHeight;
    const heightChanged = Math.abs(scrollHeight - lastScrollHeight) > onReachBottomDistance;
    if (isBottom && (!hasReachBottom || heightChanged)) {
      lastScrollHeight = scrollHeight;
      hasReachBottom = true;
      return true;
    }
    if (!isBottom && hasReachBottom) {
      hasReachBottom = false;
    }
    return false;
  };
  const trigger2 = () => {
    onPageScroll && onPageScroll(window.pageYOffset);
    function testReachBottom() {
      if (isReachBottom()) {
        onReachBottom && onReachBottom();
        reachBottomLocking = false;
        setTimeout(function() {
          reachBottomLocking = true;
        }, 350);
        return true;
      }
    }
    if (onReachBottom && reachBottomLocking) {
      if (testReachBottom())
        ;
      else {
        testReachBottomTimer = setTimeout(testReachBottom, 300);
      }
    }
    ticking = false;
  };
  return function onScroll() {
    clearTimeout(testReachBottomTimer);
    if (!ticking) {
      requestAnimationFrame(trigger2);
    }
    ticking = true;
  };
}
function normalizeRoute(toRoute) {
  if (toRoute.indexOf("/") === 0 || toRoute.indexOf("uni:") === 0) {
    return toRoute;
  }
  let fromRoute = "";
  const pages = getCurrentPages$1();
  if (pages.length) {
    fromRoute = get$pageByPage(pages[pages.length - 1]).route;
  }
  return getRealRoute(fromRoute, toRoute);
}
function getRealRoute(fromRoute, toRoute) {
  if (toRoute.indexOf("/") === 0) {
    return toRoute;
  }
  if (toRoute.indexOf("./") === 0) {
    return getRealRoute(fromRoute, toRoute.slice(2));
  }
  const toRouteArray = toRoute.split("/");
  const toRouteLength = toRouteArray.length;
  let i = 0;
  for (; i < toRouteLength && toRouteArray[i] === ".."; i++) {
  }
  toRouteArray.splice(0, i);
  toRoute = toRouteArray.join("/");
  const fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
  fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
  return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
}
function getRouteOptions(path, alias = false) {
  if (alias) {
    return __uniRoutes.find(
      (route) => route.path === path || route.alias === path
    );
  }
  return __uniRoutes.find((route) => route.path === path);
}
function initView() {
  useRem();
  initCustomDatasetOnce(isBuiltInElement);
  {
    initLongPress();
  }
}
class ComponentDescriptor {
  constructor(vm) {
    this.$bindClass = false;
    this.$bindStyle = false;
    this.$vm = vm;
    {
      this.$el = resolveOwnerEl(vm.$);
    }
    if (this.$el.getAttribute) {
      this.$bindClass = !!this.$el.getAttribute("class");
      this.$bindStyle = !!this.$el.getAttribute("style");
    }
  }
  selectComponent(selector) {
    if (!this.$el || !selector) {
      return;
    }
    const wxsVm = getWxsVm(this.$el.querySelector(selector));
    if (!wxsVm) {
      return;
    }
    return createComponentDescriptor(wxsVm, false);
  }
  selectAllComponents(selector) {
    if (!this.$el || !selector) {
      return [];
    }
    const descriptors = [];
    const els = this.$el.querySelectorAll(selector);
    for (let i = 0; i < els.length; i++) {
      const wxsVm = getWxsVm(els[i]);
      if (wxsVm) {
        descriptors.push(createComponentDescriptor(wxsVm, false));
      }
    }
    return descriptors;
  }
  forceUpdate(type) {
    if (type === "class") {
      if (this.$bindClass) {
        this.$el.__wxsClassChanged = true;
        this.$vm.$forceUpdate();
      } else {
        this.updateWxsClass();
      }
    } else if (type === "style") {
      if (this.$bindStyle) {
        this.$el.__wxsStyleChanged = true;
        this.$vm.$forceUpdate();
      } else {
        this.updateWxsStyle();
      }
    }
  }
  updateWxsClass() {
    const { __wxsAddClass } = this.$el;
    if (__wxsAddClass.length) {
      this.$el.className = __wxsAddClass.join(" ");
    }
  }
  updateWxsStyle() {
    const { __wxsStyle } = this.$el;
    if (__wxsStyle) {
      this.$el.setAttribute("style", stringifyStyle(__wxsStyle));
    }
  }
  setStyle(style) {
    if (!this.$el || !style) {
      return this;
    }
    if (isString(style)) {
      style = parseStringStyle(style);
    }
    if (isPlainObject(style)) {
      this.$el.__wxsStyle = style;
      this.forceUpdate("style");
    }
    return this;
  }
  addClass(clazz2) {
    if (!this.$el || !clazz2) {
      return this;
    }
    const __wxsAddClass = this.$el.__wxsAddClass || (this.$el.__wxsAddClass = []);
    if (__wxsAddClass.indexOf(clazz2) === -1) {
      __wxsAddClass.push(clazz2);
      this.forceUpdate("class");
    }
    return this;
  }
  removeClass(clazz2) {
    if (!this.$el || !clazz2) {
      return this;
    }
    const { __wxsAddClass } = this.$el;
    if (__wxsAddClass) {
      const index2 = __wxsAddClass.indexOf(clazz2);
      if (index2 > -1) {
        __wxsAddClass.splice(index2, 1);
      }
    }
    const __wxsRemoveClass = this.$el.__wxsRemoveClass || (this.$el.__wxsRemoveClass = []);
    if (__wxsRemoveClass.indexOf(clazz2) === -1) {
      __wxsRemoveClass.push(clazz2);
      this.forceUpdate("class");
    }
    return this;
  }
  hasClass(cls) {
    return this.$el && this.$el.classList.contains(cls);
  }
  getDataset() {
    return this.$el && this.$el.dataset;
  }
  callMethod(funcName, args = {}) {
    const func = this.$vm[funcName];
    if (isFunction(func)) {
      func(JSON.parse(JSON.stringify(args)));
    } else if (this.$vm.ownerId) {
      UniViewJSBridge$1.publishHandler(ON_WXS_INVOKE_CALL_METHOD, {
        nodeId: this.$el.__id,
        ownerId: this.$vm.ownerId,
        method: funcName,
        args
      });
    }
  }
  requestAnimationFrame(callback) {
    return window.requestAnimationFrame(callback);
  }
  getState() {
    return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}));
  }
  triggerEvent(eventName, detail = {}) {
    return this.$vm.$emit(eventName, detail), this;
  }
  getComputedStyle(names) {
    if (this.$el) {
      const styles = window.getComputedStyle(this.$el);
      if (names && names.length) {
        return names.reduce((res, n) => {
          res[n] = styles[n];
          return res;
        }, {});
      }
      return styles;
    }
    return {};
  }
  setTimeout(handler, timeout) {
    return window.setTimeout(handler, timeout);
  }
  clearTimeout(handle) {
    return window.clearTimeout(handle);
  }
  getBoundingClientRect() {
    return this.$el.getBoundingClientRect();
  }
}
function createComponentDescriptor(vm, isOwnerInstance = true) {
  {
    if (isOwnerInstance && vm) {
      vm = resolveOwnerVm(vm.$);
    }
  }
  if (vm && vm.$el) {
    if (!vm.$el.__wxsComponentDescriptor) {
      vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm);
    }
    return vm.$el.__wxsComponentDescriptor;
  }
}
function getComponentDescriptor(instance2, isOwnerInstance) {
  return createComponentDescriptor(instance2, isOwnerInstance);
}
function resolveOwnerComponentPublicInstance(eventValue, instance2, checkArgsLength = true) {
  if (!instance2) {
    return false;
  }
  if (checkArgsLength && eventValue.length < 2) {
    return false;
  }
  const ownerVm = resolveOwnerVm(instance2);
  if (!ownerVm) {
    return false;
  }
  const type = ownerVm.$.type;
  if (!type.$wxs && !type.$renderjs) {
    return false;
  }
  return ownerVm;
}
function wrapperH5WxsEvent(event, eventValue, instance2, checkArgsLength = true) {
  if (eventValue) {
    if (!event.__instance) {
      event.__instance = true;
      Object.defineProperty(event, "instance", {
        get() {
          return getComponentDescriptor(instance2.proxy, false);
        }
      });
    }
    const ownerVm = resolveOwnerComponentPublicInstance(
      eventValue,
      instance2,
      checkArgsLength
    );
    if (ownerVm) {
      return [event, getComponentDescriptor(ownerVm, false)];
    }
  }
}
function getWxsVm(el) {
  if (!el) {
    return;
  }
  {
    return el.__vueParentComponent && el.__vueParentComponent.proxy;
  }
}
const isKeyboardEvent = (val) => !val.type.indexOf("key") && val instanceof KeyboardEvent;
const isClickEvent = (val) => val.type === "click";
const isMouseEvent = (val) => val.type.indexOf("mouse") === 0 || ["contextmenu"].includes(val.type);
const isTouchEvent = (val) => typeof TouchEvent !== "undefined" && val instanceof TouchEvent || val.type.indexOf("touch") === 0 || ["longpress"].indexOf(val.type) >= 0;
function $nne(evt, eventValue, instance2) {
  const { currentTarget } = evt;
  if (!(evt instanceof Event) || !(currentTarget instanceof HTMLElement)) {
    return [evt];
  }
  const isHTMLTarget = !isBuiltInElement(currentTarget);
  {
    if (isHTMLTarget) {
      return wrapperH5WxsEvent(
        evt,
        eventValue,
        instance2,
        false
        // 原生标签事件可能被cache，参数长度不准确，故默认不校验
      ) || [evt];
    }
  }
  const res = createNativeEvent(evt, isHTMLTarget);
  {
    if (isClickEvent(evt)) {
      normalizeClickEvent(res, evt);
    } else if (isMouseEvent(evt)) {
      normalizeMouseEvent(res, evt);
    } else if (isTouchEvent(evt)) {
      const top = getWindowTop();
      res.touches = normalizeTouchEvent(evt.touches, top);
      res.changedTouches = normalizeTouchEvent(
        evt.changedTouches,
        top
      );
    } else if (isKeyboardEvent(evt)) {
      const proxyKeys = ["key", "code"];
      proxyKeys.forEach((key) => {
        Object.defineProperty(res, key, {
          get() {
            return evt[key];
          }
        });
      });
    }
  }
  {
    return wrapperH5WxsEvent(
      res,
      eventValue,
      instance2
    ) || [res];
  }
}
function findUniTarget(target) {
  while (!isBuiltInElement(target)) {
    target = target.parentElement;
  }
  return target;
}
function createNativeEvent(evt, htmlElement = false) {
  const { type, timeStamp, target, currentTarget } = evt;
  let realTarget, realCurrentTarget;
  {
    realTarget = normalizeTarget(
      htmlElement ? target : findUniTarget(target)
    );
    realCurrentTarget = normalizeTarget(currentTarget);
  }
  const event = {
    type,
    timeStamp,
    target: realTarget,
    detail: {},
    currentTarget: realCurrentTarget
  };
  if (evt instanceof CustomEvent && isPlainObject(evt.detail)) {
    event.detail = evt.detail;
  }
  if (evt._stopped) {
    event._stopped = true;
  }
  if (evt.type.startsWith("touch")) {
    event.touches = evt.touches;
    event.changedTouches = evt.changedTouches;
  }
  {
    {
      wrapperEvent(event, evt);
    }
  }
  return event;
}
function wrapperEvent(event, evt) {
  extend$1(event, {
    preventDefault() {
      return evt.preventDefault();
    },
    stopPropagation() {
      return evt.stopPropagation();
    }
  });
}
function normalizeClickEvent(evt, mouseEvt) {
  const { x, y } = mouseEvt;
  const top = getWindowTop();
  evt.detail = { x, y: y - top };
  evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt, top)];
}
function normalizeMouseEvent(evt, mouseEvt) {
  const top = getWindowTop();
  evt.pageX = mouseEvt.pageX;
  evt.pageY = mouseEvt.pageY - top;
  evt.clientX = mouseEvt.clientX;
  evt.clientY = mouseEvt.clientY - top;
  evt.touches = evt.changedTouches = [createTouchEvent(mouseEvt, top)];
}
function createTouchEvent(evt, top) {
  return {
    force: 1,
    identifier: 0,
    clientX: evt.clientX,
    clientY: evt.clientY - top,
    pageX: evt.pageX,
    pageY: evt.pageY - top
  };
}
function normalizeTouchEvent(touches, top) {
  const res = [];
  for (let i = 0; i < touches.length; i++) {
    const { identifier, pageX, pageY, clientX, clientY, force } = touches[i];
    res.push({
      identifier,
      pageX,
      pageY: pageY - top,
      clientX,
      clientY: clientY - top,
      force: force || 0
    });
  }
  return res;
}
const instance = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $nne,
  createNativeEvent
}, Symbol.toStringTag, { value: "Module" });
function initAppConfig$1(appConfig) {
  const globalProperties = appConfig.globalProperties;
  extend$1(globalProperties, instance);
  {
    globalProperties.$gcd = getComponentDescriptor;
  }
}
function initViewPlugin(app) {
  initAppConfig$1(app._context.config);
}
const invokeOnCallback = (name, res) => UniServiceJSBridge$1.emit("api." + name, res);
let invokeViewMethodId = 1;
function publishViewMethodName(pageId) {
  return (pageId || getCurrentPageId()) + "." + INVOKE_VIEW_API;
}
const invokeViewMethod = (name, args, pageId, callback) => {
  const { subscribe, publishHandler } = UniServiceJSBridge$1;
  const id2 = callback ? invokeViewMethodId++ : 0;
  callback && subscribe(INVOKE_VIEW_API + "." + id2, callback, true);
  publishHandler(publishViewMethodName(pageId), { id: id2, name, args }, pageId);
};
const invokeViewMethodKeepAlive = (name, args, callback, pageId) => {
  const { subscribe, unsubscribe, publishHandler } = UniServiceJSBridge$1;
  const id2 = invokeViewMethodId++;
  const subscribeName = INVOKE_VIEW_API + "." + id2;
  subscribe(subscribeName, callback);
  publishHandler(publishViewMethodName(pageId), { id: id2, name, args }, pageId);
  return () => {
    unsubscribe(subscribeName);
  };
};
const ServiceJSBridge = /* @__PURE__ */ extend$1(
  /* @__PURE__ */ initBridge(
    "view"
    /* view 指的是 service 层订阅的是 view 层事件 */
  ),
  {
    invokeOnCallback,
    invokeViewMethod,
    invokeViewMethodKeepAlive
  }
);
function initOn() {
  const { on: on2 } = UniServiceJSBridge$1;
  on2(ON_RESIZE, onResize$1);
  on2(ON_APP_ENTER_FOREGROUND, onAppEnterForeground);
  on2(ON_APP_ENTER_BACKGROUND, onAppEnterBackground);
}
function onResize$1(res) {
  const page = getCurrentPage();
  invokeHook(page, ON_RESIZE, res);
  UniServiceJSBridge$1.invokeOnCallback("onWindowResize", res);
}
function onAppEnterForeground(enterOptions2) {
  const page = getCurrentPage();
  invokeHook(
    getApp$1(),
    ON_SHOW,
    enterOptions2
  );
  invokeHook(page, ON_SHOW);
}
function onAppEnterBackground() {
  invokeHook(
    getApp$1(),
    ON_HIDE
  );
  invokeHook(
    getCurrentPage(),
    ON_HIDE
  );
}
const SUBSCRIBE_LIFECYCLE_HOOKS = [ON_PAGE_SCROLL, ON_REACH_BOTTOM];
function initSubscribe() {
  SUBSCRIBE_LIFECYCLE_HOOKS.forEach(
    (name) => UniServiceJSBridge$1.subscribe(name, createPageEvent(name))
  );
}
function createPageEvent(name) {
  return (args, pageId) => {
    invokeHook(parseInt(pageId), name, args);
  };
}
function initService() {
  {
    initOn();
    initSubscribe();
  }
}
function initAppVm(appVm2) {
  appVm2.$vm = appVm2;
  appVm2.$mpType = "app";
  const locale2 = ref(useI18n().getLocale());
  Object.defineProperty(appVm2, "$locale", {
    get() {
      return locale2.value;
    },
    set(v2) {
      locale2.value = v2;
    }
  });
}
function initPageVm(pageVm, page) {
  pageVm.route = page.route;
  pageVm.$vm = pageVm;
  {
    pageVm.$page = page;
  }
  pageVm.$mpType = "page";
  pageVm.$fontFamilySet = /* @__PURE__ */ new Set();
  if (page.meta.isTabBar) {
    pageVm.$.__isTabBar = true;
    pageVm.$.__isActive = true;
  }
}
function getOpenerEventChannel() {
  {
    if (this.$route) {
      const meta = this.$route.meta;
      if (!meta.eventChannel) {
        meta.eventChannel = new EventChannel(
          this.$page.id
        );
      }
      return meta.eventChannel;
    }
  }
}
function initAppConfig(appConfig) {
  const globalProperties = appConfig.globalProperties;
  globalProperties.getOpenerEventChannel = getOpenerEventChannel;
}
function initServicePlugin(app) {
  initAppConfig(app._context.config);
}
function createLaunchOptions() {
  return {
    path: "",
    query: {},
    scene: 1001,
    referrerInfo: {
      appId: "",
      extraData: {}
    }
  };
}
function defineGlobalData(app, defaultGlobalData) {
  const options = app.$options || {};
  options.globalData = extend$1(options.globalData || {}, defaultGlobalData);
  Object.defineProperty(app, "globalData", {
    get() {
      return options.globalData;
    },
    set(newGlobalData) {
      options.globalData = newGlobalData;
    }
  });
}
function converPx(value) {
  if (/^-?\d+[ur]px$/i.test(value)) {
    return value.replace(/(^-?\d+)[ur]px$/i, (text2, num) => {
      return `${upx2px(parseFloat(num))}px`;
    });
  } else if (/^-?[\d\.]+$/.test(value)) {
    return `${value}px`;
  }
  return value || "";
}
function converType(type) {
  return type.replace(/[A-Z]/g, (text2) => {
    return `-${text2.toLowerCase()}`;
  }).replace("webkit", "-webkit");
}
function getStyle(action) {
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "scale",
    "scale3d",
    "rotate3d",
    "skew",
    "translate",
    "translate3d"
  ];
  const animateTypes2 = [
    "scaleX",
    "scaleY",
    "scaleZ",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skewX",
    "skewY",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes3 = ["opacity", "background-color"];
  const animateTypes4 = ["width", "height", "left", "right", "top", "bottom"];
  const animates = action.animates;
  const option = action.option;
  const transition = option.transition;
  const style = {};
  const transform = [];
  animates.forEach((animate) => {
    let type = animate.type;
    let args = [...animate.args];
    if (animateTypes1.concat(animateTypes2).includes(type)) {
      if (type.startsWith("rotate") || type.startsWith("skew")) {
        args = args.map((value) => parseFloat(value) + "deg");
      } else if (type.startsWith("translate")) {
        args = args.map(converPx);
      }
      if (animateTypes2.indexOf(type) >= 0) {
        args.length = 1;
      }
      transform.push(`${type}(${args.join(",")})`);
    } else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
      type = args[0];
      const value = args[1];
      style[type] = animateTypes4.includes(type) ? converPx(value) : value;
    }
  });
  style.transform = style.webkitTransform = transform.join(" ");
  style.transition = style.webkitTransition = Object.keys(style).map(
    (type) => `${converType(type)} ${transition.duration}ms ${transition.timingFunction} ${transition.delay}ms`
  ).join(",");
  style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin;
  return style;
}
function startAnimation(context) {
  const animation2 = context.animation;
  if (!animation2 || !animation2.actions || !animation2.actions.length) {
    return;
  }
  let index2 = 0;
  const actions = animation2.actions;
  const length = animation2.actions.length;
  function animate() {
    const action = actions[index2];
    const transition = action.option.transition;
    const style = getStyle(action);
    Object.keys(style).forEach((key) => {
      context.$el.style[key] = style[key];
    });
    index2 += 1;
    if (index2 < length) {
      setTimeout(animate, transition.duration + transition.delay);
    }
  }
  setTimeout(() => {
    animate();
  }, 0);
}
const animation = {
  props: ["animation"],
  watch: {
    animation: {
      deep: true,
      handler() {
        startAnimation(this);
      }
    }
  },
  mounted() {
    startAnimation(this);
  }
};
const defineBuiltInComponent = (options) => {
  options.__reserved = true;
  const { props: props2, mixins } = options;
  if (!props2 || !props2.animation) {
    (mixins || (options.mixins = [])).push(animation);
  }
  return defineSystemComponent(options);
};
const defineSystemComponent = (options) => {
  options.__reserved = true;
  options.compatConfig = {
    MODE: 3
    // 标记为vue3
  };
  return /* @__PURE__ */ defineComponent(options);
};
function withWebEvent(fn) {
  return fn.__wwe = true, fn;
}
function useCustomEvent(ref2, emit2) {
  return (name, evt, detail) => {
    if (ref2.value) {
      emit2(name, normalizeCustomEvent(name, evt, ref2.value, detail || {}));
    }
  };
}
function normalizeCustomEvent(name, domEvt, el, detail) {
  let target;
  target = normalizeTarget(el);
  return {
    type: domEvt.__evName || detail.type || name,
    timeStamp: domEvt.timeStamp || 0,
    target,
    currentTarget: target,
    detail
  };
}
const hoverProps = {
  hoverClass: {
    type: String,
    default: "none"
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false
  },
  hoverStartTime: {
    type: [Number, String],
    default: 50
  },
  hoverStayTime: {
    type: [Number, String],
    default: 400
  }
};
function useHover(props2) {
  const hovering = ref(false);
  let hoverTouch = false;
  let hoverStartTimer;
  let hoverStayTimer;
  function hoverReset() {
    requestAnimationFrame(() => {
      clearTimeout(hoverStayTimer);
      hoverStayTimer = setTimeout(() => {
        hovering.value = false;
      }, parseInt(props2.hoverStayTime));
    });
  }
  function onTouchstartPassive(evt) {
    if (evt.touches.length > 1) {
      return;
    }
    handleHoverStart(evt);
  }
  function onMousedown(evt) {
    if (hoverTouch) {
      return;
    }
    handleHoverStart(evt);
    window.addEventListener("mouseup", handlePCHoverEnd);
  }
  function handleHoverStart(evt) {
    if (evt._hoverPropagationStopped) {
      return;
    }
    if (!props2.hoverClass || props2.hoverClass === "none" || props2.disabled) {
      return;
    }
    if (props2.hoverStopPropagation) {
      evt._hoverPropagationStopped = true;
    }
    hoverTouch = true;
    hoverStartTimer = setTimeout(() => {
      hovering.value = true;
      if (!hoverTouch) {
        hoverReset();
      }
    }, parseInt(props2.hoverStartTime));
  }
  function onTouchend() {
    handleHoverEnd();
  }
  function onMouseup() {
    if (!hoverTouch) {
      return;
    }
    handlePCHoverEnd();
  }
  function handleHoverEnd() {
    hoverTouch = false;
    if (hovering.value) {
      hoverReset();
    }
  }
  function handlePCHoverEnd() {
    handleHoverEnd();
    window.removeEventListener("mouseup", handlePCHoverEnd);
  }
  function onTouchcancel() {
    hoverTouch = false;
    hovering.value = false;
    clearTimeout(hoverStartTimer);
  }
  return {
    hovering,
    binding: {
      onTouchstartPassive: withWebEvent(onTouchstartPassive),
      onMousedown: withWebEvent(onMousedown),
      onTouchend: withWebEvent(onTouchend),
      onMouseup: withWebEvent(onMouseup),
      onTouchcancel: withWebEvent(onTouchcancel)
    }
  };
}
function useBooleanAttr(props2, keys) {
  if (isString(keys)) {
    keys = [keys];
  }
  return keys.reduce((res, key) => {
    if (props2[key]) {
      res[key] = true;
    }
    return res;
  }, /* @__PURE__ */ Object.create(null));
}
const uniFormKey = PolySymbol("uniForm");
const uniLabelKey = PolySymbol("uniLabel");
function useListeners$1(props2, listeners2) {
  _addListeners(props2.id, listeners2);
  watch(
    () => props2.id,
    (newId, oldId) => {
      _removeListeners(oldId, listeners2, true);
      _addListeners(newId, listeners2, true);
    }
  );
  onUnmounted(() => {
    _removeListeners(props2.id, listeners2);
  });
}
function _addListeners(id2, listeners2, watch2) {
  const pageId = useCurrentPageId();
  if (watch2 && !id2) {
    return;
  }
  if (!isPlainObject(listeners2)) {
    return;
  }
  Object.keys(listeners2).forEach((name) => {
    if (watch2) {
      if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
        UniViewJSBridge$1.on(`uni-${name}-${pageId}-${id2}`, listeners2[name]);
      }
    } else {
      if (name.indexOf("uni-") === 0) {
        UniViewJSBridge$1.on(name, listeners2[name]);
      } else if (id2) {
        UniViewJSBridge$1.on(`uni-${name}-${pageId}-${id2}`, listeners2[name]);
      }
    }
  });
}
function _removeListeners(id2, listeners2, watch2) {
  const pageId = useCurrentPageId();
  if (watch2 && !id2) {
    return;
  }
  if (!isPlainObject(listeners2)) {
    return;
  }
  Object.keys(listeners2).forEach((name) => {
    if (watch2) {
      if (name.indexOf("@") !== 0 && name.indexOf("uni-") !== 0) {
        UniViewJSBridge$1.off(`uni-${name}-${pageId}-${id2}`, listeners2[name]);
      }
    } else {
      if (name.indexOf("uni-") === 0) {
        UniViewJSBridge$1.off(name, listeners2[name]);
      } else if (id2) {
        UniViewJSBridge$1.off(`uni-${name}-${pageId}-${id2}`, listeners2[name]);
      }
    }
  });
}
const buttonProps = {
  id: {
    type: String,
    default: ""
  },
  hoverClass: {
    type: String,
    default: "button-hover"
  },
  hoverStartTime: {
    type: [Number, String],
    default: 20
  },
  hoverStayTime: {
    type: [Number, String],
    default: 70
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: [Boolean, String],
    default: false
  },
  formType: {
    type: String,
    default: ""
  },
  openType: {
    type: String,
    default: ""
  },
  loading: {
    type: [Boolean, String],
    default: false
  },
  plain: {
    type: [Boolean, String],
    default: false
  }
};
const index$x = /* @__PURE__ */ defineBuiltInComponent({
  name: "Button",
  props: buttonProps,
  setup(props2, {
    slots
  }) {
    const rootRef = ref(null);
    const uniForm = inject(uniFormKey, false);
    const {
      hovering,
      binding
    } = useHover(props2);
    const onClick = withWebEvent((e2, isLabelClick) => {
      if (props2.disabled) {
        return e2.stopImmediatePropagation();
      }
      if (isLabelClick) {
        rootRef.value.click();
      }
      const formType = props2.formType;
      if (formType) {
        if (!uniForm) {
          return;
        }
        if (formType === "submit") {
          uniForm.submit(e2);
        } else if (formType === "reset") {
          uniForm.reset(e2);
        }
        return;
      }
    });
    const uniLabel = inject(uniLabelKey, false);
    if (uniLabel) {
      uniLabel.addHandler(onClick);
      onBeforeUnmount(() => {
        uniLabel.removeHandler(onClick);
      });
    }
    useListeners$1(props2, {
      "label-click": onClick
    });
    return () => {
      const hoverClass = props2.hoverClass;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      const loadingAttrs = useBooleanAttr(props2, "loading");
      const plainAttrs = useBooleanAttr(props2, "plain");
      const hasHoverClass = hoverClass && hoverClass !== "none";
      return createVNode("uni-button", mergeProps({
        "ref": rootRef,
        "onClick": onClick,
        "id": props2.id,
        "class": hasHoverClass && hovering.value ? hoverClass : ""
      }, hasHoverClass && binding, booleanAttrs, loadingAttrs, plainAttrs), [slots.default && slots.default()], 16, ["onClick", "id"]);
    };
  }
});
const pageMetaKey = PolySymbol("UniPageMeta");
function usePageMeta() {
  return inject(pageMetaKey);
}
function providePageMeta(id2) {
  const pageMeta = initPageMeta(id2);
  provide(pageMetaKey, pageMeta);
  return pageMeta;
}
function usePageRoute() {
  {
    return useRoute();
  }
}
function initPageMeta(id2) {
  {
    return reactive(
      normalizePageMeta(
        JSON.parse(
          JSON.stringify(
            initRouteMeta(
              useRoute().meta,
              id2
            )
          )
        )
      )
    );
  }
}
function normalizePageMeta(pageMeta) {
  {
    const { navigationBar } = pageMeta;
    const { titleSize, titleColor, backgroundColor } = navigationBar;
    navigationBar.titleText = navigationBar.titleText || "";
    navigationBar.type = navigationBar.type || "default";
    navigationBar.titleSize = titleSize || "16px";
    navigationBar.titleColor = titleColor || "#000000";
    navigationBar.backgroundColor = backgroundColor || "#F8F8F8";
  }
  if (history.state) {
    const type = history.state.__type__;
    if ((type === "redirectTo" || type === "reLaunch") && getCurrentPages$1().length === 0) {
      pageMeta.isEntry = true;
      pageMeta.isQuit = true;
    }
  }
  return pageMeta;
}
function getStateId() {
  return history.state && history.state.__id__ || 1;
}
const CHOOSE_SIZE_TYPES = ["original", "compressed"];
const CHOOSE_SOURCE_TYPES = ["album", "camera"];
const HTTP_METHODS = [
  "GET",
  "OPTIONS",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "TRACE",
  "CONNECT",
  "PATCH"
];
function elemInArray(str, arr) {
  if (!str || arr.indexOf(str) === -1) {
    return arr[0];
  }
  return str;
}
function elemsInArray(strArr, optionalVal) {
  if (!isArray$1(strArr) || strArr.length === 0 || strArr.find((val) => optionalVal.indexOf(val) === -1)) {
    return optionalVal;
  }
  return strArr;
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp(
      key,
      data[key],
      protocol[key],
      !hasOwn$1(data, key)
    );
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$1(protocol)) {
    return validateProtocol(
      name,
      args[0] || /* @__PURE__ */ Object.create(null),
      protocol,
      onFail
    );
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator: validator2 } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator2) {
    return validator2(value);
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id2, name, callback, keepAlive = false) {
  invokeCallbacks[id2] = {
    name,
    keepAlive,
    callback
  };
  return id2;
}
function invokeCallback(id2, res, extras) {
  if (typeof id2 === "number") {
    const opts = invokeCallbacks[id2];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id2];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
function findInvokeCallbackByName(name) {
  for (const key in invokeCallbacks) {
    if (invokeCallbacks[key].name === name) {
      return true;
    }
  }
  return false;
}
function onKeepAliveApiCallback(name) {
  UniServiceJSBridge$1.on("api." + name, (res) => {
    for (const key in invokeCallbacks) {
      const opts = invokeCallbacks[key];
      if (opts.name === name) {
        opts.callback(res);
      }
    }
  });
}
function createKeepAliveApiCallback(name, callback) {
  return addInvokeCallback(invokeCallbackId++, name, callback, true);
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray$1(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$1(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$1(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(
          scopedInterceptor[hook]
        );
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api2, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$1(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api2(
          wrapperOptions(getApiInterceptorHooks(method), options2),
          ...params
        );
      });
    } else {
      return api2(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api2(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find(
    (cb) => isFunction(args[cb])
  )) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(
        name,
        invokeApi(name, fn, extend$1({}, args), rest)
      );
    }
    return wrapperReturnValue(
      name,
      handlePromise(
        new Promise((resolve2, reject) => {
          invokeApi(
            name,
            fn,
            extend$1({}, args, { success: resolve2, fail: reject }),
            rest
          );
        })
      )
    );
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !options.formatArgs || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$1(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id2, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id2, extend$1(res || {}, result));
}
function invokeFail(id2, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  {
    delete errRes.errCode;
  }
  let res = extend$1({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id2, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function checkCallback(callback) {
  if (!isFunction(callback)) {
    throw new Error(
      'Invalid args: type check failed for args "callback". Expected Function'
    );
  }
}
function wrapperOnApi(name, fn, options) {
  return (callback) => {
    checkCallback(callback);
    const errMsg = beforeInvokeApi(name, [callback], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    const isFirstInvokeOnApi = !findInvokeCallbackByName(name);
    createKeepAliveApiCallback(name, callback);
    if (isFirstInvokeOnApi) {
      onKeepAliveApiCallback(name);
      fn();
    }
  };
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) {
      console.error(errMsg.message + "\n" + errMsg.stack);
    }
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id2 = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id2, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id2, name, res),
      reject: (errMsg2, errRes) => invokeFail(id2, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineOnApi(name, fn, options) {
  return wrapperOnApi(name, fn, options);
}
function defineTaskApi(name, fn, protocol, options) {
  return promisify(
    name,
    wrapperTaskApi(name, fn, protocol, options)
  );
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(
    name,
    fn,
    protocol,
    options
  );
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify(
    name,
    wrapperAsyncApi(name, fn, protocol, options)
  );
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS$1 = false;
let deviceWidth = 0;
let deviceDPR = 0;
let maxWidth = 960;
let baseWidth = 375;
let includeWidth = 750;
function checkDeviceWidth() {
  let windowWidth, pixelRatio2, platform;
  {
    const { windowWidth: w, pixelRatio: p2, platform: pf } = getBaseSystemInfo();
    windowWidth = w;
    pixelRatio2 = p2;
    platform = pf;
  }
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio2;
  isIOS$1 = platform === "ios";
}
function checkValue(value, defaultValue) {
  const newValue = Number(value);
  return isNaN(newValue) ? defaultValue : newValue;
}
function checkMaxWidth() {
  const config = __uniConfig.globalStyle || {};
  maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960);
  baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375);
  includeWidth = checkValue(config.rpxCalcBaseDeviceWidth, 750);
}
const upx2px = /* @__PURE__ */ defineSyncApi(
  API_UPX2PX,
  (number, newDeviceWidth) => {
    if (deviceWidth === 0) {
      checkDeviceWidth();
      {
        checkMaxWidth();
      }
    }
    number = Number(number);
    if (number === 0) {
      return 0;
    }
    let width = newDeviceWidth || deviceWidth;
    {
      width = number === includeWidth || width <= maxWidth ? width : baseWidth;
    }
    let result = number / BASE_DEVICE_WIDTH * width;
    if (result < 0) {
      result = -result;
    }
    result = Math.floor(result + EPS);
    if (result === 0) {
      if (deviceDPR === 1 || !isIOS$1) {
        result = 1;
      } else {
        result = 0.5;
      }
    }
    return number < 0 ? -result : result;
  },
  Upx2pxProtocol
);
const validator = [
  {
    name: "id",
    type: String,
    required: true
  }
];
validator.concat({
  name: "componentInstance",
  type: Object
});
const API_GET_LOCALE = "getLocale";
const getLocale = /* @__PURE__ */ defineSyncApi(
  API_GET_LOCALE,
  () => {
    const app = getApp$1();
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
    return useI18n().getLocale();
  }
);
const appHooks = {
  [ON_UNHANDLE_REJECTION]: [],
  [ON_PAGE_NOT_FOUND]: [],
  [ON_ERROR]: [],
  [ON_SHOW]: [],
  [ON_HIDE]: []
};
function injectAppHooks(appInstance) {
  Object.keys(appHooks).forEach((type) => {
    appHooks[type].forEach((hook) => {
      injectHook(type, hook, appInstance);
    });
  });
}
const API_GET_STORAGE_SYNC = "getStorageSync";
const GetStorageSyncProtocol = [
  {
    name: "key",
    type: String,
    required: true
  }
];
const API_SET_STORAGE_SYNC = "setStorageSync";
const SetStorageSyncProtocol = [
  {
    name: "key",
    type: String,
    required: true
  },
  {
    name: "data",
    required: true
  }
];
const API_REMOVE_STORAGE = "removeStorage";
const RemoveStorageSyncProtocol = GetStorageSyncProtocol;
const API_CHOOSE_IMAGE = "chooseImage";
const ChooseImageOptions = {
  formatArgs: {
    count(value, params) {
      if (!value || value <= 0) {
        params.count = 9;
      }
    },
    sizeType(sizeType, params) {
      params.sizeType = elemsInArray(sizeType, CHOOSE_SIZE_TYPES);
    },
    sourceType(sourceType, params) {
      params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES);
    },
    extension(extension, params) {
      if (extension instanceof Array && extension.length === 0) {
        return "param extension should not be empty.";
      }
      if (!extension)
        params.extension = ["*"];
    }
  }
};
const ChooseImageProtocol = {
  count: Number,
  sizeType: [Array, String],
  sourceType: Array,
  extension: Array
};
const API_REQUEST = "request";
const dataType = {
  JSON: "json"
};
const RESPONSE_TYPE = ["text", "arraybuffer"];
const DEFAULT_RESPONSE_TYPE = "text";
const encode = encodeURIComponent;
function stringifyQuery(url, data) {
  let str = url.split("#");
  const hash = str[1] || "";
  str = str[0].split("?");
  let query = str[1] || "";
  url = str[0];
  const search = query.split("&").filter((item) => item);
  const params = {};
  search.forEach((item) => {
    const part = item.split("=");
    params[part[0]] = part[1];
  });
  for (const key in data) {
    if (hasOwn$1(data, key)) {
      let v2 = data[key];
      if (typeof v2 === "undefined" || v2 === null) {
        v2 = "";
      } else if (isPlainObject(v2)) {
        v2 = JSON.stringify(v2);
      }
      params[encode(key)] = encode(v2);
    }
  }
  query = Object.keys(params).map((item) => `${item}=${params[item]}`).join("&");
  return url + (query ? "?" + query : "") + (hash ? "#" + hash : "");
}
const RequestProtocol = {
  method: String,
  data: [Object, String, Array, ArrayBuffer],
  url: {
    type: String,
    required: true
  },
  header: Object,
  dataType: String,
  responseType: String,
  withCredentials: Boolean
};
const RequestOptions = {
  formatArgs: {
    method(value, params) {
      params.method = elemInArray(
        (value || "").toUpperCase(),
        HTTP_METHODS
      );
    },
    data(value, params) {
      params.data = value || "";
    },
    url(value, params) {
      if (params.method === HTTP_METHODS[0] && isPlainObject(params.data) && Object.keys(params.data).length) {
        params.url = stringifyQuery(value, params.data);
      }
    },
    header(value, params) {
      const header = params.header = value || {};
      if (params.method !== HTTP_METHODS[0]) {
        if (!Object.keys(header).find(
          (key) => key.toLowerCase() === "content-type"
        )) {
          header["Content-Type"] = "application/json";
        }
      }
    },
    dataType(value, params) {
      params.dataType = (value || dataType.JSON).toLowerCase();
    },
    responseType(value, params) {
      params.responseType = (value || "").toLowerCase();
      if (RESPONSE_TYPE.indexOf(params.responseType) === -1) {
        params.responseType = DEFAULT_RESPONSE_TYPE;
      }
    }
  }
};
const API_UPLOAD_FILE = "uploadFile";
const UploadFileOptions = {
  formatArgs: {
    filePath(filePath, params) {
      if (filePath) {
        params.filePath = getRealPath(filePath);
      }
    },
    header(value, params) {
      params.header = value || {};
    },
    formData(value, params) {
      params.formData = value || {};
    }
  }
};
const UploadFileProtocol = {
  url: {
    type: String,
    required: true
  },
  files: Array,
  filePath: String,
  name: String,
  header: Object,
  formData: Object,
  timeout: Number
};
const API_CONNECT_SOCKET = "connectSocket";
const ConnectSocketOptions = {
  formatArgs: {
    header(value, params) {
      params.header = value || {};
    },
    method(value, params) {
      params.method = elemInArray(
        (value || "").toUpperCase(),
        HTTP_METHODS
      );
    },
    protocols(protocols, params) {
      if (isString(protocols)) {
        params.protocols = [protocols];
      }
    }
  }
};
const ConnectSocketProtocol = {
  url: {
    type: String,
    required: true
  },
  header: {
    type: Object
  },
  method: String,
  protocols: [Array, String]
};
const API_CLOSE_SOCKET = "closeSocket";
const CloseSocketProtocol = {
  code: Number,
  reason: String
};
function encodeQueryString(url) {
  if (!isString(url)) {
    return url;
  }
  const index2 = url.indexOf("?");
  if (index2 === -1) {
    return url;
  }
  const query = url.slice(index2 + 1).trim().replace(/^(\?|#|&)/, "");
  if (!query) {
    return url;
  }
  url = url.slice(0, index2);
  const params = [];
  query.split("&").forEach((param) => {
    const parts = param.replace(/\+/g, " ").split("=");
    const key = parts.shift();
    const val = parts.length > 0 ? parts.join("=") : "";
    params.push(key + "=" + encodeURIComponent(val));
  });
  return params.length ? url + "?" + params.join("&") : url;
}
const ANIMATION_IN$1 = [
  "slide-in-right",
  "slide-in-left",
  "slide-in-top",
  "slide-in-bottom",
  "fade-in",
  "zoom-out",
  "zoom-fade-out",
  "pop-in",
  "none"
];
const ANIMATION_OUT$1 = [
  "slide-out-right",
  "slide-out-left",
  "slide-out-top",
  "slide-out-bottom",
  "fade-out",
  "zoom-in",
  "zoom-fade-in",
  "pop-out",
  "none"
];
const BaseRouteProtocol = {
  url: {
    type: String,
    required: true
  }
};
const API_NAVIGATE_TO = "navigateTo";
const API_REDIRECT_TO = "redirectTo";
const API_RE_LAUNCH = "reLaunch";
const API_SWITCH_TAB = "switchTab";
const API_NAVIGATE_BACK = "navigateBack";
const API_PRELOAD_PAGE = "preloadPage";
const API_UN_PRELOAD_PAGE = "unPreloadPage";
const NavigateToProtocol = /* @__PURE__ */ extend$1(
  {},
  BaseRouteProtocol,
  createAnimationProtocol(ANIMATION_IN$1)
);
const NavigateBackProtocol = /* @__PURE__ */ extend$1(
  {
    delta: {
      type: Number
    }
  },
  createAnimationProtocol(ANIMATION_OUT$1)
);
const ReLaunchProtocol = BaseRouteProtocol;
const SwitchTabProtocol = BaseRouteProtocol;
const NavigateToOptions = /* @__PURE__ */ createRouteOptions(API_NAVIGATE_TO);
const ReLaunchOptions = /* @__PURE__ */ createRouteOptions(API_RE_LAUNCH);
const SwitchTabOptions = /* @__PURE__ */ createRouteOptions(API_SWITCH_TAB);
const NavigateBackOptions = {
  formatArgs: {
    delta(value, params) {
      value = parseInt(value + "") || 1;
      params.delta = Math.min(getCurrentPages$1().length - 1, value);
    }
  }
};
function createAnimationProtocol(animationTypes) {
  return {
    animationType: {
      type: String,
      validator(type) {
        if (type && animationTypes.indexOf(type) === -1) {
          return "`" + type + "` is not supported for `animationType` (supported values are: `" + animationTypes.join("`|`") + "`)";
        }
      }
    },
    animationDuration: {
      type: Number
    }
  };
}
let navigatorLock;
function beforeRoute() {
  navigatorLock = "";
}
function createRouteOptions(type) {
  return {
    formatArgs: {
      url: createNormalizeUrl(type)
    },
    beforeAll: beforeRoute
  };
}
function createNormalizeUrl(type) {
  return function normalizeUrl(url, params) {
    if (!url) {
      return `Missing required args: "url"`;
    }
    url = normalizeRoute(url);
    const pagePath = url.split("?")[0];
    const routeOptions = getRouteOptions(pagePath, true);
    if (!routeOptions) {
      return "page `" + url + "` is not found";
    }
    if (type === API_NAVIGATE_TO || type === API_REDIRECT_TO) {
      if (routeOptions.meta.isTabBar) {
        return `can not ${type} a tabbar page`;
      }
    } else if (type === API_SWITCH_TAB) {
      if (!routeOptions.meta.isTabBar) {
        return "can not switch to no-tabBar page";
      }
    }
    if ((type === API_SWITCH_TAB || type === API_PRELOAD_PAGE) && routeOptions.meta.isTabBar && params.openType !== "appLaunch") {
      url = pagePath;
    }
    if (routeOptions.meta.isEntry) {
      url = url.replace(routeOptions.alias, "/");
    }
    params.url = encodeQueryString(url);
    if (type === API_UN_PRELOAD_PAGE) {
      return;
    } else if (type === API_PRELOAD_PAGE) {
      if (routeOptions.meta.isTabBar) {
        const pages = getCurrentPages$1();
        const tabBarPagePath = routeOptions.path.slice(1);
        if (pages.find((page) => page.route === tabBarPagePath)) {
          return "tabBar page `" + tabBarPagePath + "` already exists";
        }
      }
      return;
    }
    if (navigatorLock === url && params.openType !== "appLaunch") {
      return `${navigatorLock} locked`;
    }
    if (__uniConfig.ready) {
      navigatorLock = url;
    }
  };
}
const API_HIDE_LOADING = "hideLoading";
const API_SHOW_LOADING = "showLoading";
const ShowLoadingProtocol = {
  title: String,
  mask: Boolean
};
const ShowLoadingOptions = {
  formatArgs: {
    title: "",
    mask: false
  }
};
const API_SHOW_MODAL = "showModal";
const ShowModalProtocol = {
  title: String,
  content: String,
  showCancel: Boolean,
  cancelText: String,
  cancelColor: String,
  confirmText: String,
  confirmColor: String
};
const ShowModalOptions = {
  beforeInvoke() {
    initI18nShowModalMsgsOnce();
  },
  formatArgs: {
    title: "",
    content: "",
    placeholderText: "",
    showCancel: true,
    editable: false,
    cancelText(_value, params) {
      if (!hasOwn$1(params, "cancelText")) {
        const { t: t2 } = useI18n();
        params.cancelText = t2("uni.showModal.cancel");
      }
    },
    cancelColor: "#000",
    confirmText(_value, params) {
      if (!hasOwn$1(params, "confirmText")) {
        const { t: t2 } = useI18n();
        params.confirmText = t2("uni.showModal.confirm");
      }
    },
    confirmColor: PRIMARY_COLOR
  }
};
const API_SHOW_TOAST = "showToast";
const SHOW_TOAST_ICON = [
  "success",
  "loading",
  "none",
  "error"
];
const ShowToastProtocol = {
  title: String,
  icon: String,
  image: String,
  duration: Number,
  mask: Boolean
};
const ShowToastOptions = {
  formatArgs: {
    title: "",
    icon(type, params) {
      params.icon = elemInArray(type, SHOW_TOAST_ICON);
    },
    image(value, params) {
      if (value) {
        params.image = getRealPath(value);
      } else {
        params.image = "";
      }
    },
    duration: 1500,
    mask: false
  }
};
const API_STOP_PULL_DOWN_REFRESH = "stopPullDownRefresh";
const IndexOptions = {
  beforeInvoke() {
    const pageMeta = getCurrentPageMeta();
    if (pageMeta && !pageMeta.isTabBar) {
      return "not TabBar page";
    }
  },
  formatArgs: {
    index(value) {
      if (!__uniConfig.tabBar.list[value]) {
        return "tabbar item not found";
      }
    }
  }
};
({
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /* @__PURE__ */ extend$1(
    {
      pagePath(value, params) {
        if (value) {
          params.pagePath = removeLeadingSlash(value);
        }
      }
    },
    IndexOptions.formatArgs
  )
});
({
  beforeInvoke: IndexOptions.beforeInvoke
});
({
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /* @__PURE__ */ extend$1(
    {
      text(value, params) {
        if (getLen(value) >= 4) {
          params.text = "...";
        }
      }
    },
    IndexOptions.formatArgs
  )
});
function removeNonTabBarPages() {
  const curTabBarPageVm = getCurrentPageVm();
  if (!curTabBarPageVm) {
    return;
  }
  const pagesMap = getCurrentPagesMap();
  const keys = pagesMap.keys();
  for (const routeKey of keys) {
    const page = pagesMap.get(routeKey);
    if (!page.$.__isTabBar) {
      removePage(routeKey);
    } else {
      page.$.__isActive = false;
    }
  }
  if (curTabBarPageVm.$.__isTabBar) {
    curTabBarPageVm.$.__isVisible = false;
    invokeHook(curTabBarPageVm, ON_HIDE);
  }
}
function isSamePage(url, $page) {
  return url === $page.fullPath || url === "/" && $page.meta.isEntry;
}
function getTabBarPageId(url) {
  const pages = getCurrentPagesMap().values();
  for (const page of pages) {
    const $page = getPage$BasePage(page);
    if (isSamePage(url, $page)) {
      page.$.__isActive = true;
      return $page.id;
    }
  }
}
const switchTab = /* @__PURE__ */ defineAsyncApi(
  API_SWITCH_TAB,
  // @ts-expect-error
  ({ url, tabBarText, isAutomatedTesting }, { resolve: resolve2, reject }) => {
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      switchTabPagesBeforeEntryPages.push({
        args: { type: API_SWITCH_TAB, url, tabBarText, isAutomatedTesting },
        resolve: resolve2,
        reject
      });
      return;
    }
    return removeNonTabBarPages(), navigate(
      { type: API_SWITCH_TAB, url, tabBarText, isAutomatedTesting },
      getTabBarPageId(url)
    ).then(resolve2).catch(reject);
  },
  SwitchTabProtocol,
  SwitchTabOptions
);
function removeLastPage() {
  const page = getCurrentPage();
  if (!page) {
    return;
  }
  const $page = getPage$BasePage(page);
  removePage(normalizeRouteKey($page.path, $page.id));
}
function removeAllPages() {
  const keys = getCurrentPagesMap().keys();
  for (const routeKey of keys) {
    removePage(routeKey);
  }
}
const reLaunch = /* @__PURE__ */ defineAsyncApi(
  API_RE_LAUNCH,
  // @ts-expect-error
  ({ url, isAutomatedTesting }, { resolve: resolve2, reject }) => {
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      reLaunchPagesBeforeEntryPages.push({
        args: { type: API_RE_LAUNCH, url, isAutomatedTesting },
        resolve: resolve2,
        reject
      });
      return;
    }
    return removeAllPages(), navigate({ type: API_RE_LAUNCH, url, isAutomatedTesting }).then(resolve2).catch(reject);
  },
  ReLaunchProtocol,
  ReLaunchOptions
);
function navigate({ type, url, tabBarText, events, isAutomatedTesting }, __id__) {
  const router2 = getApp$1().$router;
  const { path, query } = parseUrl(url);
  return new Promise((resolve2, reject) => {
    const state2 = createPageState(type, __id__);
    router2[type === "navigateTo" ? "push" : "replace"]({
      path,
      query,
      state: state2,
      force: true
    }).then((failure) => {
      if (isNavigationFailure(failure)) {
        return reject(failure.message);
      }
      if (type === "switchTab") {
        router2.currentRoute.value.meta.tabBarText = tabBarText;
      }
      if (type === "navigateTo") {
        const meta = router2.currentRoute.value.meta;
        if (!meta.eventChannel) {
          meta.eventChannel = new EventChannel(state2.__id__, events);
        } else if (events) {
          Object.keys(events).forEach((eventName) => {
            meta.eventChannel._addListener(
              eventName,
              "on",
              events[eventName]
            );
          });
          meta.eventChannel._clearCache();
        }
        return isAutomatedTesting ? resolve2({
          __id__: state2.__id__
        }) : resolve2({
          eventChannel: meta.eventChannel
        });
      }
      return isAutomatedTesting ? resolve2({ __id__: state2.__id__ }) : resolve2();
    });
  });
}
function handleBeforeEntryPageRoutes() {
  if (entryPageState.handledBeforeEntryPageRoutes) {
    return;
  }
  entryPageState.handledBeforeEntryPageRoutes = true;
  const navigateToPages = [...navigateToPagesBeforeEntryPages];
  navigateToPagesBeforeEntryPages.length = 0;
  navigateToPages.forEach(
    ({ args, resolve: resolve2, reject }) => (
      // @ts-expect-error
      navigate(args).then(resolve2).catch(reject)
    )
  );
  const switchTabPages = [...switchTabPagesBeforeEntryPages];
  switchTabPagesBeforeEntryPages.length = 0;
  switchTabPages.forEach(
    ({ args, resolve: resolve2, reject }) => (removeNonTabBarPages(), navigate(args, getTabBarPageId(args.url)).then(resolve2).catch(reject))
  );
  const redirectToPages = [...redirectToPagesBeforeEntryPages];
  redirectToPagesBeforeEntryPages.length = 0;
  redirectToPages.forEach(
    ({ args, resolve: resolve2, reject }) => (removeLastPage(), navigate(args).then(resolve2).catch(reject))
  );
  const reLaunchPages = [...reLaunchPagesBeforeEntryPages];
  reLaunchPagesBeforeEntryPages.length = 0;
  reLaunchPages.forEach(
    ({ args, resolve: resolve2, reject }) => (removeAllPages(), navigate(args).then(resolve2).catch(reject))
  );
}
function cssSupports(css) {
  const supports = window.CSS && window.CSS.supports;
  return supports && (supports(css) || supports.apply(window.CSS, css.split(":")));
}
const cssEnv = /* @__PURE__ */ cssSupports("top:env(a)");
const cssConstant = /* @__PURE__ */ cssSupports("top:constant(a)");
const envMethod = /* @__PURE__ */ (() => cssEnv ? "env" : cssConstant ? "constant" : "")();
function updateCurPageCssVar(pageMeta) {
  let windowTopValue = 0;
  let windowBottomValue = 0;
  if (pageMeta.navigationBar.style !== "custom" && ["default", "float"].indexOf(pageMeta.navigationBar.type) > -1) {
    windowTopValue = NAVBAR_HEIGHT;
  }
  updatePageCssVar({
    "--window-top": normalizeWindowTop(windowTopValue),
    "--window-bottom": normalizeWindowBottom(windowBottomValue)
  });
}
function normalizeWindowTop(windowTop) {
  return envMethod ? `calc(${windowTop}px + ${envMethod}(safe-area-inset-top))` : `${windowTop}px`;
}
function normalizeWindowBottom(windowBottom) {
  return envMethod ? `calc(${windowBottom}px + ${envMethod}(safe-area-inset-bottom))` : `${windowBottom}px`;
}
const SEP = "$$";
const currentPagesMap = /* @__PURE__ */ new Map();
function getPage$BasePage(page) {
  return page.$page;
}
const entryPageState = {
  handledBeforeEntryPageRoutes: false
};
const navigateToPagesBeforeEntryPages = [];
const switchTabPagesBeforeEntryPages = [];
const redirectToPagesBeforeEntryPages = [];
const reLaunchPagesBeforeEntryPages = [];
function pruneCurrentPages() {
  currentPagesMap.forEach((page, id2) => {
    if (page.$.isUnmounted) {
      currentPagesMap.delete(id2);
    }
  });
}
function getCurrentPagesMap() {
  return currentPagesMap;
}
function getCurrentPages$1() {
  const curPages = getCurrentBasePages();
  return curPages;
}
function getCurrentBasePages() {
  const curPages = [];
  const pages = currentPagesMap.values();
  for (const page of pages) {
    if (page.$.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page);
      }
    } else {
      curPages.push(page);
    }
  }
  return curPages;
}
function removeRouteCache(routeKey) {
  const vnode = pageCacheMap.get(routeKey);
  if (vnode) {
    pageCacheMap.delete(routeKey);
    routeCache.pruneCacheEntry(vnode);
  }
}
function removePage(routeKey, removeRouteCaches = true) {
  const pageVm = currentPagesMap.get(routeKey);
  pageVm.$.__isUnload = true;
  invokeHook(pageVm, ON_UNLOAD);
  currentPagesMap.delete(routeKey);
  removeRouteCaches && removeRouteCache(routeKey);
}
let id = /* @__PURE__ */ getStateId();
function createPageState(type, __id__) {
  return {
    __id__: __id__ || ++id,
    __type__: type
  };
}
function initPublicPage(route) {
  const meta = usePageMeta();
  let fullPath = route.fullPath;
  if (route.meta.isEntry && fullPath.indexOf(route.meta.route) === -1) {
    fullPath = "/" + route.meta.route + fullPath.replace("/", "");
  }
  return initPageInternalInstance("navigateTo", fullPath, {}, meta);
}
function initPage(vm) {
  const route = vm.$route;
  const page = initPublicPage(route);
  initPageVm(vm, page);
  {
    currentPagesMap.set(normalizeRouteKey(page.path, page.id), vm);
    if (currentPagesMap.size === 1) {
      setTimeout(() => {
        handleBeforeEntryPageRoutes();
      }, 0);
    }
  }
}
function normalizeRouteKey(path, id2) {
  return path + SEP + id2;
}
function useKeepAliveRoute() {
  const route = useRoute();
  const routeKey = computed(
    () => normalizeRouteKey("/" + route.meta.route, getStateId())
  );
  const isTabBar = computed(() => route.meta.isTabBar);
  return {
    routeKey,
    isTabBar,
    routeCache
  };
}
const pageCacheMap = /* @__PURE__ */ new Map();
const routeCache = {
  get(key) {
    return pageCacheMap.get(key);
  },
  set(key, value) {
    pruneRouteCache(key);
    pageCacheMap.set(key, value);
  },
  delete(key) {
    const vnode = pageCacheMap.get(key);
    if (!vnode) {
      return;
    }
    pageCacheMap.delete(key);
  },
  forEach(fn) {
    pageCacheMap.forEach(fn);
  }
};
function pruneRouteCache(key) {
  const pageId = parseInt(key.split(SEP)[1]);
  if (!pageId) {
    return;
  }
  routeCache.forEach((vnode, key2) => {
    const cPageId = parseInt(key2.split(SEP)[1]);
    if (cPageId && cPageId > pageId) {
      routeCache.delete(key2);
      routeCache.pruneCacheEntry(vnode);
      nextTick(() => pruneCurrentPages());
    }
  });
}
function updateCurPageAttrs(pageMeta) {
  {
    const nvueDirKey = "nvue-dir-" + __uniConfig.nvue["flex-direction"];
    if (pageMeta.isNVue) {
      document.body.setAttribute("nvue", "");
      document.body.setAttribute(nvueDirKey, "");
    } else {
      document.body.removeAttribute("nvue");
      document.body.removeAttribute(nvueDirKey);
    }
  }
}
function onPageShow(instance2, pageMeta) {
  updateBodyScopeId(instance2);
  updateCurPageCssVar(pageMeta);
  updateCurPageAttrs(pageMeta);
  initPageScrollListener(instance2, pageMeta);
}
function onPageReady(instance2) {
  const scopeId = getScopeId(instance2);
  scopeId && updateCurPageBodyScopeId(scopeId);
}
function updateCurPageBodyScopeId(scopeId) {
  const pageBodyEl = document.querySelector("uni-page-body");
  if (pageBodyEl) {
    pageBodyEl.setAttribute(scopeId, "");
  } else {
    console.warn("uni-page-body not found");
  }
}
function getScopeId(instance2) {
  return instance2.type.__scopeId;
}
let curScopeId;
function updateBodyScopeId(instance2) {
  const scopeId = getScopeId(instance2);
  const { body } = document;
  curScopeId && body.removeAttribute(curScopeId);
  scopeId && body.setAttribute(scopeId, "");
  curScopeId = scopeId;
}
const supportsPassive = /* @__PURE__ */ (() => {
  let supportsPassive2 = false;
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        supportsPassive2 = true;
      }
    });
    window.addEventListener("test-passive", () => {
    }, opts);
  } catch (e2) {
  }
  return supportsPassive2;
})();
const passiveOptions$2 = supportsPassive ? {
  passive: false
} : false;
let curScrollListener;
function initPageScrollListener(instance2, pageMeta) {
  document.removeEventListener("touchmove", disableScrollListener);
  if (curScrollListener) {
    document.removeEventListener("scroll", curScrollListener);
  }
  if (pageMeta.disableScroll) {
    return document.addEventListener(
      "touchmove",
      disableScrollListener,
      passiveOptions$2
    );
  }
  const { onPageScroll, onReachBottom } = instance2;
  const navigationBarTransparent = pageMeta.navigationBar.type === "transparent";
  if (!(onPageScroll == null ? void 0 : onPageScroll.length) && !(onReachBottom == null ? void 0 : onReachBottom.length) && !navigationBarTransparent) {
    return;
  }
  const opts = {};
  const pageId = getPage$BasePage(instance2.proxy).id;
  if (onPageScroll || navigationBarTransparent) {
    opts.onPageScroll = createOnPageScroll(
      pageId,
      onPageScroll,
      navigationBarTransparent
    );
  }
  if (onReachBottom == null ? void 0 : onReachBottom.length) {
    opts.onReachBottomDistance = pageMeta.onReachBottomDistance || ON_REACH_BOTTOM_DISTANCE;
    opts.onReachBottom = () => UniViewJSBridge$1.publishHandler(ON_REACH_BOTTOM, {}, pageId);
  }
  curScrollListener = createScrollListener(opts);
  requestAnimationFrame(
    () => document.addEventListener("scroll", curScrollListener)
  );
}
function createOnPageScroll(pageId, onPageScroll, navigationBarTransparent) {
  return (scrollTop) => {
    if (onPageScroll) {
      UniViewJSBridge$1.publishHandler(ON_PAGE_SCROLL, { scrollTop }, pageId);
    }
    if (navigationBarTransparent) {
      UniViewJSBridge$1.emit(pageId + "." + ON_PAGE_SCROLL, {
        scrollTop
      });
    }
  };
}
function addBase(filePath) {
  const { base: baseUrl } = __uniConfig.router;
  if (addLeadingSlash(filePath).indexOf(baseUrl) === 0) {
    return addLeadingSlash(filePath);
  }
  return baseUrl + filePath;
}
function getRealPath(filePath) {
  const { base, assets } = __uniConfig.router;
  if (base === "./") {
    if (filePath.indexOf("./") === 0 && (filePath.includes("/static/") || filePath.indexOf("./" + (assets || "assets") + "/") === 0)) {
      filePath = filePath.slice(1);
    }
  }
  if (filePath.indexOf("/") === 0) {
    if (filePath.indexOf("//") === 0) {
      filePath = "https:" + filePath;
    } else {
      return addBase(filePath.slice(1));
    }
  }
  if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath) || filePath.indexOf("blob:") === 0) {
    return filePath;
  }
  const pages = getCurrentBasePages();
  if (pages.length) {
    return addBase(
      getRealRoute(
        getPage$BasePage(pages[pages.length - 1]).route,
        filePath
      ).slice(1)
    );
  }
  return filePath;
}
const ua = navigator.userAgent;
const isAndroid = /* @__PURE__ */ /android/i.test(ua);
const isIOS = /* @__PURE__ */ /iphone|ipad|ipod/i.test(ua);
const isWindows = /* @__PURE__ */ ua.match(/Windows NT ([\d|\d.\d]*)/i);
const isMac = /* @__PURE__ */ /Macintosh|Mac/i.test(ua);
const isLinux = /* @__PURE__ */ /Linux|X11/i.test(ua);
const isIPadOS = isMac && navigator.maxTouchPoints > 0;
const isHarmony = /OpenHarmony/i.test(ua);
const isHarmony2in1 = isHarmony && /PC/i.test(ua);
const isHarmonyTablet = isHarmony && /Tablet/i.test(ua);
function getScreenFix() {
  return /^Apple/.test(navigator.vendor) && typeof window.orientation === "number";
}
function isLandscape(screenFix) {
  return screenFix && Math.abs(window.orientation) === 90;
}
function getScreenWidth(screenFix, landscape) {
  return screenFix ? Math[landscape ? "max" : "min"](screen.width, screen.height) : screen.width;
}
function getScreenHeight(screenFix, landscape) {
  return screenFix ? Math[landscape ? "min" : "max"](screen.height, screen.width) : screen.height;
}
function getWindowWidth() {
  const screenFix = getScreenFix();
  if (screenFix) {
    const screenWidth = getScreenWidth(screenFix, isLandscape(screenFix));
    return Math.min(
      window.innerWidth,
      document.documentElement.clientWidth,
      screenWidth
    ) || screenWidth;
  } else {
    return Math.min(window.innerWidth, document.documentElement.clientWidth);
  }
}
function getBaseSystemInfo() {
  const windowWidth = getWindowWidth();
  return {
    platform: isIOS ? "ios" : "other",
    pixelRatio: window.devicePixelRatio,
    windowWidth
  };
}
const files = {};
function urlToFile(url, local) {
  const file = files[url];
  if (file) {
    return Promise.resolve(file);
  }
  if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(url)) {
    return Promise.resolve(base64ToFile(url));
  }
  return new Promise((resolve2, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      resolve2(this.response);
    };
    xhr.onerror = reject;
    xhr.send();
  });
}
function base64ToFile(base64) {
  const base64Array = base64.split(",");
  const res = base64Array[0].match(/:(.*?);/);
  const type = res ? res[1] : "";
  const str = atob(base64Array[1]);
  let n = str.length;
  const array = new Uint8Array(n);
  while (n--) {
    array[n] = str.charCodeAt(n);
  }
  return blobToFile(array, type);
}
function getExtname(type) {
  const extname = type.split("/")[1];
  return extname ? `.${extname}` : "";
}
function blobToFile(blob, type) {
  let file;
  if (blob instanceof File) {
    file = blob;
  } else {
    type = type || blob.type || "";
    const filename = `${Date.now()}${getExtname(type)}`;
    try {
      file = new File([blob], filename, { type });
    } catch (error) {
      blob = blob instanceof Blob ? blob : new Blob([blob], { type });
      file = blob;
      file.name = file.name || filename;
    }
  }
  return file;
}
function fileToUrl(file) {
  for (const key in files) {
    if (hasOwn$1(files, key)) {
      const oldFile = files[key];
      if (oldFile === file) {
        return key;
      }
    }
  }
  var url = (window.URL || window.webkitURL).createObjectURL(file);
  files[url] = file;
  return url;
}
const launchOptions = /* @__PURE__ */ createLaunchOptions();
const enterOptions = /* @__PURE__ */ createLaunchOptions();
function getEnterOptions() {
  return extend$1({}, enterOptions);
}
function initLaunchOptions({
  path,
  query
}) {
  extend$1(launchOptions, {
    path,
    query
  });
  extend$1(enterOptions, launchOptions);
  return extend$1({}, launchOptions);
}
const ResizeSensor = /* @__PURE__ */ defineBuiltInComponent({
  name: "ResizeSensor",
  props: {
    initial: {
      type: Boolean,
      default: false
    }
  },
  emits: ["resize"],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    const reset = useResizeSensorReset(rootRef);
    const update = useResizeSensorUpdate(rootRef, emit2, reset);
    useResizeSensorLifecycle(rootRef, props2, update, reset);
    return () => createVNode("uni-resize-sensor", {
      "ref": rootRef,
      "onAnimationstartOnce": update
    }, [createVNode("div", {
      "onScroll": update
    }, [createVNode("div", null, null)], 40, ["onScroll"]), createVNode("div", {
      "onScroll": update
    }, [createVNode("div", null, null)], 40, ["onScroll"])], 40, ["onAnimationstartOnce"]);
  }
});
function useResizeSensorUpdate(rootRef, emit2, reset) {
  const size2 = reactive({
    width: -1,
    height: -1
  });
  watch(() => extend$1({}, size2), (value) => emit2("resize", value));
  return () => {
    const rootEl = rootRef.value;
    if (!rootEl)
      return;
    const rect = rootEl.getBoundingClientRect();
    size2.width = rect.width;
    size2.height = rect.height;
    reset();
  };
}
function useResizeSensorReset(rootRef) {
  return () => {
    const {
      firstElementChild,
      lastElementChild
    } = rootRef.value;
    firstElementChild.scrollLeft = 1e5;
    firstElementChild.scrollTop = 1e5;
    lastElementChild.scrollLeft = 1e5;
    lastElementChild.scrollTop = 1e5;
  };
}
function useResizeSensorLifecycle(rootRef, props2, update, reset) {
  onActivated(reset);
  onMounted(() => {
    if (props2.initial) {
      nextTick(update);
    }
    const rootEl = rootRef.value;
    if (rootEl.offsetParent !== rootEl.parentElement) {
      rootEl.parentElement.style.position = "relative";
    }
    if (!("AnimationEvent" in window)) {
      reset();
    }
  });
}
let resetTimer;
function iosHideKeyboard() {
}
const props$u = {
  cursorSpacing: {
    type: [Number, String],
    default: 0
  },
  showConfirmBar: {
    type: [Boolean, String],
    default: "auto"
  },
  adjustPosition: {
    type: [Boolean, String],
    default: true
  },
  autoBlur: {
    type: [Boolean, String],
    default: false
  }
};
const emit$1 = ["keyboardheightchange"];
function useKeyboard$1(props2, elRef, trigger2) {
  function initKeyboard(el) {
    const isApple2 = computed(
      () => String(navigator.vendor).indexOf("Apple") === 0
    );
    el.addEventListener("focus", () => {
      clearTimeout(resetTimer);
      document.addEventListener("click", iosHideKeyboard, false);
    });
    const onKeyboardHide = () => {
      document.removeEventListener("click", iosHideKeyboard, false);
      if (isApple2.value) {
        document.documentElement.scrollTo(
          document.documentElement.scrollLeft,
          document.documentElement.scrollTop
        );
      }
    };
    el.addEventListener("blur", () => {
      if (isApple2.value) {
        el.blur();
      }
      onKeyboardHide();
    });
  }
  watch(
    () => elRef.value,
    (el) => el && initKeyboard(el)
  );
}
const props$s = {
  src: {
    type: String,
    default: ""
  },
  mode: {
    type: String,
    default: "scaleToFill"
  },
  lazyLoad: {
    type: [Boolean, String],
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  }
};
const FIX_MODES = {
  widthFix: ["offsetWidth", "height", (value, ratio) => value / ratio],
  heightFix: ["offsetHeight", "width", (value, ratio) => value * ratio]
};
const IMAGE_MODES = {
  aspectFit: ["center center", "contain"],
  aspectFill: ["center center", "cover"],
  widthFix: [, "100% 100%"],
  heightFix: [, "100% 100%"],
  top: ["center top"],
  bottom: ["center bottom"],
  center: ["center center"],
  left: ["left center"],
  right: ["right center"],
  "top left": ["left top"],
  "top right": ["right top"],
  "bottom left": ["left bottom"],
  "bottom right": ["right bottom"]
};
const index$q = /* @__PURE__ */ defineBuiltInComponent({
  name: "Image",
  props: props$s,
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    const state2 = useImageState(rootRef, props2);
    const trigger2 = useCustomEvent(rootRef, emit2);
    const {
      fixSize
    } = useImageSize(rootRef, props2, state2);
    useImageLoader(state2, props2, rootRef, fixSize, trigger2);
    return () => {
      return createVNode("uni-image", {
        "ref": rootRef
      }, [createVNode("div", {
        "style": state2.modeStyle
      }, null, 4), FIX_MODES[props2.mode] ? createVNode(ResizeSensor, {
        "onResize": fixSize
      }, null, 8, ["onResize"]) : createVNode("span", null, null)], 512);
    };
  }
});
function useImageState(rootRef, props2) {
  const imgSrc = ref("");
  const modeStyleRef = computed(() => {
    let size2 = "auto";
    let position = "";
    const opts = IMAGE_MODES[props2.mode];
    if (!opts) {
      position = "0% 0%";
      size2 = "100% 100%";
    } else {
      opts[0] && (position = opts[0]);
      opts[1] && (size2 = opts[1]);
    }
    return `background-image:${imgSrc.value ? 'url("' + imgSrc.value + '")' : "none"};background-position:${position};background-size:${size2};`;
  });
  const state2 = reactive({
    rootEl: rootRef,
    src: computed(() => props2.src ? getRealPath(props2.src) : ""),
    origWidth: 0,
    origHeight: 0,
    origStyle: {
      width: "",
      height: ""
    },
    modeStyle: modeStyleRef,
    imgSrc
  });
  onMounted(() => {
    const rootEl = rootRef.value;
    state2.origWidth = rootEl.clientWidth || 0;
    state2.origHeight = rootEl.clientHeight || 0;
  });
  return state2;
}
function useImageLoader(state2, props2, rootRef, fixSize, trigger2) {
  let img;
  let draggableImg;
  const setState = (width = 0, height = 0, imgSrc = "") => {
    state2.origWidth = width;
    state2.origHeight = height;
    state2.imgSrc = imgSrc;
  };
  const loadImage = (src) => {
    if (!src) {
      resetImage();
      setState();
      return;
    }
    img = img || new Image();
    img.onload = (evt) => {
      const {
        width,
        height
      } = img;
      setState(width, height, src);
      nextTick(() => {
        fixSize();
      });
      img.draggable = props2.draggable;
      if (draggableImg) {
        draggableImg.remove();
      }
      draggableImg = img;
      rootRef.value.appendChild(img);
      resetImage();
      trigger2("load", evt, {
        width,
        height
      });
    };
    img.onerror = (evt) => {
      setState();
      resetImage();
      trigger2("error", evt, {
        errMsg: `GET ${state2.src} 404 (Not Found)`
      });
    };
    img.src = src;
  };
  const resetImage = () => {
    if (img) {
      img.onload = null;
      img.onerror = null;
      img = null;
    }
  };
  watch(() => state2.src, (value) => loadImage(value));
  watch(() => state2.imgSrc, (value) => {
    if (!value && draggableImg) {
      draggableImg.remove();
      draggableImg = null;
    }
  });
  onMounted(() => loadImage(state2.src));
  onBeforeUnmount(() => resetImage());
}
const isChrome = navigator.vendor === "Google Inc.";
function fixNumber(num) {
  if (isChrome && num > 10) {
    num = Math.round(num / 2) * 2;
  }
  return num;
}
function useImageSize(rootRef, props2, state2) {
  const fixSize = () => {
    const {
      mode: mode2
    } = props2;
    const names = FIX_MODES[mode2];
    if (!names) {
      return;
    }
    const {
      origWidth,
      origHeight
    } = state2;
    const ratio = origWidth && origHeight ? origWidth / origHeight : 0;
    if (!ratio) {
      return;
    }
    const rootEl = rootRef.value;
    const value = rootEl[names[0]];
    if (value) {
      rootEl.style[names[1]] = fixNumber(names[2](value, ratio)) + "px";
    }
  };
  const resetSize = () => {
    const {
      style
    } = rootRef.value;
    const {
      origStyle: {
        width,
        height
      }
    } = state2;
    style.width = width;
    style.height = height;
  };
  watch(() => props2.mode, (value, oldValue) => {
    if (FIX_MODES[oldValue]) {
      resetSize();
    }
    if (FIX_MODES[value]) {
      fixSize();
    }
  });
  return {
    fixSize,
    resetSize
  };
}
function throttle(fn, wait) {
  let last = 0;
  let timeout;
  let waitCallback;
  const newFn = function(...arg) {
    const now2 = Date.now();
    clearTimeout(timeout);
    waitCallback = () => {
      waitCallback = null;
      last = now2;
      fn.apply(this, arg);
    };
    if (now2 - last < wait) {
      timeout = setTimeout(waitCallback, wait - (now2 - last));
      return;
    }
    waitCallback();
  };
  newFn.cancel = function() {
    clearTimeout(timeout);
    waitCallback = null;
  };
  newFn.flush = function() {
    clearTimeout(timeout);
    waitCallback && waitCallback();
  };
  return newFn;
}
const passiveOptions$1 = /* @__PURE__ */ passive(true);
const states = [];
let userInteract = 0;
let inited = false;
const setUserAction = (userAction) => states.forEach((vm) => vm.userAction = userAction);
function addInteractListener(vm = { userAction: false }) {
  if (!inited) {
    const eventNames = [
      "touchstart",
      "touchmove",
      "touchend",
      "mousedown",
      "mouseup"
    ];
    eventNames.forEach((eventName) => {
      document.addEventListener(
        eventName,
        function() {
          !userInteract && setUserAction(true);
          userInteract++;
          setTimeout(() => {
            !--userInteract && setUserAction(false);
          }, 0);
        },
        passiveOptions$1
      );
    });
    inited = true;
  }
  states.push(vm);
}
function removeInteractListener(vm) {
  const index2 = states.indexOf(vm);
  if (index2 >= 0) {
    states.splice(index2, 1);
  }
}
const getInteractStatus = () => !!userInteract;
function useUserAction() {
  const state2 = reactive({
    /**
     * 是否用户激活
     */
    userAction: false
  });
  onMounted(() => {
    addInteractListener(state2);
  });
  onBeforeUnmount(() => {
    removeInteractListener(state2);
  });
  return {
    state: state2
  };
}
function useScopedAttrs() {
  const state2 = reactive({
    attrs: {}
  });
  onMounted(() => {
    let instance2 = getCurrentInstance();
    while (instance2) {
      const scopeId = instance2.type.__scopeId;
      if (scopeId) {
        state2.attrs[scopeId] = "";
      }
      instance2 = instance2.proxy && instance2.proxy.$mpType === "page" ? null : instance2.parent;
    }
  });
  return {
    state: state2
  };
}
function useFormField(nameKey, value) {
  const uniForm = inject(
    uniFormKey,
    false
    // remove warning
  );
  if (!uniForm) {
    return;
  }
  const instance2 = getCurrentInstance();
  const ctx = {
    submit() {
      const proxy = instance2.proxy;
      return [
        proxy[nameKey],
        isString(value) ? proxy[value] : value.value
      ];
    },
    reset() {
      if (isString(value)) {
        instance2.proxy[value] = "";
      } else {
        value.value = "";
      }
    }
  };
  uniForm.addField(ctx);
  onBeforeUnmount(() => {
    uniForm.removeField(ctx);
  });
}
function getSelectedTextRange(_, resolve2) {
  const activeElement = document.activeElement;
  if (!activeElement) {
    return resolve2({});
  }
  const data = {};
  if (["input", "textarea"].includes(activeElement.tagName.toLowerCase())) {
    data.start = activeElement.selectionStart;
    data.end = activeElement.selectionEnd;
  }
  resolve2(data);
}
const UniViewJSBridgeSubscribe = function() {
  registerViewMethod(
    getCurrentPageId(),
    "getSelectedTextRange",
    getSelectedTextRange
  );
};
function getValueString(value, type, maxlength) {
  if (type === "number" && isNaN(Number(value))) {
    value = "";
  }
  const valueStr = value === null || value === void 0 ? "" : String(value);
  {
    return valueStr;
  }
}
const INPUT_MODES = [
  "none",
  "text",
  "decimal",
  "numeric",
  "tel",
  "search",
  "email",
  "url"
];
const props$r = /* @__PURE__ */ extend$1(
  {},
  {
    name: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number]
    },
    value: {
      type: [String, Number]
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    /**
     * 已废弃属性，用于历史兼容
     */
    autoFocus: {
      type: [Boolean, String],
      default: false
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    cursor: {
      type: [Number, String],
      default: -1
    },
    selectionStart: {
      type: [Number, String],
      default: -1
    },
    selectionEnd: {
      type: [Number, String],
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    password: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    placeholderClass: {
      type: String,
      default: ""
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    },
    step: {
      type: String,
      default: "0.000000000000000001"
    },
    inputmode: {
      type: String,
      default: void 0,
      validator: (value) => !!~INPUT_MODES.indexOf(value)
    },
    cursorColor: {
      type: String,
      default: ""
    }
  },
  props$u
);
const emit = [
  "input",
  "focus",
  "blur",
  "update:value",
  "update:modelValue",
  "update:focus",
  "compositionstart",
  "compositionupdate",
  "compositionend",
  ...emit$1
];
function useBase(props2, rootRef, emit2) {
  const fieldRef = ref(null);
  const trigger2 = useCustomEvent(rootRef, emit2);
  const selectionStart = computed(() => {
    const selectionStart2 = Number(props2.selectionStart);
    return isNaN(selectionStart2) ? -1 : selectionStart2;
  });
  const selectionEnd = computed(() => {
    const selectionEnd2 = Number(props2.selectionEnd);
    return isNaN(selectionEnd2) ? -1 : selectionEnd2;
  });
  const cursor = computed(() => {
    const cursor2 = Number(props2.cursor);
    return isNaN(cursor2) ? -1 : cursor2;
  });
  const maxlength = computed(() => {
    var maxlength2 = Number(props2.maxlength);
    {
      return isNaN(maxlength2) ? 140 : maxlength2;
    }
  });
  let value = "";
  {
    value = getValueString(props2.modelValue, props2.type) || getValueString(props2.value, props2.type);
  }
  const state2 = reactive({
    value,
    valueOrigin: value,
    maxlength,
    focus: props2.focus,
    composing: false,
    selectionStart,
    selectionEnd,
    cursor
  });
  watch(
    () => state2.focus,
    (val) => emit2("update:focus", val)
  );
  watch(
    () => state2.maxlength,
    (val) => state2.value = state2.value.slice(0, val),
    {
      immediate: false
    }
  );
  return {
    fieldRef,
    state: state2,
    trigger: trigger2
  };
}
function useValueSync(props2, state2, emit2, trigger2, fieldRef) {
  let lastUserInputValue = null;
  let valueChangeFn = null;
  {
    valueChangeFn = debounce(
      (val) => {
        const fieldElement = fieldRef.value;
        const newValue = getValueString(val, props2.type);
        if (fieldElement && document.activeElement === fieldElement && newValue === lastUserInputValue) {
          return;
        }
        state2.value = newValue;
      },
      100,
      { setTimeout, clearTimeout }
    );
  }
  watch(() => props2.modelValue, valueChangeFn);
  watch(() => props2.value, valueChangeFn);
  const triggerInputFn = throttle((event, detail) => {
    valueChangeFn.cancel();
    emit2("update:modelValue", detail.value);
    emit2("update:value", detail.value);
    trigger2("input", event, detail);
  }, 100);
  const triggerInput = (event, detail, force) => {
    valueChangeFn.cancel();
    lastUserInputValue = detail.value;
    triggerInputFn(event, detail);
    if (force) {
      triggerInputFn.flush();
    }
  };
  onBeforeMount(() => {
    valueChangeFn.cancel();
    triggerInputFn.cancel();
  });
  return {
    trigger: trigger2,
    triggerInput
  };
}
function useAutoFocus(props2, fieldRef) {
  useUserAction();
  const needFocus = computed(() => props2.autoFocus || props2.focus);
  function focus() {
    if (!needFocus.value) {
      return;
    }
    const field = fieldRef.value;
    if (!field || false) {
      setTimeout(focus, 100);
      return;
    }
    {
      field.focus();
    }
  }
  function blur() {
    const field = fieldRef.value;
    if (field) {
      field.blur();
    }
  }
  watch(
    () => props2.focus,
    (value) => {
      if (value) {
        focus();
      } else {
        blur();
      }
    }
  );
  onMounted(() => {
    if (needFocus.value) {
      nextTick(focus);
    }
  });
}
function useEvent(fieldRef, state2, props2, trigger2, triggerInput, beforeInput) {
  function checkSelection() {
    const field = fieldRef.value;
    if (field && state2.focus && state2.selectionStart > -1 && state2.selectionEnd > -1 && field.type !== "number") {
      field.selectionStart = state2.selectionStart;
      field.selectionEnd = state2.selectionEnd;
    }
  }
  function checkCursor() {
    const field = fieldRef.value;
    if (field && state2.focus && state2.selectionStart < 0 && state2.selectionEnd < 0 && state2.cursor > -1 && field.type !== "number") {
      field.selectionEnd = field.selectionStart = state2.cursor;
    }
  }
  function getFieldSelectionEnd(field) {
    if (field.type === "number") {
      return null;
    } else {
      return field.selectionEnd;
    }
  }
  function initField() {
    const field = fieldRef.value;
    if (!field)
      return;
    const onFocus = function(event) {
      state2.focus = true;
      trigger2("focus", event, {
        value: state2.value
      });
      checkSelection();
      checkCursor();
    };
    const onInput = function(event, force) {
      event.stopPropagation();
      if (isFunction(beforeInput) && beforeInput(event, state2) === false) {
        return;
      }
      state2.value = field.value;
      if (!state2.composing || !props2.ignoreCompositionEvent) {
        triggerInput(
          event,
          {
            value: field.value,
            cursor: getFieldSelectionEnd(field)
          },
          force
        );
      }
    };
    const onBlur = function(event) {
      if (state2.composing) {
        state2.composing = false;
        onInput(event, true);
      }
      state2.focus = false;
      trigger2("blur", event, {
        value: state2.value,
        cursor: getFieldSelectionEnd(event.target)
      });
    };
    field.addEventListener("change", (event) => event.stopPropagation());
    field.addEventListener("focus", onFocus);
    field.addEventListener("blur", onBlur);
    field.addEventListener("input", onInput);
    field.addEventListener("compositionstart", (event) => {
      event.stopPropagation();
      state2.composing = true;
      _onComposition(event);
    });
    field.addEventListener("compositionend", (event) => {
      event.stopPropagation();
      if (state2.composing) {
        state2.composing = false;
        onInput(event);
      }
      _onComposition(event);
    });
    field.addEventListener("compositionupdate", _onComposition);
    function _onComposition(event) {
      if (!props2.ignoreCompositionEvent) {
        trigger2(event.type, event, {
          value: event.data
        });
      }
    }
  }
  watch([() => state2.selectionStart, () => state2.selectionEnd], checkSelection);
  watch(() => state2.cursor, checkCursor);
  watch(() => fieldRef.value, initField);
}
function useField(props2, rootRef, emit2, beforeInput) {
  UniViewJSBridgeSubscribe();
  const { fieldRef, state: state2, trigger: trigger2 } = useBase(props2, rootRef, emit2);
  const { triggerInput } = useValueSync(props2, state2, emit2, trigger2, fieldRef);
  useAutoFocus(props2, fieldRef);
  useKeyboard$1(props2, fieldRef);
  const { state: scopedAttrsState } = useScopedAttrs();
  useFormField("name", state2);
  useEvent(fieldRef, state2, props2, trigger2, triggerInput, beforeInput);
  const fixDisabledColor = String(navigator.vendor).indexOf("Apple") === 0 && CSS.supports("image-orientation:from-image");
  return {
    fieldRef,
    state: state2,
    scopedAttrsState,
    fixDisabledColor,
    trigger: trigger2
  };
}
const resolveDigitDecimalPointDeleteContentBackward = once(() => {
  {
    const ua2 = navigator.userAgent;
    let osVersion = "";
    const osVersionFind = ua2.match(/OS\s([\w_]+)\slike/);
    if (osVersionFind) {
      osVersion = osVersionFind[1].replace(/_/g, ".");
    } else if (/Macintosh|Mac/i.test(ua2) && navigator.maxTouchPoints > 0) {
      const versionMatched = ua2.match(/Version\/(\S*)\b/);
      if (versionMatched) {
        osVersion = versionMatched[1];
      }
    }
    return !!osVersion && parseInt(osVersion) >= 16 && parseFloat(osVersion) < 17.2;
  }
});
function resolveDigitDecimalPoint(event, cache, state2, input, resetCache) {
  if (cache.value) {
    if (event.data === ".") {
      if (cache.value.slice(-1) === ".") {
        state2.value = input.value = cache.value = cache.value.slice(0, -1);
        return false;
      }
      if (cache.value && !cache.value.includes(".") && cache.value === input.value) {
        cache.value += ".";
        if (resetCache) {
          resetCache.fn = () => {
            state2.value = input.value = cache.value = cache.value.slice(0, -1);
            input.removeEventListener("blur", resetCache.fn);
          };
          input.addEventListener("blur", resetCache.fn);
        }
        return false;
      }
    } else if (event.inputType === "deleteContentBackward") {
      if (resolveDigitDecimalPointDeleteContentBackward()) {
        if (cache.value.slice(-2, -1) === ".") {
          cache.value = state2.value = input.value = cache.value.slice(0, -2);
          return true;
        }
      }
    }
  }
}
const props$q = /* @__PURE__ */ extend$1({}, props$r, {
  placeholderClass: {
    type: String,
    default: "input-placeholder"
  },
  textContentType: {
    type: String,
    default: ""
  }
});
function isPaste(event) {
  return event.inputType === "insertFromPaste";
}
function useCache(props2, type) {
  if (type.value === "number") {
    const value = typeof props2.modelValue === "undefined" ? props2.value : props2.modelValue;
    const cache = ref(typeof value !== "undefined" && value !== null ? value.toLocaleString() : "");
    watch(() => props2.modelValue, (value2) => {
      cache.value = typeof value2 !== "undefined" && value2 !== null ? value2.toLocaleString() : "";
    });
    watch(() => props2.value, (value2) => {
      cache.value = typeof value2 !== "undefined" && value2 !== null ? value2.toLocaleString() : "";
    });
    return cache;
  } else {
    return ref("");
  }
}
const Input = /* @__PURE__ */ defineBuiltInComponent({
  name: "Input",
  props: props$q,
  emits: ["confirm", ...emit],
  setup(props2, {
    emit: emit2,
    expose
  }) {
    const INPUT_TYPES = ["text", "number", "idcard", "digit", "password", "tel"];
    const AUTOCOMPLETES = ["off", "one-time-code"];
    const type = computed(() => {
      let type2 = "";
      switch (props2.type) {
        case "text":
          type2 = "text";
          if (props2.confirmType === "search") {
            type2 = "search";
          }
          break;
        case "idcard":
          type2 = "text";
          break;
        case "digit":
          type2 = "number";
          break;
        case "none":
          type2 = "text";
          break;
        default:
          type2 = INPUT_TYPES.includes(props2.type) ? props2.type : "text";
          break;
      }
      return props2.password ? "password" : type2;
    });
    const autocomplete = computed(() => {
      const camelizeIndex = AUTOCOMPLETES.indexOf(props2.textContentType);
      const kebabCaseIndex = AUTOCOMPLETES.indexOf(hyphenate(props2.textContentType));
      const index2 = camelizeIndex !== -1 ? camelizeIndex : kebabCaseIndex !== -1 ? kebabCaseIndex : 0;
      return AUTOCOMPLETES[index2];
    });
    const inputmode = computed(() => {
      if (props2.inputmode !== void 0) {
        return props2.inputmode;
      }
      if (INPUT_MODES.includes(props2.type)) {
        return props2.type;
      }
      let inputmodeMap = {};
      {
        inputmodeMap = {
          idcard: "text"
        };
      }
      return inputmodeMap[props2.type];
    });
    let cache = useCache(props2, type);
    let resetCache = {
      fn: null
    };
    const rootRef = ref(null);
    const {
      fieldRef,
      state: state2,
      scopedAttrsState,
      fixDisabledColor,
      trigger: trigger2
    } = useField(props2, rootRef, emit2, (event, state22) => {
      const input = event.target;
      if (type.value === "number") {
        if (resetCache.fn) {
          input.removeEventListener("blur", resetCache.fn);
          resetCache.fn = null;
        }
        if (input.validity && !input.validity.valid) {
          if ((!cache.value || !input.value) && event.data === "-" || cache.value[0] === "-" && event.inputType === "deleteContentBackward") {
            cache.value = "-";
            state22.value = "";
            resetCache.fn = () => {
              cache.value = input.value = "";
            };
            input.addEventListener("blur", resetCache.fn);
            return false;
          }
          const res = resolveDigitDecimalPoint(event, cache, state22, input, resetCache);
          if (typeof res === "boolean")
            return res;
          cache.value = state22.value = input.value = cache.value === "-" ? "" : cache.value;
          return false;
        } else {
          const res = resolveDigitDecimalPoint(event, cache, state22, input, resetCache);
          if (typeof res === "boolean")
            return res;
          cache.value = input.value;
        }
        if (state22.maxlength > 0 && input.value.length > state22.maxlength && !isPaste(event)) {
          input.value = cache.value = state22.value;
          return false;
        }
      }
    });
    watch(() => state2.value, (value) => {
      if (props2.type === "number" && !(cache.value === "-" && value === "")) {
        cache.value = value.toString();
      }
    });
    watch(() => props2.maxlength, (length) => {
      length = parseInt(length, 10);
      const realValue = state2.value.slice(0, length);
      realValue !== state2.value && (state2.value = realValue);
    });
    const NUMBER_TYPES = ["number", "digit"];
    const step = computed(() => NUMBER_TYPES.includes(props2.type) ? props2.step : "");
    function onKeyUpEnter(event) {
      if (event.key !== "Enter") {
        return;
      }
      const input = event.target;
      event.stopPropagation();
      trigger2("confirm", event, {
        value: input.value
      });
      !props2.confirmHold && input.blur();
    }
    expose({
      $triggerInput: (detail) => {
        emit2("update:modelValue", detail.value);
        emit2("update:value", detail.value);
        state2.value = detail.value;
      }
    });
    return () => {
      let inputNode = props2.disabled && fixDisabledColor ? createVNode("input", {
        "key": "disabled-input",
        "ref": fieldRef,
        "value": state2.value,
        "tabindex": "-1",
        "readonly": !!props2.disabled,
        "type": type.value,
        "maxlength": state2.maxlength,
        "step": step.value,
        "class": "uni-input-input",
        "style": props2.cursorColor ? {
          caretColor: props2.cursorColor
        } : {},
        "inputmode": inputmode.value,
        "onFocus": (event) => event.target.blur()
      }, null, 44, ["value", "readonly", "type", "maxlength", "step", "inputmode", "onFocus"]) : createVNode("input", {
        "key": "input",
        "ref": fieldRef,
        "value": state2.value,
        "onInput": withModifiers((event) => {
          const value = event.target.value.toString();
          if (type.value === "number" && state2.maxlength > 0 && value.length > state2.maxlength) {
            if (isPaste(event)) {
              state2.value = value.slice(0, state2.maxlength);
            }
            return;
          }
          if (value.length === 0 && event.inputType === "insertText" && event.data === ".") {
            return;
          }
          state2.value = value;
        }, ["stop"]),
        "disabled": !!props2.disabled,
        "type": type.value,
        "maxlength": state2.maxlength,
        "step": step.value,
        "enterkeyhint": props2.confirmType,
        "pattern": props2.type === "number" ? "[0-9]*" : void 0,
        "class": "uni-input-input",
        "style": props2.cursorColor ? {
          caretColor: props2.cursorColor
        } : {},
        "autocomplete": autocomplete.value,
        "onKeyup": onKeyUpEnter,
        "inputmode": inputmode.value
      }, null, 44, ["value", "onInput", "disabled", "type", "maxlength", "step", "enterkeyhint", "pattern", "autocomplete", "onKeyup", "inputmode"]);
      return createVNode("uni-input", {
        "ref": rootRef
      }, [createVNode("div", {
        "class": "uni-input-wrapper"
      }, [withDirectives(createVNode("div", mergeProps(scopedAttrsState.attrs, {
        "style": props2.placeholderStyle,
        "class": ["uni-input-placeholder", props2.placeholderClass]
      }), [props2.placeholder], 16), [[vShow, !(state2.value.length || cache.value === "-" || cache.value.includes("."))]]), props2.confirmType === "search" ? createVNode("form", {
        "action": "",
        "onSubmit": (event) => event.preventDefault(),
        "class": "uni-input-form"
      }, [inputNode], 40, ["onSubmit"]) : inputNode])], 512);
    };
  }
});
function flatVNode(nodes) {
  const array = [];
  if (isArray$1(nodes)) {
    nodes.forEach((vnode) => {
      if (isVNode(vnode)) {
        if (vnode.type === Fragment) {
          array.push(...flatVNode(vnode.children));
        } else {
          array.push(vnode);
        }
      } else if (isArray$1(vnode)) {
        array.push(...flatVNode(vnode));
      }
    });
  }
  return array;
}
const addListenerToElement = function(element, type, callback, capture) {
  element.addEventListener(
    type,
    ($event) => {
      if (isFunction(callback)) {
        if (callback($event) === false) {
          if (typeof $event.cancelable !== "undefined" ? $event.cancelable : true) {
            $event.preventDefault();
          }
          $event.stopPropagation();
        }
      }
    },
    {
      passive: false
    }
  );
};
let __mouseMoveEventListener;
let __mouseUpEventListener;
function useTouchtrack(element, method, useCancel) {
  onBeforeUnmount(() => {
    document.removeEventListener("mousemove", __mouseMoveEventListener);
    document.removeEventListener("mouseup", __mouseUpEventListener);
  });
  let x0 = 0;
  let y0 = 0;
  let x1 = 0;
  let y1 = 0;
  const fn = function($event, state2, x, y) {
    if (method({
      // @ts-expect-error
      cancelable: $event.cancelable,
      target: $event.target,
      currentTarget: $event.currentTarget,
      preventDefault: $event.preventDefault.bind($event),
      stopPropagation: $event.stopPropagation.bind($event),
      touches: $event.touches,
      changedTouches: $event.changedTouches,
      detail: {
        state: state2,
        x,
        y,
        dx: x - x0,
        dy: y - y0,
        ddx: x - x1,
        ddy: y - y1,
        timeStamp: $event.timeStamp
      }
    }) === false) {
      return false;
    }
  };
  let $eventOld = null;
  let hasTouchStart;
  let hasMouseDown;
  addListenerToElement(element, "touchstart", function($event) {
    hasTouchStart = true;
    if ($event.touches.length === 1 && !$eventOld) {
      $eventOld = $event;
      x0 = x1 = $event.touches[0].pageX;
      y0 = y1 = $event.touches[0].pageY;
      return fn($event, "start", x0, y0);
    }
  });
  addListenerToElement(element, "mousedown", function($event) {
    hasMouseDown = true;
    if (!hasTouchStart && !$eventOld) {
      $eventOld = $event;
      x0 = x1 = $event.pageX;
      y0 = y1 = $event.pageY;
      return fn($event, "start", x0, y0);
    }
  });
  addListenerToElement(element, "touchmove", function($event) {
    if ($event.touches.length === 1 && $eventOld) {
      const res = fn(
        $event,
        "move",
        $event.touches[0].pageX,
        $event.touches[0].pageY
      );
      x1 = $event.touches[0].pageX;
      y1 = $event.touches[0].pageY;
      return res;
    }
  });
  const mouseMoveEventListener = __mouseMoveEventListener = function($event) {
    if (!hasTouchStart && hasMouseDown && $eventOld) {
      const res = fn($event, "move", $event.pageX, $event.pageY);
      x1 = $event.pageX;
      y1 = $event.pageY;
      return res;
    }
  };
  document.addEventListener("mousemove", mouseMoveEventListener);
  addListenerToElement(element, "touchend", function($event) {
    if ($event.touches.length === 0 && $eventOld) {
      hasTouchStart = false;
      $eventOld = null;
      return fn(
        $event,
        "end",
        $event.changedTouches[0].pageX,
        $event.changedTouches[0].pageY
      );
    }
  });
  const mouseUpEventListener = __mouseUpEventListener = function($event) {
    hasMouseDown = false;
    if (!hasTouchStart && $eventOld) {
      $eventOld = null;
      return fn($event, "end", $event.pageX, $event.pageY);
    }
  };
  document.addEventListener("mouseup", mouseUpEventListener);
  addListenerToElement(element, "touchcancel", function($event) {
    if ($eventOld) {
      hasTouchStart = false;
      const $eventTemp = $eventOld;
      $eventOld = null;
      return fn(
        $event,
        "cancel",
        $eventTemp.touches[0].pageX,
        $eventTemp.touches[0].pageY
      );
    }
  });
}
const pickerViewProps = {
  value: {
    type: Array,
    default() {
      return [];
    },
    validator: function(val) {
      return isArray$1(val) && val.filter((val2) => typeof val2 === "number").length === val.length;
    }
  },
  indicatorStyle: {
    type: String,
    default: ""
  },
  indicatorClass: {
    type: String,
    default: ""
  },
  maskStyle: {
    type: String,
    default: ""
  },
  maskClass: {
    type: String,
    default: ""
  }
};
function useState$4(props2) {
  const value = reactive([...props2.value]);
  const state2 = reactive({
    value,
    height: 34
  });
  watch(() => props2.value, (val, oldVal) => {
    {
      state2.value.length = val.length;
      val.forEach((val2, index2) => {
        if (val2 !== state2.value[index2]) {
          state2.value.splice(index2, 1, val2);
        }
      });
    }
  });
  return state2;
}
const PickerView = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerView",
  props: pickerViewProps,
  emits: ["change", "pickstart", "pickend", "update:value"],
  setup(props2, {
    slots,
    emit: emit2
  }) {
    const rootRef = ref(null);
    const wrapperRef = ref(null);
    const trigger2 = useCustomEvent(rootRef, emit2);
    const state2 = useState$4(props2);
    const resizeSensorRef = ref(null);
    const onMountedCallback = () => {
      const resizeSensor = resizeSensorRef.value;
      resizeSensor && (state2.height = resizeSensor.$el.offsetHeight);
    };
    {
      onMounted(onMountedCallback);
    }
    let ColumnsPreRef = ref([]);
    let columnsRef = ref([]);
    function getItemIndex(vnode) {
      let columnVNodes = columnsRef.value;
      {
        columnVNodes = columnVNodes.filter((vnode2) => vnode2.type !== Comment);
      }
      let index2 = columnVNodes.indexOf(vnode);
      return index2 !== -1 ? index2 : ColumnsPreRef.value.indexOf(vnode);
    }
    const getPickerViewColumn = function(columnInstance) {
      const ref2 = computed({
        get() {
          const index2 = getItemIndex(columnInstance.vnode);
          return state2.value[index2] || 0;
        },
        set(current) {
          const index2 = getItemIndex(columnInstance.vnode);
          if (index2 < 0) {
            return;
          }
          const oldCurrent = state2.value[index2];
          if (oldCurrent !== current) {
            state2.value[index2] = current;
            const value = state2.value.map((val) => val);
            emit2("update:value", value);
            trigger2("change", {}, {
              value
            });
          }
        }
      });
      return ref2;
    };
    provide("getPickerViewColumn", getPickerViewColumn);
    provide("pickerViewProps", props2);
    provide("pickerViewState", state2);
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        const vnode = flatVNode(defaultSlots);
        ColumnsPreRef.value = vnode;
        nextTick(() => {
          columnsRef.value = vnode;
        });
      }
      return createVNode("uni-picker-view", {
        "ref": rootRef
      }, [createVNode(ResizeSensor, {
        "ref": resizeSensorRef,
        "onResize": ({
          height
        }) => state2.height = height
      }, null, 8, ["onResize"]), createVNode("div", {
        "ref": wrapperRef,
        "class": "uni-picker-view-wrapper"
      }, [defaultSlots], 512)], 512);
    };
  }
});
class Friction {
  constructor(drag) {
    this._drag = drag;
    this._dragLog = Math.log(drag);
    this._x = 0;
    this._v = 0;
    this._startTime = 0;
  }
  set(x, v2) {
    this._x = x;
    this._v = v2;
    this._startTime = (/* @__PURE__ */ new Date()).getTime();
  }
  setVelocityByEnd(e2) {
    this._v = (e2 - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1);
  }
  x(e2) {
    if (e2 === void 0) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    const t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
    this._dt = e2;
    return this._x + this._v * t2 / this._dragLog - this._v / this._dragLog;
  }
  dx(e2) {
    if (e2 === void 0) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    const t2 = e2 === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e2);
    this._dt = e2;
    return this._v * t2;
  }
  done() {
    return Math.abs(this.dx()) < 3;
  }
  reconfigure(e2) {
    const t2 = this.x();
    const n = this.dx();
    this._drag = e2;
    this._dragLog = Math.log(e2);
    this.set(t2, n);
  }
  configuration() {
    const e2 = this;
    return [
      {
        label: "Friction",
        read: function() {
          return e2._drag;
        },
        write: function(t2) {
          e2.reconfigure(t2);
        },
        min: 1e-3,
        max: 0.1,
        step: 1e-3
      }
    ];
  }
}
function o(e2, t2, n) {
  return e2 > t2 - n && e2 < t2 + n;
}
function a(e2, t2) {
  return o(e2, 0, t2);
}
class Spring {
  constructor(m, k, c) {
    this._m = m;
    this._k = k;
    this._c = c;
    this._solution = null;
    this._endPosition = 0;
    this._startTime = 0;
  }
  _solve(e2, t2) {
    const n = this._c;
    const i = this._m;
    const r = this._k;
    const o2 = n * n - 4 * i * r;
    if (o2 === 0) {
      const a3 = -n / (2 * i);
      const s2 = e2;
      const l2 = t2 / (a3 * e2);
      return {
        x: function(e22) {
          return (s2 + l2 * e22) * Math.pow(Math.E, a3 * e22);
        },
        dx: function(e22) {
          const t22 = Math.pow(Math.E, a3 * e22);
          return a3 * (s2 + l2 * e22) * t22 + l2 * t22;
        }
      };
    }
    if (o2 > 0) {
      const c = (-n - Math.sqrt(o2)) / (2 * i);
      const u = (-n + Math.sqrt(o2)) / (2 * i);
      const l2 = (t2 - c * e2) / (u - c);
      const s2 = e2 - l2;
      return {
        x: function(e22) {
          let t22;
          let n2;
          if (e22 === this._t) {
            t22 = this._powER1T;
            n2 = this._powER2T;
          }
          this._t = e22;
          if (!t22) {
            t22 = this._powER1T = Math.pow(Math.E, c * e22);
          }
          if (!n2) {
            n2 = this._powER2T = Math.pow(Math.E, u * e22);
          }
          return s2 * t22 + l2 * n2;
        },
        dx: function(e22) {
          let t22;
          let n2;
          if (e22 === this._t) {
            t22 = this._powER1T;
            n2 = this._powER2T;
          }
          this._t = e22;
          if (!t22) {
            t22 = this._powER1T = Math.pow(Math.E, c * e22);
          }
          if (!n2) {
            n2 = this._powER2T = Math.pow(Math.E, u * e22);
          }
          return s2 * c * t22 + l2 * u * n2;
        }
      };
    }
    const d = Math.sqrt(4 * i * r - n * n) / (2 * i);
    const a2 = -n / 2 * i;
    const s = e2;
    const l = (t2 - a2 * e2) / d;
    return {
      x: function(e22) {
        return Math.pow(Math.E, a2 * e22) * (s * Math.cos(d * e22) + l * Math.sin(d * e22));
      },
      dx: function(e22) {
        const t22 = Math.pow(Math.E, a2 * e22);
        const n2 = Math.cos(d * e22);
        const i2 = Math.sin(d * e22);
        return t22 * (l * d * n2 - s * d * i2) + a2 * t22 * (l * i2 + s * n2);
      }
    };
  }
  x(e2) {
    if (e2 === void 0) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    return this._solution ? this._endPosition + this._solution.x(e2) : 0;
  }
  dx(e2) {
    if (e2 === void 0) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    return this._solution ? this._solution.dx(e2) : 0;
  }
  setEnd(e2, t2, n) {
    if (!n) {
      n = (/* @__PURE__ */ new Date()).getTime();
    }
    if (e2 !== this._endPosition || !a(t2, 0.4)) {
      t2 = t2 || 0;
      let i = this._endPosition;
      if (this._solution) {
        if (a(t2, 0.4)) {
          t2 = this._solution.dx((n - this._startTime) / 1e3);
        }
        i = this._solution.x((n - this._startTime) / 1e3);
        if (a(t2, 0.4)) {
          t2 = 0;
        }
        if (a(i, 0.4)) {
          i = 0;
        }
        i += this._endPosition;
      }
      if (!(this._solution && a(i - e2, 0.4) && a(t2, 0.4))) {
        this._endPosition = e2;
        this._solution = this._solve(i - this._endPosition, t2);
        this._startTime = n;
      }
    }
  }
  snap(e2) {
    this._startTime = (/* @__PURE__ */ new Date()).getTime();
    this._endPosition = e2;
    this._solution = {
      x: function() {
        return 0;
      },
      dx: function() {
        return 0;
      }
    };
  }
  done(e2) {
    if (!e2) {
      e2 = (/* @__PURE__ */ new Date()).getTime();
    }
    return o(this.x(), this._endPosition, 0.4) && a(this.dx(), 0.4);
  }
  reconfigure(e2, t2, n) {
    this._m = e2;
    this._k = t2;
    this._c = n;
    if (!this.done()) {
      this._solution = this._solve(this.x() - this._endPosition, this.dx());
      this._startTime = (/* @__PURE__ */ new Date()).getTime();
    }
  }
  springConstant() {
    return this._k;
  }
  damping() {
    return this._c;
  }
  configuration() {
    function e2(e22, t22) {
      e22.reconfigure(1, t22, e22.damping());
    }
    function t2(e22, t22) {
      e22.reconfigure(1, e22.springConstant(), t22);
    }
    return [
      {
        label: "Spring Constant",
        read: this.springConstant.bind(this),
        write: e2.bind(this, this),
        min: 100,
        max: 1e3
      },
      {
        label: "Damping",
        read: this.damping.bind(this),
        write: t2.bind(this, this),
        min: 1,
        max: 500
      }
    ];
  }
}
class Scroll {
  constructor(extent, friction, spring) {
    this._extent = extent;
    this._friction = friction || new Friction(0.01);
    this._spring = spring || new Spring(1, 90, 20);
    this._startTime = 0;
    this._springing = false;
    this._springOffset = 0;
  }
  snap(e2, t2) {
    this._springOffset = 0;
    this._springing = true;
    this._spring.snap(e2);
    this._spring.setEnd(t2);
  }
  set(e2, t2) {
    this._friction.set(e2, t2);
    if (e2 > 0 && t2 >= 0) {
      this._springOffset = 0;
      this._springing = true;
      this._spring.snap(e2);
      this._spring.setEnd(0);
    } else {
      if (e2 < -this._extent && t2 <= 0) {
        this._springOffset = 0;
        this._springing = true;
        this._spring.snap(e2);
        this._spring.setEnd(-this._extent);
      } else {
        this._springing = false;
      }
    }
    this._startTime = (/* @__PURE__ */ new Date()).getTime();
  }
  x(e2) {
    if (!this._startTime) {
      return 0;
    }
    if (!e2) {
      e2 = ((/* @__PURE__ */ new Date()).getTime() - this._startTime) / 1e3;
    }
    if (this._springing) {
      return this._spring.x() + this._springOffset;
    }
    let t2 = this._friction.x(e2);
    let n = this.dx(e2);
    if (t2 > 0 && n >= 0 || t2 < -this._extent && n <= 0) {
      this._springing = true;
      this._spring.setEnd(0, n);
      if (t2 < -this._extent) {
        this._springOffset = -this._extent;
      } else {
        this._springOffset = 0;
      }
      t2 = this._spring.x() + this._springOffset;
    }
    return t2;
  }
  dx(e2) {
    let t2;
    if (this._lastTime === e2) {
      t2 = this._lastDx;
    } else {
      t2 = this._springing ? this._spring.dx(e2) : this._friction.dx(e2);
    }
    this._lastTime = e2;
    this._lastDx = t2;
    return t2;
  }
  done() {
    return this._springing ? this._spring.done() : this._friction.done();
  }
  setVelocityByEnd(e2) {
    this._friction.setVelocityByEnd(e2);
  }
  configuration() {
    const e2 = this._friction.configuration();
    e2.push.apply(e2, this._spring.configuration());
    return e2;
  }
}
function calculateSnapIndex(position, itemSize) {
  return Math.round(Math.abs(position) / itemSize);
}
function createAnimation(scroll, onScroll, onEnd) {
  const state2 = {
    id: 0,
    cancelled: false
  };
  function startAnimation2(state22, scroll2, onScroll2, onEnd2) {
    if (!state22 || !state22.cancelled) {
      onScroll2(scroll2);
      const isDone = scroll2.done();
      if (!isDone) {
        if (!state22.cancelled) {
          state22.id = requestAnimationFrame(
            startAnimation2.bind(null, state22, scroll2, onScroll2, onEnd2)
          );
        }
      }
      if (isDone && onEnd2) {
        onEnd2(scroll2);
      }
    }
  }
  function cancel(state22) {
    if (state22 && state22.id) {
      cancelAnimationFrame(state22.id);
    }
    if (state22) {
      state22.cancelled = true;
    }
  }
  startAnimation2(state2, scroll, onScroll, onEnd);
  return {
    cancel: cancel.bind(null, state2),
    model: scroll
  };
}
class Scroller {
  constructor(element, options) {
    options = options || {};
    this._element = element;
    this._options = options;
    this._enableSnap = options.enableSnap || false;
    this._itemSize = options.itemSize || 0;
    this._enableX = options.enableX || false;
    this._enableY = options.enableY || false;
    this._shouldDispatchScrollEvent = !!options.onScroll;
    if (this._enableX) {
      this._extent = (options.scrollWidth || this._element.offsetWidth) - this._element.parentElement.offsetWidth;
      this._scrollWidth = options.scrollWidth;
    } else {
      this._extent = (options.scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight;
      this._scrollHeight = options.scrollHeight;
    }
    this._position = 0;
    this._scroll = new Scroll(this._extent, options.friction, options.spring);
    this._onTransitionEnd = this.onTransitionEnd.bind(this);
    this.updatePosition();
  }
  onTouchStart() {
    this._startPosition = this._position;
    this._lastChangePos = this._startPosition;
    if (this._startPosition > 0) {
      this._startPosition /= 0.5;
    } else {
      if (this._startPosition < -this._extent) {
        this._startPosition = (this._startPosition + this._extent) / 0.5 - this._extent;
      }
    }
    if (this._animation) {
      this._animation.cancel();
      this._scrolling = false;
    }
    this.updatePosition();
  }
  onTouchMove(x, y) {
    let startPosition = this._startPosition;
    if (this._enableX) {
      startPosition += x;
    } else if (this._enableY) {
      startPosition += y;
    }
    if (startPosition > 0) {
      startPosition *= 0.5;
    } else if (startPosition < -this._extent) {
      startPosition = 0.5 * (startPosition + this._extent) - this._extent;
    }
    this._position = startPosition;
    this.updatePosition();
    this.dispatchScroll();
  }
  onTouchEnd(x, y, o2) {
    if (this._enableSnap && this._position > -this._extent && this._position < 0) {
      if (this._enableY && (Math.abs(y) < this._itemSize && Math.abs(o2.y) < 300 || Math.abs(o2.y) < 150)) {
        this.snap();
        return;
      }
      if (this._enableX && (Math.abs(x) < this._itemSize && Math.abs(o2.x) < 300 || Math.abs(o2.x) < 150)) {
        this.snap();
        return;
      }
    }
    if (this._enableX) {
      this._scroll.set(this._position, o2.x);
    } else if (this._enableY) {
      this._scroll.set(this._position, o2.y);
    }
    let c;
    if (this._enableSnap) {
      const s = this._scroll._friction.x(100);
      const l = s % this._itemSize;
      c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;
      if (c <= 0 && c >= -this._extent) {
        this._scroll.setVelocityByEnd(c);
      }
    }
    this._lastTime = Date.now();
    this._lastDelay = 0;
    this._scrolling = true;
    this._lastChangePos = this._position;
    this._lastIdx = calculateSnapIndex(this._position, this._itemSize);
    this._animation = createAnimation(
      this._scroll,
      () => {
        const e2 = Date.now();
        const i = (e2 - this._scroll._startTime) / 1e3;
        const r = this._scroll.x(i);
        this._position = r;
        this.updatePosition();
        const o22 = this._scroll.dx(i);
        if (this._shouldDispatchScrollEvent && e2 - this._lastTime > this._lastDelay) {
          this.dispatchScroll();
          this._lastDelay = Math.abs(2e3 / o22);
          this._lastTime = e2;
        }
      },
      () => {
        if (this._enableSnap) {
          if (c <= 0 && c >= -this._extent) {
            this._position = c;
            this.updatePosition();
          }
          if (isFunction(this._options.onSnap)) {
            this._options.onSnap(
              calculateSnapIndex(this._position, this._itemSize)
            );
          }
        }
        if (this._shouldDispatchScrollEvent) {
          this.dispatchScroll();
        }
        this._scrolling = false;
      }
    );
  }
  onTransitionEnd() {
    this._element.style.webkitTransition = "";
    this._element.style.transition = "";
    this._element.removeEventListener("transitionend", this._onTransitionEnd);
    if (this._snapping) {
      this._snapping = false;
    }
    this.dispatchScroll();
  }
  snap() {
    const itemSize = this._itemSize;
    const position = this._position % itemSize;
    const i = Math.abs(position) > this._itemSize / 2 ? this._position - (itemSize - Math.abs(position)) : this._position - position;
    if (this._position !== i) {
      this._snapping = true;
      this.scrollTo(-i);
      if (isFunction(this._options.onSnap)) {
        this._options.onSnap(
          Math.round(Math.abs(this._position) / this._itemSize)
        );
      }
    }
  }
  scrollTo(position, time) {
    if (this._animation) {
      this._animation.cancel();
      this._scrolling = false;
    }
    if (typeof position === "number") {
      this._position = -position;
    }
    if (this._position < -this._extent) {
      this._position = -this._extent;
    } else {
      if (this._position > 0) {
        this._position = 0;
      }
    }
    const transition = "transform " + (time || 0.2) + "s ease-out";
    this._element.style.webkitTransition = "-webkit-" + transition;
    this._element.style.transition = transition;
    this.updatePosition();
    this._element.addEventListener("transitionend", this._onTransitionEnd);
  }
  dispatchScroll() {
    if (isFunction(this._options.onScroll) && Math.round(Number(this._lastPos)) !== Math.round(this._position)) {
      this._lastPos = this._position;
      const event = {
        target: {
          scrollLeft: this._enableX ? -this._position : 0,
          scrollTop: this._enableY ? -this._position : 0,
          scrollHeight: this._scrollHeight || this._element.offsetHeight,
          scrollWidth: this._scrollWidth || this._element.offsetWidth,
          offsetHeight: this._element.parentElement.offsetHeight,
          offsetWidth: this._element.parentElement.offsetWidth
        }
      };
      this._options.onScroll(event);
    }
  }
  update(height, scrollHeight, itemSize) {
    let extent = 0;
    const position = this._position;
    if (this._enableX) {
      extent = this._element.childNodes.length ? (scrollHeight || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0;
      this._scrollWidth = scrollHeight;
    } else {
      extent = this._element.childNodes.length ? (scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0;
      this._scrollHeight = scrollHeight;
    }
    if (typeof height === "number") {
      this._position = -height;
    }
    if (this._position < -extent) {
      this._position = -extent;
    } else {
      if (this._position > 0) {
        this._position = 0;
      }
    }
    this._itemSize = itemSize || this._itemSize;
    this.updatePosition();
    if (position !== this._position) {
      this.dispatchScroll();
      if (isFunction(this._options.onSnap)) {
        this._options.onSnap(
          Math.round(Math.abs(this._position) / this._itemSize)
        );
      }
    }
    this._extent = extent;
    this._scroll._extent = extent;
  }
  updatePosition() {
    let transform = "";
    if (this._enableX) {
      transform = "translateX(" + this._position + "px) translateZ(0)";
    } else {
      if (this._enableY) {
        transform = "translateY(" + this._position + "px) translateZ(0)";
      }
    }
    this._element.style.webkitTransform = transform;
    this._element.style.transform = transform;
  }
  isScrolling() {
    return this._scrolling || this._snapping;
  }
}
function useScroller(element, options) {
  const touchInfo = {
    trackingID: -1,
    maxDy: 0,
    maxDx: 0
  };
  const scroller = new Scroller(element, options);
  function findDelta(event) {
    const touchtrackEvent = event;
    const mouseEvent = event;
    return touchtrackEvent.detail.state === "move" || touchtrackEvent.detail.state === "end" ? {
      x: touchtrackEvent.detail.dx,
      y: touchtrackEvent.detail.dy
    } : {
      x: mouseEvent.screenX - touchInfo.x,
      y: mouseEvent.screenY - touchInfo.y
    };
  }
  function handleTouchStart(event) {
    const touchtrackEvent = event;
    const mouseEvent = event;
    if (touchtrackEvent.detail.state === "start") {
      touchInfo.trackingID = "touch";
      touchInfo.x = touchtrackEvent.detail.x;
      touchInfo.y = touchtrackEvent.detail.y;
    } else {
      touchInfo.trackingID = "mouse";
      touchInfo.x = mouseEvent.screenX;
      touchInfo.y = mouseEvent.screenY;
    }
    touchInfo.maxDx = 0;
    touchInfo.maxDy = 0;
    touchInfo.historyX = [0];
    touchInfo.historyY = [0];
    touchInfo.historyTime = [
      touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp
    ];
    touchInfo.listener = scroller;
    if (scroller.onTouchStart) {
      scroller.onTouchStart();
    }
    if (typeof event.cancelable !== "boolean" || event.cancelable)
      event.preventDefault();
  }
  function handleTouchMove(event) {
    const touchtrackEvent = event;
    const mouseEvent = event;
    if (touchInfo.trackingID !== -1) {
      if (typeof event.cancelable !== "boolean" || event.cancelable)
        event.preventDefault();
      const delta = findDelta(event);
      if (delta) {
        for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)), touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)), touchInfo.historyX.push(delta.x), touchInfo.historyY.push(delta.y), touchInfo.historyTime.push(
          touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp
        ); touchInfo.historyTime.length > 10; ) {
          touchInfo.historyTime.shift();
          touchInfo.historyX.shift();
          touchInfo.historyY.shift();
        }
        if (touchInfo.listener && touchInfo.listener.onTouchMove) {
          touchInfo.listener.onTouchMove(delta.x, delta.y);
        }
      }
    }
  }
  function handleTouchEnd(event) {
    if (touchInfo.trackingID !== -1) {
      event.preventDefault();
      const delta = findDelta(event);
      if (delta) {
        const listener2 = touchInfo.listener;
        touchInfo.trackingID = -1;
        touchInfo.listener = null;
        const length = touchInfo.historyTime.length;
        const o2 = {
          x: 0,
          y: 0
        };
        if (length > 2) {
          for (let i = touchInfo.historyTime.length - 1, time1 = touchInfo.historyTime[i], x = touchInfo.historyX[i], y = touchInfo.historyY[i]; i > 0; ) {
            i--;
            const time0 = touchInfo.historyTime[i];
            const time = time1 - time0;
            if (time > 30 && time < 50) {
              o2.x = (x - touchInfo.historyX[i]) / (time / 1e3);
              o2.y = (y - touchInfo.historyY[i]) / (time / 1e3);
              break;
            }
          }
        }
        touchInfo.historyTime = [];
        touchInfo.historyX = [];
        touchInfo.historyY = [];
        if (listener2 && listener2.onTouchEnd) {
          listener2.onTouchEnd(delta.x, delta.y, o2);
        }
      }
    }
  }
  return {
    scroller,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}
function useCustomClick(dom) {
  const MAX_MOVE = 20;
  let x = 0;
  let y = 0;
  dom.addEventListener("touchstart", (event) => {
    const info = event.changedTouches[0];
    x = info.clientX;
    y = info.clientY;
  });
  dom.addEventListener("touchend", (event) => {
    const info = event.changedTouches[0];
    if (Math.abs(info.clientX - x) < MAX_MOVE && Math.abs(info.clientY - y) < MAX_MOVE) {
      const options = {
        bubbles: true,
        cancelable: true,
        target: event.target,
        currentTarget: event.currentTarget
      };
      const customClick = new CustomEvent("click", options);
      const props2 = ["screenX", "screenY", "clientX", "clientY", "pageX", "pageY"];
      props2.forEach((key) => {
        customClick[key] = info[key];
      });
      event.target.dispatchEvent(customClick);
    }
  });
}
const PickerViewColumn = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerViewColumn",
  setup(props2, {
    slots,
    emit: emit2
  }) {
    const rootRef = ref(null);
    const contentRef = ref(null);
    const getPickerViewColumn = inject("getPickerViewColumn");
    const instance2 = getCurrentInstance();
    const currentRef = getPickerViewColumn ? getPickerViewColumn(instance2) : ref(0);
    const pickerViewProps2 = inject("pickerViewProps");
    const pickerViewState = inject("pickerViewState");
    const indicatorHeight = ref(34);
    const resizeSensorRef = ref(null);
    const initIndicatorHeight = () => {
      const resizeSensor = resizeSensorRef.value;
      indicatorHeight.value = resizeSensor.$el.getBoundingClientRect().height;
    };
    {
      onMounted(initIndicatorHeight);
    }
    const maskSize = computed(() => (pickerViewState.height - indicatorHeight.value) / 2);
    const {
      state: scopedAttrsState
    } = useScopedAttrs();
    let scroller;
    const state2 = reactive({
      current: currentRef.value,
      length: 0
    });
    let updatesScrollerRequest;
    function updatesScroller() {
      if (scroller && !updatesScrollerRequest) {
        updatesScrollerRequest = true;
        nextTick(() => {
          updatesScrollerRequest = false;
          let current = Math.min(state2.current, state2.length - 1);
          current = Math.max(current, 0);
          scroller.update(current * indicatorHeight.value, void 0, indicatorHeight.value);
        });
      }
    }
    watch(() => currentRef.value, (current) => {
      if (current !== state2.current) {
        state2.current = current;
        updatesScroller();
      }
    });
    watch(() => state2.current, (current) => currentRef.value = current);
    watch([() => indicatorHeight.value, () => state2.length, () => pickerViewState.height], updatesScroller);
    let oldDeltaY = 0;
    function handleWheel(event) {
      const deltaY = oldDeltaY + event.deltaY;
      if (Math.abs(deltaY) > 10) {
        oldDeltaY = 0;
        let current = Math.min(state2.current + (deltaY < 0 ? -1 : 1), state2.length - 1);
        state2.current = current = Math.max(current, 0);
        scroller.scrollTo(current * indicatorHeight.value);
      } else {
        oldDeltaY = deltaY;
      }
      event.preventDefault();
    }
    function handleTap({
      clientY
    }) {
      const el = rootRef.value;
      if (!scroller.isScrolling()) {
        const rect = el.getBoundingClientRect();
        const r = clientY - rect.top - pickerViewState.height / 2;
        const o2 = indicatorHeight.value / 2;
        if (!(Math.abs(r) <= o2)) {
          const a2 = Math.ceil((Math.abs(r) - o2) / indicatorHeight.value);
          const s = r < 0 ? -a2 : a2;
          let current = Math.min(state2.current + s, state2.length - 1);
          state2.current = current = Math.max(current, 0);
          scroller.scrollTo(current * indicatorHeight.value);
        }
      }
    }
    const initScroller = () => {
      const el = rootRef.value;
      const content = contentRef.value;
      const {
        scroller: scrollerOrigin,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
      } = useScroller(content, {
        enableY: true,
        enableX: false,
        enableSnap: true,
        itemSize: indicatorHeight.value,
        friction: new Friction(1e-4),
        spring: new Spring(2, 90, 20),
        onSnap: (index2) => {
          if (!isNaN(index2) && index2 !== state2.current) {
            state2.current = index2;
          }
        }
      });
      scroller = scrollerOrigin;
      useTouchtrack(el, (e2) => {
        switch (e2.detail.state) {
          case "start":
            handleTouchStart(e2);
            break;
          case "move":
            handleTouchMove(e2);
            e2.stopPropagation();
            break;
          case "end":
          case "cancel":
            handleTouchEnd(e2);
        }
      });
      useCustomClick(el);
      updatesScroller();
    };
    {
      onMounted(initScroller);
    }
    return () => {
      const defaultSlots = slots.default && slots.default();
      {
        state2.length = flatVNode(defaultSlots).length;
      }
      const padding = `${maskSize.value}px 0`;
      return createVNode("uni-picker-view-column", {
        "ref": rootRef
      }, [createVNode("div", {
        "onWheel": handleWheel,
        "onClick": handleTap,
        "class": "uni-picker-view-group"
      }, [createVNode("div", mergeProps(scopedAttrsState.attrs, {
        "class": ["uni-picker-view-mask", pickerViewProps2.maskClass],
        "style": `background-size: 100% ${maskSize.value}px;${pickerViewProps2.maskStyle}`
      }), null, 16), createVNode("div", mergeProps(scopedAttrsState.attrs, {
        "class": ["uni-picker-view-indicator", pickerViewProps2.indicatorClass],
        "style": pickerViewProps2.indicatorStyle
      }), [createVNode(ResizeSensor, {
        "ref": resizeSensorRef,
        "onResize": ({
          height
        }) => indicatorHeight.value = height
      }, null, 8, ["onResize"])], 16), createVNode("div", {
        "ref": contentRef,
        "class": ["uni-picker-view-content"],
        "style": {
          padding,
          "--picker-view-column-indicator-height": `${indicatorHeight.value}px`
        }
      }, [defaultSlots], 4)], 40, ["onWheel", "onClick"])], 512);
    };
  }
});
const Refresher = /* @__PURE__ */ defineBuiltInComponent({
  name: "Refresher",
  props: {
    refreshState: {
      type: String,
      default: ""
    },
    refresherHeight: {
      type: Number,
      default: 0
    },
    refresherThreshold: {
      type: Number,
      default: 45
    },
    refresherDefaultStyle: {
      type: String,
      default: "black"
    },
    refresherBackground: {
      type: String,
      default: "#fff"
    }
  },
  setup(props2, {
    slots
  }) {
    const rootRef = ref(null);
    const rootStyle = computed(() => {
      const style = {
        backgroundColor: props2.refresherBackground
      };
      switch (props2.refreshState) {
        case "pulling":
          style.height = props2.refresherHeight + "px";
          break;
        case "refreshing":
          style.height = props2.refresherThreshold + "px";
          style.transition = "height 0.3s";
          break;
        case "":
        case "refresherabort":
        case "restore":
          style.height = "0px";
          style.transition = "height 0.3s";
          break;
      }
      return style;
    });
    const refreshRotate = computed(() => {
      const route = props2.refresherHeight / props2.refresherThreshold;
      return (route > 1 ? 1 : route) * 360;
    });
    return () => {
      const {
        refreshState,
        refresherDefaultStyle,
        refresherThreshold
      } = props2;
      return createVNode("div", {
        "ref": rootRef,
        "style": rootStyle.value,
        "class": "uni-scroll-view-refresher"
      }, [refresherDefaultStyle !== "none" ? createVNode("div", {
        "class": "uni-scroll-view-refresh"
      }, [createVNode("div", {
        "class": "uni-scroll-view-refresh-inner"
      }, [refreshState == "pulling" ? createVNode("svg", {
        "key": "refresh__icon",
        "style": {
          transform: "rotate(" + refreshRotate.value + "deg)"
        },
        "fill": "#2BD009",
        "class": "uni-scroll-view-refresh__icon",
        "width": "24",
        "height": "24",
        "viewBox": "0 0 24 24"
      }, [createVNode("path", {
        "d": "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
      }, null), createVNode("path", {
        "d": "M0 0h24v24H0z",
        "fill": "none"
      }, null)], 4) : null, refreshState == "refreshing" ? createVNode("svg", {
        "key": "refresh__spinner",
        "class": "uni-scroll-view-refresh__spinner",
        "width": "24",
        "height": "24",
        "viewBox": "25 25 50 50"
      }, [createVNode("circle", {
        "cx": "50",
        "cy": "50",
        "r": "20",
        "fill": "none",
        "style": "color: #2bd009",
        "stroke-width": "3"
      }, null)]) : null])]) : null, refresherDefaultStyle === "none" ? createVNode("div", {
        "class": "uni-scroll-view-refresher-container",
        "style": {
          height: `${refresherThreshold}px`
        }
      }, [slots.default && slots.default()]) : null], 4);
    };
  }
});
const passiveOptions = /* @__PURE__ */ passive(true);
const props$m = {
  direction: {
    type: [String],
    default: "vertical"
  },
  scrollX: {
    type: [Boolean, String],
    default: false
  },
  scrollY: {
    type: [Boolean, String],
    default: false
  },
  showScrollbar: {
    type: [Boolean, String],
    default: true
  },
  upperThreshold: {
    type: [Number, String],
    default: 50
  },
  lowerThreshold: {
    type: [Number, String],
    default: 50
  },
  scrollTop: {
    type: [Number, String],
    default: 0
  },
  scrollLeft: {
    type: [Number, String],
    default: 0
  },
  scrollIntoView: {
    type: String,
    default: ""
  },
  scrollWithAnimation: {
    type: [Boolean, String],
    default: false
  },
  enableBackToTop: {
    type: [Boolean, String],
    default: false
  },
  refresherEnabled: {
    type: [Boolean, String],
    default: false
  },
  refresherThreshold: {
    type: Number,
    default: 45
  },
  refresherDefaultStyle: {
    type: String,
    default: "black"
  },
  refresherBackground: {
    type: String,
    default: "#fff"
  },
  refresherTriggered: {
    type: [Boolean, String],
    default: false
  }
};
const ScrollView = /* @__PURE__ */ defineBuiltInComponent({
  name: "ScrollView",
  compatConfig: {
    MODE: 3
  },
  props: props$m,
  emits: ["scroll", "scrolltoupper", "scrolltolower", "refresherrefresh", "refresherrestore", "refresherpulling", "refresherabort", "update:refresherTriggered"],
  setup(props2, {
    emit: emit2,
    slots,
    expose
  }) {
    const rootRef = ref(null);
    const main = ref(null);
    const wrap = ref(null);
    const content = ref(null);
    const trigger2 = useCustomEvent(rootRef, emit2);
    const {
      state: state2,
      scrollTopNumber,
      scrollLeftNumber
    } = useScrollViewState(props2);
    const {
      realScrollX,
      realScrollY
    } = useScrollViewLoader(props2, state2, scrollTopNumber, scrollLeftNumber, trigger2, rootRef, main, content, emit2);
    const mainStyle = computed(() => {
      let style = "";
      realScrollX.value ? style += "overflow-x:auto;" : style += "overflow-x:hidden;";
      realScrollY.value ? style += "overflow-y:auto;" : style += "overflow-y:hidden;";
      return style;
    });
    const scrollBarClassName = computed(() => {
      let className = "uni-scroll-view";
      if (props2.showScrollbar === false) {
        className += " uni-scroll-view-scrollbar-hidden";
      }
      return className;
    });
    expose({
      // 自动化测试需要暴露main从而获取scrollLeft
      $getMain() {
        return main.value;
      }
    });
    return () => {
      const {
        refresherEnabled,
        refresherBackground,
        refresherDefaultStyle,
        refresherThreshold
      } = props2;
      const {
        refresherHeight,
        refreshState
      } = state2;
      return createVNode("uni-scroll-view", {
        "ref": rootRef
      }, [createVNode("div", {
        "ref": wrap,
        "class": "uni-scroll-view"
      }, [createVNode("div", {
        "ref": main,
        "style": mainStyle.value,
        "class": scrollBarClassName.value
      }, [refresherEnabled ? createVNode(Refresher, {
        "refreshState": refreshState,
        "refresherHeight": refresherHeight,
        "refresherThreshold": refresherThreshold,
        "refresherDefaultStyle": refresherDefaultStyle,
        "refresherBackground": refresherBackground
      }, {
        default: () => [refresherDefaultStyle == "none" ? slots.refresher && slots.refresher() : null]
      }, 8, ["refreshState", "refresherHeight", "refresherThreshold", "refresherDefaultStyle", "refresherBackground"]) : null, createVNode("div", {
        "ref": content,
        "class": "uni-scroll-view-content"
      }, [slots.default && slots.default()], 512)], 6)], 512)], 512);
    };
  }
});
function useScrollViewState(props2) {
  const scrollTopNumber = computed(() => {
    return Number(props2.scrollTop) || 0;
  });
  const scrollLeftNumber = computed(() => {
    return Number(props2.scrollLeft) || 0;
  });
  const state2 = reactive({
    lastScrollTop: scrollTopNumber.value,
    lastScrollLeft: scrollLeftNumber.value,
    lastScrollToUpperTime: 0,
    lastScrollToLowerTime: 0,
    refresherHeight: 0,
    refreshState: ""
  });
  return {
    state: state2,
    scrollTopNumber,
    scrollLeftNumber
  };
}
function useScrollViewLoader(props2, state2, scrollTopNumber, scrollLeftNumber, trigger2, rootRef, main, content, emit2) {
  let beforeRefreshing = false;
  let toUpperNumber = 0;
  let triggerAbort = false;
  let __transitionEnd = () => {
  };
  const realScrollX = computed(() => {
    return props2.scrollX;
  });
  const realScrollY = computed(() => {
    return props2.scrollY;
  });
  const upperThresholdNumber = computed(() => {
    let val = Number(props2.upperThreshold);
    return isNaN(val) ? 50 : val;
  });
  const lowerThresholdNumber = computed(() => {
    let val = Number(props2.lowerThreshold);
    return isNaN(val) ? 50 : val;
  });
  function scrollTo2(scrollToValue, direction2) {
    const container = main.value;
    let transformValue = 0;
    let transform = "";
    scrollToValue < 0 ? scrollToValue = 0 : direction2 === "x" && scrollToValue > container.scrollWidth - container.offsetWidth ? scrollToValue = container.scrollWidth - container.offsetWidth : direction2 === "y" && scrollToValue > container.scrollHeight - container.offsetHeight && (scrollToValue = container.scrollHeight - container.offsetHeight);
    direction2 === "x" ? transformValue = container.scrollLeft - scrollToValue : direction2 === "y" && (transformValue = container.scrollTop - scrollToValue);
    if (transformValue === 0)
      return;
    let _content = content.value;
    _content.style.transition = "transform .3s ease-out";
    _content.style.webkitTransition = "-webkit-transform .3s ease-out";
    if (direction2 === "x") {
      transform = "translateX(" + transformValue + "px) translateZ(0)";
    } else {
      direction2 === "y" && (transform = "translateY(" + transformValue + "px) translateZ(0)");
    }
    _content.removeEventListener("transitionend", __transitionEnd);
    _content.removeEventListener("webkitTransitionEnd", __transitionEnd);
    __transitionEnd = () => _transitionEnd(scrollToValue, direction2);
    _content.addEventListener("transitionend", __transitionEnd);
    _content.addEventListener("webkitTransitionEnd", __transitionEnd);
    if (direction2 === "x") {
      container.style.overflowX = "hidden";
    } else if (direction2 === "y") {
      container.style.overflowY = "hidden";
    }
    _content.style.transform = transform;
    _content.style.webkitTransform = transform;
  }
  function _handleScroll($event) {
    const target = $event.target;
    trigger2("scroll", $event, {
      scrollLeft: target.scrollLeft,
      scrollTop: target.scrollTop,
      scrollHeight: target.scrollHeight,
      scrollWidth: target.scrollWidth,
      deltaX: state2.lastScrollLeft - target.scrollLeft,
      deltaY: state2.lastScrollTop - target.scrollTop
    });
    if (realScrollY.value) {
      if (target.scrollTop <= upperThresholdNumber.value && state2.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - state2.lastScrollToUpperTime > 200) {
        trigger2("scrolltoupper", $event, {
          direction: "top"
        });
        state2.lastScrollToUpperTime = $event.timeStamp;
      }
      if (target.scrollTop + target.offsetHeight + lowerThresholdNumber.value >= target.scrollHeight && state2.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - state2.lastScrollToLowerTime > 200) {
        trigger2("scrolltolower", $event, {
          direction: "bottom"
        });
        state2.lastScrollToLowerTime = $event.timeStamp;
      }
    }
    if (realScrollX.value) {
      if (target.scrollLeft <= upperThresholdNumber.value && state2.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - state2.lastScrollToUpperTime > 200) {
        trigger2("scrolltoupper", $event, {
          direction: "left"
        });
        state2.lastScrollToUpperTime = $event.timeStamp;
      }
      if (target.scrollLeft + target.offsetWidth + lowerThresholdNumber.value >= target.scrollWidth && state2.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - state2.lastScrollToLowerTime > 200) {
        trigger2("scrolltolower", $event, {
          direction: "right"
        });
        state2.lastScrollToLowerTime = $event.timeStamp;
      }
    }
    state2.lastScrollTop = target.scrollTop;
    state2.lastScrollLeft = target.scrollLeft;
  }
  function _scrollTopChanged(val) {
    if (realScrollY.value) {
      {
        if (props2.scrollWithAnimation) {
          scrollTo2(val, "y");
        } else {
          main.value.scrollTop = val;
        }
      }
    }
  }
  function _scrollLeftChanged(val) {
    if (realScrollX.value) {
      {
        if (props2.scrollWithAnimation) {
          scrollTo2(val, "x");
        } else {
          main.value.scrollLeft = val;
        }
      }
    }
  }
  function _scrollIntoViewChanged(val) {
    if (val) {
      if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
        console.error(`id error: scroll-into-view=${val}`);
        return;
      }
      let element = rootRef.value.querySelector("#" + val);
      if (element) {
        let mainRect = main.value.getBoundingClientRect();
        let elRect = element.getBoundingClientRect();
        if (realScrollX.value) {
          let left = elRect.left - mainRect.left;
          let scrollLeft = main.value.scrollLeft;
          let x = scrollLeft + left;
          if (props2.scrollWithAnimation) {
            scrollTo2(x, "x");
          } else {
            main.value.scrollLeft = x;
          }
        }
        if (realScrollY.value) {
          let top = elRect.top - mainRect.top;
          let scrollTop = main.value.scrollTop;
          let y = scrollTop + top;
          if (props2.scrollWithAnimation) {
            scrollTo2(y, "y");
          } else {
            main.value.scrollTop = y;
          }
        }
      }
    }
  }
  function _transitionEnd(val, direction2) {
    content.value.style.transition = "";
    content.value.style.webkitTransition = "";
    content.value.style.transform = "";
    content.value.style.webkitTransform = "";
    let _main = main.value;
    if (direction2 === "x") {
      _main.style.overflowX = realScrollX.value ? "auto" : "hidden";
      _main.scrollLeft = val;
    } else if (direction2 === "y") {
      _main.style.overflowY = realScrollY.value ? "auto" : "hidden";
      _main.scrollTop = val;
    }
    content.value.removeEventListener("transitionend", __transitionEnd);
    content.value.removeEventListener("webkitTransitionEnd", __transitionEnd);
  }
  function _setRefreshState(_state) {
    if (!props2.refresherEnabled)
      return;
    switch (_state) {
      case "refreshing":
        state2.refresherHeight = props2.refresherThreshold;
        if (!beforeRefreshing) {
          beforeRefreshing = true;
          trigger2("refresherpulling", {}, {
            deltaY: state2.refresherHeight,
            dy: state2.refresherHeight
          });
          trigger2("refresherrefresh", {}, {
            dy: touchEnd.y - touchStart.y
          });
          emit2("update:refresherTriggered", true);
        }
        break;
      case "restore":
      case "refresherabort":
        beforeRefreshing = false;
        state2.refresherHeight = toUpperNumber = 0;
        if (_state === "restore") {
          triggerAbort = false;
          trigger2("refresherrestore", {}, {
            dy: touchEnd.y - touchStart.y
          });
        }
        if (_state === "refresherabort" && triggerAbort) {
          triggerAbort = false;
          trigger2("refresherabort", {}, {
            dy: touchEnd.y - touchStart.y
          });
        }
        break;
    }
    state2.refreshState = _state;
  }
  let touchStart = {
    x: 0,
    y: 0
  };
  let touchEnd = {
    y: props2.refresherThreshold
  };
  onMounted(() => {
    nextTick(() => {
      _scrollTopChanged(scrollTopNumber.value);
      _scrollLeftChanged(scrollLeftNumber.value);
    });
    _scrollIntoViewChanged(props2.scrollIntoView);
    let __handleScroll = function(event) {
      event.preventDefault();
      event.stopPropagation();
      _handleScroll(event);
    };
    let needStop = null;
    let __handleTouchMove = function(event) {
      if (touchStart === null)
        return;
      let x = event.touches[0].pageX;
      let y = event.touches[0].pageY;
      let _main = main.value;
      if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
        if (realScrollX.value) {
          if (_main.scrollLeft === 0 && x > touchStart.x) {
            needStop = false;
            return;
          } else if (_main.scrollWidth === _main.offsetWidth + _main.scrollLeft && x < touchStart.x) {
            needStop = false;
            return;
          }
          needStop = true;
        } else {
          needStop = false;
        }
      } else {
        if (realScrollY.value) {
          if (_main.scrollTop === 0 && y > touchStart.y) {
            needStop = false;
            if (props2.refresherEnabled && event.cancelable !== false)
              event.preventDefault();
          } else if (_main.scrollHeight === _main.offsetHeight + _main.scrollTop && y < touchStart.y) {
            needStop = false;
            return;
          } else {
            needStop = true;
          }
        } else {
          needStop = false;
        }
      }
      if (needStop) {
        event.stopPropagation();
      }
      if (_main.scrollTop === 0 && event.touches.length === 1) {
        _setRefreshState("pulling");
      }
      if (props2.refresherEnabled && state2.refreshState === "pulling") {
        const dy = y - touchStart.y;
        if (toUpperNumber === 0) {
          toUpperNumber = y;
        }
        if (!beforeRefreshing) {
          state2.refresherHeight = y - toUpperNumber;
          if (state2.refresherHeight > 0) {
            triggerAbort = true;
            trigger2("refresherpulling", event, {
              deltaY: dy,
              dy
            });
          }
        } else {
          state2.refresherHeight = dy + props2.refresherThreshold;
          triggerAbort = false;
        }
      }
    };
    let __handleTouchStart = function(event) {
      if (event.touches.length === 1) {
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        };
      }
    };
    let __handleTouchEnd = function(event) {
      touchEnd = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
      };
      if (state2.refresherHeight >= props2.refresherThreshold) {
        _setRefreshState("refreshing");
      } else {
        _setRefreshState("refresherabort");
      }
      touchStart = {
        x: 0,
        y: 0
      };
      touchEnd = {
        x: 0,
        y: props2.refresherThreshold
      };
    };
    main.value.addEventListener("touchstart", __handleTouchStart, passiveOptions);
    main.value.addEventListener("touchmove", __handleTouchMove, passive(false));
    main.value.addEventListener("scroll", __handleScroll, passive(false));
    main.value.addEventListener("touchend", __handleTouchEnd, passiveOptions);
    onBeforeUnmount(() => {
      main.value.removeEventListener("touchstart", __handleTouchStart);
      main.value.removeEventListener("touchmove", __handleTouchMove);
      main.value.removeEventListener("scroll", __handleScroll);
      main.value.removeEventListener("touchend", __handleTouchEnd);
    });
  });
  onActivated(() => {
    realScrollY.value && (main.value.scrollTop = state2.lastScrollTop);
    realScrollX.value && (main.value.scrollLeft = state2.lastScrollLeft);
  });
  watch(scrollTopNumber, (val) => {
    _scrollTopChanged(val);
  });
  watch(scrollLeftNumber, (val) => {
    _scrollLeftChanged(val);
  });
  watch(() => props2.scrollIntoView, (val) => {
    _scrollIntoViewChanged(val);
  });
  watch(() => props2.refresherTriggered, (val) => {
    if (val === true) {
      _setRefreshState("refreshing");
    } else if (val === false) {
      _setRefreshState("restore");
    }
  });
  return {
    realScrollX,
    realScrollY,
    _scrollTopChanged,
    _scrollLeftChanged
  };
}
const props$i = {
  name: {
    type: String,
    default: ""
  },
  checked: {
    type: [Boolean, String],
    default: false
  },
  type: {
    type: String,
    default: "switch"
  },
  id: {
    type: String,
    default: ""
  },
  disabled: {
    type: [Boolean, String],
    default: false
  },
  color: {
    type: String,
    default: ""
  }
};
const index$j = /* @__PURE__ */ defineBuiltInComponent({
  name: "Switch",
  props: props$i,
  emits: ["change"],
  setup(props2, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    const switchChecked = ref(props2.checked);
    const uniLabel = useSwitchInject(props2, switchChecked);
    const trigger2 = useCustomEvent(rootRef, emit2);
    watch(() => props2.checked, (val) => {
      switchChecked.value = val;
    });
    const _onClick = ($event) => {
      if (props2.disabled) {
        return;
      }
      switchChecked.value = !switchChecked.value;
      trigger2("change", $event, {
        value: switchChecked.value
      });
    };
    if (!!uniLabel) {
      uniLabel.addHandler(_onClick);
      onBeforeUnmount(() => {
        uniLabel.removeHandler(_onClick);
      });
    }
    useListeners$1(props2, {
      "label-click": _onClick
    });
    return () => {
      const {
        color,
        type
      } = props2;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      const switchInputStyle = {};
      if (color && switchChecked.value) {
        switchInputStyle["backgroundColor"] = color;
        switchInputStyle["borderColor"] = color;
      }
      let realCheckValue;
      realCheckValue = switchChecked.value;
      return createVNode("uni-switch", mergeProps({
        "id": props2.id,
        "ref": rootRef
      }, booleanAttrs, {
        "onClick": _onClick
      }), [createVNode("div", {
        "class": "uni-switch-wrapper"
      }, [withDirectives(createVNode("div", {
        "class": ["uni-switch-input", [switchChecked.value ? "uni-switch-input-checked" : ""]],
        "style": switchInputStyle
      }, null, 6), [[vShow, type === "switch"]]), withDirectives(createVNode("div", {
        "class": "uni-checkbox-input"
      }, [realCheckValue ? createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, props2.color, 22) : ""], 512), [[vShow, type === "checkbox"]])])], 16, ["id", "onClick"]);
    };
  }
});
function useSwitchInject(props2, switchChecked) {
  const uniForm = inject(uniFormKey, false);
  const uniLabel = inject(uniLabelKey, false);
  const formField = {
    submit: () => {
      const data = ["", null];
      if (props2.name) {
        data[0] = props2.name;
        data[1] = switchChecked.value;
      }
      return data;
    },
    reset: () => {
      switchChecked.value = false;
    }
  };
  if (!!uniForm) {
    uniForm.addField(formField);
    onUnmounted(() => {
      uniForm.removeField(formField);
    });
  }
  return uniLabel;
}
const SPACE_UNICODE = {
  ensp: " ",
  emsp: " ",
  nbsp: " "
};
function normalizeText(text2, { space, decode: decode2 }) {
  let result = "";
  let isEscape = false;
  for (let char of text2) {
    if (space && SPACE_UNICODE[space] && char === " ") {
      char = SPACE_UNICODE[space];
    }
    if (isEscape) {
      if (char === "n") {
        result += LINEFEED;
      } else if (char === "\\") {
        result += "\\";
      } else {
        result += "\\" + char;
      }
      isEscape = false;
    } else {
      if (char === "\\") {
        isEscape = true;
      } else {
        result += char;
      }
    }
  }
  if (!decode2) {
    return result;
  }
  return result.replace(/&nbsp;/g, SPACE_UNICODE.nbsp).replace(/&ensp;/g, SPACE_UNICODE.ensp).replace(/&emsp;/g, SPACE_UNICODE.emsp).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
function parseText(text2, options) {
  return normalizeText(text2, options).split(LINEFEED);
}
const index$i = /* @__PURE__ */ defineBuiltInComponent({
  name: "Text",
  props: {
    selectable: {
      type: [Boolean, String],
      default: false
    },
    space: {
      type: String,
      default: ""
    },
    decode: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props2, {
    slots
  }) {
    const rootRef = ref(null);
    return () => {
      const children = [];
      if (slots.default) {
        slots.default().forEach((vnode) => {
          if (vnode.shapeFlag & 8 && vnode.type !== Comment) {
            let lines = [];
            lines = parseText(vnode.children, {
              space: props2.space,
              decode: props2.decode
            });
            const len = lines.length - 1;
            lines.forEach((line, index2) => {
              if (index2 === 0 && !line)
                ;
              else {
                children.push(createTextVNode(line));
              }
              if (index2 !== len) {
                children.push(createVNode("br"));
              }
            });
          } else {
            if (vnode.shapeFlag & 6 && vnode.type.name !== "Text") {
              console.warn("Do not nest other components in the text component, as there may be display differences on different platforms.");
            }
            children.push(vnode);
          }
        });
      }
      return createVNode("uni-text", {
        "ref": rootRef,
        "selectable": props2.selectable ? true : null
      }, [createVNode("span", null, children)], 8, ["selectable"]);
    };
  }
});
const index$g = /* @__PURE__ */ defineBuiltInComponent({
  name: "View",
  props: /* @__PURE__ */ extend$1({}, hoverProps),
  setup(props2, {
    slots
  }) {
    const rootRef = ref(null);
    const {
      hovering,
      binding
    } = useHover(props2);
    return () => {
      const hoverClass = props2.hoverClass;
      if (hoverClass && hoverClass !== "none") {
        return createVNode("uni-view", mergeProps({
          "class": hovering.value ? hoverClass : "",
          "ref": rootRef
        }, binding), [renderSlot(slots, "default")], 16);
      }
      return createVNode("uni-view", {
        "ref": rootRef
      }, [renderSlot(slots, "default")], 512);
    };
  }
});
function injectLifecycleHook(name, hook, publicThis, instance2) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance2);
  }
}
function initHooks(options, instance2, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component" || // instance.renderer 标识页面是否作为组件渲染
  mpType === "page" && instance2.renderer === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray$1(hooks)) {
        hooks.forEach(
          (hook) => injectLifecycleHook(name, hook, publicThis, instance2)
        );
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance2);
      }
    }
  });
  if (mpType === "page") {
    instance2.__isVisible = true;
    try {
      let query = instance2.attrs.__pageQuery;
      if (false)
        ;
      if (false)
        ;
      invokeHook(publicThis, ON_LOAD, query);
      if (!instance2.vapor) {
        delete instance2.attrs.__pageQuery;
      }
      const $basePage = false ? publicThis.$basePage : publicThis.$page;
      if (true) {
        if (($basePage == null ? void 0 : $basePage.openType) !== "preloadPage") {
          invokeHook(publicThis, ON_SHOW);
        }
      }
    } catch (e2) {
      console.error(e2.message + LINEFEED + e2.stack);
    }
  }
}
function applyOptions(options, instance2, publicThis) {
  initHooks(options, instance2, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  const userErrorHandler = app.config.errorHandler;
  return function errorHandler(err, instance2, info) {
    if (userErrorHandler) {
      userErrorHandler(err, instance2, info);
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    if (appInstance[ON_ERROR]) {
      {
        invokeHook(appInstance.proxy, ON_ERROR, err);
      }
    } else {
      logError(err, info, instance2 ? instance2.$.vnode : null, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
function initApp$1(app) {
  const appConfig = app.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions;
    globalProperties.$callMethod = $callMethod;
  }
  {
    invokeCreateVueAppHook(app);
  }
}
function initRouter(app) {
  const router2 = createRouter(createRouterOptions());
  router2.beforeEach((to, from) => {
    if (to && from && to.meta.isTabBar && from.meta.isTabBar) {
      saveTabBarScrollPosition(from.meta.tabBarIndex);
    }
  });
  app.router = router2;
  app.use(router2);
}
let positionStore = /* @__PURE__ */ Object.create(null);
function getTabBarScrollPosition(id2) {
  return positionStore[id2];
}
function saveTabBarScrollPosition(id2) {
  if (typeof window !== "undefined") {
    positionStore[id2] = {
      left: window.pageXOffset,
      top: window.pageYOffset
    };
  }
}
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    if (to && from && to.meta.isTabBar && from.meta.isTabBar) {
      const position = getTabBarScrollPosition(to.meta.tabBarIndex);
      if (position) {
        return position;
      }
    }
    return {
      left: 0,
      top: 0
    };
  }
};
function createRouterOptions() {
  return {
    history: initHistory(),
    strict: !!__uniConfig.router.strict,
    routes: __uniRoutes,
    scrollBehavior
  };
}
function removeCurrentPages(delta = 1) {
  const keys = getCurrentBasePages();
  const start = keys.length - 1;
  const end = start - delta;
  for (let i = start; i > end; i--) {
    const page = getPage$BasePage(keys[i]);
    removePage(normalizeRouteKey(page.path, page.id), false);
  }
}
function initHistory() {
  let { routerBase } = __uniConfig.router;
  if (routerBase === "/") {
    routerBase = "";
  }
  const history2 = createWebHashHistory(routerBase);
  history2.listen((_to, _from, info) => {
    if (info.direction === "back") {
      removeCurrentPages(Math.abs(info.delta));
    }
  });
  return history2;
}
const index$e = {
  install(app) {
    initApp$1(app);
    initViewPlugin(app);
    initServicePlugin(app);
    if (!app.config.warnHandler) {
      app.config.warnHandler = warnHandler;
    }
    {
      initRouter(app);
    }
  }
};
function warnHandler(msg, instance2, trace) {
  if (instance2) {
    const name = instance2.$.type.name;
    if ("PageMetaHead" === name) {
      return;
    }
    const parent = instance2.$.parent;
    if (parent && parent.type.name === "PageMeta") {
      return;
    }
  }
  const warnArgs = [`[Vue warn]: ${msg}`];
  if (trace.length) {
    warnArgs.push(`
`, trace);
  }
  console.warn(...warnArgs);
}
const clazz = { class: "uni-async-loading" };
const loadingVNode = /* @__PURE__ */ createVNode(
  "i",
  { class: "uni-loading" },
  null,
  -1
  /* HOISTED */
);
const AsyncLoadingComponent = /* @__PURE__ */ defineSystemComponent({
  name: "AsyncLoading",
  render() {
    return openBlock(), createBlock("div", clazz, [loadingVNode]);
  }
});
function reload() {
  window.location.reload();
}
const AsyncErrorComponent = /* @__PURE__ */ defineSystemComponent({
  name: "AsyncError",
  props: ["error"],
  setup() {
    initI18nAsyncMsgsOnce();
    const {
      t: t2
    } = useI18n();
    return () => createVNode("div", {
      "class": "uni-async-error",
      "onClick": reload
    }, [t2("uni.async.error")], 8, ["onClick"]);
  }
});
let appVm;
function getApp$1() {
  {
    return appVm;
  }
}
function initApp(vm) {
  appVm = vm;
  Object.defineProperty(appVm.$.ctx, "$children", {
    get() {
      return getCurrentBasePages().map((page) => page.$vm);
    }
  });
  const app = appVm.$.appContext.app;
  if (!app.component(AsyncLoadingComponent.name)) {
    app.component(AsyncLoadingComponent.name, AsyncLoadingComponent);
  }
  if (!app.component(AsyncErrorComponent.name)) {
    app.component(AsyncErrorComponent.name, AsyncErrorComponent);
  }
  initAppVm(appVm);
  defineGlobalData(appVm);
  initService();
  initView();
}
function wrapperComponentSetup(comp, { type, clone, init: init2, setup, before, options }) {
  if (clone) {
    comp = extend$1({}, comp);
  }
  before && before(comp);
  const oldSetup = comp.setup;
  comp.setup = (props2, ctx) => {
    const instance2 = getCurrentInstance();
    init2(instance2.proxy);
    setup(instance2);
    if (oldSetup) {
      return oldSetup(props2, ctx);
    }
  };
  return comp;
}
function setupComponent(comp, options) {
  if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
    return wrapperComponentSetup(comp.default, options);
  }
  return wrapperComponentSetup(comp, options);
}
function setupPage(comp, path) {
  {
    comp.__mpType = "page";
  }
  return setupComponent(comp, {
    type: "page",
    clone: true,
    // 页面组件可能会被其他地方手动引用，比如 windows 等，需要 clone 一份新的作为页面组件
    init: initPage,
    setup(instance2) {
      instance2.$pageInstance = instance2;
      const route = usePageRoute();
      const query = decodedQuery(route.query);
      instance2.attrs.__pageQuery = query;
      getPage$BasePage(instance2.proxy).options = query;
      instance2.proxy.options = query;
      const pageMeta = usePageMeta();
      updateCurPageCssVar(pageMeta);
      instance2.onReachBottom = reactive([]);
      instance2.onPageScroll = reactive([]);
      watch(
        [instance2.onReachBottom, instance2.onPageScroll],
        () => {
          const currentPage = getCurrentPage();
          if (instance2.proxy === currentPage) {
            initPageScrollListener(instance2, pageMeta);
          }
        },
        { once: true }
      );
      onBeforeMount(() => {
        onPageShow(instance2, pageMeta);
      });
      onMounted(() => {
        onPageReady(instance2);
        const { onReady } = instance2;
        onReady && invokeArrayFns$1(onReady);
        invokeOnTabItemTap(route);
      });
      onBeforeActivate(() => {
        if (!instance2.__isVisible) {
          onPageShow(instance2, pageMeta);
          instance2.__isVisible = true;
          {
            const { onShow: onShow2 } = instance2;
            onShow2 && invokeArrayFns$1(onShow2);
          }
          nextTick(() => {
            invokeOnTabItemTap(route);
          });
        }
      });
      onBeforeDeactivate(() => {
        if (instance2.__isVisible && !instance2.__isUnload) {
          instance2.__isVisible = false;
          {
            const { onHide: onHide2 } = instance2;
            onHide2 && invokeArrayFns$1(onHide2);
          }
        }
      });
      const pageId = getPageProxyId(instance2.proxy);
      subscribeViewMethod(pageId);
      onBeforeUnmount(() => {
        unsubscribeViewMethod(pageId);
      });
      return query;
    }
  });
}
function setupApp(comp) {
  {
    comp.__mpType = "app";
  }
  return setupComponent(comp, {
    init: initApp,
    setup(instance2) {
      const route = usePageRoute();
      const onLaunch2 = () => {
        injectAppHooks(instance2);
        const { onLaunch: onLaunch22, onShow: onShow2, onPageNotFound: onPageNotFound2 } = instance2;
        const path = route.path.slice(1);
        const launchOptions2 = initLaunchOptions({
          path: path || __uniRoutes[0].meta.route,
          query: decodedQuery(route.query)
        });
        onLaunch22 && invokeArrayFns$1(onLaunch22, launchOptions2);
        onShow2 && invokeArrayFns$1(onShow2, launchOptions2);
        {
          if (!route.matched.length) {
            const pageNotFoundOptions = {
              notFound: true,
              openType: "appLaunch",
              path: route.path,
              query: decodedQuery(route.query),
              scene: 1001
            };
            handleBeforeEntryPageRoutes();
            onPageNotFound2 && invokeArrayFns$1(onPageNotFound2, pageNotFoundOptions);
          }
        }
      };
      {
        useRouter().isReady().then(onLaunch2);
      }
      onMounted(() => {
        window.addEventListener(
          "resize",
          debounce(onResize, 50, { setTimeout, clearTimeout })
        );
        window.addEventListener("message", onMessage);
        document.addEventListener("visibilitychange", onVisibilityChange$1);
        onThemeChange$2();
      });
      return route.query;
    },
    before(comp2) {
      comp2.mpType = "app";
      const { setup } = comp2;
      const render = () => {
        return openBlock(), createBlock(LayoutComponent);
      };
      comp2.setup = (props2, ctx) => {
        const res = setup && setup(props2, ctx);
        return isFunction(res) ? render : res;
      };
      comp2.render = render;
    }
  });
}
function onResize() {
  const { windowWidth, windowHeight, screenWidth, screenHeight } = getSystemInfoSync();
  const landscape = Math.abs(Number(window.orientation)) === 90;
  const deviceOrientation = landscape ? "landscape" : "portrait";
  UniServiceJSBridge$1.emit(ON_RESIZE, {
    deviceOrientation,
    size: {
      windowWidth,
      windowHeight,
      screenWidth,
      screenHeight
    }
  });
}
function onMessage(evt) {
  if (isPlainObject(evt.data) && evt.data.type === WEB_INVOKE_APPSERVICE) {
    UniServiceJSBridge$1.emit(
      ON_WEB_INVOKE_APP_SERVICE,
      evt.data.data,
      evt.data.pageId
    );
  }
}
function onVisibilityChange$1() {
  const { emit: emit2 } = UniServiceJSBridge$1;
  if (document.visibilityState === "visible") {
    emit2(ON_APP_ENTER_FOREGROUND, getEnterOptions());
  } else {
    emit2(ON_APP_ENTER_BACKGROUND);
  }
}
function onThemeChange$2() {
  let mediaQueryList = null;
  try {
    mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  } catch (error) {
  }
  if (mediaQueryList) {
    let callback = (e2) => {
      UniServiceJSBridge$1.emit(ON_THEME_CHANGE, {
        theme: e2.matches ? "dark" : "light"
      });
    };
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", callback);
    } else {
      mediaQueryList.addListener(callback);
    }
  }
}
function invokeOnTabItemTap(route) {
  const { tabBarText, tabBarIndex, route: pagePath } = route.meta;
  if (tabBarText) {
    invokeHook("onTabItemTap", {
      index: tabBarIndex,
      text: tabBarText,
      pagePath
    });
  }
}
const UUID_KEY = "__DC_STAT_UUID";
const storage = navigator.cookieEnabled && (window.localStorage || window.sessionStorage) || {};
let deviceId;
function deviceId$1() {
  deviceId = deviceId || storage[UUID_KEY];
  if (!deviceId) {
    deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
    try {
      storage[UUID_KEY] = deviceId;
    } catch (error) {
    }
  }
  return deviceId;
}
function IEVersion() {
  const userAgent = navigator.userAgent;
  const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
  const isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
  const isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp.$1);
    if (fIEVersion > 6) {
      return fIEVersion;
    } else {
      return 6;
    }
  } else if (isEdge) {
    return -1;
  } else if (isIE11) {
    return 11;
  } else {
    return -1;
  }
}
function getTheme() {
  if (__uniConfig.darkmode !== true)
    return isString(__uniConfig.darkmode) ? __uniConfig.darkmode : "light";
  try {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch (error) {
    return "light";
  }
}
function getBrowserInfo() {
  let osname;
  let osversion = "0";
  let model;
  let deviceType = "phone";
  let platform = "";
  let deviceBrand;
  const language = navigator.language;
  if (isIOS) {
    deviceBrand = "iPhone";
    osname = "iOS";
    const osversionFind = ua.match(/OS\s([\w_]+)\slike/);
    if (osversionFind) {
      osversion = osversionFind[1].replace(/_/g, ".");
    }
    const iosVersion = osversion.split(".")[0];
    if (Number(iosVersion) >= 18) {
      const versionMatch = ua.match(/Version\/([\d\.]+)/);
      if (versionMatch) {
        osversion = versionMatch[1];
      }
    }
    const modelFind = ua.match(/\(([a-zA-Z]+);/);
    if (modelFind) {
      model = modelFind[1];
    }
  } else if (isAndroid) {
    osname = "Android";
    const osversionFind = ua.match(/Android[\s/]([\w\.]+)[;\s]/);
    if (osversionFind) {
      osversion = osversionFind[1];
    }
    const infoFind = ua.match(/\((.+?)\)/);
    const infos = infoFind ? infoFind[1].split(";") : ua.split(" ");
    const otherInfo = [
      /\bAndroid\b/i,
      /\bLinux\b/i,
      /\bU\b/i,
      /^\s?[a-z][a-z]$/i,
      /^\s?[a-z][a-z]-[a-z][a-z]$/i,
      /\bwv\b/i,
      /\/[\d\.,]+$/,
      /^\s?[\d\.,]+$/,
      /\bBrowser\b/i,
      /\bMobile\b/i
    ];
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i];
      if (info.indexOf("Build") > 0) {
        model = info.split("Build")[0].trim();
        break;
      }
      let other;
      for (let o2 = 0; o2 < otherInfo.length; o2++) {
        if (otherInfo[o2].test(info)) {
          other = true;
          break;
        }
      }
      if (!other) {
        model = info.trim();
        break;
      }
    }
  } else if (isIPadOS) {
    deviceBrand = "iPad";
    model = "iPad";
    osname = "iOS";
    deviceType = "pad";
    osversion = isFunction(window.BigInt) ? "14.0" : "13.0";
    if (parseInt(osversion) === 14) {
      const versionMatched = ua.match(/Version\/(\S*)\b/);
      if (versionMatched) {
        osversion = versionMatched[1];
      }
    }
  } else if (isWindows || isMac || isLinux) {
    model = "PC";
    osname = "PC";
    deviceType = "pc";
    osversion = "0";
    let osversionFind = ua.match(/\((.+?)\)/)[1];
    if (isWindows) {
      osname = "Windows";
      switch (isWindows[1]) {
        case "5.1":
          osversion = "XP";
          break;
        case "6.0":
          osversion = "Vista";
          break;
        case "6.1":
          osversion = "7";
          break;
        case "6.2":
          osversion = "8";
          break;
        case "6.3":
          osversion = "8.1";
          break;
        case "10.0":
          osversion = "10";
          break;
      }
      const framework = osversionFind && osversionFind.match(/[Win|WOW]([\d]+)/);
      if (framework) {
        osversion += ` x${framework[1]}`;
      }
    } else if (isMac) {
      osname = "macos";
      platform = "mac";
      const _osversion = osversionFind && osversionFind.match(/Mac OS X (.+)/) || "";
      if (osversion) {
        osversion = _osversion[1].replace(/_/g, ".");
        if (osversion.indexOf(";") !== -1) {
          osversion = osversion.split(";")[0];
        }
      }
    } else if (isLinux) {
      osname = "Linux";
      const _osversion = osversionFind && osversionFind.match(/Linux (.*)/) || "";
      if (_osversion) {
        osversion = _osversion[1];
        if (osversion.indexOf(";") !== -1) {
          osversion = osversion.split(";")[0];
        }
      }
    }
  } else if (isHarmony) {
    deviceBrand = "HUAWEI";
    osname = "harmonyos";
    deviceType = isHarmony2in1 ? "pc" : isHarmonyTablet ? "pad" : "phone";
    const osversionFind = ua.match(/OpenHarmony\s([\d\.]+)/);
    if (osversionFind) {
      osversion = osversionFind[1];
    }
    model = void 0;
  } else {
    osname = "Other";
    osversion = "0";
    deviceType = "unknown";
  }
  const system = `${osname} ${osversion}`;
  if (!platform)
    platform = osname.toLowerCase();
  let browserName = "";
  let browserVersion = String(IEVersion());
  if (browserVersion !== "-1") {
    browserName = "IE";
  } else {
    const browseVendors = ["Version", "Firefox", "Chrome", "Edge{0,1}"];
    const vendors = ["Safari", "Firefox", "Chrome", "Edge"];
    for (let index2 = 0; index2 < browseVendors.length; index2++) {
      const vendor = browseVendors[index2];
      const reg = new RegExp(`(${vendor})/(\\S*)\\b`);
      if (reg.test(ua)) {
        browserName = vendors[index2];
        browserVersion = ua.match(reg)[2];
      }
    }
  }
  let deviceOrientation = "portrait";
  if (window.matchMedia) {
    try {
      if (window.matchMedia("(orientation:landscape)").matches) {
        deviceOrientation = "landscape";
      }
    } catch (e2) {
    }
  }
  if (deviceOrientation === "portrait" && window.screen.orientation !== void 0) {
    deviceOrientation = [90, 270].includes(window.screen.orientation.angle) ? "landscape" : "portrait";
  }
  if (deviceOrientation === "portrait" && window.orientation != null) {
    deviceOrientation = Math.abs(window.orientation) === 90 ? "landscape" : "portrait";
  }
  return {
    deviceBrand,
    brand: deviceBrand,
    deviceModel: model,
    deviceOrientation,
    model,
    system,
    platform,
    browserName: browserName.toLocaleLowerCase(),
    browserVersion,
    language,
    deviceType,
    ua,
    osname,
    osversion,
    theme: getTheme()
  };
}
const getWindowInfo = /* @__PURE__ */ defineSyncApi(
  "getWindowInfo",
  () => {
    const pixelRatio2 = window.devicePixelRatio;
    const screenFix = getScreenFix();
    const landscape = isLandscape(screenFix);
    const screenWidth = getScreenWidth(screenFix, landscape);
    const screenHeight = getScreenHeight(screenFix, landscape);
    const windowWidth = getWindowWidth();
    let windowHeight = window.innerHeight;
    const statusBarHeight = safeAreaInsets$1.top;
    const safeArea = {
      left: safeAreaInsets$1.left,
      right: windowWidth - safeAreaInsets$1.right,
      top: safeAreaInsets$1.top,
      bottom: windowHeight - safeAreaInsets$1.bottom,
      width: windowWidth - safeAreaInsets$1.left - safeAreaInsets$1.right,
      height: windowHeight - safeAreaInsets$1.top - safeAreaInsets$1.bottom
    };
    const { top: windowTop, bottom: windowBottom } = getWindowOffset();
    windowHeight -= windowTop;
    windowHeight -= windowBottom;
    return {
      windowTop,
      windowBottom,
      windowWidth,
      windowHeight,
      pixelRatio: pixelRatio2,
      screenWidth,
      screenHeight,
      statusBarHeight,
      safeArea,
      safeAreaInsets: {
        top: safeAreaInsets$1.top,
        right: safeAreaInsets$1.right,
        bottom: safeAreaInsets$1.bottom,
        left: safeAreaInsets$1.left
      },
      screenTop: screenHeight - windowHeight
    };
  }
);
let browserInfo;
let _initBrowserInfo = true;
function initBrowserInfo() {
  if (!_initBrowserInfo)
    return;
  browserInfo = getBrowserInfo();
}
const getDeviceInfo = /* @__PURE__ */ defineSyncApi(
  "getDeviceInfo",
  () => {
    initBrowserInfo();
    const {
      deviceBrand,
      deviceModel,
      brand,
      model,
      platform,
      system,
      deviceOrientation,
      deviceType,
      osname,
      osversion
    } = browserInfo;
    return extend$1({
      brand,
      deviceBrand,
      deviceModel,
      devicePixelRatio: window.devicePixelRatio,
      deviceId: deviceId$1(),
      deviceOrientation,
      deviceType,
      model,
      osName: osname ? osname.toLowerCase() : void 0,
      osVersion: osversion,
      platform,
      system
    });
  }
);
const getAppBaseInfo = /* @__PURE__ */ defineSyncApi(
  "getAppBaseInfo",
  () => {
    initBrowserInfo();
    const { theme, language, browserName, browserVersion } = browserInfo;
    return extend$1(
      {
        appId: __uniConfig.appId,
        appName: __uniConfig.appName,
        appVersion: __uniConfig.appVersion,
        appVersionCode: __uniConfig.appVersionCode,
        appLanguage: getLocale ? getLocale() : language,
        enableDebug: false,
        hostSDKVersion: void 0,
        hostPackageName: void 0,
        hostFontSizeSetting: void 0,
        hostName: browserName,
        hostVersion: browserVersion,
        hostTheme: theme,
        hostLanguage: language,
        isUniAppX: false,
        language,
        SDKVersion: "",
        theme,
        uniPlatform: "web",
        uniCompileVersion: __uniConfig.compilerVersion,
        uniCompilerVersion: __uniConfig.compilerVersion,
        uniRuntimeVersion: __uniConfig.compilerVersion,
        version: ""
      },
      {}
    );
  }
);
const getSystemInfoSync = /* @__PURE__ */ defineSyncApi(
  "getSystemInfoSync",
  () => {
    _initBrowserInfo = true;
    initBrowserInfo();
    _initBrowserInfo = false;
    const windowInfo = getWindowInfo();
    const deviceInfo = getDeviceInfo();
    const appBaseInfo = getAppBaseInfo();
    _initBrowserInfo = true;
    const { ua: ua2, browserName, browserVersion, osname, osversion } = browserInfo;
    const systemInfo = extend$1(
      windowInfo,
      deviceInfo,
      appBaseInfo,
      {
        browserName,
        browserVersion,
        fontSizeSetting: void 0,
        osName: osname.toLowerCase(),
        osVersion: osversion,
        osLanguage: void 0,
        osTheme: void 0,
        ua: ua2,
        uniPlatform: "web",
        uniCompileVersion: __uniConfig.compilerVersion,
        uniRuntimeVersion: __uniConfig.compilerVersion
      }
    );
    delete systemInfo.screenTop;
    delete systemInfo.enableDebug;
    if (!__uniConfig.darkmode)
      delete systemInfo.theme;
    return systemInfo;
  }
);
function parseValue(value) {
  const types = ["object", "string", "number", "boolean", "undefined"];
  try {
    const object = isString(value) ? JSON.parse(value) : value;
    const type = object.type;
    if (types.indexOf(type) >= 0) {
      const keys = Object.keys(object);
      if (keys.length === 2 && "data" in object) {
        if (typeof object.data === type) {
          return object.data;
        }
        if (type === "object" && /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(object.data)) {
          return new Date(object.data);
        }
      } else if (keys.length === 1) {
        return "";
      }
    }
  } catch (error) {
  }
}
const setStorageSync = /* @__PURE__ */ defineSyncApi(
  API_SET_STORAGE_SYNC,
  (key, data) => {
    const type = typeof data;
    const value = type === "string" ? data : JSON.stringify({
      type,
      data
    });
    localStorage.setItem(key, value);
  },
  SetStorageSyncProtocol
);
function getStorageOrigin(key) {
  const value = localStorage && localStorage.getItem(key);
  if (!isString(value)) {
    throw new Error("data not found");
  }
  let data = value;
  try {
    const object = JSON.parse(value);
    const result = parseValue(object);
    if (result !== void 0) {
      data = result;
    }
  } catch (error) {
  }
  return data;
}
const getStorageSync = /* @__PURE__ */ defineSyncApi(
  API_GET_STORAGE_SYNC,
  (key) => {
    try {
      return getStorageOrigin(key);
    } catch (error) {
      return "";
    }
  },
  GetStorageSyncProtocol
);
const removeStorageSync = /* @__PURE__ */ defineSyncApi(
  API_REMOVE_STORAGE,
  (key) => {
    if (localStorage) {
      localStorage.removeItem(key);
    }
  },
  RemoveStorageSyncProtocol
);
const MIMEType = {
  /**
   * 关于图片常见的MIME类型
   */
  image: {
    jpg: "jpeg",
    jpe: "jpeg",
    pbm: "x-portable-bitmap",
    pgm: "x-portable-graymap",
    pnm: "x-portable-anymap",
    ppm: "x-portable-pixmap",
    psd: "vnd.adobe.photoshop",
    pic: "x-pict",
    rgb: "x-rgb",
    svg: "svg+xml",
    svgz: "svg+xml",
    tif: "tiff",
    xif: "vnd.xiff",
    wbmp: "vnd.wap.wbmp",
    wdp: "vnd.ms-photo",
    xbm: "x-xbitmap",
    ico: "x-icon"
  },
  /**
   * 关于视频常见的MIME类型
   */
  video: {
    "3g2": "3gpp2",
    "3gp": "3gpp",
    avi: "x-msvideo",
    f4v: "x-f4v",
    flv: "x-flv",
    jpgm: "jpm",
    jpgv: "jpeg",
    m1v: "mpeg",
    m2v: "mpeg",
    mpe: "mpeg",
    mpg: "mpeg",
    mpg4: "mpeg",
    m4v: "x-m4v",
    mkv: "x-matroska",
    mov: "quicktime",
    qt: "quicktime",
    movie: "x-sgi-movie",
    mp4v: "mp4",
    ogv: "ogg",
    smv: "x-smv",
    wm: "x-ms-wm",
    wmv: "x-ms-wmv",
    wmx: "x-ms-wmx",
    wvx: "x-ms-wvx"
  }
};
function _createInput({
  count,
  sourceType,
  type,
  extension
}) {
  addInteractListener();
  const inputEl = document.createElement("input");
  inputEl.type = "file";
  updateElementStyle(inputEl, {
    position: "absolute",
    visibility: "hidden",
    zIndex: "-999",
    width: "0",
    height: "0",
    top: "0",
    left: "0"
  });
  inputEl.accept = extension.map((item) => {
    {
      const MIMEKey = item.replace(".", "");
      return `${type}/${MIMEType[type][MIMEKey] || MIMEKey}`;
    }
  }).join(",");
  if (count && count > 1) {
    inputEl.multiple = true;
  }
  if (sourceType instanceof Array && sourceType.length === 1 && sourceType[0] === "camera") {
    inputEl.setAttribute("capture", "camera");
  }
  return inputEl;
}
let imageInput = null;
const chooseImage = /* @__PURE__ */ defineAsyncApi(
  API_CHOOSE_IMAGE,
  ({
    count,
    // sizeType,
    sourceType,
    extension
  }, { resolve: resolve2, reject }) => {
    initI18nChooseFileMsgsOnce();
    const { t: t2 } = useI18n();
    if (imageInput) {
      document.body.removeChild(imageInput);
      imageInput = null;
    }
    imageInput = _createInput({
      count,
      sourceType,
      extension,
      type: "image"
    });
    document.body.appendChild(imageInput);
    imageInput.addEventListener("cancel", () => {
      reject("chooseImage:fail cancel");
    });
    imageInput.addEventListener("change", function(event) {
      const eventTarget = event.target;
      const tempFiles = [];
      if (eventTarget && eventTarget.files) {
        const fileCount = eventTarget.files.length;
        for (let i = 0; i < fileCount; i++) {
          const file = eventTarget.files[i];
          let filePath;
          Object.defineProperty(file, "path", {
            get() {
              filePath = filePath || fileToUrl(file);
              return filePath;
            }
          });
          if (i < count)
            tempFiles.push(file);
        }
      }
      const res = {
        get tempFilePaths() {
          return tempFiles.map(({ path }) => path);
        },
        tempFiles
      };
      resolve2(res);
    });
    imageInput.click();
    if (!getInteractStatus()) {
      console.warn(t2("uni.chooseFile.notUserActivation"));
    }
  },
  ChooseImageProtocol,
  ChooseImageOptions
);
const KEY_MAPS = {
  esc: ["Esc", "Escape"],
  // tab: ['Tab'],
  enter: ["Enter"]
  // space: [' ', 'Spacebar'],
  // up: ['Up', 'ArrowUp'],
  // left: ['Left', 'ArrowLeft'],
  // right: ['Right', 'ArrowRight'],
  // down: ['Down', 'ArrowDown'],
  // delete: ['Backspace', 'Delete', 'Del'],
};
const KEYS = Object.keys(KEY_MAPS);
function useKeyboard() {
  const key = ref("");
  const disable = ref(false);
  const onKeyup = (evt) => {
    if (disable.value) {
      return;
    }
    const res = KEYS.find(
      (key2) => KEY_MAPS[key2].indexOf(evt.key) !== -1
    );
    if (res) {
      key.value = res;
    }
    nextTick(() => key.value = "");
  };
  onMounted(() => {
    document.addEventListener("keyup", onKeyup);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyup);
  });
  return {
    key,
    disable
  };
}
const VNODE_MASK = /* @__PURE__ */ createVNode(
  "div",
  { class: "uni-mask" },
  null,
  -1
  /* HOISTED */
);
function createRootApp(component, rootState, callback) {
  rootState.onClose = (...args) => (rootState.visible = false, callback.apply(null, args));
  return createApp$1(
    /* @__PURE__ */ defineComponent({
      setup() {
        return () => (openBlock(), createBlock(
          component,
          rootState,
          null,
          16
          /* FULL_PROPS */
        ));
      }
    })
  );
}
function ensureRoot(id2) {
  let rootEl = document.getElementById(id2);
  if (!rootEl) {
    rootEl = document.createElement("div");
    rootEl.id = id2;
    document.body.append(rootEl);
  }
  return rootEl;
}
function usePopup(props2, {
  onEsc,
  onEnter
}) {
  const visible = ref(props2.visible);
  const { key, disable } = useKeyboard();
  watch(
    () => props2.visible,
    (value) => visible.value = value
  );
  watch(
    () => visible.value,
    (value) => disable.value = !value
  );
  watchEffect(() => {
    const { value } = key;
    if (value === "esc") {
      onEsc && onEsc();
    } else if (value === "enter") {
      onEnter && onEnter();
    }
  });
  return visible;
}
const request = /* @__PURE__ */ defineTaskApi(
  API_REQUEST,
  ({
    url,
    data,
    header = {},
    method,
    dataType: dataType2,
    responseType,
    enableChunked,
    withCredentials,
    timeout = __uniConfig.networkTimeout.request
  }, { resolve: resolve2, reject }) => {
    let body = null;
    const contentType = normalizeContentType(header);
    if (method !== "GET") {
      if (isString(data) || data instanceof ArrayBuffer) {
        body = data;
      } else {
        if (contentType === "json") {
          try {
            body = JSON.stringify(data);
          } catch (error) {
            body = data.toString();
          }
        } else if (contentType === "urlencoded") {
          const bodyArray = [];
          for (const key in data) {
            if (hasOwn$1(data, key)) {
              bodyArray.push(
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
              );
            }
          }
          body = bodyArray.join("&");
        } else {
          body = data.toString();
        }
      }
    }
    let requestTask;
    if (!enableChunked) {
      const xhr = new XMLHttpRequest();
      requestTask = new RequestTask(xhr);
      xhr.open(method, url);
      for (const key in header) {
        if (hasOwn$1(header, key)) {
          xhr.setRequestHeader(key, header[key]);
        }
      }
      const timer = setTimeout(function() {
        xhr.onload = xhr.onabort = xhr.onerror = null;
        requestTask.abort();
        reject("timeout", { errCode: 5 });
      }, timeout);
      xhr.responseType = responseType;
      xhr.onload = function() {
        clearTimeout(timer);
        const statusCode = xhr.status;
        let res = responseType === "text" ? xhr.responseText : xhr.response;
        if (responseType === "text") {
          res = parseResponseText(res, responseType, dataType2);
        }
        resolve2({
          data: res,
          statusCode,
          header: parseHeaders(xhr.getAllResponseHeaders()),
          cookies: []
        });
      };
      xhr.onabort = function() {
        clearTimeout(timer);
        reject("abort", { errCode: 600003 });
      };
      xhr.onerror = function() {
        clearTimeout(timer);
        reject(void 0, { errCode: 5 });
      };
      xhr.withCredentials = withCredentials;
      xhr.send(body);
    } else {
      if (typeof window.fetch === void 0 || typeof window.AbortController === void 0) {
        throw new Error(
          "fetch or AbortController is not supported in this environment"
        );
      }
      const controller = new AbortController();
      const signal = controller.signal;
      requestTask = new RequestTask(controller);
      const fetchOptions = {
        method,
        headers: header,
        body,
        signal,
        credentials: withCredentials ? "include" : "same-origin"
      };
      const timer = setTimeout(function() {
        requestTask.abort();
        reject("timeout", { errCode: 5 });
      }, timeout);
      fetchOptions.signal.addEventListener("abort", function() {
        clearTimeout(timer);
        reject("abort", { errCode: 600003 });
      });
      window.fetch(url, fetchOptions).then(
        (response) => {
          const statusCode = response.status;
          const header2 = response.headers;
          const body2 = response.body;
          const headerObj = {};
          header2.forEach((value, key) => {
            headerObj[key] = value;
          });
          const cookies = cookiesParse(headerObj);
          requestTask._emitter.emit("headersReceived", {
            header: headerObj,
            statusCode,
            cookies
          });
          if (!body2) {
            resolve2({
              data: "",
              statusCode,
              header: headerObj,
              cookies
            });
            return;
          }
          const reader = body2.getReader();
          const bodyBuffers = [];
          const streamReaderRead = () => {
            reader.read().then(({ done, value }) => {
              if (done) {
                const result = concatArrayBuffers(bodyBuffers);
                let res = responseType === "text" ? new TextDecoder().decode(result) : result;
                if (responseType === "text") {
                  res = parseResponseText(res, responseType, dataType2);
                }
                resolve2({
                  data: res,
                  statusCode,
                  header: headerObj,
                  cookies
                });
                return;
              }
              const chunk = value;
              bodyBuffers.push(chunk);
              requestTask._emitter.emit("chunkReceived", {
                data: chunk
              });
              streamReaderRead();
            });
          };
          streamReaderRead();
        },
        (error) => {
          reject(error, { errCode: 5 });
        }
      );
    }
    return requestTask;
  },
  RequestProtocol,
  RequestOptions
);
const cookiesParse = (header) => {
  let cookiesStr = header["Set-Cookie"] || header["set-cookie"];
  let cookiesArr = [];
  if (!cookiesStr) {
    return [];
  }
  if (cookiesStr[0] === "[" && cookiesStr[cookiesStr.length - 1] === "]") {
    cookiesStr = cookiesStr.slice(1, -1);
  }
  const handleCookiesArr = cookiesStr.split(";");
  for (let i = 0; i < handleCookiesArr.length; i++) {
    if (handleCookiesArr[i].indexOf("Expires=") !== -1 || handleCookiesArr[i].indexOf("expires=") !== -1) {
      cookiesArr.push(handleCookiesArr[i].replace(",", ""));
    } else {
      cookiesArr.push(handleCookiesArr[i]);
    }
  }
  cookiesArr = cookiesArr.join(";").split(",");
  return cookiesArr;
};
function concatArrayBuffers(buffers) {
  const totalLength = buffers.reduce((acc, buf) => acc + buf.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const buffer2 of buffers) {
    result.set(new Uint8Array(buffer2), offset);
    offset += buffer2.byteLength;
  }
  return result.buffer;
}
function normalizeContentType(header) {
  const name = Object.keys(header).find(
    (name2) => name2.toLowerCase() === "content-type"
  );
  if (!name) {
    return;
  }
  const contentType = header[name];
  if (!contentType) {
    return "string";
  }
  if (contentType.indexOf("application/json") === 0) {
    return "json";
  } else if (contentType.indexOf("application/x-www-form-urlencoded") === 0) {
    return "urlencoded";
  }
  return "string";
}
class RequestTask {
  constructor(controller) {
    this._requestOnChunkReceiveCallbackId = 0;
    this._requestOnChunkReceiveCallbacks = /* @__PURE__ */ new Map();
    this._requestOnHeadersReceiveCallbackId = 0;
    this._requestOnHeadersReceiveCallbacks = /* @__PURE__ */ new Map();
    this._emitter = new E$1();
    this._controller = controller;
  }
  abort() {
    if (this._controller) {
      this._controller.abort();
      delete this._controller;
    }
  }
  onHeadersReceived(callback) {
    this._emitter.on("headersReceived", callback);
    this._requestOnHeadersReceiveCallbackId++;
    this._requestOnHeadersReceiveCallbacks.set(
      this._requestOnHeadersReceiveCallbackId,
      callback
    );
    return this._requestOnHeadersReceiveCallbackId;
  }
  offHeadersReceived(callback) {
    if (callback == null) {
      this._emitter.off("headersReceived");
      return;
    }
    if (typeof callback === "function") {
      this._requestOnHeadersReceiveCallbacks.forEach((cb, id2) => {
        if (cb === callback) {
          this._requestOnHeadersReceiveCallbacks.delete(id2);
          this._emitter.off("headersReceived", callback);
        }
      });
      return;
    }
    const callbackFn = this._requestOnHeadersReceiveCallbacks.get(callback);
    if (!callbackFn) {
      return;
    }
    this._requestOnHeadersReceiveCallbacks.delete(callback);
    this._emitter.off("headersReceived", callbackFn);
  }
  onChunkReceived(callback) {
    this._emitter.on("chunkReceived", callback);
    this._requestOnChunkReceiveCallbackId++;
    this._requestOnChunkReceiveCallbacks.set(
      this._requestOnChunkReceiveCallbackId,
      callback
    );
    return this._requestOnChunkReceiveCallbackId;
  }
  offChunkReceived(callback) {
    if (callback == null) {
      this._emitter.off("chunkReceived");
      return;
    }
    if (typeof callback === "function") {
      this._requestOnChunkReceiveCallbacks.forEach((cb, id2) => {
        if (cb === callback) {
          this._requestOnChunkReceiveCallbacks.delete(id2);
          this._emitter.off("chunkReceived", callback);
        }
      });
      return;
    }
    const callbackFn = this._requestOnChunkReceiveCallbacks.get(callback);
    if (!callbackFn) {
      return;
    }
    this._requestOnChunkReceiveCallbacks.delete(callback);
    this._emitter.off("chunkReceived", callbackFn);
  }
}
function parseHeaders(headers) {
  const headersObject = {};
  headers.split(LINEFEED).forEach((header) => {
    const find = header.match(/(\S+\s*):\s*(.*)/);
    if (!find || find.length !== 3) {
      return;
    }
    headersObject[find[1]] = find[2];
  });
  return headersObject;
}
function parseResponseText(responseText, responseType, dataType2) {
  let res = responseText;
  if (responseType === "text" && dataType2 === "json") {
    try {
      res = JSON.parse(res);
    } catch (error) {
    }
  }
  return res;
}
class UploadTask {
  constructor(xhr) {
    this._callbacks = [];
    this._xhr = xhr;
  }
  /**
   * 监听上传进度
   * @param callback 回调
   */
  onProgressUpdate(callback) {
    if (!isFunction(callback)) {
      return;
    }
    this._callbacks.push(callback);
  }
  offProgressUpdate(callback) {
    const index2 = this._callbacks.indexOf(callback);
    if (index2 >= 0) {
      this._callbacks.splice(index2, 1);
    }
  }
  /**
   * 中断上传任务
   */
  abort() {
    this._isAbort = true;
    if (this._xhr) {
      this._xhr.abort();
      delete this._xhr;
    }
  }
  onHeadersReceived(callback) {
    throw new Error("Method not implemented.");
  }
  offHeadersReceived(callback) {
    throw new Error("Method not implemented.");
  }
}
const uploadFile = /* @__PURE__ */ defineTaskApi(
  API_UPLOAD_FILE,
  ({
    url,
    file,
    filePath,
    name,
    files: files2,
    header = {},
    formData = {},
    timeout = __uniConfig.networkTimeout.uploadFile
  }, { resolve: resolve2, reject }) => {
    var uploadTask = new UploadTask();
    if (!isArray$1(files2) || !files2.length) {
      if (!filePath) {
        reject("file error");
      }
      files2 = [
        {
          name,
          file,
          uri: filePath
        }
      ];
    }
    function upload(realFiles) {
      var xhr = new XMLHttpRequest();
      var form = new FormData();
      var timer;
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });
      Object.values(files2).forEach(({ name: name2 }, index2) => {
        const file2 = realFiles[index2];
        form.append(name2 || "file", file2, file2.name || `file-${Date.now()}`);
      });
      xhr.open("POST", url);
      Object.keys(header).forEach((key) => {
        xhr.setRequestHeader(key, header[key]);
      });
      xhr.upload.onprogress = function(event) {
        uploadTask._callbacks.forEach((callback) => {
          var totalBytesSent = event.loaded;
          var totalBytesExpectedToSend = event.total;
          var progress = Math.round(
            totalBytesSent / totalBytesExpectedToSend * 100
          );
          callback({
            progress,
            totalBytesSent,
            totalBytesExpectedToSend
          });
        });
      };
      xhr.onerror = function() {
        clearTimeout(timer);
        reject("", { errCode: 602001 });
      };
      xhr.onabort = function() {
        clearTimeout(timer);
        reject("abort", { errCode: 600003 });
      };
      xhr.onload = function() {
        clearTimeout(timer);
        const statusCode = xhr.status;
        const responseHeaders = xhr.getAllResponseHeaders();
        const header2 = responseHeaders ? responseHeaders.trim().split(/[\r\n]+/).reduce((acc, line) => {
          const parts = line.split(": ");
          const header3 = parts.shift();
          const value = parts.join(": ");
          acc[header3] = value;
          return acc;
        }, {}) : {};
        resolve2({
          statusCode,
          data: xhr.responseText || xhr.response,
          header: header2
        });
      };
      if (!uploadTask._isAbort) {
        timer = setTimeout(function() {
          xhr.upload.onprogress = xhr.onload = xhr.onabort = xhr.onerror = null;
          uploadTask.abort();
          reject("timeout", { errCode: 5 });
        }, timeout);
        xhr.send(form);
        uploadTask._xhr = xhr;
      } else {
        reject("abort", { errCode: 600003 });
      }
    }
    Promise.all(
      files2.map(
        ({ file: file2, uri }) => file2 instanceof Blob ? Promise.resolve(blobToFile(file2)) : urlToFile(uri)
      )
    ).then(upload).catch(() => {
      setTimeout(() => {
        reject("file error");
      }, 0);
    });
    return uploadTask;
  },
  UploadFileProtocol,
  UploadFileOptions
);
const socketTasks = [];
const globalEvent = {
  open: "",
  close: "",
  error: "",
  message: ""
};
class SocketTask {
  /**
   * 构造函数
   * @param {string} url
   * @param {Array} protocols
   */
  constructor(url, protocols, callback) {
    this._callbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    let error;
    try {
      const webSocket = this._webSocket = new WebSocket(url, protocols);
      webSocket.binaryType = "arraybuffer";
      const eventNames = ["open", "close", "error", "message"];
      eventNames.forEach((name) => {
        this._callbacks[name] = [];
        webSocket.addEventListener(name, (event) => {
          const { data, code, reason } = event;
          const res = name === "message" ? { data } : name === "close" ? { code, reason } : {};
          this._callbacks[name].forEach((callback2) => {
            try {
              callback2(res);
            } catch (e2) {
              console.error(
                `thirdScriptError
${e2};at socketTask.on${capitalize(
                  name
                )} callback function
`,
                e2
              );
            }
          });
          if (this === socketTasks[0] && globalEvent[name]) {
            UniServiceJSBridge$1.invokeOnCallback(globalEvent[name], res);
          }
          if (name === "error" || name === "close") {
            const index2 = socketTasks.indexOf(this);
            if (index2 >= 0) {
              socketTasks.splice(index2, 1);
            }
          }
        });
      });
      const propertys = [
        "CLOSED",
        "CLOSING",
        "CONNECTING",
        "OPEN",
        "readyState"
      ];
      propertys.forEach((property) => {
        Object.defineProperty(this, property, {
          get() {
            return webSocket[property];
          }
        });
      });
    } catch (e2) {
      error = e2;
    }
    callback && callback(error, this);
  }
  /**
   * 发送
   * @param {any} data
   */
  send(options) {
    const data = (options || {}).data;
    const ws = this._webSocket;
    try {
      if (ws.readyState !== ws.OPEN) {
        callOptions(options, {
          errMsg: `sendSocketMessage:fail SocketTask.readyState is not OPEN`,
          errCode: 10002
        });
        throw new Error("SocketTask.readyState is not OPEN");
      }
      ws.send(data);
      callOptions(options, "sendSocketMessage:ok");
    } catch (error) {
      callOptions(options, {
        errMsg: `sendSocketMessage:fail ${error}`,
        errCode: 602001
      });
    }
  }
  /**
   * 关闭
   * @param {number} code
   * @param {string} reason
   */
  close(options = {}) {
    const ws = this._webSocket;
    try {
      const code = options.code || 1e3;
      const reason = options.reason;
      if (isString(reason)) {
        ws.close(code, reason);
      } else {
        ws.close(code);
      }
      callOptions(options, "closeSocket:ok");
    } catch (error) {
      callOptions(options, `closeSocket:fail ${error}`);
    }
  }
  onOpen(callback) {
    this._callbacks.open.push(callback);
  }
  onMessage(callback) {
    this._callbacks.message.push(callback);
  }
  onError(callback) {
    this._callbacks.error.push(callback);
  }
  onClose(callback) {
    this._callbacks.close.push(callback);
  }
}
const connectSocket = /* @__PURE__ */ defineTaskApi(
  API_CONNECT_SOCKET,
  ({ url, protocols }, { resolve: resolve2, reject }) => {
    return new SocketTask(
      url,
      protocols,
      (error, socketTask) => {
        if (error) {
          reject(error.toString(), {
            errCode: 600009
          });
          return;
        }
        socketTasks.push(socketTask);
        resolve2();
      }
    );
  },
  ConnectSocketProtocol,
  ConnectSocketOptions
);
function callSocketTask(socketTask, method, option, resolve2, reject) {
  const fn = socketTask[method];
  if (isFunction(fn)) {
    fn.call(
      socketTask,
      extend$1({}, option, {
        success() {
          resolve2();
        },
        fail({ errMsg }) {
          reject(errMsg.replace("sendSocketMessage:fail ", ""));
        },
        complete: void 0
      })
    );
  }
}
const closeSocket = /* @__PURE__ */ defineAsyncApi(
  API_CLOSE_SOCKET,
  (options, { resolve: resolve2, reject }) => {
    const socketTask = socketTasks[0];
    if (socketTask) {
      callSocketTask(socketTask, "close", options, resolve2, reject);
    } else {
      reject("WebSocket is not connected");
    }
  },
  CloseSocketProtocol
);
function on(event) {
  const api2 = `onSocket${capitalize(event)}`;
  return /* @__PURE__ */ defineOnApi(api2, () => {
    globalEvent[event] = api2;
  });
}
const onSocketOpen = /* @__PURE__ */ on("open");
const onSocketError = /* @__PURE__ */ on("error");
const onSocketMessage = /* @__PURE__ */ on("message");
const onSocketClose = /* @__PURE__ */ on("close");
const navigateBack = /* @__PURE__ */ defineAsyncApi(
  API_NAVIGATE_BACK,
  (args, { resolve: resolve2, reject }) => {
    let canBack = true;
    if (invokeHook(ON_BACK_PRESS, {
      from: args.from || "navigateBack"
    }) === true) {
      canBack = false;
    }
    if (!canBack) {
      return reject(ON_BACK_PRESS);
    }
    {
      getApp$1().$router.go(-args.delta);
    }
    return resolve2();
  },
  NavigateBackProtocol,
  NavigateBackOptions
);
const navigateTo = /* @__PURE__ */ defineAsyncApi(
  API_NAVIGATE_TO,
  // @ts-expect-error
  ({ url, events, isAutomatedTesting }, { resolve: resolve2, reject }) => {
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      navigateToPagesBeforeEntryPages.push({
        args: { type: API_NAVIGATE_TO, url, events, isAutomatedTesting },
        resolve: resolve2,
        reject
      });
      return;
    }
    return navigate({ type: API_NAVIGATE_TO, url, events, isAutomatedTesting }).then(resolve2).catch(reject);
  },
  NavigateToProtocol,
  NavigateToOptions
);
function onThemeChange(callback) {
  if (__uniConfig.darkmode) {
    UniServiceJSBridge$1.on(ON_THEME_CHANGE, callback);
  }
}
function offThemeChange(callback) {
  UniServiceJSBridge$1.off(ON_THEME_CHANGE, callback);
}
function parseTheme(pageStyle) {
  let parsedStyle = {};
  if (__uniConfig.darkmode) {
    parsedStyle = normalizeStyles(
      pageStyle,
      __uniConfig.themeConfig,
      getTheme()
    );
  }
  return __uniConfig.darkmode ? parsedStyle : pageStyle;
}
function useTheme(pageStyle, onThemeChangeCallback) {
  const isReactivity = isReactive(pageStyle);
  const reactivePageStyle = isReactivity ? reactive(parseTheme(pageStyle)) : parseTheme(pageStyle);
  if (__uniConfig.darkmode && isReactivity) {
    watch(pageStyle, (value) => {
      const _pageStyle = parseTheme(value);
      for (const key in _pageStyle) {
        reactivePageStyle[key] = _pageStyle[key];
      }
    });
  }
  onThemeChangeCallback && onThemeChange(onThemeChangeCallback);
  return reactivePageStyle;
}
const ModalTheme = {
  light: {
    cancelColor: "#000000"
  },
  dark: {
    cancelColor: "rgb(170, 170, 170)"
  }
};
const setCancelColor = (theme, cancelColor) => cancelColor.value = ModalTheme[theme].cancelColor;
const props$6 = {
  title: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: "Cancel"
  },
  cancelColor: {
    type: String,
    default: "#000000"
  },
  confirmText: {
    type: String,
    default: "OK"
  },
  confirmColor: {
    type: String,
    // @ts-expect-error
    default: "#007aff"
  },
  visible: {
    type: Boolean
  },
  editable: {
    type: Boolean,
    default: false
  },
  placeholderText: {
    type: String,
    default: ""
  }
};
const modal = /* @__PURE__ */ defineComponent({
  props: props$6,
  setup(props2, {
    emit: emit2
  }) {
    const editContent = ref("");
    const close = () => visible.value = false;
    const cancel = () => (close(), emit2("close", "cancel"));
    const confirm = () => (close(), emit2("close", "confirm", editContent.value));
    const visible = usePopup(props2, {
      onEsc: cancel,
      onEnter: () => {
        !props2.editable && confirm();
      }
    });
    const cancelColor = useOnThemeChange$1(props2);
    return () => {
      const {
        title,
        content,
        showCancel,
        confirmText,
        confirmColor,
        editable,
        placeholderText
      } = props2;
      editContent.value = content;
      return createVNode(Transition, {
        "name": "uni-fade"
      }, {
        default: () => [withDirectives(createVNode("uni-modal", {
          "onTouchmove": onEventPrevent
        }, [VNODE_MASK, createVNode("div", {
          "class": "uni-modal"
        }, [title || false ? createVNode("div", {
          "class": "uni-modal__hd"
        }, [createVNode("strong", {
          "class": "uni-modal__title",
          "textContent": title || ""
        }, null, 8, ["textContent"])]) : null, editable ? createVNode("textarea", {
          "class": "uni-modal__textarea",
          "rows": "1",
          "placeholder": placeholderText,
          "value": content,
          "onInput": (e2) => editContent.value = e2.target.value
        }, null, 40, ["placeholder", "value", "onInput"]) : createVNode("div", {
          "class": "uni-modal__bd",
          "onTouchmovePassive": onEventStop,
          "textContent": content
        }, null, 40, ["onTouchmovePassive", "textContent"]), createVNode("div", {
          "class": "uni-modal__ft"
        }, [showCancel && createVNode("div", {
          "style": {
            color: cancelColor.value
          },
          "class": "uni-modal__btn uni-modal__btn_default",
          "onClick": cancel
        }, [props2.cancelText], 12, ["onClick"]), createVNode("div", {
          "style": {
            color: confirmColor
          },
          "class": "uni-modal__btn uni-modal__btn_primary",
          "onClick": confirm
        }, [confirmText], 12, ["onClick"])])])], 40, ["onTouchmove"]), [[vShow, visible.value]])]
      });
    };
  }
});
function useOnThemeChange$1(props2) {
  const cancelColor = ref(props2.cancelColor);
  const _onThemeChange = ({
    theme
  }) => {
    setCancelColor(theme, cancelColor);
  };
  watchEffect(() => {
    if (props2.visible) {
      cancelColor.value = props2.cancelColor;
      if (props2.cancelColor === "#000") {
        if (getTheme() === "dark")
          _onThemeChange({
            theme: "dark"
          });
        onThemeChange(_onThemeChange);
      }
    } else {
      offThemeChange(_onThemeChange);
    }
  });
  return cancelColor;
}
let showModalState;
const onHidePopupOnce$1 = /* @__PURE__ */ once(() => {
  UniServiceJSBridge$1.on("onHidePopup", () => showModalState.visible = false);
});
let currentShowModalResolve;
function onModalClose(type, content) {
  const isConfirm = type === "confirm";
  const res = {
    confirm: isConfirm,
    cancel: type === "cancel"
  };
  isConfirm && showModalState.editable && (res.content = content);
  currentShowModalResolve && currentShowModalResolve(res);
}
const showModal = /* @__PURE__ */ defineAsyncApi(
  API_SHOW_MODAL,
  (args, { resolve: resolve2 }) => {
    onHidePopupOnce$1();
    currentShowModalResolve = resolve2;
    if (!showModalState) {
      showModalState = reactive(args);
      nextTick(
        () => (createRootApp(modal, showModalState, onModalClose).mount(
          ensureRoot("u-a-m")
        ), //下一帧执行，确保首次显示时有动画效果
        nextTick(() => showModalState.visible = true))
      );
    } else {
      extend$1(showModalState, args);
      showModalState.visible = true;
    }
  },
  ShowModalProtocol,
  ShowModalOptions
);
const props$5 = {
  title: {
    type: String,
    default: ""
  },
  icon: {
    default: "success",
    validator(value) {
      return SHOW_TOAST_ICON.indexOf(value) !== -1;
    }
  },
  image: {
    type: String,
    default: ""
  },
  duration: {
    type: Number,
    default: 1500
  },
  mask: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean
  }
};
const ToastIconClassName = "uni-toast__icon";
const ICONCOLOR = {
  light: "#fff",
  dark: "rgba(255,255,255,0.9)"
};
const getIconColor = (theme) => ICONCOLOR[theme];
const Toast = /* @__PURE__ */ defineComponent({
  name: "Toast",
  props: props$5,
  setup(props2) {
    initI18nShowToastMsgsOnce();
    initI18nShowLoadingMsgsOnce();
    const {
      Icon
    } = useToastIcon(props2);
    const visible = usePopup(props2, {});
    return () => {
      const {
        mask,
        duration,
        title,
        image: image2
      } = props2;
      return createVNode(Transition, {
        "name": "uni-fade"
      }, {
        default: () => [withDirectives(createVNode("uni-toast", {
          "data-duration": duration
        }, [mask ? createVNode("div", {
          "class": "uni-mask",
          "style": "background: transparent;",
          "onTouchmove": onEventPrevent
        }, null, 40, ["onTouchmove"]) : "", !image2 && !Icon.value ? createVNode("div", {
          "class": "uni-sample-toast"
        }, [createVNode("p", {
          "class": "uni-simple-toast__text"
        }, [title])]) : createVNode("div", {
          "class": "uni-toast"
        }, [image2 ? createVNode("img", {
          "src": image2,
          "class": ToastIconClassName
        }, null, 10, ["src"]) : Icon.value, createVNode("p", {
          "class": "uni-toast__content"
        }, [title])])], 8, ["data-duration"]), [[vShow, visible.value]])]
      });
    };
  }
});
function useToastIcon(props2) {
  const iconColor = ref(getIconColor(getTheme()));
  const _onThemeChange = ({
    theme
  }) => iconColor.value = getIconColor(theme);
  watchEffect(() => {
    if (props2.visible) {
      onThemeChange(_onThemeChange);
    } else {
      offThemeChange(_onThemeChange);
    }
  });
  const Icon = computed(() => {
    switch (props2.icon) {
      case "success":
        return createVNode(createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, iconColor.value, 38), {
          class: ToastIconClassName
        });
      case "error":
        return createVNode(createSvgIconVNode(ICON_PATH_WARN, iconColor.value, 38), {
          class: ToastIconClassName
        });
      case "loading":
        return createVNode("i", {
          "class": [ToastIconClassName, "uni-loading"]
        }, null, 2);
      default:
        return null;
    }
  });
  return {
    Icon
  };
}
let showToastState;
let showType = "";
let timeoutId;
const scope = /* @__PURE__ */ effectScope();
function watchVisible() {
  scope.run(() => {
    watch(
      [() => showToastState.visible, () => showToastState.duration],
      ([visible, duration]) => {
        if (visible) {
          timeoutId && clearTimeout(timeoutId);
          if (showType === "onShowLoading")
            return;
          timeoutId = setTimeout(() => {
            hidePopup("onHideToast");
          }, duration);
        } else {
          timeoutId && clearTimeout(timeoutId);
        }
      }
    );
  });
}
function createToast(args) {
  if (!showToastState) {
    showToastState = reactive(extend$1(args, { visible: false }));
    nextTick(() => {
      watchVisible();
      UniServiceJSBridge$1.on("onHidePopup", () => hidePopup("onHidePopup"));
      createRootApp(Toast, showToastState, () => {
      }).mount(ensureRoot("u-a-t"));
    });
  } else {
    extend$1(showToastState, args);
  }
  setTimeout(() => {
    showToastState.visible = true;
  }, 10);
}
const showToast = /* @__PURE__ */ defineAsyncApi(
  API_SHOW_TOAST,
  (args, { resolve: resolve2, reject }) => {
    createToast(args);
    showType = "onShowToast";
    resolve2();
  },
  ShowToastProtocol,
  ShowToastOptions
);
const showLoadingDefaultState = {
  icon: "loading",
  duration: 1e8,
  image: ""
};
const showLoading = /* @__PURE__ */ defineAsyncApi(
  API_SHOW_LOADING,
  (args, { resolve: resolve2, reject }) => {
    extend$1(args, showLoadingDefaultState);
    createToast(args);
    showType = "onShowLoading";
    resolve2();
  },
  ShowLoadingProtocol,
  ShowLoadingOptions
);
const hideLoading = /* @__PURE__ */ defineAsyncApi(
  API_HIDE_LOADING,
  (args, { resolve: resolve2, reject }) => {
    hidePopup("onHideLoading");
    resolve2();
  }
);
function hidePopup(type) {
  const { t: t2 } = useI18n();
  if (!showType) {
    return;
  }
  let warnMsg = "";
  if (type === "onHideToast" && showType !== "onShowToast") {
    warnMsg = t2("uni.showToast.unpaired");
  } else if (type === "onHideLoading" && showType !== "onShowLoading") {
    warnMsg = t2("uni.showLoading.unpaired");
  }
  if (warnMsg) {
    return console.warn(warnMsg);
  }
  showType = "";
  setTimeout(() => {
    showToastState.visible = false;
  }, 10);
}
function usePopupStyle(props2) {
  const popupWidth = ref(0);
  const popupHeight = ref(0);
  const isDesktop = computed(
    () => popupWidth.value >= 500 && popupHeight.value >= 500
  );
  const popupStyle = computed(() => {
    const style = {
      content: {
        transform: "",
        left: "",
        top: "",
        bottom: ""
      },
      triangle: {
        left: "",
        top: "",
        bottom: "",
        "border-width": "",
        "border-color": ""
      }
    };
    const contentStyle = style.content;
    const triangleStyle = style.triangle;
    const popover = props2.popover;
    function getNumber(value) {
      return Number(value) || 0;
    }
    if (isDesktop.value && popover) {
      extend$1(triangleStyle, {
        position: "absolute",
        width: "0",
        height: "0",
        "margin-left": "-6px",
        "border-style": "solid"
      });
      const popoverLeft = getNumber(popover.left);
      const popoverWidth = getNumber(popover.width ? popover.width : 300);
      const popoverTop = getNumber(popover.top);
      const popoverHeight = getNumber(popover.height);
      const center = popoverLeft + popoverWidth / 2;
      contentStyle.transform = "none !important";
      const contentLeft = Math.max(0, center - popoverWidth / 2);
      contentStyle.left = `${contentLeft}px`;
      if (popover.width) {
        contentStyle.width = `${popoverWidth}px`;
      }
      let triangleLeft = Math.max(12, center - contentLeft);
      triangleLeft = Math.min(popoverWidth - 12, triangleLeft);
      triangleStyle.left = `${triangleLeft}px`;
      const vcl = popupHeight.value / 2;
      if (popoverTop + popoverHeight - vcl > vcl - popoverTop) {
        contentStyle.top = "auto";
        contentStyle.bottom = `${popupHeight.value - popoverTop + 6}px`;
        triangleStyle.bottom = "-6px";
        triangleStyle["border-width"] = "6px 6px 0 6px";
        triangleStyle["border-color"] = "#fcfcfd transparent transparent transparent";
      } else {
        contentStyle.top = `${popoverTop + popoverHeight + 6}px`;
        triangleStyle.top = "-6px";
        triangleStyle["border-width"] = "0 6px 6px 6px";
        triangleStyle["border-color"] = "transparent transparent #fcfcfd transparent";
      }
    }
    return style;
  });
  onMounted(() => {
    const fixSize = () => {
      const { windowWidth, windowHeight, windowTop } = getSystemInfoSync();
      popupWidth.value = windowWidth;
      popupHeight.value = windowHeight + (windowTop || 0);
    };
    window.addEventListener("resize", fixSize);
    fixSize();
    onUnmounted(() => {
      window.removeEventListener("resize", fixSize);
    });
  });
  return {
    isDesktop,
    popupStyle
  };
}
function updateDocumentTitle(title) {
  if (title && title !== document.title) {
    document.title = title;
  }
  UniServiceJSBridge$1.emit(ON_NAVIGATION_BAR_CHANGE, { titleText: title });
}
function useDocumentTitle(pageMeta) {
  function update() {
    updateDocumentTitle(pageMeta.navigationBar.titleText);
  }
  watchEffect(update);
  onActivated(update);
}
const stopPullDownRefresh = /* @__PURE__ */ defineAsyncApi(
  API_STOP_PULL_DOWN_REFRESH,
  (_args, { resolve: resolve2 }) => {
    UniServiceJSBridge$1.invokeViewMethod(
      API_STOP_PULL_DOWN_REFRESH,
      {},
      getCurrentPageId()
    );
    resolve2();
  }
);
const DEFAULT_CSS_VAR_VALUE = "0px";
const LayoutComponent = /* @__PURE__ */ defineSystemComponent({
  name: "Layout",
  setup(_props, {
    emit: emit2
  }) {
    const rootRef = ref(null);
    initCssVar();
    const keepAliveRoute = useKeepAliveRoute();
    const {
      layoutState,
      windowState
    } = useState();
    useMaxWidth(layoutState, rootRef);
    const showTabBar2 = false;
    const clazz2 = useAppClass(showTabBar2);
    return () => {
      const layoutTsx = createLayoutTsx(keepAliveRoute);
      const tabBarTsx = false;
      return createVNode("uni-app", {
        "ref": rootRef,
        "class": clazz2.value
      }, [layoutTsx, tabBarTsx], 2);
    };
  }
});
function useAppClass(showTabBar2) {
  const showMaxWidth = ref(false);
  return computed(() => {
    return {
      "uni-app--showtabbar": showTabBar2,
      "uni-app--maxwidth": showMaxWidth.value
    };
  });
}
function initCssVar() {
  updateCssVar({
    "--status-bar-height": DEFAULT_CSS_VAR_VALUE,
    "--top-window-height": DEFAULT_CSS_VAR_VALUE,
    "--window-left": DEFAULT_CSS_VAR_VALUE,
    "--window-right": DEFAULT_CSS_VAR_VALUE,
    "--window-margin": DEFAULT_CSS_VAR_VALUE,
    "--tab-bar-height": DEFAULT_CSS_VAR_VALUE
  });
}
function useMaxWidth(layoutState, rootRef) {
  const route = usePageRoute();
  function checkMaxWidth2() {
    const windowWidth = document.body.clientWidth;
    const pages = getCurrentBasePages();
    let meta = {};
    if (pages.length > 0) {
      const curPage = pages[pages.length - 1];
      meta = getPage$BasePage(curPage).meta;
    } else {
      const routeOptions = getRouteOptions(route.path, true);
      if (routeOptions) {
        meta = routeOptions.meta;
      }
    }
    const maxWidth2 = parseInt(String((hasOwn$1(meta, "maxWidth") ? meta.maxWidth : __uniConfig.globalStyle.maxWidth) || Number.MAX_SAFE_INTEGER));
    let showMaxWidth = false;
    if (windowWidth > maxWidth2) {
      showMaxWidth = true;
    } else {
      showMaxWidth = false;
    }
    if (showMaxWidth && maxWidth2) {
      layoutState.marginWidth = (windowWidth - maxWidth2) / 2;
      nextTick(() => {
        const rootEl = rootRef.value;
        if (rootEl) {
          rootEl.setAttribute("style", "max-width:" + maxWidth2 + "px;margin:0 auto;");
        }
      });
    } else {
      layoutState.marginWidth = 0;
      nextTick(() => {
        const rootEl = rootRef.value;
        if (rootEl) {
          rootEl.removeAttribute("style");
        }
      });
    }
  }
  watch([() => route.path], checkMaxWidth2);
  onMounted(() => {
    checkMaxWidth2();
    window.addEventListener("resize", checkMaxWidth2);
  });
}
function useState() {
  usePageRoute();
  {
    const layoutState2 = reactive({
      marginWidth: 0,
      leftWindowWidth: 0,
      rightWindowWidth: 0
    });
    watch(() => layoutState2.marginWidth, (value) => updateCssVar({
      "--window-margin": value + "px"
    }));
    watch(() => layoutState2.leftWindowWidth + layoutState2.marginWidth, (value) => {
      updateCssVar({
        "--window-left": value + "px"
      });
    });
    watch(() => layoutState2.rightWindowWidth + layoutState2.marginWidth, (value) => {
      updateCssVar({
        "--window-right": value + "px"
      });
    });
    return {
      layoutState: layoutState2,
      windowState: computed(() => ({}))
    };
  }
}
function createLayoutTsx(keepAliveRoute, layoutState, windowState, topWindow, leftWindow, rightWindow) {
  const routerVNode = createRouterViewVNode(keepAliveRoute);
  {
    return routerVNode;
  }
}
function createRouterViewVNode({
  routeKey,
  isTabBar,
  routeCache: routeCache2
}) {
  return createVNode(RouterView, null, {
    default: withCtx(({
      Component
    }) => [(openBlock(), createBlock(KeepAlive, {
      matchBy: "key",
      cache: routeCache2
    }, [(openBlock(), createBlock(resolveDynamicComponent(Component), {
      type: isTabBar.value ? "tabBar" : "",
      key: routeKey.value
    }))], 1032, ["cache"]))]),
    _: 1
    /* STABLE */
  });
}
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function getDefaultStartValue(props2) {
  if (props2.mode === mode.TIME) {
    return "00:00";
  }
  if (props2.mode === mode.DATE) {
    const year = (/* @__PURE__ */ new Date()).getFullYear() - 150;
    switch (props2.fields) {
      case fields.YEAR:
        return year.toString();
      case fields.MONTH:
        return year + "-01";
      default:
        return year + "-01-01";
    }
  }
  return "";
}
function getDefaultEndValue(props2) {
  if (props2.mode === mode.TIME) {
    return "23:59";
  }
  if (props2.mode === mode.DATE) {
    const year = (/* @__PURE__ */ new Date()).getFullYear() + 150;
    switch (props2.fields) {
      case fields.YEAR:
        return year.toString();
      case fields.MONTH:
        return year + "-12";
      default:
        return year + "-12-31";
    }
  }
  return "";
}
function getDateValueArray(props2, state2, valueStr, defaultValue) {
  const splitStr = props2.mode === mode.DATE ? "-" : ":";
  const array = props2.mode === mode.DATE ? state2.dateArray : state2.timeArray;
  let max;
  if (props2.mode === mode.TIME) {
    max = 2;
  } else {
    switch (props2.fields) {
      case fields.YEAR:
        max = 1;
        break;
      case fields.MONTH:
        max = 2;
        break;
      default:
        max = 3;
        break;
    }
  }
  const inputArray = String(valueStr).split(splitStr);
  let value = [];
  for (let i = 0; i < max; i++) {
    const val = inputArray[i];
    value.push(array[i].indexOf(val));
  }
  if (value.indexOf(-1) >= 0) {
    value = defaultValue ? getDateValueArray(props2, state2, defaultValue) : value.map(() => 0);
  }
  return value;
}
const mode = {
  SELECTOR: "selector",
  MULTISELECTOR: "multiSelector",
  TIME: "time",
  DATE: "date"
  // 暂不支持城市选择
  // REGION: 'region'
};
const fields = {
  YEAR: "year",
  MONTH: "month",
  DAY: "day"
};
const selectorType = {
  PICKER: "picker",
  SELECT: "select"
};
const props = {
  name: {
    type: String,
    default: ""
  },
  range: {
    type: Array,
    default() {
      return [];
    }
  },
  rangeKey: {
    type: String,
    default: ""
  },
  value: {
    type: [Number, String, Array],
    default: 0
  },
  mode: {
    type: String,
    default: mode.SELECTOR,
    validator(val) {
      return Object.values(mode).includes(val);
    }
  },
  fields: {
    type: String,
    default: ""
  },
  start: {
    type: String,
    default: (props2) => {
      return getDefaultStartValue(props2);
    }
  },
  end: {
    type: String,
    default: (props2) => {
      return getDefaultEndValue(props2);
    }
  },
  disabled: {
    type: [Boolean, String],
    default: false
  },
  selectorType: {
    type: String,
    default: ""
  }
};
const index$7 = /* @__PURE__ */ defineBuiltInComponent({
  name: "Picker",
  compatConfig: {
    MODE: 3
  },
  props,
  emits: ["change", "cancel", "columnchange"],
  setup(props2, {
    emit: emit2,
    slots
  }) {
    initI18nPickerMsgsOnce();
    const {
      t: t2
    } = useI18n();
    const rootRef = ref(null);
    const pickerRef = ref(null);
    const selectRef = ref(null);
    const inputRef = ref(null);
    const pickerRender = ref(false);
    const {
      state: state2,
      rangeArray
    } = usePickerState(props2);
    const trigger2 = useCustomEvent(rootRef, emit2);
    const {
      system,
      selectorTypeComputed,
      _show,
      _l10nColumn,
      _l10nItem,
      _input,
      _fixInputPosition,
      _pickerViewChange,
      _cancel,
      _change,
      _resetFormData,
      _getFormData,
      _createTime,
      _createDate,
      _setValueSync
    } = usePickerMethods(props2, state2, trigger2, rootRef, pickerRef, selectRef, inputRef);
    usePickerWatch(state2, _cancel, _change);
    usePickerForm(_resetFormData, _getFormData);
    _createTime();
    _createDate();
    _setValueSync();
    const popup = usePopupStyle(state2);
    watchEffect(() => {
      state2.isDesktop = popup.isDesktop.value;
      state2.popupStyle = popup.popupStyle.value;
    });
    onBeforeUnmount(() => {
      pickerRef.value && pickerRef.value.remove();
    });
    onMounted(() => {
      pickerRender.value = true;
    });
    return () => {
      let _slot2;
      const {
        visible,
        contentVisible,
        valueArray,
        popupStyle,
        valueSync
      } = state2;
      const {
        rangeKey,
        mode: mode2,
        start,
        end
      } = props2;
      const booleanAttrs = useBooleanAttr(props2, "disabled");
      return createVNode("uni-picker", mergeProps({
        "ref": rootRef
      }, booleanAttrs, {
        "onClick": withWebEvent(_show)
      }), [pickerRender.value ? createVNode("div", {
        "ref": pickerRef,
        "class": ["uni-picker-container", `uni-${mode2}-${selectorTypeComputed.value}`],
        "onWheel": onEventPrevent,
        "onTouchmove": onEventPrevent
      }, [createVNode(Transition, {
        "name": "uni-fade"
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "uni-mask uni-picker-mask",
          "onClick": withWebEvent(_cancel),
          "onMousemove": _fixInputPosition
        }, null, 40, ["onClick", "onMousemove"]), [[vShow, visible]])]
      }), !system.value ? createVNode("div", {
        "class": [{
          "uni-picker-toggle": visible
        }, "uni-picker-custom"],
        "style": popupStyle.content
      }, [createVNode("div", {
        "class": "uni-picker-header",
        "onClick": onEventStop
      }, [createVNode("div", {
        "class": "uni-picker-action uni-picker-action-cancel",
        "onClick": withWebEvent(_cancel)
      }, [t2("uni.picker.cancel")], 8, ["onClick"]), createVNode("div", {
        "class": "uni-picker-action uni-picker-action-confirm",
        "onClick": _change
      }, [t2("uni.picker.done")], 8, ["onClick"])], 8, ["onClick"]), contentVisible ? createVNode(PickerView, {
        "value": _l10nColumn(valueArray),
        "class": "uni-picker-content",
        "onChange": _pickerViewChange
      }, _isSlot(_slot2 = renderList(_l10nColumn(rangeArray.value), (rangeItem, index0) => {
        let _slot;
        return createVNode(PickerViewColumn, {
          "key": index0
        }, _isSlot(_slot = renderList(rangeItem, (item, index2) => createVNode("div", {
          "key": index2,
          "class": "uni-picker-item"
        }, [typeof item === "object" ? item[rangeKey] || "" : _l10nItem(item, index0)]))) ? _slot : {
          default: () => [_slot],
          _: 1
        });
      })) ? _slot2 : {
        default: () => [_slot2],
        _: 1
      }, 8, ["value", "onChange"]) : null, createVNode("div", {
        "ref": selectRef,
        "class": "uni-picker-select",
        "onWheel": onEventStop,
        "onTouchmove": onEventStop
      }, [renderList(rangeArray.value[0], (item, index2) => createVNode("div", {
        "key": index2,
        "class": ["uni-picker-item", {
          selected: valueArray[0] === index2
        }],
        "onClick": () => {
          valueArray[0] = index2;
          _change();
        }
      }, [typeof item === "object" ? item[rangeKey] || "" : item], 10, ["onClick"]))], 40, ["onWheel", "onTouchmove"]), createVNode("div", {
        "style": popupStyle.triangle
      }, null, 4)], 6) : null], 40, ["onWheel", "onTouchmove"]) : null, createVNode("div", null, [slots.default && slots.default()]), system.value ? createVNode("div", {
        "class": "uni-picker-system",
        "onMousemove": withWebEvent(_fixInputPosition)
      }, [createVNode("input", {
        "class": ["uni-picker-system_input", system.value],
        "ref": inputRef,
        "value": valueSync,
        "type": mode2,
        "tabindex": "-1",
        "min": start,
        "max": end,
        "onChange": ($event) => {
          _input($event);
          onEventStop($event);
        }
      }, null, 42, ["value", "type", "min", "max", "onChange"])], 40, ["onMousemove"]) : null], 16, ["onClick"]);
    };
  }
});
function usePickerState(props2) {
  const state2 = reactive({
    valueSync: void 0,
    visible: false,
    contentVisible: false,
    popover: null,
    valueChangeSource: "",
    timeArray: [],
    dateArray: [],
    valueArray: [],
    oldValueArray: [],
    isDesktop: false,
    popupStyle: {
      content: {},
      triangle: {}
    }
  });
  const rangeArray = computed(() => {
    let val = props2.range;
    switch (props2.mode) {
      case mode.SELECTOR:
        return [val];
      case mode.MULTISELECTOR:
        return val;
      case mode.TIME:
        return state2.timeArray;
      case mode.DATE: {
        const dateArray = state2.dateArray;
        switch (props2.fields) {
          case fields.YEAR:
            return [dateArray[0]];
          case fields.MONTH:
            return [dateArray[0], dateArray[1]];
          default:
            return [dateArray[0], dateArray[1], dateArray[2]];
        }
      }
    }
    return [];
  });
  return {
    state: state2,
    rangeArray
  };
}
const getiPadFlag = () => String(navigator.vendor).indexOf("Apple") === 0 && navigator.maxTouchPoints > 0;
function useIsiPad() {
  const isiPad = ref(false);
  {
    isiPad.value = getiPadFlag();
  }
  return isiPad;
}
const getSystem = () => {
  if (/win|mac/i.test(navigator.platform)) {
    if (navigator.vendor === "Google Inc.") {
      return "chrome";
    } else if (/Firefox/.test(navigator.userAgent)) {
      return "firefox";
    }
  }
  return "";
};
function useSystem() {
  const _system = ref("");
  {
    _system.value = getSystem();
  }
  return _system;
}
let __contentVisibleDelay;
function usePickerMethods(props2, state2, trigger2, rootRef, pickerRef, selectRef, inputRef) {
  const isiPad = useIsiPad();
  const _system = useSystem();
  const selectorTypeComputed = computed(() => {
    const type = props2.selectorType;
    if (Object.values(selectorType).includes(type)) {
      return type;
    }
    return isiPad.value ? selectorType.PICKER : selectorType.SELECT;
  });
  const system = computed(() => {
    if (props2.mode === mode.DATE && !Object.values(fields).includes(props2.fields) && state2.isDesktop) {
      return _system.value;
    }
    return "";
  });
  const startArray = computed(() => {
    return getDateValueArray(props2, state2, props2.start, getDefaultStartValue(props2));
  });
  const endArray = computed(() => {
    return getDateValueArray(props2, state2, props2.end, getDefaultEndValue(props2));
  });
  function _show(event) {
    if (props2.disabled) {
      return;
    }
    state2.valueChangeSource = "";
    let $picker = pickerRef.value;
    let _currentTarget = event.currentTarget;
    $picker.remove();
    (document.querySelector("uni-app") || document.body).appendChild($picker);
    $picker.style.display = "block";
    const rect = _currentTarget.getBoundingClientRect();
    state2.popover = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    setTimeout(() => {
      state2.visible = true;
    }, 20);
  }
  function _getFormData() {
    return {
      value: state2.valueSync,
      key: props2.name
    };
  }
  function _resetFormData() {
    switch (props2.mode) {
      case mode.SELECTOR:
        state2.valueSync = 0;
        break;
      case mode.MULTISELECTOR:
        state2.valueSync = props2.value.map((val) => 0);
        break;
      case mode.DATE:
      case mode.TIME:
        state2.valueSync = "";
        break;
    }
  }
  function _createTime() {
    let hours = [];
    let minutes = [];
    for (let i = 0; i < 24; i++) {
      hours.push((i < 10 ? "0" : "") + i);
    }
    for (let i = 0; i < 60; i++) {
      minutes.push((i < 10 ? "0" : "") + i);
    }
    state2.timeArray.push(hours, minutes);
  }
  function getYearStartEnd() {
    let year = (/* @__PURE__ */ new Date()).getFullYear();
    let start = year - 150;
    let end = year + 150;
    if (props2.start) {
      const _year = new Date(props2.start).getFullYear();
      if (!isNaN(_year) && _year < start) {
        start = _year;
      }
    }
    if (props2.end) {
      const _year = new Date(props2.end).getFullYear();
      if (!isNaN(_year) && _year > end) {
        end = _year;
      }
    }
    return {
      start,
      end
    };
  }
  function _createDate() {
    let years = [];
    const year = getYearStartEnd();
    for (let i = year.start, end = year.end; i <= end; i++) {
      years.push(String(i));
    }
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push((i < 10 ? "0" : "") + i);
    }
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push((i < 10 ? "0" : "") + i);
    }
    state2.dateArray.push(years, months, days);
  }
  function _getTimeValue(val) {
    return val[0] * 60 + val[1];
  }
  function _getDateValue(val) {
    const DAY = 31;
    return val[0] * DAY * 12 + (val[1] || 0) * DAY + (val[2] || 0);
  }
  function _cloneArray(val1, val2) {
    for (let i = 0; i < val1.length && i < val2.length; i++) {
      val1[i] = val2[i];
    }
  }
  function _setValueSync() {
    let val = props2.value;
    switch (props2.mode) {
      case mode.MULTISELECTOR:
        {
          if (!isArray$1(val)) {
            val = state2.valueArray;
          }
          if (!isArray$1(state2.valueSync)) {
            state2.valueSync = [];
          }
          const length = state2.valueSync.length = Math.max(val.length, props2.range.length);
          for (let index2 = 0; index2 < length; index2++) {
            const val0 = Number(val[index2]);
            const val1 = Number(state2.valueSync[index2]);
            const val2 = isNaN(val0) ? isNaN(val1) ? 0 : val1 : val0;
            const maxVal = props2.range[index2] ? props2.range[index2].length - 1 : 0;
            state2.valueSync.splice(index2, 1, val2 < 0 || val2 > maxVal ? 0 : val2);
          }
        }
        break;
      case mode.TIME:
      case mode.DATE:
        state2.valueSync = String(val);
        break;
      default: {
        const valueSync = Number(val);
        state2.valueSync = valueSync < 0 ? 0 : valueSync;
        break;
      }
    }
  }
  function _setValueArray() {
    let val = state2.valueSync;
    let valueArray;
    switch (props2.mode) {
      case mode.MULTISELECTOR:
        valueArray = [...val];
        break;
      case mode.TIME:
        valueArray = getDateValueArray(props2, state2, val, formatDateTime({
          mode: mode.TIME
        }));
        break;
      case mode.DATE:
        valueArray = getDateValueArray(props2, state2, val, formatDateTime({
          mode: mode.DATE
        }));
        break;
      default:
        valueArray = [val];
        break;
    }
    state2.oldValueArray = [...valueArray];
    state2.valueArray = [...valueArray];
  }
  function _getValue() {
    let val = state2.valueArray;
    switch (props2.mode) {
      case mode.SELECTOR:
        return val[0];
      case mode.MULTISELECTOR:
        return val.map((val2) => val2);
      case mode.TIME:
        return state2.valueArray.map((val2, i) => state2.timeArray[i][val2]).join(":");
      case mode.DATE:
        return state2.valueArray.map((val2, i) => state2.dateArray[i][val2]).join("-");
    }
  }
  function _change() {
    _close();
    state2.valueChangeSource = "click";
    const value = _getValue();
    state2.valueSync = isArray$1(value) ? value.map((val) => val) : value;
    trigger2("change", {}, {
      value
    });
  }
  function _cancel($event) {
    if (system.value === "firefox" && $event) {
      const {
        top,
        left,
        width,
        height
      } = state2.popover;
      const {
        pageX,
        pageY
      } = $event;
      if (pageX > left && pageX < left + width && pageY > top && pageY < top + height) {
        return;
      }
    }
    _close();
    trigger2("cancel", {}, {});
  }
  function _close() {
    state2.visible = false;
    setTimeout(() => {
      let $picker = pickerRef.value;
      $picker.remove();
      rootRef.value.prepend($picker);
      $picker.style.display = "none";
    }, 260);
  }
  function _select() {
    if (props2.mode === mode.SELECTOR && selectorTypeComputed.value === selectorType.SELECT) {
      selectRef.value.scrollTop = state2.valueArray[0] * 34;
    }
  }
  function _input($event) {
    const EventTarget = $event.target;
    state2.valueSync = EventTarget.value;
    nextTick(() => {
      _change();
    });
  }
  function _fixInputPosition($event) {
    if (system.value === "chrome") {
      const rect = rootRef.value.getBoundingClientRect();
      const fontSize = 32;
      inputRef.value.style.left = `${$event.clientX - rect.left - fontSize * 1.5}px`;
      inputRef.value.style.top = `${$event.clientY - rect.top - fontSize * 0.5}px`;
    }
  }
  function _pickerViewChange(event) {
    state2.valueArray = _l10nColumn(event.detail.value, true);
  }
  function _l10nColumn(array, normalize) {
    const {
      getLocale: getLocale2
    } = useI18n();
    if (props2.mode === mode.DATE) {
      const locale2 = getLocale2();
      if (!locale2.startsWith("zh")) {
        switch (props2.fields) {
          case fields.YEAR:
            return array;
          case fields.MONTH:
            return [array[1], array[0]];
          default:
            switch (locale2) {
              case "es":
              case "fr":
                return [array[2], array[1], array[0]];
              default:
                return normalize ? [array[2], array[0], array[1]] : [array[1], array[2], array[0]];
            }
        }
      }
    }
    return array;
  }
  function _l10nItem(item, index2) {
    const {
      getLocale: getLocale2
    } = useI18n();
    if (props2.mode === mode.DATE) {
      const locale2 = getLocale2();
      if (locale2.startsWith("zh")) {
        const array = ["年", "月", "日"];
        return item + array[index2];
      } else if (props2.fields !== fields.YEAR && index2 === (props2.fields !== fields.MONTH && (locale2 === "es" || locale2 === "fr") ? 1 : 0)) {
        let array;
        switch (locale2) {
          case "es":
            array = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "​​julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
            break;
          case "fr":
            array = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
            break;
          default:
            array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            break;
        }
        return array[Number(item) - 1];
      }
    }
    return item;
  }
  watch(() => state2.visible, (val) => {
    if (val) {
      clearTimeout(__contentVisibleDelay);
      state2.contentVisible = val;
      _select();
    } else {
      __contentVisibleDelay = setTimeout(() => {
        state2.contentVisible = val;
      }, 300);
    }
  });
  watch([() => props2.mode, () => props2.value, () => props2.range], _setValueSync, {
    deep: true
  });
  watch(() => state2.valueSync, _setValueArray, {
    deep: true
  });
  watch(() => state2.valueArray, (val) => {
    if (props2.mode === mode.TIME || props2.mode === mode.DATE) {
      const getValue = props2.mode === mode.TIME ? _getTimeValue : _getDateValue;
      const valueArray = state2.valueArray;
      const _startArray = startArray.value;
      const _endArray = endArray.value;
      if (props2.mode === mode.DATE) {
        const dateArray = state2.dateArray;
        const max = dateArray[2].length;
        const day = Number(dateArray[2][valueArray[2]]) || 1;
        const realDay = (/* @__PURE__ */ new Date(`${dateArray[0][valueArray[0]]}/${dateArray[1][valueArray[1]]}/${day}`)).getDate();
        if (realDay < day) {
          valueArray[2] -= realDay + max - day;
        }
      }
      if (getValue(valueArray) < getValue(_startArray)) {
        _cloneArray(valueArray, _startArray);
      } else if (getValue(valueArray) > getValue(_endArray)) {
        _cloneArray(valueArray, _endArray);
      }
    }
    val.forEach((value, column) => {
      if (value !== state2.oldValueArray[column]) {
        state2.oldValueArray[column] = value;
        if (props2.mode === mode.MULTISELECTOR) {
          trigger2("columnchange", {}, {
            column,
            value
          });
        }
      }
    });
  });
  return {
    selectorTypeComputed,
    system,
    _show,
    _cancel,
    _change,
    _l10nColumn,
    _l10nItem,
    _input,
    _resetFormData,
    _getFormData,
    _createTime,
    _createDate,
    _setValueSync,
    _fixInputPosition,
    _pickerViewChange
  };
}
function usePickerWatch(state2, _cancel, _change) {
  const {
    key,
    disable
  } = useKeyboard();
  watchEffect(() => {
    disable.value = !state2.visible;
  });
  watch(key, (value) => {
    if (value === "esc") {
      _cancel();
    } else if (value === "enter") {
      _change();
    }
  });
}
function usePickerForm(_resetFormData, _getFormData) {
  const uniForm = inject(uniFormKey, false);
  if (uniForm) {
    const field = {
      reset: _resetFormData,
      submit: () => {
        const data = ["", null];
        const {
          key,
          value
        } = _getFormData();
        if (key !== "") {
          data[0] = key;
          data[1] = value;
        }
        return data;
      }
    };
    uniForm.addField(field);
    onBeforeUnmount(() => {
      uniForm.removeField(field);
    });
  }
}
const _AdConfig = class _AdConfig2 {
  constructor() {
    __publicField(this, "_adConfig", null);
    __publicField(this, "_isLoading", false);
    __publicField(this, "_callbacks", []);
    __publicField(this, "_configLast", 0);
  }
  static get instance() {
    if (!_AdConfig2._instance) {
      _AdConfig2._instance = new _AdConfig2();
      _AdConfig2._instance._init();
    }
    return _AdConfig2._instance;
  }
  get adConfig() {
    return this._adConfig;
  }
  get isExpired() {
    if (this._adConfig == null) {
      return true;
    }
    if (!this._configLast) {
      return true;
    }
    return Math.abs(Date.now() - this._configLast) > _AdConfig2.CACHE_TIME;
  }
  _init() {
    var config = this._getConfig();
    if (config === null || !config.last) {
      return;
    }
    if (Math.abs(Date.now() - config.last) <= _AdConfig2.CACHE_TIME) {
      this._adConfig = config.data;
      this._configLast = config.last;
    }
  }
  get(adpid, success, fail) {
    _AdConfig2.IC++;
    if (this._adConfig != null) {
      this._doCallback(adpid, success, fail);
      if (this.isExpired) {
        this._loadAdConfig(adpid);
      }
      return;
    }
    this._callbacks.push({
      adpid,
      success,
      fail
    });
    this._loadAdConfig(adpid);
  }
  _doCallback(adpid, success, fail) {
    _AdConfig2.IS++;
    var {
      a: a2,
      b
    } = this._adConfig;
    const adData = a2[adpid];
    if (adData) {
      success(b, Array.isArray(adData) ? adData : [adData]);
    } else {
      fail(_AdConfig2.ERROR_INVALID_ADPID);
    }
  }
  _loadAdConfig(adpid) {
    if (this._isLoading === true) {
      return;
    }
    this._isLoading = true;
    const appid = typeof __uniConfig !== "undefined" ? __uniConfig.appId ?? "" : "";
    request({
      url: _AdConfig2.URL,
      method: "GET",
      timeout: 8e3,
      data: {
        d: location.hostname,
        a: adpid,
        appid
      },
      dataType: "json",
      success: (res) => {
        const rd = res.data;
        if (rd.ret === 0) {
          const data = rd.data;
          this._adConfig = data;
          this._configLast = Date.now();
          this._setConfig(data);
          this._callbacks.forEach(({
            adpid: adpid2,
            success,
            fail
          }) => {
            this._doCallback(adpid2, success, fail);
          });
        } else {
          this._callbacks.forEach((i) => {
            i.fail({
              errCode: rd.ret,
              errMsg: rd.msg
            });
          });
        }
        this._callbacks = [];
      },
      fail: (err) => {
        this._callbacks.forEach((i) => {
          i.fail(err);
        });
        this._callbacks = [];
      },
      complete: (c) => {
        this._isLoading = false;
      }
    });
  }
  _getConfig() {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null;
    }
    var data = localStorage.getItem(_AdConfig2.KEY);
    return data ? JSON.parse(data) : null;
  }
  _setConfig(data) {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null;
    }
    localStorage.setItem(_AdConfig2.KEY, JSON.stringify({
      last: Date.now(),
      data
    }));
  }
};
__publicField(_AdConfig, "IC", 0);
__publicField(_AdConfig, "IS", 0);
__publicField(_AdConfig, "URL", "https://hac1.dcloud.net.cn/ah5v2");
__publicField(_AdConfig, "KEY", "uni_app_ad_config");
__publicField(_AdConfig, "CACHE_TIME", 1e3 * 60 * 10);
__publicField(_AdConfig, "ERROR_INVALID_ADPID", {
  "-5002": "invalid adpid"
});
const _AdReport = class _AdReport2 {
  static get instance() {
    if (!_AdReport2._instance) {
      _AdReport2._instance = new _AdReport2();
    }
    return _AdReport2._instance;
  }
  constructor() {
    var config = this._getConfig();
    if (config && config.guid) {
      this._guid = config.guid;
      return;
    }
    this._guid = this._newGUID();
    this._setConfig(this._guid);
  }
  get(data) {
    this._process(Object.assign(data, {
      d: location.hostname,
      i: this._guid
    }));
  }
  _process(data) {
    request({
      url: _AdReport2.URL,
      method: "GET",
      data,
      dataType: "json",
      success: () => {
      }
    });
  }
  _newGUID() {
    let guid = "";
    const format = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
    for (let i = 0; i < format.length; i++) {
      if (format[i] === "x") {
        guid += (Math.random() * 16 | 0).toString(16);
      } else {
        guid += format[i];
      }
    }
    return guid.toUpperCase();
  }
  _getConfig() {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null;
    }
    var data = localStorage.getItem(_AdReport2.KEY);
    return data ? JSON.parse(data) : null;
  }
  _setConfig(guid) {
    if (!navigator.cookieEnabled || !window.localStorage) {
      return null;
    }
    localStorage.setItem(_AdReport2.KEY, JSON.stringify({
      last: Date.now(),
      guid
    }));
  }
};
__publicField(_AdReport, "URL", "https://has1.dcloud.net.cn/ahl");
__publicField(_AdReport, "KEY", "uni_app_ad_guid");
const UniViewJSBridge$1 = /* @__PURE__ */ extend$1(ViewJSBridge, {
  publishHandler(event, args, pageId) {
    UniServiceJSBridge$1.subscribeHandler(event, args, pageId);
  }
});
const UniServiceJSBridge$1 = /* @__PURE__ */ extend$1(ServiceJSBridge, {
  publishHandler(event, args, pageId) {
    UniViewJSBridge$1.subscribeHandler(event, args, pageId);
  }
});
const PageHead = /* @__PURE__ */ defineSystemComponent({
  name: "PageHead",
  setup() {
    const headRef = ref(null);
    const pageMeta = usePageMeta();
    const navigationBar = useTheme(pageMeta.navigationBar, () => {
      const _navigationBar = parseTheme(pageMeta.navigationBar);
      navigationBar.backgroundColor = _navigationBar.backgroundColor;
      navigationBar.titleColor = _navigationBar.titleColor;
    });
    const {
      clazz: clazz2,
      style
    } = usePageHead(navigationBar);
    return () => {
      const backButtonTsx = createBackButtonTsx(navigationBar, pageMeta.isQuit);
      const leftButtonsTsx = [];
      const rightButtonsTsx = [];
      const type = navigationBar.type || "default";
      const placeholderTsx = type !== "transparent" && type !== "float" && createVNode("div", {
        "class": {
          "uni-placeholder": true,
          "uni-placeholder-titlePenetrate": navigationBar.titlePenetrate
        }
      }, null, 2);
      return createVNode("uni-page-head", {
        "uni-page-head-type": type
      }, [createVNode("div", {
        "ref": headRef,
        "class": clazz2.value,
        "style": style.value
      }, [createVNode("div", {
        "class": "uni-page-head-hd"
      }, [backButtonTsx, ...leftButtonsTsx]), createPageHeadBdTsx(navigationBar), createVNode("div", {
        "class": "uni-page-head-ft"
      }, [...rightButtonsTsx])], 6), placeholderTsx], 8, ["uni-page-head-type"]);
    };
  }
});
function createBackButtonTsx(navigationBar, isQuit) {
  if (!isQuit) {
    return createVNode("div", {
      "class": "uni-page-head-btn",
      "onClick": onPageHeadBackButton
    }, [createSvgIconVNode(ICON_PATH_BACK, navigationBar.type === "transparent" ? "#fff" : navigationBar.titleColor, 26)], 8, ["onClick"]);
  }
}
function createPageHeadBdTsx(navigationBar, searchInput) {
  {
    return createPageHeadTitleTextTsx(navigationBar);
  }
}
function createPageHeadTitleTextTsx({
  type,
  loading,
  titleSize,
  titleText,
  titleImage
}) {
  return createVNode("div", {
    "class": "uni-page-head-bd"
  }, [createVNode("div", {
    "style": {
      fontSize: titleSize,
      opacity: type === "transparent" ? 0 : 1
    },
    "class": "uni-page-head__title"
  }, [loading ? createVNode("i", {
    "class": "uni-loading"
  }, null) : titleImage ? createVNode("img", {
    "src": titleImage,
    "class": "uni-page-head__title_image"
  }, null, 8, ["src"]) : titleText], 4)]);
}
function onPageHeadBackButton() {
  if (getCurrentPages$1().length === 1) {
    reLaunch({
      url: "/"
    });
  } else {
    navigateBack({
      from: "backbutton",
      success() {
      }
      // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
    });
  }
}
function usePageHead(navigationBar) {
  const clazz2 = computed(() => {
    const {
      type,
      titlePenetrate,
      shadowColorType
    } = navigationBar;
    const clazz3 = {
      "uni-page-head": true,
      "uni-page-head-transparent": type === "transparent",
      "uni-page-head-titlePenetrate": titlePenetrate === "YES",
      "uni-page-head-shadow": !!shadowColorType
    };
    if (shadowColorType) {
      clazz3[`uni-page-head-shadow-${shadowColorType}`] = true;
    }
    return clazz3;
  });
  const style = computed(() => {
    const backgroundColor = navigationBar.backgroundColor;
    return {
      backgroundColor,
      color: navigationBar.titleColor,
      transitionDuration: navigationBar.duration,
      transitionTimingFunction: navigationBar.timingFunc
    };
  });
  return {
    clazz: clazz2,
    style
  };
}
const PageBody = /* @__PURE__ */ defineSystemComponent({
  name: "PageBody",
  setup(props2, ctx) {
    const pageMeta = false;
    const wrapperRef = ref(null);
    const _pageRefresh = null;
    const pageRefresh = ref(null);
    watch(() => {
      return pageMeta.enablePullDownRefresh;
    }, () => {
      pageRefresh.value = pageMeta.enablePullDownRefresh ? _pageRefresh : null;
    }, {
      immediate: true
    });
    return () => {
      const pageRefreshTsx = false;
      const pageResizeSensor = null;
      return createVNode(Fragment, null, [pageRefreshTsx, createVNode("uni-page-wrapper", mergeProps({
        "ref": wrapperRef
      }, pageRefresh.value), [createVNode("uni-page-body", null, [renderSlot(ctx.slots, "default")]), pageResizeSensor], 16)]);
    };
  }
});
const index = /* @__PURE__ */ defineSystemComponent({
  name: "Page",
  setup(_props, ctx) {
    let pageMeta = providePageMeta(getStateId());
    const navigationBar = pageMeta.navigationBar;
    const pageStyle = {};
    useDocumentTitle(pageMeta);
    return () => createVNode(
      "uni-page",
      {
        "data-page": pageMeta.route,
        style: pageStyle
      },
      navigationBar.style !== "custom" ? [
        createVNode(PageHead),
        createPageBodyVNode(ctx),
        null
      ] : [
        createPageBodyVNode(ctx),
        null
      ]
    );
  }
});
function createPageBodyVNode(ctx) {
  return openBlock(), createBlock(
    PageBody,
    { key: 0 },
    {
      default: withCtx(() => [renderSlot(ctx.slots, "page")]),
      _: 3
    }
  );
}
const appId = "";
const appName = "";
const appVersion = "1.0.0";
const appVersionCode = "100";
const debug = false;
const nvue = { "flex-direction": "column" };
const networkTimeout = { "request": 6e4, "connectSocket": 6e4, "uploadFile": 6e4, "downloadFile": 6e4 };
const router = { "mode": "hash", "base": "/", "assets": "assets", "routerBase": "/" };
const async = { "loading": "AsyncLoading", "error": "AsyncError", "delay": 200, "timeout": 6e4, "suspensible": true };
const qqMapKey = void 0;
const bMapKey = void 0;
const googleMapKey = void 0;
const aMapKey = void 0;
const aMapSecurityJsCode = void 0;
const aMapServiceHost = void 0;
const sdkConfigs = {};
const locale = "";
const fallbackLocale = "";
const darkmode = false;
const themeConfig = {};
window.uni = {};
window.wx = {};
window.rpx2px = upx2px;
const locales = /* @__PURE__ */ Object.assign({});
const extend = Object.assign;
window.__uniConfig = extend({ "easycom": { "autoscan": true, "custom": { "^nut-(.*)?-(.*)": "nutui-uniapp/components/$1$2/$1$2.vue", "^nut-(.*)": "nutui-uniapp/components/$1/$1.vue" } }, "globalStyle": { "backgroundColor": "#F5F5F5", "navigationBar": { "backgroundColor": "#FF6B35", "titleText": "食堂订餐", "type": "default", "titleColor": "#ffffff" }, "isNVue": false }, "compilerVersion": "5.15" }, {
  appId,
  appName,
  appVersion,
  appVersionCode,
  async,
  debug,
  networkTimeout,
  sdkConfigs,
  qqMapKey,
  bMapKey,
  googleMapKey,
  aMapKey,
  aMapSecurityJsCode,
  aMapServiceHost,
  nvue,
  locale,
  fallbackLocale,
  locales: Object.keys(locales).reduce((res, name) => {
    const locale2 = name.replace(/\.\/locale\/(uni-app.)?(.*).json/, "$2");
    extend(res[locale2] || (res[locale2] = {}), locales[name].default);
    return res;
  }, {}),
  router,
  darkmode,
  themeConfig
});
window.__uniLayout = window.__uniLayout || {};
const AsyncComponentOptions = {
  delay: async.delay,
  timeout: async.timeout,
  suspensible: async.suspensible
};
if (async.loading) {
  AsyncComponentOptions.loadingComponent = {
    name: "SystemAsyncLoading",
    render() {
      return createVNode(resolveComponent(async.loading));
    }
  };
}
if (async.error) {
  AsyncComponentOptions.errorComponent = {
    name: "SystemAsyncError",
    props: ["error"],
    render() {
      return createVNode(resolveComponent(async.error), { error: this.error });
    }
  };
}
const PagesIndexIndexLoader = () => __vitePreload(() => import("./pages-index-index.BTwUtdQt.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0).then((com) => setupPage(com.default || com));
const PagesIndexIndex = /* @__PURE__ */ defineAsyncComponent(extend({ loader: PagesIndexIndexLoader }, AsyncComponentOptions));
const PagesMineMineLoader = () => __vitePreload(() => import("./pages-mine-mine.QpDw0VrO.js"), true ? __vite__mapDeps([6,7,2,8,3,4,9]) : void 0).then((com) => setupPage(com.default || com));
const PagesMineMine = /* @__PURE__ */ defineAsyncComponent(extend({ loader: PagesMineMineLoader }, AsyncComponentOptions));
const PagesNotificationListLoader = () => __vitePreload(() => import("./pages-notification-list.ebWMArGi.js"), true ? __vite__mapDeps([10,7,2,11]) : void 0).then((com) => setupPage(com.default || com));
const PagesNotificationList = /* @__PURE__ */ defineAsyncComponent(extend({ loader: PagesNotificationListLoader }, AsyncComponentOptions));
const PagesLoginLoginLoader = () => __vitePreload(() => import("./pages-login-login.D4sS0ei0.js"), true ? __vite__mapDeps([12,8,2,13]) : void 0).then((com) => setupPage(com.default || com));
const PagesLoginLogin = /* @__PURE__ */ defineAsyncComponent(extend({ loader: PagesLoginLoginLoader }, AsyncComponentOptions));
const PagesOrderListLoader = () => __vitePreload(() => import("./pages-order-list.BVREQZcW.js"), true ? __vite__mapDeps([14,1,2,3,4,15]) : void 0).then((com) => setupPage(com.default || com));
const PagesOrderList = /* @__PURE__ */ defineAsyncComponent(extend({ loader: PagesOrderListLoader }, AsyncComponentOptions));
const PagesOrderDetailLoader = () => __vitePreload(() => import("./pages-order-detail.XyiPTYYV.js"), true ? __vite__mapDeps([16,1,2,17]) : void 0).then((com) => setupPage(com.default || com));
const PagesOrderDetail = /* @__PURE__ */ defineAsyncComponent(extend({ loader: PagesOrderDetailLoader }, AsyncComponentOptions));
const PagesCanteenWorkbenchIndexLoader = () => __vitePreload(() => import("./pages-canteen-workbench-index.DkXUDMcN.js"), true ? __vite__mapDeps([18,19,2,3,4,20]) : void 0).then((com) => setupPage(com.default || com));
const PagesCanteenWorkbenchIndex = /* @__PURE__ */ defineAsyncComponent(extend({ loader: PagesCanteenWorkbenchIndexLoader }, AsyncComponentOptions));
const PagesCanteenDishIndexLoader = () => __vitePreload(() => import("./pages-canteen-dish-index.C-faDGpd.js"), true ? __vite__mapDeps([21,19,2,3,4,22]) : void 0).then((com) => setupPage(com.default || com));
const PagesCanteenDishIndex = /* @__PURE__ */ defineAsyncComponent(extend({ loader: PagesCanteenDishIndexLoader }, AsyncComponentOptions));
function renderPage(component, props2) {
  return openBlock(), createBlock(index, null, {
    page: withCtx(() => [createVNode(
      component,
      extend({}, props2, { ref: "page" }),
      null,
      512
      /* NEED_PATCH */
    )]),
    _: 1
    /* STABLE */
  });
}
window.__uniRoutes = [{
  path: "/",
  alias: "/pages/index/index",
  component: { setup() {
    const app = getApp$1();
    const query = app && app.$route && app.$route.query || {};
    return () => renderPage(PagesIndexIndex, query);
  } },
  loader: PagesIndexIndexLoader,
  meta: { "isQuit": true, "isEntry": true, "navigationBar": { "titleText": "菜品列表", "type": "default" }, "isNVue": false }
}, {
  path: "/pages/mine/mine",
  component: { setup() {
    const app = getApp$1();
    const query = app && app.$route && app.$route.query || {};
    return () => renderPage(PagesMineMine, query);
  } },
  loader: PagesMineMineLoader,
  meta: { "navigationBar": { "titleText": "我的", "type": "default" }, "isNVue": false }
}, {
  path: "/pages/notification/list",
  component: { setup() {
    const app = getApp$1();
    const query = app && app.$route && app.$route.query || {};
    return () => renderPage(PagesNotificationList, query);
  } },
  loader: PagesNotificationListLoader,
  meta: { "navigationBar": { "titleText": "消息通知", "type": "default" }, "isNVue": false }
}, {
  path: "/pages/login/login",
  component: { setup() {
    const app = getApp$1();
    const query = app && app.$route && app.$route.query || {};
    return () => renderPage(PagesLoginLogin, query);
  } },
  loader: PagesLoginLoginLoader,
  meta: { "navigationBar": { "titleText": "登录", "type": "default" }, "isNVue": false }
}, {
  path: "/pages/order/list",
  component: { setup() {
    const app = getApp$1();
    const query = app && app.$route && app.$route.query || {};
    return () => renderPage(PagesOrderList, query);
  } },
  loader: PagesOrderListLoader,
  meta: { "navigationBar": { "titleText": "我的订单", "type": "default" }, "isNVue": false }
}, {
  path: "/pages/order/detail",
  component: { setup() {
    const app = getApp$1();
    const query = app && app.$route && app.$route.query || {};
    return () => renderPage(PagesOrderDetail, query);
  } },
  loader: PagesOrderDetailLoader,
  meta: { "navigationBar": { "titleText": "订单详情", "type": "default" }, "isNVue": false }
}, {
  path: "/pages/canteen/workbench/index",
  component: { setup() {
    const app = getApp$1();
    const query = app && app.$route && app.$route.query || {};
    return () => renderPage(PagesCanteenWorkbenchIndex, query);
  } },
  loader: PagesCanteenWorkbenchIndexLoader,
  meta: { "navigationBar": { "titleText": "工作台", "type": "default" }, "isNVue": false }
}, {
  path: "/pages/canteen/dish/index",
  component: { setup() {
    const app = getApp$1();
    const query = app && app.$route && app.$route.query || {};
    return () => renderPage(PagesCanteenDishIndex, query);
  } },
  loader: PagesCanteenDishIndexLoader,
  meta: { "navigationBar": { "titleText": "菜品管理", "type": "default" }, "isNVue": false }
}].map((uniRoute) => (uniRoute.meta.route = (uniRoute.alias || uniRoute.path).slice(1), uniRoute));
const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createLifeCycleHook(
  ON_SHOW,
  1 | 2
  /* HookFlags.PAGE */
);
const onHide = /* @__PURE__ */ createLifeCycleHook(
  ON_HIDE,
  1 | 2
  /* HookFlags.PAGE */
);
const onLaunch = /* @__PURE__ */ createLifeCycleHook(
  ON_LAUNCH,
  1
  /* HookFlags.APP */
);
const onLoad = /* @__PURE__ */ createLifeCycleHook(
  ON_LOAD,
  2
  /* HookFlags.PAGE */
);
const onUnload = /* @__PURE__ */ createLifeCycleHook(
  ON_UNLOAD,
  2
  /* HookFlags.PAGE */
);
const onPullDownRefresh = /* @__PURE__ */ createLifeCycleHook(
  ON_PULL_DOWN_REFRESH,
  2
  /* HookFlags.PAGE */
);
const TOKEN_KEY = "canteen-token";
function getToken() {
  try {
    const fromUni = getStorageSync(TOKEN_KEY);
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
    setStorageSync(TOKEN_KEY, token);
  } catch {
  }
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
  }
}
function removeToken() {
  try {
    removeStorageSync(TOKEN_KEY);
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
    const fromUni = getStorageSync(USER_KEY);
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
    setStorageSync(USER_KEY, json);
  } catch {
  }
  try {
    localStorage.setItem(USER_KEY, json);
  } catch {
  }
}
function removeUserInfo() {
  try {
    removeStorageSync(USER_KEY);
  } catch {
  }
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
  }
}
const BASE_URL = "/api/v1";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props, { expose: __expose }) {
    __expose();
    function getWsUrl(token) {
      const protocol = location.protocol === "https:" ? "wss:" : "ws:";
      return protocol + "//" + location.host + "/ws?token=" + token;
    }
    let wsConnected = false;
    function connectWebSocket() {
      const token = getToken();
      if (!token || wsConnected)
        return;
      connectSocket({
        url: getWsUrl(token),
        success: () => {
          console.log("[WS] connecting...");
        },
        fail: (err) => {
          console.error("[WS] connect fail:", err);
        }
      });
    }
    onSocketOpen(() => {
      console.log("[WS] connected");
      wsConnected = true;
    });
    onSocketMessage((res) => {
      console.log("[WS] message:", res.data);
      try {
        const msg = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
        if (msg.type === "ORDER_STATUS_CHANGE") {
          showToast({ title: msg.message || "订单状态已更新", icon: "none", duration: 3e3 });
        } else if (msg.type === "NEW_ORDER") {
          showToast({ title: msg.message || "有新订单", icon: "none", duration: 3e3 });
        }
      } catch {
      }
    });
    onSocketError((err) => {
      console.error("[WS] error:", err);
      wsConnected = false;
    });
    onSocketClose(() => {
      console.log("[WS] closed");
      wsConnected = false;
      setTimeout(() => {
        if (getToken()) {
          connectWebSocket();
        }
      }, 5e3);
    });
    onLaunch(() => {
      console.log("App Launch");
      const token = getToken();
      if (token) {
        request({
          url: BASE_URL + "/auth/me",
          method: "GET",
          header: { "canteen-token": token },
          success: (res) => {
            var _a;
            if (((_a = res.data) == null ? void 0 : _a.code) !== 200) {
              removeToken();
            } else {
              connectWebSocket();
            }
          },
          fail: () => {
          }
        });
      }
    });
    onShow(() => {
      console.log("App Show");
      if (getToken() && !wsConnected) {
        connectWebSocket();
      }
    });
    onHide(() => {
      console.log("App Hide");
    });
    const __returned__ = { BASE_URL, getWsUrl, get wsConnected() {
      return wsConnected;
    }, set wsConnected(v) {
      wsConnected = v;
    }, connectWebSocket, get onLaunch() {
      return onLaunch;
    }, get onShow() {
      return onShow;
    }, get onHide() {
      return onHide;
    }, get getToken() {
      return getToken;
    }, get removeToken() {
      return removeToken;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Wed-dev/xiangmulianxi/canteen-ordering-system/frontend-user/src/App.vue"]]);
setupApp(_sfc_main);
function createApp() {
  const app = createApp$1(App);
  return {
    app
  };
}
createApp().app.use(index$e).mount("#app");
export {
  setUserInfo as A,
  navigateTo as B,
  showModal as C,
  removeToken as D,
  removeUserInfo as E,
  Fragment as F,
  reLaunch as G,
  onPullDownRefresh as H,
  stopPullDownRefresh as I,
  getStorageSync as J,
  setToken as K,
  closeSocket as L,
  connectSocket as M,
  Input as N,
  onLoad as O,
  onUnload as P,
  withModifiers as Q,
  chooseImage as R,
  ScrollView as S,
  uploadFile as T,
  index$j as U,
  index$7 as V,
  getCurrentPages$1 as W,
  showLoading as X,
  request as Y,
  hideLoading as Z,
  _export_sfc as _,
  reactive as a,
  getToken as b,
  computed as c,
  defineComponent as d,
  switchTab as e,
  createBlock as f,
  getSystemInfoSync as g,
  openBlock as h,
  index$g as i,
  createVNode as j,
  createElementBlock as k,
  renderList as l,
  createTextVNode as m,
  normalizeClass as n,
  onMounted as o,
  normalizeStyle as p,
  index$q as q,
  ref as r,
  showToast as s,
  toDisplayString as t,
  index$i as u,
  index$x as v,
  withCtx as w,
  createCommentVNode as x,
  onShow as y,
  getUserInfo as z
};
