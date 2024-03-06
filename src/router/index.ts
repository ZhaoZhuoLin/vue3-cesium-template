import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  showSpinner: false,
});


import system from "./modules/system.js"
import map from "./modules/map.js"
import graphic from "./modules/graphic.js"
import tiles from "./modules/tiles.js"

export const asyncRoutes = [
  //  ...system,
  ...map,
  ...tiles,
  ...graphic,
];
/**
 * path ==> 路由路径
 * name ==> 路由名称
 * component ==> 路由组件
 * redirect ==> 路由重定向
 * alwaysShow ==> 如果设置为true，将始终显示根菜单，无论其子路由长度如何
 * hidden ==> 如果“hidden:true”不会显示在侧边栏中（默认值为false）
 * keepAlive ==> 设为true 缓存
 * meta ==> 路由元信息
 * meta.title ==> 路由标题
 * meta.icon ==> 菜单icon
 * meta.affix ==> 如果设置为true将会出现在 标签栏中
 * meta.breadcrumb ==> 如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
 * meta.activeMenu ==> 详情页的时候可以设置菜单高亮 ,高亮菜单的path
 */

export const constantRoutes = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPages/404.vue'),
    hidden: true,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
    meta: { title: "登录" },
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    meta: { title: "首页", icon: "HomeFilled" },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: { title: "首页", icon: "HomeFilled", affix: true, role: ["other"] },
      },
    ],
  },
  {
    path: "/dataScreen",
    name: "可视化大屏",
    component: () => import("@/views/dataScreen/index.vue"),
     meta: { title: "可视化大屏",icon: "Histogram" },
  },
];

export const notFoundRouter = {
    path: '/:pathMatch(.*)',
  name: 'notFound',
  redirect: '/404',
}

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
