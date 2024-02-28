<script setup lange="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import AvatarLogo from "@/assets/image/logo.png";
import { useUserStore } from "@/store/modules/user.ts";
import { usePermissionStore } from "@/store/modules/permission.ts";
import { useTagsViewStore } from "@/store/modules/tagsView.ts";
const UserStore = useUserStore();
const PermissionStore = usePermissionStore();
const TagsViewStore = useTagsViewStore();
const router = useRouter();
const currentRoles = computed({
  get() {
    return UserStore.roles[0];
  },
  set(val) {
    (async () => {
      await UserStore.getInfo([val]);
      router.push({
        path: "/",
      });
      window.location.reload();
    })();
  },
});
const switchRolesAction = (type) => {
  if (type === currentRoles.value) return;
  currentRoles.value = currentRoles.value === "admin" ? "other" : "admin";
};

const logOut = async () => {
  ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true,
  })
    .then(async () => {
      await UserStore.logout();
      await router.push({ path: "/login" });
      TagsViewStore.clearAllRouter();
      PermissionStore.clearRoutes();
      ElMessage({
        type: "success",
        message: "退出登录成功！",
      });
    })
    .catch(() => {});
};
</script>
<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="30" class="avatar" :src="AvatarLogo" />
      管理员
      <el-icon class="header-icon el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :command="0" @click="switchRolesAction('admin')">
          {{ currentRoles === "admin" ? "当前角色" : "切换角色" }}：管理员
        </el-dropdown-item>
        <el-dropdown-item :command="0" divided @click="switchRolesAction('other')">
          {{ currentRoles === "other" ? "当前角色" : "切换角色" }}：普通用户
        </el-dropdown-item>
        <el-dropdown-item :command="3" divided @click="modifyPassword">
          <el-icon><Edit /></el-icon>修改密码
        </el-dropdown-item>
        <el-dropdown-item :command="4" divided @click="logOut">
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style lang="scss" scoped>
.avatar {
  margin-right: 6px;
}
.el-dropdown-link {
  cursor: pointer;
  //color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
