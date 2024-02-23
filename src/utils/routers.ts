/**
 * @description 使用递归，过滤需要缓存的路由
 * @param {Array} _route 所有路由表
 * @param {Array} _cache 缓存的路由表
 * @return void
 * */

export function filterKeepAlive(routers) {
  const cacheRouter: any[] = [];
  const deep = (routers) => {
    routers.forEach((item) => {
      if (item.meta?.keepAlive && item.name) {
        cacheRouter.push(item.name);
      }
      if (item.children && item.children.length) {
        deep(item.children);
      }
    });
  };
  deep(routers);
  return cacheRouter;
}
