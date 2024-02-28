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
/**
 * 使用递归过滤异步路由
 * @param routes
 * @param roles
 */
export function filterAsyncRoutes(routes,roles) {
   const res = []
   routes.forEach((route) =>{
    const tmp = {...route};
    if(hasPermission(roles,tmp)){
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
   })
   return res
}
/**
 * 判断当前用户是否具备路由的访问权限
 * @param roles
 * @param route
 * @returns
 */
export function hasPermission(roles,route){
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return false
  }
}
