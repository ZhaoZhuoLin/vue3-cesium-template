import { defineStore } from "pinia";

export const useTagsViewStore = defineStore({
  id: "tagsViewStore",
  state: () => {
    return {
      //当前选中tabs
      activeTabsValue: "/home",
      //存储浏览过的路由
      visitedRoute: [],
      //需缓存的路由
      cacheRoute: [],
    };
  },
  actions: {
    setActiveTabeValue(val) {
      this.activeTabsValue = val;
    },
    // add Tag
    addVisitedRoute(tag) {
      this.activeTabsValue = tag.path;
      if (this.visitedRoute.some((v) => v.path === tag.path)) return;
      this.visitedRoute.push(
        Object.assign({}, tag, {
          title: tag.meta.title || "no-name",
        }),
      );
      if (tag.meta.keepAlive) {
        this.cacheRoute.push(tag.name);
      }
      console.log(this.cacheRoute);
    },
    delRoute(path) {
      return new Promise((resolve) => {
        this.delVisitedRoute(path);
        this.delCacheRoute(path);
        resolve({
          visitedRoute: [...this.visitedRoute],
          cacheRoute: [...this.cacheRoute],
        });
      });
    },
    delVisitedRoute(path) {
      return new Promise((resolve) => {
        this.visitedRoute = this.visitedRoute.filter((v) => {
          return v.path !== path || v.meta.affix
        });
        // this.cacheRoute = this.cacheRoute.filter((v) => {
        //   return v.path !== path ||  v.meta.affix
        // });
        resolve([...this.visitedRoute]);
      });
    },
    delCacheRoute(tag) {
      return new Promise((resolve) => {
        const index = this.cacheRoute.indexOf(tag.name);
        index > -1 && this.cacheRoute.splice(index, 1);
        resolve([...this.cacheRoute]);
      });
    },
    clearAllRouter(){
      return new Promise((resolve)=>{
        this.visitedRoute = this.visitedRoute.filter((v)=>v.meta.affix)
        this.cacheRoute = this.cacheRoute.filter((v)=>v.meta.affix)
        resolve([...this.visitedRoute])
      })
    }
  },
});
