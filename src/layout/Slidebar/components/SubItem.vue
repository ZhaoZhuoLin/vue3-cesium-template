<script setup lange="ts">
import { ref } from "vue";
import Link from "./Link.vue";
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const onlyOneChild = ref(null);
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    // 过滤掉需要隐藏的菜单
    if (item.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });
  // 当只有一个子路由器时，默认情况下会显示该子路由器
  if (showingChildren.length === 1) {
    return true;
  }
  // 如果没有要显示的子路由器，则显示父路由器
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, noShowingChildren: true };
    return true;
  }
  return false;
};
</script>
<template>
  <template v-if="!item.hidden">
    <template v-if="!item.alwaysShow && hasOneShowingChild(item.children, item)">
      <Link v-if="onlyOneChild.meta" :to="onlyOneChild.path">
        <el-menu-item :index="onlyOneChild.path">
          <template #title>
            <el-icon :size="20">
              <component :is="onlyOneChild?.meta.icon"></component>
            </el-icon>
            {{ onlyOneChild.meta && onlyOneChild.meta.title }}</template
          >
        </el-menu-item>
      </Link>
    </template>
    <el-sub-menu :index="item.path" v-else teleported>
      <template #title>
        <el-icon :size="20"> <component :is="item.meta?.icon"></component></el-icon>
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
      <SubItem v-for="child in item.children" :key="child.path" :item="child" />
    </el-sub-menu>
  </template>
</template>
<style scoped></style>
