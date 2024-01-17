<template>
  <el-sub-menu v-if="route.children" :index="route.path">
    <template #title>{{ route.name }}</template>
    <el-menu-item v-for="item in route.children" :key="item.name" :index="`${route.path}\/${item.path}`" :route="item">
      {{ item.name }}    
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path" :route="route">
    {{ route.name }}
  </el-menu-item>
</template>
<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';
interface Props {
  route: RouteRecordRaw
}
defineProps<Props>();
</script>