import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
})

const asyncRoutes = [{
    path: '/',
    component: () => import("@/views/map/index.vue"),
    name: 'map',
      meta: {
          title: 'map',
          icon: '关于我们',
          requiresAuth: false
      }
}]

// 创建路由
const router = createRouter({
    // history: createWebHistory(
    //   import.meta.env.BASE_URL),
  history: createWebHashHistory(),
    routes: asyncRoutes
})

/**
 * 全局前置守卫
 */
router.beforeEach((to, from,next) => {
    //设置标题,加载系统动画等
    //判断路由权限
    NProgress.start()
    console.log(to)
    next()
})
 /**
   * 全局解析守卫
   */
 router.beforeResolve(async (to) => {
    if (to.meta.isAdmin) {
      try {
        console.log(to)
      }
      catch (error) { 
        console.error(error)
      }
    }
  })
  /**
   * 全局后置守卫
   */
  router.afterEach((to, from, failure) => {
    // 改标题,监控上报一些基础信息,
    // 例如：统计点击xx模块xx次
    NProgress.done()
     if (failure) {
      console.error(failure)
    } 
  })

export default router