<template>
  <canvas id="solar-system" ref="canvasDom">

  </canvas>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createStars, drawStars } from "./stars";
import { type DrawState } from "./types";
import { Sun } from './sun';
import { Earth } from './earth';
import { Moon } from "./moon";

const canvasDom = ref<HTMLCanvasElement>();

let drawState: DrawState;
let sun: Sun;
let earth: Earth;
let moon: Moon;

function setState() {
  if (!canvasDom.value) {
    return;
  }
  if (!canvasDom.value.getContext) {
    return;
  }
  const ctx = canvasDom.value.getContext('2d');
  if (!ctx) {
    return;
  }
  drawState = {
    width: canvasDom.value.parentElement!.offsetWidth,
    height: canvasDom.value.parentElement!.offsetHeight,
    ctx: ctx
  }
  canvasDom.value.width = drawState.width;
  canvasDom.value.height = drawState.height;
}

function draw(stars) {
  drawState.ctx!.fillStyle = 'black';
  drawState.ctx!.fillRect(0, 0, drawState.width, drawState.height);

  drawStars(drawState.ctx!, stars, drawState.height);
  sun.draw();
  earth.draw();
  moon.draw();
  requestAnimationFrame(() => {
    draw(stars)
  });
}

onMounted(() => {
  setState();
  sun = new Sun(drawState);
  earth = new Earth(drawState, sun);
  moon = new Moon(drawState, earth);
  const stars = createStars(drawState.width, drawState.height);
  draw(stars);
})
</script>
<style lang="scss" scoped>
:global(#app > main.canvas) {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
}
</style>
