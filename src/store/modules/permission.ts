import { defineStore } from "pinia";
import { constantRoutes, asyncRoutes, notFoundRouter } from "@/router/index";
import { filterKeepAlive, filterAsyncRoutes } from "@/utils/routers";
export const usePermissionStore = defineStore({
  id: "permissionStore",
  state: () => ({
    // 路由
    routes: [],
    // 动态路由
    addRoutes: [],
    // 缓存路由
    cacheRoutes: {},
  }),
  getters: {
    permission_routes: (state) => {
      return state.routes;
    },
    keepAliveRoutes: (state) => {
      return filterKeepAlive(asyncRoutes);
    },
  },
  actions: {
    // 根据角色生成路由
    generateRoutes(roles) {
      return new Promise((resolve) => {
        let accessedRoutes;
        if (roles && roles.length && !roles.includes("admin")) {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        } else {
          accessedRoutes = asyncRoutes || []
        }
        accessedRoutes = accessedRoutes.concat(notFoundRouter)
        this.routes = constantRoutes.concat(accessedRoutes)
        this.addRoutes = accessedRoutes
        resolve(accessedRoutes);
      });
    },
    // 清除路由
    clearRoutes() {
      this.routes = [];
      this.addRoutes = [];
      this.cacheRoutes = [];
    }
  },
});
