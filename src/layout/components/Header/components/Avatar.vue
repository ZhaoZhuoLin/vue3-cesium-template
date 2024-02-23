<script setup lange="ts">
import AvatarLogo from "@/assets/image/avatarLogo.png";
import { useUserStore } from "@/store/modules/user.ts";
const UserStore = useUserStore();
const logOut = () => {
  ElMessageBox.confirm("您", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
    draggable: true,
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>
<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="30" class="avatar" :src="AvatarLogo" />
      {{ userInfo.username }}
      <el-icon class="header-icon el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :command="4" divided @click="logOut">
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style scoped></style>
