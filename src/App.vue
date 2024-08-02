<script setup lang="ts">
import { useStorage, onKeyStroke } from "@vueuse/core";
import NavHeader from './components/nav-header.vue';
import { useRoute } from "vue-router";
import { computed } from "vue";
const isFullscreen = useStorage('is-fullscreen', false);
onKeyStroke('Escape', () => {
  isFullscreen.value = !isFullscreen.value;
});
const route = useRoute();
const klass = computed(() => {
  if (route.name === 'list') {
    return '';
  }
  return route.path.split('/')[1];
})
</script>
<template>
  <transition>
    <nav-header v-if="!isFullscreen"></nav-header>
  </transition>
  <main :class="klass">
    <router-view></router-view>
  </main>
</template>
