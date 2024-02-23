<script setup lange="ts">
import path from "path-browserify";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed, watch } from "vue";
import { useTagsView } from "@/store/modules/tagsView.ts";
import { usePermissionStore } from "@/store/modules/permission.ts";
const TagsViewStore = useTagsView();
const PermissionStore = usePermissionStore();

const route = useRoute();
const router = useRouter();
const routes = computed(() => PermissionStore.routes);
const visitedRoute = computed(() => TagsViewStore.visitedRoute);
const activeTabsValue = computed({
  get: () => {
    return TagsViewStore.activeTabsValue;
  },
  set: (val) => {
    TagsViewStore.setActiveTabeValue(val);
  },
});

onMounted(() => {
  initTags();
});
watch(route, () => {
  addTags();
});

const affixTags = ref([]);
const initTags = () => {
  let routeList = routes.value;
  let affixTag = (affixTags.value = filterAffixTags(routeList));
  console.log("affixTag", affixTag);
  for (const tag of affixTag) {
    if (tag.name) {
      TagsViewStore.addVisitedRoute(tag);
    }
  }
};
const tabClick = (activeTabPath) => {
  router.push(activeTabPath.props.name);
};
const isActive = (path) => {
  return path === route.path;
};

//查找store中相近的tag
const toLastView = (activeTabPath) => {
  let index = visitedRoute.value.findIndex((item) => (item.path = activeTabPath));
  const nextTab = visitedRoute.value[index + 1] || visitedRoute.value[index - 1];
  if (!nextTab) return;
  router.push(nextTab.path);
  TagsViewStore.addVisitedRoute(nextTab);
};

const removeTab = async (activeTabPath) => {
  if (isActive(activeTabPath)) {
    toLastView(activeTabPath);
  }
  await TagsViewStore.delRoute(activeTabPath);
};

//查找默认需要固定的tag
const filterAffixTags = (routes, basePath = "/") => {
  let tags = [];
  routes.forEach((r) => {
    if (r.meta && r.meta.affix) {
      const tagPath = path.resolve(basePath, r.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: r.name,
        meta: { ...r.meta },
      });
    }
    if (r.children) {
      const tempTags = filterAffixTags(r.children, r.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
};

const addTags = () => {
  const { name } = route;
  if (name === "Login") {
    return;
  }
  if (name) {
    TagsViewStore.addVisitedRoute(route);
  } else {
    return false;
  }
};
</script>
<template>
  <div class="m-tags-view">
    <div class="tags-view">
      <el-tabs
        closable
        v-model="activeTabsValue"
        @tab-click="tabClick"
        @tab-remove="removeTab"
        type="card"
      >
        <el-tab-pane
          v-for="item in visitedRoute"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :path="item.path"
          @closable="!(item.meta && item.meta.affix)"
        >
          <template #label>
            <el-icon class="tabs-icon" v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.m-tags-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  background: white;
  .right-btn {
    height: 100%;
    flex-shrink: 0;
  }
}
.tags-view {
  .el-tabs--card :deep(.el-tabs__header) {
    box-sizing: border-box;
    height: 40px;
    padding: 0 10px;
    margin: 0;
  }
  :deep(.el-tabs) {
    .el-tabs__nav {
      border: none;
    }
    .el-tabs__header .el-tabs__item {
      border: none;
      color: #cccccc;
    }
    .el-tabs__header .el-tabs__item.is-active {
      color: $primaryColor;
      border-bottom: 2px solid $primaryColor;
    }
  }
}
</style>
