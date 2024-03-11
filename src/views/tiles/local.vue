<script setup lange="ts">
import * as Cesium from "cesium";
import { onMounted } from "vue";
import Map from "@/utils/cesium/Map.js";
onMounted(() => {
  const map = new Map();
  const viewer = map.initViewer("cesiumContainer", {});

  // 将三维球定位到中国
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
    orientation: {
      heading: Cesium.Math.toRadians(348.4202942851978),
      pitch: Cesium.Math.toRadians(-89.74026687972041),
      roll: Cesium.Math.toRadians(0),
    },
    complete: function callback() {
      // 定位完成之后的回调函数
    },
  });
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
@/utils/cesium/Map.js
