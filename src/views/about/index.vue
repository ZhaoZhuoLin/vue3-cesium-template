<!--
 * @Author: FlyZhao 46128378+zhaoZhuolin@users.noreply.github.com
 * @Date: 2024-01-05 15:58:09
 * @LastEditors: FlyZhao 46128378+zhaoZhuolin@users.noreply.github.com
 * @LastEditTime: 2024-02-18 09:49:16
 * @FilePath: \vite-vue-cesium-template\src\views\about\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<script setup  >
import {computed} from "vue"
import {useSettingStore} from "@/store/modules/setting.ts"
const settingStore  = useSettingStore()
const counter = computed(()=>{
    return settingStore.counter
})
const handleAddCounter = (val)=>{
    settingStore.addCounter(val)
}
</script>
<template>
    <div>
        about页面
        <br>
        当前couter:{{ counter }} 
        <button @click="handleAddCounter(1)">点击当前couter+1</button>
    </div>
</template>
<style scoped>
</style>