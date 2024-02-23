<template>
  <!-- 纵向布局 -->
  <Sidebar />
  <div class="main-container">
    <HeaderVertical />
    <Main />
    <Footer />
  </div>
</template>
<script setup lange="ts">
import Sidebar from "@/layout/Slidebar/index.vue";
import HeaderVertical from "./HeaderVertical/index.vue";
import Main from "@/layout/components/Main/index.vue";
import Footer from "@/layout/components/Footer/index.vue";
</script>
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
