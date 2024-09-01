<template>
  <div class="tetris">
    <div class="board">
      
    </div>
  </div>
</template>
<script setup lang="ts">
import TetrisButton from './tetris-button.vue';
</script>
<style lang="scss" scoped>
.tetris {
  width: 100%;
  height: 100%;
  background-color: #009688;
  padding: 3px 0;
  .board {
    width: 600px;
    height: 100%;
    margin: 0 auto;
    background-color: #efcc19;
    border-radius: 20px;
    box-shadow: inset 0 0 10px #fff;
  }
}
</style>