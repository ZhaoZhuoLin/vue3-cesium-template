<script setup lange="ts" name="Hamburger">
import { ArrowRight } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const handleLink = (item) => {
  router.push({
    path: item.path,
  });
};
const matchedRoute = computed(() =>
  route.matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false),
);
console.log(matchedRoute);
</script>
<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }" key="home" v-if="matchedRoute[0].meta.title !== '首页'">
      <div class="breadcrumb-item">
        <span class="breadcrumb-title">首页</span>
      </div>
    </el-breadcrumb-item>

    <el-breadcrumb-item v-for="(item, index) in matchedRoute" :key="item.name">
      <!-- <el-icon :size="20"> <component :is="item.meta?.icon"></component></el-icon> -->
      <span v-if="item.redirect === 'noRedirect' || index == matchedRoute.length - 1" class="no-redirect">{{
        item.meta.title
      }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style lang="scss" scoped></style>
