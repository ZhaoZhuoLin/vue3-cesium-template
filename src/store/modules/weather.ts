import { defineStore } from 'pinia'
import { getWeather } from '@/api/weather.ts';
export const useWeatherStore = defineStore('weatherStore',{
    state: ()=>{
        return {
            weatherInfo:{}
        }
    },
    actions:{
        async getWeather(){
            let res = await getWeather({
                areacode: 101010100,
                key: "lXbi95Fc6NiT00Gj7F9PtE3PQ6mvNNdw",
            })
            if(res.status==200 &&res.data.status==0){
            let {result} = res.data;
            console.log(result)
                this.weatherInfo = result
            }
         }, 
    },
    getters:{
        doubleCount: (state) => state.counter * 2,
    }
})