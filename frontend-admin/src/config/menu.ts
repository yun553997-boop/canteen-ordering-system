/**
 * @description 静态菜单配置（系统管理端）
 * 不再从后端 API 动态拉取菜单，直接在此文件定义
 */

export const STATIC_MENU_LIST: Menu.MenuOptions[] = [
  {
    path: "/home/index",
    name: "home",
    meta: {
      icon: "HomeFilled",
      title: "首页",
      isLink: "",
      isHide: false,
      isFull: false,
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
      title: "统计看板",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    children: [
      {
        path: "/dashboard/statistics",
        name: "statistics",
        meta: {
          icon: "TrendCharts",
          title: "数据概览",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
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
      title: "系统管理",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    children: [
      {
        path: "/system/user",
        name: "systemUser",
        meta: {
          icon: "User",
          title: "人员管理",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/system/config",
        name: "systemConfig",
        meta: {
          icon: "Setting",
          title: "系统配置",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/systemLog",
    name: "systemLog",
    meta: {
      icon: "Document",
      title: "操作日志",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    }
  }
];
