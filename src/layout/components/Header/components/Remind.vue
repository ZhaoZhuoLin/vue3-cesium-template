<script setup lange="ts" name="Remind"></script>
<template>
  <div class="m-info">
    <el-popover width="200px" placement="bottom">
      <template #reference>
        <el-badge :value="0" class="item-info-pop">
          <el-icon class="bell header-icon" style="font-size: 20px"><Bell /></el-icon>
        </el-badge>
      </template>
      <div>暂无通知</div>
    </el-popover>
  </div>
</template>
<style scoped></style>
