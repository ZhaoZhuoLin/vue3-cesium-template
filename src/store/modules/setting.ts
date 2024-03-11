/*
 * @Author: FlyZhao 46128378+zhaoZhuolin@users.noreply.github.com
 * @Date: 2024-01-05 15:03:06
 * @LastEditors: FlyZhao 46128378+zhaoZhuolin@users.noreply.github.com
 * @LastEditTime: 2024-02-20 16:22:06
 * @FilePath: \vue3-cesium-template\src\store\modules\setting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { PRIMARY_COLOR } from "../../config";

export const useSettingStore = defineStore({
  id: "settingStore",
  state: () => {
    return {
      name: "settingState",
      counter: 0,
      // menu 是否收缩
      isCollapse: false,
      //
      withoutAnimation: false,
      device: "desktop",
      // 刷新当前页
      isReload: true,
      // 主题设置
      themeConfig: {
        // 显示设置
        showSetting: false,
        // 菜单展示模式 默认 vertical   horizontal / vertical /columns
        mode: "vertical",
        // tagsView 是否展示 默认展示
        showTag: false,
        // 页脚
        footer: true,
        // 深色模式 切换暗黑模式
        isDark: false,
        // 显示侧边栏Logo
        showLogo: true,
        // 主题颜色
        primary: PRIMARY_COLOR,
        // element组件大小
        globalComSize: "default",
        // 是否只保持一个子菜单的展开
        uniqueOpened: true,
        // 固定header
        fixedHeader: true,
        // 灰色模式
        gray: false,
        // 色弱模式
        weak: false,
      },
    };
  },
  actions: {
    setName(value: string) {
      this.name = value;
    },
    addCounter(value: number) {
      this.counter += value;
    },
    // 设置主题
    setThemeConfig(key, val) {
      this.themeConfig[key] = val;
     },
    // 切换 Collapse
    setCollapse(value) {
      this.isCollapse = value;
      this.withoutAnimation = false;
    },
    // 关闭侧边栏
    closeSideBar({ withoutAnimation }) {
      this.isCollapse = false;
      this.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device) {
      this.device = device;
    },
    // 刷新
    setReload() {
      this.isReload = false;
      setTimeout(() => {
        this.isReload = true;
      }, 50);
    },
  },
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  // 这部分数据不需要存储
  persist: {
    // 本地存储的名称
    key: "settingState",
    //保存的位置
    storage: window.localStorage, //localstorage
  },
});
