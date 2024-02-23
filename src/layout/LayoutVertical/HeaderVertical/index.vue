<script setup lange="ts">
import { computed } from "vue";
import { useSettingStore } from "@/store/modules/setting.ts";
import Height from "@/layout/components/Header/components/Height.vue";
import HeaderToolLeft from "@/layout/components/Header/ToolLeft.vue";
import HeaderToolRight from "@/layout/components/Header/ToolRight.vue";
import TagsView from "@/layout/components/TagsView/index.vue";
const SettingStore = useSettingStore();
const themeConfig = computed(() => SettingStore.themeConfig);
const isCollapse = computed(() => SettingStore.isCollapse);
</script>
<template>
  <Height />
  <div
    class="m-layout-header"
    :class="{
      'fixed-header': themeConfig.fixedHeader,
      collapse: themeConfig.fixedHeader && isCollapse,
      'no-collapse': themeConfig.fixedHeader && !isCollapse,
    }"
  >
    <div class="header-inner">
      <HeaderToolLeft />
      <HeaderToolRight />
    </div>
    <TagsView v-if="themeConfig.showTag" />
  </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
