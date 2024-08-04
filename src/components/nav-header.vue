<template>
  <header class="nav-header">
    <router-link to="/">
      <!-- <el-avatar :src="LogoImg"></el-avatar> -->
      liwuyi
    </router-link>
    <nav>
      <router-link :to="route.path" v-for="route in filterRoutes">{{ path2Name(route.path) }}</router-link>
      <a href="https://github.com/liwuyi27" target="_blank">
        <i class="i-uil-github-alt"></i>
      </a>
      <toggle-theme></toggle-theme>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { routes } from "../router/routes";
import LogoImg from '../assets/logo.png';
import { capitalize } from "lodash";
import ToggleTheme from '../components/toggle-theme.vue';
const filterRoutes = routes.filter((item) => {
  return item.path !== '/' && item.path !== '/:category'
})

function path2Name(path: string) {
  return capitalize(path.slice(1));
}
</script>