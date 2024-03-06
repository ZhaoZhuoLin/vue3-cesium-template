/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout/index.vue'

export default  [
  {
    path: "/tiles",
    name: "tiles",
    component: () => import("@/layout/index.vue"),
    meta: { title: "瓦片图层", icon: "Opportunity" },
    redirect: '/tiles/online',
    children: [
      {
        path: "/tiles/online",
        component: () => import("@/views/tiles/online.vue"),
        name: "online",
        meta: { keepAlive: true, title: "在线瓦片图层", icon: "Menu" },
      },
      {
        path: "/tiles/local",
        component: () => import("@/views/tiles/local.vue"),
        name: "local",
        meta: { keepAlive: true, title: "本地瓦片图层", icon: "Menu" },
      },
    ],
  },
]

