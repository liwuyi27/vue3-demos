<script setup lang="ts">
import { useStorage, onKeyStroke } from "@vueuse/core";
import NavHeader from './components/nav-header.vue';
const isFullscreen = useStorage('is-fullscreen', false);
onKeyStroke('Escape', () => {
  isFullscreen.value = !isFullscreen.value;
})
</script>
<template>
  <transition>
    <nav-header v-if="!isFullscreen"></nav-header>
  </transition>
  <main>
    <router-view></router-view>
  </main>
</template>