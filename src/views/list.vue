<script setup lang="ts">
import { computed } from "vue";
import { routes } from "../router/routes";
import { useRouteParams } from '@vueuse/router';
import { capitalize } from "lodash";
const category = useRouteParams('category', '');
const categoryRoutes = computed(() => {
  const ret = routes.find(item => item.path === `/${category.value}`);
  return ret?.children || [];
})
</script>
<template>
  <h1>{{ capitalize(category) }}</h1>
  <ul class="list">
    <li v-for="route in categoryRoutes">
      <router-link :to="`${category}/${route.path}`">
        {{ route.name }}
      </router-link>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
$width: 45%;

h1 {
  width: $width;
  margin: 40px auto 30px auto;
}

ul {
  width: $width;
  margin: 0 auto;
  padding-left: 20px;

  li {
    list-style: disc;
    margin: 8px 0 24px 0;
  }
}
</style>