<script setup lange="ts">
import {computed} from "vue"

import {useWeatherStore} from "@/store/modules/weather.ts"
const settingStore  = useWeatherStore()
const weatherInfo = computed(()=>{
  return settingStore.weatherInfo
})

// const weatherInfo = ref(null);
const handleWeather = async () => {
  settingStore.getWeather()
  // let res = await getWeather({
  //   areacode: 101010100,
  //   key: "lXbi95Fc6NiT00Gj7F9PtE3PQ6mvNNdw",
  // });
  //  if(res.status==200 &&res.data.status==0){
  //   let {result} = res.data;
  //   console.log(result)
  //   weatherInfo = result
  //   console.log(weatherInfo)
  // }
};
</script>
<template>
  <div>
    weather界面
    <br>
    <button @click="handleWeather">获取本地天气</button>
    <span>{{ weatherInfo }}</span>
  </div>
</template>
<style scoped></style>
