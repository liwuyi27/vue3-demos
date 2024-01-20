<script setup lang="ts">
import LeftMenu from './components/left-menu/left-menu.vue';
</script>
<template>
  <div class="app-container">
    <left-menu></left-menu>
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
}
</style>