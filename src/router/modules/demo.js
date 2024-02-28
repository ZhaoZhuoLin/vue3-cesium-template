/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const systemRouter = [
  {
    path: "/demos",
    name: "demos",
    component: () => import("@/layout/index.vue"),
    meta: { title: "常用组件", icon: "Opportunity" },
    children: [
      {
        path: "/demos/cesiumMap",
        component: () => import("@/views/demos/cesiumMap.vue"),
        name: "cesiumMap",
        meta: { keepAlive: true, title: "搭建Map", icon: "Menu", role: ["other"] },
      },
      {
        path: "/demos/test",
        component: () => import("@/views/demos/test.vue"),
        name: "test",
        meta: { keepAlive: true, title: "测试页面", icon: "Menu", role: ["other"] },
      },
    ],
  },
]

export default systemRouter
