/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const render = [
  {
    path: "/render",
    name: "render",
    component: () => import("@/layout/index.vue"),
    meta: { title: "3DTiles三维模型", icon: "Opportunity" },
    redirect: '/system/entity',
    children: [
      {
        path: "/render/3dtiles",
        component: () => import("@/views/render/3dtiles.vue"),
        name: "3dtiles",
        meta: { keepAlive: true, title: "3DTiles三维模型", icon: "Menu",  },
      },
    ],
  },
]

export default render
