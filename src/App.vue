<script setup lang="ts">
import LeftMenu from './components/left-menu/left-menu.vue';
import { useStorage, onKeyStroke } from "@vueuse/core";
const isFullscreen = useStorage('is-fullscreen', false);
onKeyStroke('Escape', () => {
  isFullscreen.value = !isFullscreen.value;
})
</script>
<template>
  <div class="app-container">
    <left-menu v-if="!isFullscreen"></left-menu>
    <div class="app-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss">
html, body, #app, .app-container {
  margin: 0;
  padding: 0;
  height: 100%;
} 

.app-container {
  display: flex;
  background: rgb(30, 30, 30);
}

.app-main {
  padding: 20px;
  position: relative;
  flex-grow: 1;
  display: flex;
  color: white;
}
</style>