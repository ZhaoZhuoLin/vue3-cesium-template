<script setup>
import * as Cesium from "cesium";
import { computed, onMounted } from "vue";
import Map from "@/utils/cesium/Map.js";
onMounted(() => {
  init();
});

const init = () => {
  const map = new Map();
  let viewer = map.initViewer("cesiumContainer", {});
  console.log(viewer);
  // const viewer = new Cesium.Viewer("cesiumContainer", {});
};
</script>
<template>
  <div id="cesiumContainer"></div>
  <div id="creditContainer"></div>
</template>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
