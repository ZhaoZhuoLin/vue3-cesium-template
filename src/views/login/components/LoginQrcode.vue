<script setup lange="ts">
import vueQr from "vue-qr/src/packages/vue-qr.vue";
</script>
<template>
  <div class="login-qrcode">
    <h2 class="title">CodeTime-Admin</h2>
    <vue-qr text="https://github.com/zouzhibin/vue-admin-perfect"></vue-qr>
  </div>
</template>
<style lang="scss" scoped>
@import "../index";
</style>
