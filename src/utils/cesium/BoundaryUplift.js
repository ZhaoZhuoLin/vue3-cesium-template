import border from "@/assets/data/china.json";
import * as Cesium from "cesium";

/**
 * @description 边界抬升
 */
export default class BoundaryUplift {
  constructor(viewer,options){
    if(!viewer) throw new Error("viewer must introduce")
    options = options || {};
    this._adcode = Cesium.defaultValue(options.adcode,110000)
    this.viewer = viewer
    this._init()

    // Object.defineProperties(this,"adcode",{
    //   get(){
    //     return this.adcode
    //   },
    //   set(newAdcode){
    //     console.log("newAdcode change")
    //     let data  = this.getBorder(newAdcode)
    //     console.log(newAdcode)
    //   }
    // })
  }
  _init(){
    let data  = this.getBorder(this._adcode)
    console.log(data.geometry.coordinates)
     // if(!data.geometry.coordinates)return
  //   this.viewer.entities.add(new Cesium.Entity({
  //     polygon: {
  //      hierarchy: {
  //        positions: Cesium.Cartesian3.fromDegreesArray([
  //          73, 3, 136, 3, 136, 59, 73, 59,
  //        ]), //外部区域
  //        holes: [
  //          {
  //            positions: [], //挖空区域
  //          },
  //        ],
  //      },
  //      material: Cesium.Color.BLACK.withAlpha(0.6), //外部颜色
  //    },
  //  }))
  }
  getBorder(adcode){
    let features = border.features.find(item=>item.properties.adcode==adcode)
    return features?features:null
  }
}
