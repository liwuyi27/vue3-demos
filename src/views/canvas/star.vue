<template>
  <canvas id="star-img" :width="width" :height="height"></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

const width = 100;
const height = 100;
const hue = 217;

function draw() {
  const canvas = document.getElementById('star-img') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const mid = width / 2;
  const gradient = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid);
  gradient.addColorStop(0.025, '#fff');
  gradient.addColorStop(0.1, `hsl(${hue} 61% 33%)`);
  gradient.addColorStop(0.25, `hsl(${hue} 64% 6%)`);
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(mid, mid, mid, 0 ,Math.PI * 2);
  ctx.fill();
}

onMounted(() => {
  draw();
})
</script>