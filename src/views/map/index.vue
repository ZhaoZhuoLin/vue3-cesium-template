<script setup lange="ts">
import * as Cesium from "cesium";
import { computed, onMounted } from "vue";
onMounted(() => {
  init();
});

const init = () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {});
};
</script>
<template>
  <div id="cesiumContainer"></div>
</template>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
