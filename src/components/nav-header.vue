<template>
  <header class="nav-header">
    <router-link to="/">
      <el-avatar :size="40" :src="LogoImg"></el-avatar>
    </router-link>
    <nav>
      <router-link :to="route.path" v-for="route in filterRoutes">{{ path2Name(route.path) }}</router-link>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { routes } from "../router/routes";
import LogoImg from '../assets/logo.png';
import { capitalize } from "lodash";
const filterRoutes = routes.filter((item) => {
  return item.path !== '/' && item.path !== '/:category'
})

function path2Name(path: string) {
  return capitalize(path.slice(1));
}
</script>