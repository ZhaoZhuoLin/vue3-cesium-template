/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout/index.vue'


export default  [
  {
    path: "/imageryProvider",
    name: "imageryProvider",
    component: () => import("@/layout/index.vue"),
    meta: { title: "地图示例", icon: "Opportunity" },
    redirect: '/map/map',
    children: [
      {
        path: "/map/map",
        component: () => import("@/views/map/map.vue"),
        name: "map",
        meta: { keepAlive: true, title: "初始化场景", icon: "Menu" },
      },
      {
        path: "/map/scene",
        component: () => import("@/views/map/scene.vue"),
        name: "scene",
        meta: { keepAlive: true, title: "场景参数化", icon: "Menu" },
      },
      {
        path: "/map/control",
        component: () => import("@/views/map/control.vue"),
        name: "control",
        meta: { keepAlive: true, title: "场景基础控制", icon: "Menu" },
      },
    ],
  },
]
