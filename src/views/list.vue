<script setup lang="ts">
import { computed } from "vue";
import { routes } from "../router/routes";
import { useRouteParams } from '@vueuse/router';
const category = useRouteParams('category');
const categoryRoutes = computed(() => {
  const ret = routes.find(item => item.path === `/${category.value}`);
  return ret?.children || [];
})
</script>
<template>
  <h1>{{ category }}</h1>
  <ul class="list">
    <li v-for="route in categoryRoutes" class="item">
      <router-link :to="`${category}/${route.path}`">
        {{ route.name }}
      </router-link>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
h1 {
  margin-left: 30%;
  margin-top: 40px;
  margin-bottom: 30px
}

h3 {
  padding-left: 8px;
}
li {
  list-style: disc;
}
.list {
  margin-left: 30%;
  padding-left: 20px;
  .item {
    margin: 8px 0 24px 0;
  }
}
</style>