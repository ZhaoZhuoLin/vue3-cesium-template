<script setup lange="ts">
import { useSettingStore } from "@/store/modules/setting.ts";
import { computed, ref } from "vue";

const SettingStore = useSettingStore();
const drawer = computed({
  get() {
    return SettingStore.themeConfig.showSetting;
  },
  set() {
    SettingStore.setThemeConfig("showSetting", !SettingStore.themeConfig.showSetting);
  },
});
const primary = ref(SettingStore.themeConfig.primary);
const globalComSize = ref(SettingStore.themeConfig.globalComSize);
const showLogo = ref(SettingStore.themeConfig.showLogo);
const footer = ref(SettingStore.themeConfig.footer);
const fixedHeader = ref(SettingStore.themeConfig.fixedHeader);
const weak = ref(SettingStore.themeConfig.weak);
const gray = ref(SettingStore.themeConfig.gray);
const isDark = ref(SettingStore.themeConfig.isDark);

const changePrimary = () => {
  if (!val) {
    primary.value = val = PRIMARY_COLOR;
    ElMessage({ type: "success", message: `主题颜色已重置为 ${PRIMARY_COLOR}` });
  }
  document.documentElement.style.setProperty("--el-color-primary", val);
  SettingStore.setThemeConfig("primary", val);
};

// 预定义主题颜色
const predefineColor = [
  "#409EFF",
  "#1890ff",
  "#304156",
  "#212121",
  "#11a983",
  "#13c2c2",
  "#6959CD",
  "#f5222d",
];
</script>
<template>
  <el-drawer title="主题配置" size="300px">
    <!-- <div class="theme-item">
      <label>导航栏布局</label>
      <el-select
        v-model="layout"
        placeholder="请选择"
        style="width: 150px"
        @change="(val) => changeSwitch('mode', val)"
      >
        <el-option label="纵向" value="vertical"></el-option>
        <el-option label="横向" value="horizontal"></el-option>
        <el-option label="分栏" value="columns"></el-option>
      </el-select>
    </div> -->
    <div class="theme-item">
      <label>主题颜色</label>
      <el-color-picker
        v-model="primary"
        :predefine="predefineColor"
        @change="changePrimary"
      />
    </div>
    <!-- <div class="theme-item">
      <label>暗黑模式</label>
      <switch-dark></switch-dark>
    </div>
    <div class="theme-item">
      <label>灰色模式</label>
      <el-switch v-model="gray" @change="(val) => changeGrayWeak('gray', val)" />
    </div>
    <div class="theme-item">
      <label>色弱模式</label>
      <el-switch v-model="weak" @change="(val) => changeGrayWeak('weak', val)" />
    </div>
    <div class="theme-item">
      <label>标签栏</label>
      <el-switch v-model="showTag" @change="(val) => changeSwitch('showTag', val)" />
    </div>
    <div class="theme-item">
      <label>侧边栏 Logo</label>
      <el-switch v-model="showLogo" @change="(val) => changeSwitch('showLogo', val)" />
    </div>
    <div class="theme-item">
      <label>保持一个子菜单的展开</label>
      <el-switch
        v-model="uniqueOpened"
        @change="(val) => changeSwitch('uniqueOpened', val)"
      />
    </div>
    <div class="theme-item">
      <label>固定header</label>
      <el-switch
        v-model="fixedHeader"
        @change="(val) => changeSwitch('fixedHeader', val)"
      />
    </div> -->
  </el-drawer>
</template>
<style scoped></style>
