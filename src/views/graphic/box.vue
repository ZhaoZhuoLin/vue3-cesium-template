<script setup lange="ts">
import * as Cesium from "cesium";
import { onMounted, ref } from "vue";
import Map from "@/utils/cesium/Map.js";
import border from "@/assets/data/520000.json";
import grid3dData from "@/assets/data/cube.json";
import grid3dData1 from "@/assets/data/cube1.json";
import REFL_10CM from "@/assets/REFL_10CM/2021-06-25_120000/1/1.png";
let viewer = null;

onMounted(() => {
  const map = new Map();
  viewer = map.initViewer("cesiumContainer", {});
  addBox(viewer, grid3dData1);
  // testImg(REFL_10CM);
});

function devidev(originalArray, step) {
  var dividedArray = [];
  for (var i = 0; i < originalArray.length; i += step) {
    var subArray = originalArray.slice(i, i + step);
    dividedArray.push(subArray);
  }
  return dividedArray;
}

const addBox = (viewer, grid3dData) => {
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
  // let minHeight = 0;
  // let maxHeight = 5700;
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

const testImg = (src) => {
  var img = new Image();

  // 设置图像源为灰度图像的URL
  img.src = src;

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
    var redRange = { min: 0, max: 244 };
    let trueValues = [];
    var valueMapping = {
      getMappedValue: function (grayValue) {
        var mappedValue =
          ((grayValue - redRange.min) * (100 - 0)) / (redRange.max - redRange.min) + 0;
        return mappedValue;
      },
    };
    console.log(imageData);
    for (var i = 0; i < imageData.data.length; i += 4) {
      let grayValue = imageData.data[i];
      if (grayValue >= redRange.min && grayValue <= redRange.max) {
        let mappedValue = valueMapping.getMappedValue(grayValue);
        trueValues.push(mappedValue);
      } else {
        trueValues.push(0);
      }
    }

    console.log(JSON.stringify(devidev(trueValues, 549)));
  };
};
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
