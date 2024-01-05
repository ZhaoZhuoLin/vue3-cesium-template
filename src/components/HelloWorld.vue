<script setup lang="ts">
defineProps<{ msg: string }>();
import {computed } from "vue";
import { useSettingStore } from "@/store/modules/setting.ts";
const settingStore = useSettingStore();
const name = computed(() => {
  return settingStore.name;
});

const setName = () => {
  settingStore.setName("我是新标题");
};



</script>

<template>
  <!-- <h1>{{ msg }}</h1> <button @click="setName">设置新标题</button> -->
  <h1>{{ name }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
