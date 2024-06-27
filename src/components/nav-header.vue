<template>
  <header class="nav-header">
    <router-link to="\">
      liwuyi
    </router-link>
    <nav>
      <router-link :to="route.path" v-for="route in filterRoutes">{{ route.path }}</router-link>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { routes } from "../router/routes";
const filterRoutes = routes.filter((item) => {
  return item.path !== '/' && item.path !== '/:category'
})
</script>