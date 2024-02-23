<script setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";
onMounted(() => {
  init();
});

const init = () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {});
  console.log(viewer);
};
</script>
<template>
  <div class="app-container">
    <div id="cesiumContainer"></div>
  </div>
</template>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: calc(100vh - 90px - 40px);
}
</style>
