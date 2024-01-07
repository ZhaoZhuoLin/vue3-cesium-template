import { defineStore } from 'pinia'
import { getWeather } from '@/api/wea.ts';
export const useWeatherStore = defineStore('weatherStore',{
    state: ()=>{
        return {
            weatherInfo:{}
        }
    },
    actions:{
        async getWeather(){
            const res = await getWeather({
                areacode: 101010100,
                key: "lXbi95Fc6NiT00Gj7F9PtE3PQ6mvNNdw",
            })
            if(res.status==200 &&res.data.status==0){
            const {result} = res.data;
            this.weatherInfo = result
            }
         }, 
    }
})