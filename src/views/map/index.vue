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
  width: 500px;
  height: 500px;
}
</style>
