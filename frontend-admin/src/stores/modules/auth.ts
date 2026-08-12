import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from "@/utils";

export const useAuthStore = defineStore("geeker-auth", () => {
  // 按钮权限列表（静态路由模式下为空，保留以兼容旧的 auth 指令）
  const authButtonList = ref<{ [key: string]: string[] }>({});
  // 菜单权限列表
  const authMenuList = ref<Menu.MenuOptions[]>([]);
  // 当前页面的 router name，用来做按钮权限筛选
  const routeName = ref<string>("");

  // 按钮权限列表
  const authButtonListGet = computed(() => authButtonList.value);
  // 菜单权限列表 ==> 这里的菜单没有经过任何处理
  const authMenuListGet = computed(() => authMenuList.value);
  // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
  const showMenuListGet = computed(() => getShowMenuList(authMenuList.value));
  // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
  const flatMenuListGet = computed(() => getFlatMenuList(authMenuList.value));
  // 递归处理后的所有面包屑导航列表
  const breadcrumbListGet = computed(() => getAllBreadcrumbList(authMenuList.value));

  // 设置静态菜单（替代之前的动态菜单 API 请求）
  const setStaticMenu = (menuList: Menu.MenuOptions[]) => {
    authMenuList.value = menuList;
  };

  // Set RouteName
  const setRouteName = async (name: string) => {
    routeName.value = name;
  };

  return {
    authButtonList,
    authMenuList,
    routeName,
    authButtonListGet,
    authMenuListGet,
    showMenuListGet,
    flatMenuListGet,
    breadcrumbListGet,
    setStaticMenu,
    setRouteName
  };
});
