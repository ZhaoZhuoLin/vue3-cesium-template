<script setup lange="ts">
import { computed } from "vue";
import { useWrapComponents } from "@/hooks/useWrapComponents.ts";
import { usePermissionStore } from "@/store/modules/permission";
const PermissionStore = usePermissionStore();
const SettingStore = usePermissionStore();
const cacheRoutes = computed(() => PermissionStore.cacheRoutes);
const isReload = computed(() => SettingStore.cacheRoutes);
</script>
<template>
  <div class="app-main">
    <!-- <router-view/> -->
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="cacheRoutes" v-if="isReload">
        <component :is="useWrapComponents(Component, route)" :key="route.path" />
      </keep-alive>
    </router-view>
  </div>
</template>
<style lang="scss" scoped>
.app-main {
  flex: 1;
  display: flex;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  .app-main-inner {
    flex: 1;
    display: flex;
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
