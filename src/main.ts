import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index.ts";

import "element-plus/dist/index.css";
// 引入暗黑模式
import "element-plus/theme-chalk/dark/css-vars.css";
// 自定义暗黑模式
import "@/styles/element-dark.scss";

// 先引入element图标之后优化
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./permission";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(createPinia());
app.mount("#app");
