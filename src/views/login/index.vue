<script lange="ts" setup>
import LoginForm from "./components/LoginForm.vue";
import LoginQrcode from "./components/LoginQrcode.vue";
import { ref } from "vue";

const accountLogin = ref(true);
const handleClick = () => {
  console.log("=======", accountLogin);
  accountLogin.value = !accountLogin.value;
};
</script>
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/image/login/side-logo.png" />
      </div>
      <div class="login-form">
        <div class="info-qrcode">{{ accountLogin ? "扫码登录" : "账号登录" }}</div>
        <img src="@/assets/image/login/qrcode-icon.png" class="qrcode" @click="handleClick" />

        <LoginForm v-if="accountLogin" />
        <LoginQrcode v-else />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "./index";
</style>
