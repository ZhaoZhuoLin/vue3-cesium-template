<script setup lange="ts">
import * as Cesium from "cesium";
import { onMounted, ref } from "vue";
import Map from "@/utils/cesium/Map.js";
import border from "@/assets/data/520000.json";
let viewer = null;
onMounted(() => {
  const map = new Map();
  viewer = map.initViewer("cesiumContainer", {});

  var homePOsition = [116.23, 39.54, 3000000];
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(
      homePOsition[0],
      homePOsition[1],
      homePOsition[2]
    ),
  });

  //参考：http://cesium.xin/cesium/cn/Documentation1.62/Entity.html?classFilter=entity
  //point
  let point = viewer.entities.add({
    id: "data-point",
    show: true,
    position: Cesium.Cartesian3.fromDegrees(homePOsition[0], homePOsition[1]),
    point: {
      pixelSize: 10,
      color: Cesium.Color.YELLOW,
    },
  });

  //box
  viewer.entities.add({
    id: "data-box",
    show: true,
    position: Cesium.Cartesian3.fromDegrees(homePOsition[0], homePOsition[1], 0),
    box: {
      dimensions: new Cesium.Cartesian3(50000.0, 50000, 50000.0),
      material: Cesium.Color.BLUE.withAlpha(0.5),
    },
  });
  //Circle
  viewer.entities.add({
    id: "data-Circle",
    show: true,
    position: Cesium.Cartesian3.fromDegrees(116.23, 39.54, 150000.0),
    name: "Green circle at height",
    ellipse: {
      semiMinorAxis: 15000.0,
      semiMajorAxis: 15000.0,
      height: 500.0,
      material: Cesium.Color.CYAN,
    },
  });

  //Corridor
  viewer.entities.add({
    id: "data-Corridor",
    corridor: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        100.0,
        40.0,
        105.0,
        40.0,
        105.0,
        35.0,
      ]),
      width: 200000.0,
      material: Cesium.Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.RED,
    },
  });
  //Cylinder
  viewer.entities.add({
    id: "data-Cylinder",
    position: Cesium.Cartesian3.fromDegrees(100.0, 40.0, 10000.0),
    cylinder: {
      length: 400000.0,
      topRadius: 200000.0,
      bottomRadius: 200000.0,
      material: Cesium.Color.GREEN.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.DARK_GREEN,
    },
  });
  //Cone
  viewer.entities.add({
    id: "data-Cone",
    position: Cesium.Cartesian3.fromDegrees(120.51, 30.4, 10000.0),
    cylinder: {
      length: 400000.0,
      topRadius: 0.0,
      bottomRadius: 200000.0,
      material: Cesium.Color.RED,
    },
  });
  //Polygon
  viewer.entities.add({
    id: "data-Polygon",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        115.0,
        37.0,
        115.0,
        32.0,
        107.0,
        33.0,
      ]),
      material: Cesium.Color.CYAN.withAlpha(0.5),
    },
  });

  //rectangle
  viewer.entities.add({
    id: "data-rectangle",
    name: "Red translucent rectangle with outline",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(80.0, 20.0, 120.0, 25.0),
      material: Cesium.Color.BLACK.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    },
  });

  //Sphere椭球
  viewer.entities.add({
    id: "data-Sphere",
    name: "Red sphere with black outline",
    position: Cesium.Cartesian3.fromDegrees(107.0, 40.0, 300000.0),
    ellipsoid: {
      radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
      material: Cesium.Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    },
  });

  //ellipsoid椭球
  viewer.entities.add({
    id: "data-ellipsoid",
    name: "Blue ellipsoid",
    position: Cesium.Cartesian3.fromDegrees(114.0, 40.0, 300000.0),
    ellipsoid: {
      radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
      material: Cesium.Color.BLUE,
    },
  });

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

      wallDataPoly.push(element[j][0]);
      wallDataPoly.push(element[j][1]);
    }
  }
  wallData.push(wallData[0]);
  wallData.push(wallData[1]);
  wallData.push(wallData[2]);
  console.log(wallDataPoly);

  //polyline
  viewer.entities.add({
    id: "data-polyline",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(wallDataPoly),
      width: 5,
      material: Cesium.Color.CYAN,
    },
  });

  //wall墙
  viewer.entities.add({
    id: "data-wall",
    name: "Green wall from surface with outline",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(wallData),

      // positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      //   107.0,
      //   43.0,
      //   100000.0,
      //   97.0,
      //   43.0,
      //   100000.0,
      //   97.0,
      //   40.0,
      //   100000.0,
      //   107.0,
      //   40.0,
      //   100000.0,
      //   107.0,
      //   43.0,
      //   100000.0,
      // ]),
      material: Cesium.Color.CYAN.withAlpha(0.3), // 设置墙体颜色
      emissive: true, // 开启自发光
      glowPower: 1, // 设置发光强度
      height: 100.0, // 设置墙体高度
      extrudedHeight: 100.0, // 设置墙体拉伸高度
      // material: Cesium.Color.CYAN.withAlpha(0.5),
      // outline: true,
      // outlineColor: Cesium.Color.BLUE,
      // extrudedHeight: 200,
    },
  });
});

const getEntityByID = (id) => {
  let entity = viewer.entities.getById(id);
  console.log(entity);
  if (entity) {
    entity.show = !entity.show;
  }
};

const changeShow = (id) => {
  getEntityByID(id);
};
const point = ref(true);
const box = ref(true);
const Circle = ref(true);
const Ellipse = ref(true);
const Corridor = ref(true);
const Cylinder = ref(true);
const Cone = ref(true);
const Polygon = ref(true);
const polyline = ref(true);
const rectangle = ref(true);
const Sphere = ref(true);
const ellipsoid = ref(true);
const wall = ref(true);
</script>
<template>
  <div class="app-container">
    <div id="cesiumContainer"></div>
    <div id="creditContainer" style="display: none"></div>
    <div class="oprecation">
      <el-checkbox @change="changeShow('data-point')" v-model="point" label="point点" />
      <el-checkbox @change="changeShow('data-box')" v-model="box" label="box盒子" />
      <el-checkbox
        @change="changeShow('data-Circle')"
        v-model="Ellipse"
        label="Circle椭圆"
      />
      <el-checkbox
        @change="changeShow('data-Corridor')"
        v-model="Corridor"
        label="Corridor走廊"
      />
      <el-checkbox
        @change="changeShow('data-Cylinder')"
        v-model="Cylinder"
        label="Cylinder圆柱"
      />
      <el-checkbox @change="changeShow('data-Cone')" v-model="Cone" label="Cone圆锥体" />
      <el-checkbox
        @change="changeShow('data-Polygon')"
        v-model="Polygon"
        label="Polygon多边形"
      />
      <el-checkbox
        @change="changeShow('data-polyline')"
        v-model="polyline"
        label="polyline折线"
      />
      <el-checkbox
        @change="changeShow('data-rectangle')"
        v-model="rectangle"
        label="rectangle矩形"
      />
      <el-checkbox
        @change="changeShow('data-Sphere')"
        v-model="Sphere"
        label="Sphere椭球"
      />
      <el-checkbox
        @change="changeShow('data-ellipsoid')"
        v-model="ellipsoid"
        label="ellipsoid椭球"
      />
      <el-checkbox @change="changeShow('data-wall')" v-model="wall" label="wall墙" />
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
