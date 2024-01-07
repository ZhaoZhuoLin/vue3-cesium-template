<script setup lange="ts">
import {computed} from "vue"

import {useWeatherStore} from "@/store/modules/weather.ts"
const settingStore  = useWeatherStore()
const weatherInfo = computed(()=>{
  return settingStore.weatherInfo
})
const name =123;
const handleWeather = async () => {
  settingStore.getWeather() 
};
</script>
<template>
  <div>
    weather界面
    <br>
    <button @click="handleWeather">点击获取本地天气</button>
    <span>{{ weatherInfo }}</span>
  </div>
</template>
<style scoped lang="scss">
span{
   font-size: 20px;
  color: $defaultColor;
}
</style>
