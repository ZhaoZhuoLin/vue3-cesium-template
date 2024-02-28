<template>
  <div class="sidebar-container" :class="{ 'has-logo': themeConfig.showLogo }">
    <Logo :isCollapse="isCollapse" v-if="themeConfig.showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="SettingStore.themeConfig.uniqueOpened"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <SubItem v-for="route in permission_routes" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lange="ts">
import SubItem from "./components/SubItem.vue";
import { useRoute } from "vue-router";
import { useSettingStore } from "@/store/modules/setting";
import { usePermissionStore } from "@/store/modules/permission";
import { computed } from "vue";
import Logo from "./components/Logo.vue";

const route = useRoute();
const SettingStore = useSettingStore();
const PermissionStore = usePermissionStore();
const themeConfig = computed(() => SettingStore.themeConfig);

// 是否折叠
const isCollapse = computed(() => SettingStore.isCollapse);

// 获取路由
const permission_routes = computed(() => PermissionStore.permission_routes);
console.log("permission_routes", permission_routes);

const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  console.log("path", path);
  return path;
});
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
}
</style>
