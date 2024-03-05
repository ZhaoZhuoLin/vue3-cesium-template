/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const vector = [
  {
    path: "/vector",
    name: "vector",
    component: () => import("@/layout/index.vue"),
    meta: { title: "Entity基础对象", icon: "Opportunity" },
    redirect: '/system/entity',
    children: [
      {
        path: "/vector/entity",
        component: () => import("@/views/vector/entity.vue"),
        name: "entity",
        meta: { keepAlive: true, title: "Entity基础对象", icon: "Menu",  },
      },
      {
        path: "/vector/boundaryUplift",
        component: () => import("@/views/vector/boundaryUplift.vue"),
        name: "div",
        meta: { keepAlive: true, title: "边界抬升", icon: "Menu",   },
      },

    ],
  },
]

export default vector
