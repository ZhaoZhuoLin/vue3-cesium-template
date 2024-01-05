<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from "./components/HelloWorld.vue";

console.log(import.meta.env)
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <nav>
    <RouterLink to="/about"> about </RouterLink>
    <RouterLink to="/demos"> Demos </RouterLink>
    <RouterLink to="/weathers"> weathers </RouterLink>
  </nav>
  <RouterView/>
</template>

<style scoped>
nav a{
  border: 1px solid rgb(29, 106, 165);
  padding:0 10px;
 }
</style>
