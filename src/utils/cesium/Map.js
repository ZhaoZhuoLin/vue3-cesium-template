/**
 * 基于Cesium.Viewer封装地图(球)控件
 */
import * as Cesium from "cesium";
export default class Map {
  /**
   * 初始化创建
   * @param {String} cesiumContainer
   * @param {Object} viewOptions
   * @param {Boolean} [viewOptions.handKeyEvent=true] 是否开启常用的辅助快捷键:空格正视地球,F查看FPS,R显示地球三角网
   */
  initViewer(cesiumContainer, viewOptions) {
    this.token = "ae7be23d49a12c4778df3b7cbb660f97";
    this._cesiumContainer = typeof cesiumContainer === "string" ? document.getElementById(cesiumContainer) : cesiumContainer;
    this._options = viewOptions ? viewOptions : {}
    this.viewer = null;
    this._init();
    this.handKeyEvent = this._options.handKeyEvent ? this._options.handKeyEvent : true;
    this._keyDown();
    return this.viewer
  }
  _init() {
    const options = {
      optimizeForMobile: true,
      fullscreenButton:false,// 是否显示全屏按钮，默认为true。
      homeButton:false,// 是否显示主页按钮
      animation: false, //是否显示动画控件
      baseLayerPicker: false, //是否显示图层选择控件
      geocoder: false, //是否显示地名查找控件
      timeline: false, //是否显示时间线控件
      sceneModePicker: false, //是否显示投影方式控件
      navigationHelpButton: false, //是否显示帮助信息控件
      infoBox: true, //是否显示点击要素之后显示的信息
      terrainExaggeration:1,//地形夸张倍数
      contextOptions: { // WebGL上下文选项
        webgl: {
          alpha: true,
          depth: false,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: true, //通过canvas.toDataURL()实现截图需要将该项设置为true
          failIfMajorPerformanceCaveat: true
        },
        allowTextureFilterAnisotropic: true
      },
      creditContainer: "creditContainer",//自定义版权容器
      navigationInstructionsInitiallyVisible: false//控制导航说明的初始显示状态。
    };
    for (let prop in this._options) {
      options[prop] = this._options[prop];
    }
    this._options = options;
    if (this.viewer === "function") {
      return
    } else {
      this.viewer = new Cesium.Viewer(this._cesiumContainer, this._options);
      this.initImageryLayers(this.viewer);
    }
  }
  initImageryLayers(viewer){
    // 服务域名
    var tdtUrl = "https://t{s}.tianditu.gov.cn/";
    // 服务负载子域
    var subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];

    // 叠加影像服务
    var imgMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + "DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + this.token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18,
    });
    viewer.imageryLayers.addImageryProvider(imgMap);

    // 叠加影像服务
    var imgMapCia_w = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + "DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" + this.token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18,
    });
    viewer.imageryLayers.addImageryProvider(imgMapCia_w);

    // 叠加国界服务
    var iboMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + "DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=" + this.token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 10,
    });
    viewer.imageryLayers.addImageryProvider(iboMap);


  }

  /**
   * 监听键盘输入操作
   * @returns
   */
  _keyDown() {
    let self = this;
    if (!this.handKeyEvent) return
    document.addEventListener("keydown", function (event) {
      let e = event || window.event || arguments.callee.caller.arguments[0];
      if (event.target == self.viewer.container ||
        event.target == document.body ||
        event.target == document ||
        event.target == self.viewer.scene.canvas) {} else {
        return;
      }
      if (e) {
        switch (e.keyCode) {
          case 32: // 按 空格键,调整相机俯视当前视区
            var cn = self.getCenter();
            if (!cn) {
              break;
            }
            var pos = Cesium.Cartesian3.fromDegrees(cn.longitude, cn.latitude, cn.height);
            self.viewer.camera.setView({
              position: pos,
              heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north)
              pitch: Cesium.Math.toRadians(-90), // default value (looking down)
              roll: 0.0 // default value
            });
            event.preventDefault();

            break;
          case 82: //R键查看地形三角网
            if (self.viewer.cesiumInspector) {
              if (!self.viewer.cesiumInspector.viewModel.wireframe) {
                self.viewer.cesiumInspector.viewModel.wireframe = true;
              } else {
                self.viewer.cesiumInspector.viewModel.wireframe = false;
              }
            }
            break;
          case 70: //F键查看帧率
          self.viewer.scene.debugShowFramesPerSecond = !self.viewer.scene.debugShowFramesPerSecond;
            break;
          default:
        }

      }
    })
  }

  /**
   * 获取当前地球的中心点
   * @returns {object} 返回当前地球视图中心点
   * @returns {Number} center.longitude
   * @returns {Number} center.latitude
   * @returns {Number} center.height
   */
  getCenter() {
    // 得到当前三维场景
    var scene = this.viewer.scene;

    // 得到当前三维场景的椭球体
    var ellipsoid = scene.globe.ellipsoid;
    var canvas = scene.canvas;
    var center = undefined;
    // canvas中心
    var car3_lt = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width / 2, canvas.height / 2), ellipsoid);
    if (car3_lt) {
      center = {};
      var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
      center.longitude = Cesium.Math.toDegrees(carto_lt.longitude);
      center.latitude = Cesium.Math.toDegrees(carto_lt.latitude);
      center.height = this.viewer.camera.positionCartographic.height;
    }
    return center;
  }
}
