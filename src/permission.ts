import router from "@/router/index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStore } from "@/store/modules/user";
import { usePermissionStore } from "@/store/modules/permission";
const whiteList = ["/login"]; // 设置白名单

/**
 * 全局前置守卫
 */
router.beforeEach(async (to, from, next) => {
  //设置标题,加载系统动画等
  //判断路由权限
  NProgress.start();

  //设置标题
  if (typeof to.meta.title === "string") {
    document.title = to.meta.title || "vue-admin-perfect";
  }
  const UserStore = useUserStore();
  // 判断条件：依据token确定是否存在登录
  const hasToken = UserStore.token;
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，请重定向到主页
      next({ path: "/" });
    } else {
      try {
        const PermissionStore = usePermissionStore();
        if(!PermissionStore.routes.length){
          const accessRoutes = await PermissionStore.generateRoutes(UserStore.roles);
          accessRoutes.forEach((item) => router.addRoute(item))
          next({ ...to, replace: true }) // // 这里相当于push到一个页面 不在进入路由拦截
        }else{
          next();
        }
      } catch (error) {
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

/**
 * 全局后置守卫
 */
router.afterEach((to, from, failure) => {
  // 改标题,监控上报一些基础信息,
  // 例如：统计点击xx模块xx次
  NProgress.done();
  if (failure) {
    console.error(failure);
  }
});
