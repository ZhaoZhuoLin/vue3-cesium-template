/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

export default  [
  {
    path: "/graphic",
    name: "graphic",
    component: () => import("@/layout/index.vue"),
    meta: { title: "矢量图层", icon: "Opportunity" },
    redirect: '/graphic/entity',
    children: [
      {
        path: "/graphic/entity",
        component: () => import("@/views/graphic/entity.vue"),
        name: "entity",
        meta: { keepAlive: true, title: "Entity基础对象", icon: "Menu",  },
      },
      {
        path: "/graphic/boundaryUplift",
        component: () => import("@/views/graphic/boundaryUplift.vue"),
        name: "div",
        meta: { keepAlive: true, title: "边界抬升", icon: "Menu",   },
      },
      {
        path: "/graphic/box",
        component: () => import("@/views/graphic/box.vue"),
        name: "div",
        meta: { keepAlive: true, title: "box", icon: "Menu",   },
      },
    ],
  },
]

