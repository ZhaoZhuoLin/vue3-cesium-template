<script setup lange="ts" name="CollapseIcon">
import { useSettingStore } from "@/store/modules/setting.ts";
import { computed, ref } from "vue";
const SettingStore = useSettingStore();
const isCollapse = computed(() => !SettingStore.isCollapse);
const content = computed(() => (isCollapse.value ? "点击折叠" : "点击展开"));

const handleCollapse = () => {
  SettingStore.setCollapse(isCollapse.value);
};
</script>
<template>
  <div class="hamburger-container" @click="handleCollapse">
    <el-tooltip class="box-item" effect="dark" :content="content" placement="right">
      <el-icon size="16" class="icon" color="#409eff" v-if="isCollapse"
        ><expand
      /></el-icon>
      <el-icon size="16" class="icon" color="#409eff" v-else><fold /></el-icon>
    </el-tooltip>
  </div>
</template>
<style lang="scss" scoped>
.hamburger-container {
  padding: 0px 15px;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
  .icon {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
