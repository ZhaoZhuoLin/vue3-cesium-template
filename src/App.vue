<script setup lang="ts">
import { computed } from "vue";
import { useSettingStore } from "@/store/modules/setting.ts";
const SettingStore = useSettingStore();
// 配置全局组件大小
const globalComSize = computed(() => SettingStore.themeConfig.globalComSize);
// 配置element中文
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>
<template>
  <el-config-provider :size="globalComSize" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss" scoped>
#app {
  color: $primaryColor;
}
</style>
