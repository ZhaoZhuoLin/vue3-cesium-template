/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const systemRouter = [
  {
    path: "/imageryProvider",
    name: "地图示例",
    component: () => import("@/layout/index.vue"),
    meta: { title: "地图示例", icon: "Opportunity" },
    children: [
      {
        path: "/map/map.vue",
        component: () => import("@/views/map/map.vue"),
        name: "cesiumMap",
        meta: { keepAlive: true, title: "初始化场景", icon: "Menu" },
      },
      {
        path: "/map/map_tdt.vue",
        component: () => import("@/views/map/map_tdt.vue"),
        name: "map_tdt",
        meta: { keepAlive: true, title: "加载天地图", icon: "Menu" },
      },
    ],
  },
]

export default systemRouter
