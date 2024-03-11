<script setup lange="ts">
import CollapseIcon from "./components/CollapseIcon.vue";
import Hamburger from "./components/Hamburger.vue";
</script>
<template>
  <div class="m-tool-left">
    <CollapseIcon />
    <Hamburger />
  </div>
</template>
<style lang="scss" scoped>
.m-tool-left {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 15px;
}
</style>
