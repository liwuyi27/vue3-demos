<template>
  <el-menu router class="app-left-menu">
    <left-menu-item v-for="route in routes" :key="route.name" :route="route"></left-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import { routes } from '@/router/routes';
import LeftMenuItem from './left-menu-item.vue';
</script>
<style lang="scss">
.app-left-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
</style>