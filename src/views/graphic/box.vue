<script setup lange="ts">
import * as Cesium from "cesium";
import { onMounted, ref } from "vue";
import Map from "@/utils/cesium/Map.js";
// import modifyMap from "@/utils/cesium/modifyMap.js";
import border from "@/assets/data/520000.json";
import grid3dData from "@/assets/data/cube.json";
import REFL_10CM from "@/assets/REFL_10CM/2021-06-25_120000/1/1.png";
// import render from "@meteolib/render";
let viewer = null;

onMounted(() => {
  const map = new Map();
  viewer = map.initViewer("cesiumContainer", {});
  addBox(viewer);
  testImg();

  // var geoOptions = {
  //   longitudes: [121, 122, 123, 124],
  //   latitudes: [24, 23, 22, 21],
  //   gridData: [
  //     [
  //       [10, 12, 1, 0],
  //       [10, 2, 6, 2],
  //       [0, 2, 18, 16],
  //       [10, 9, 1, 3],
  //     ],
  //     [
  //       [1, 1, 19, 9],
  //       [0, 18, 12, 10],
  //       [20, 2, 6, 15],
  //       [0, 12, 9, 12],
  //     ],
  //     [
  //       [10, 1, 19, 12],
  //       [5, 1, 2, 12],
  //       [0, 12, 8, 2],
  //       [10, 2, 18, 2],
  //     ],
  //     [
  //       [10, 1, 19, 12],
  //       [5, 1, 2, 12],
  //       [0, 12, 8, 2],
  //       [10, 2, 18, 2],
  //     ],
  //   ],
  //   heights: [100000, 200000, 300000, 400000],
  //   colorMap: GridDataColorMap.ASCATWINSPEED,
  //   showType: GridData3DPrimitive.ShowType.SHELL,
  // };

  // var gridData3DPrimitive = new GridData3DPrimitive(geoOptions);
  // viewer.scene.primitives.add(gridData3DPrimitive);
});

const addBox = (viewer) => {
  var west = grid3dData.longitudes[0],
    east = grid3dData.longitudes[grid3dData.longitudes.length - 1],
    south = grid3dData.latitudes[0],
    north = grid3dData.latitudes[grid3dData.latitudes.length - 1];
  let cubeOperator = {};
  cubeOperator.postParams = {
    west: west,
    east: east,
    south: south,
    north: north,
    heights: [grid3dData.heights[0], grid3dData.heights[grid3dData.heights.length - 1]],
  };

  var params = cubeOperator.postParams;
  var that = this;
  var positions = Cesium.Cartesian3.fromDegreesArray([
    params.west,
    params.north,
    params.west,
    params.south,
    params.east,
    params.south,
    params.east,
    params.north,
  ]);
  let cubeHierarchy = new Cesium.PolygonHierarchy(positions);
  let minHeight = params.heights[0];
  let maxHeight = params.heights[params.heights.length - 1];
  console.log(positions);
  let box = viewer.entities.add({
    polygon: {
      hierarchy: new Cesium.CallbackProperty(function (time) {
        return cubeHierarchy;
      }, false),
      fill: false,
      outline: true,
      outlineColor: Cesium.Color.WHITE,
      // height: 0,
      // extrudedHeight: 100,
      height: new Cesium.CallbackProperty(function (time) {
        return minHeight;
      }, false),
      extrudedHeight: new Cesium.CallbackProperty(function (time) {
        return maxHeight - minHeight;
      }, false),
    },
  });
  viewer.zoomTo(box);
};

const testImg = () => {
  var img = new Image();

  // 设置图像源为灰度图像的URL
  img.src = REFL_10CM;

  // 当图像加载完成时执行的回调函数
  img.onload = function () {
    // 创建Canvas元素
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // 设置Canvas的大小与图像相同
    canvas.width = img.width;
    canvas.height = img.height;

    // 将图像绘制到Canvas上
    ctx.drawImage(img, 0, 0);

    // 获取像素数据
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    console.log(imageData);
    let result = [];
    // 遍历像素数据并获取灰度值
    for (var i = 0; i < imageData.data.length; i += 4) {
      // 对于灰度图像，每个像素的RGB值相同
      // var grayValue = ;
      result.push(imageData.data[i]);
      // console.log("灰度值:", grayValue);
    }
    console.log(result);
  };
}; // 创建Image对象
</script>
<template>
  <div class="app-container">
    <div id="cesiumContainer"></div>
    <div id="creditContainer" style="display: none"></div>
    <div class="oprecation"></div>
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
