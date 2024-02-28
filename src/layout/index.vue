<script setup lange="ts">
import { computed } from "vue";
import SettingTheme from "@/layout/components/Header/components/SettingTheme.vue";
import { useSettingStore } from "@/store/modules/setting.ts";
import LayoutVertical from "./LayoutVertical/index.vue";
const body = document.body;
const SettingStore = useSettingStore();
body.setAttribute("class", `layout-vertical`);
const classObj = computed(() => {
  return {
    hideSidebar: SettingStore.isCollapse,
    openSidebar: SettingStore.isCollapse,
    withoutAnimation: SettingStore.withoutAnimation,
  };
});
</script>
<template>
  <div class="g-container-layout" :class="classObj">
    <LayoutVertical />
    <SettingTheme />
  </div>
</template>
<style lang="scss" scoped>
.g-container-layout {
  height: 100%;
  width: 100%;
  .main-container {
    display: flex;
    flex: 1;
    box-sizing: border-box;
    flex-direction: column;
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.sidebar-container {
  display: flex;
  flex-direction: column;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 90;
}
</style>
