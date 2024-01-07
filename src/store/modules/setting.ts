import { defineStore } from 'pinia'

export const useSettingStore = defineStore('settingStore',{
    state: ()=>{
        return {
            name:"vite-vue-cesium-template",
            counter:0,
        }
    },
    actions:{
        setName(value:string){
            this.name = value;
        },
        addCounter(value:number){
            this.counter+= value;
        }
    },
    getters:{
        doubleCount: (state) => state.counter * 2,
    }
}) 