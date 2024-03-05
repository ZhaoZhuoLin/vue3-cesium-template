/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout/index.vue'

const map = [
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
    ],
  },
]

export default map
