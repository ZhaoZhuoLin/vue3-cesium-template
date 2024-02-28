<script setup lange="ts">
import Remind from "./components/Remind.vue";
import Setting from "./components/Theme.vue";
import Avatar from "./components/Avatar.vue";
</script>
<template>
  <div class="m-tool-right">
    <!-- <Remind class="item-children" /> -->
    <Setting class="item-children" />
    <Avatar />
  </div>
</template>
<style lang="scss" scoped>
.m-tool-right {
  display: flex;
  align-items: center;
  .item-children {
    margin-right: 22px;
  }
}
</style>
