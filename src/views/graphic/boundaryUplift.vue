<script setup lange="ts">
import * as Cesium from "cesium";
import { onMounted, ref } from "vue";
import Map from "@/utils/cesium/Map.js";
// import modifyMap from "@/utils/cesium/modifyMap.js";
import border from "@/assets/data/520000.json";
import BoundaryUplift from "@/utils/cesium/BoundaryUplift.js";
let viewer = null;

onMounted(() => {
  const map = new Map();
  viewer = map.initViewer("cesiumContainer", {});
  let coordinates = border.features[0].geometry.coordinates;
  let wallData = [];
  let wallDataPoly = [];
  for (let i = 0; i < coordinates.length; i++) {
    const element = coordinates[i][0];
    for (let j = 0; j < element.length; j++) {
      element[j][2] = 20000;
      wallData.push(element[j][0]);
      wallData.push(element[j][1]);
      wallData.push(element[j][2]);
      if (i == 0) {
        wallDataPoly.push(element[j][0]);
        wallDataPoly.push(element[j][1]);
      }
    }
  }
  wallData.push(wallData[0]);
  wallData.push(wallData[1]);
  wallData.push(wallData[2]);

  /**
   * polyline
   */
  // console.log(wallDataPoly);
  viewer.entities.add({
    id: "data-polyline",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(wallData),
      width: 1,
      height: 20000,
      material: Cesium.Color.CYAN,
    },
  });

  /**
   *wall
   */
  let wallEntity = viewer.entities.add({
    id: "data-wall",
    name: "Green wall from surface with outline",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(wallData),
      material: Cesium.Color.CYAN.withAlpha(0.3), // 设置墙体颜色
      emissive: true, // 开启自发光
      glowPower: 1, // 设置发光强度
      height: 100.0, // 设置墙体高度
      extrudedHeight: 100.0, // 设置墙体拉伸高度
    },
  });

  /**
   * Polygon
   */
  viewer.entities.add({
    id: "data-Polygon",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(wallData),
      material: Cesium.Color.CYAN.withAlpha(0.3),
    },
  });
  viewer.zoomTo(wallEntity);
});

const getEntityByID = (id) => {
  let entity = viewer.entities.getById(id);
  if (entity) {
    entity.show = !entity.show;
  }
};

const changeShow = (id) => {
  getEntityByID(id);
};
const polyline = ref(true);
const wall = ref(true);
const Polygon = ref(true);
const zhezhao = ref(true);
</script>
<template>
  <div class="app-container">
    <div id="cesiumContainer"></div>
    <div id="creditContainer" style="display: none"></div>
    <div class="oprecation">
      <el-checkbox
        @change="changeShow('data-polyline')"
        v-model="polyline"
        label="polyline"
      />
      <el-checkbox @change="changeShow('data-wall')" v-model="wall" label="wall" />
      <el-checkbox
        @change="changeShow('data-Polygon')"
        v-model="Polygon"
        label="Polygon"
      />
      <el-checkbox v-model="Polygon" label="添加遮罩层" />
    </div>
  </div>
</template>
<style scoped lang="scss">
#cesiumContainer {
  width: 100%;
  height: calc(100vh - 90px - 40px);
}
.oprecation {
  position: absolute;
  z-index: 8888;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .el-checkbox {
    margin-bottom: 10px;
    color: white !important;
  }
}
</style>
@/utils/cesium/Map.js
