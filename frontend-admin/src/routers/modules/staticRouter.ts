import { RouteRecordRaw } from "vue-router";

import { HOME_URL, LOGIN_URL } from "@/config";

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    redirect: HOME_URL,
    children: [
      {
        path: "/home/index",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          icon: "HomeFilled",
          title: "首页",
          isAffix: true,
          isKeepAlive: true
        }
      },
      {
        path: "/dashboard",
        name: "dashboard",
        redirect: "/dashboard/statistics",
        meta: {
          icon: "Odometer",
          title: "统计看板"
        },
        children: [
          {
            path: "/dashboard/statistics",
            name: "statistics",
            component: () => import("@/views/dashboard/dataVisualize/index.vue"),
            meta: {
              icon: "TrendCharts",
              title: "数据概览",
              isKeepAlive: true
            }
          }
        ]
      },
      {
        path: "/system",
        name: "system",
        redirect: "/system/user",
        meta: {
          icon: "Tools",
          title: "系统管理"
        },
        children: [
          {
            path: "/system/user",
            name: "systemUser",
            component: () => import("@/views/system/user/index.vue"),
            meta: {
              icon: "User",
              title: "人员管理",
              isKeepAlive: true
            }
          },
          {
            path: "/system/config",
            name: "systemConfig",
            component: () => import("@/views/system/systemConfig/index.vue"),
            meta: {
              icon: "Setting",
              title: "系统配置",
              isKeepAlive: true
            }
          }
        ]
      },
      {
        path: "/systemLog",
        name: "systemLog",
        component: () => import("@/views/system/systemLog/index.vue"),
        meta: {
          icon: "Document",
          title: "操作日志",
          isKeepAlive: true
        }
      },
      {
        path: "/merchantWallet",
        name: "merchantWallet",
        component: () => import("@/views/merchantWallet/index.vue"),
        meta: {
          icon: "Wallet",
          title: "商家钱包",
          isKeepAlive: true
        }
      }
    ]
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];
