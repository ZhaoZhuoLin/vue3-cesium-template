<script setup lange='ts'>
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
        demos页面
        <br>
        当前couter:{{ counter }} 
        <button @click="handleAddCounter(2)">点击当前couter+2</button>
    </div>
</template>
<style scoped>
</style>