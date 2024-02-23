import { defineStore } from "pinia";
import { constantRoutes, asyncRoutes } from "@/router/index";
import { filterKeepAlive } from "@/utils/routers";
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
        this.routes = constantRoutes;
        resolve(constantRoutes);
      });
    },
  },
});
