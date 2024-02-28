<script setup lange="ts">
import * as Cesium from "cesium";
import { onMounted } from "vue";
import Map from "@/utils/Map.js";
onMounted(() => {
  const map = new Map();
  const viewer = map.initViewer("cesiumContainer", {});
  console.log(viewer);
  // var img_arcgis = new Cesium.ArcGisMapServerImageryProvider({
  //   name: "img_arcgis",
  //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  // });
  // var layers = viewer.scene.imageryLayers;
  // layers.addImageryProvider(img_arcgis);
});
</script>
<template>
  <div class="app-container">
    <div id="cesiumContainer"></div>
    <div id="creditContainer" style="display: none"></div>
  </div>
</template>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: calc(100vh - 90px - 40px);
}
</style>
