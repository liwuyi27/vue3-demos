<template>
  <div class="wave-input">
    <Transition name="slide1" mode="out-in">
      <slide1 v-if="slides === 1"></slide1>
      <slide2 v-else-if="slides === 2"></slide2>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import slide1 from './slides/slide-1.vue';
import slide2 from './slides/slide-2.vue';
import { useRouteQuery } from "@vueuse/router";
import { computed } from 'vue';
const slides = useRouteQuery('slides', 1, { transform: Number });
const clicks = useRouteQuery('clicks', 0, { transform: Number });
const clickTotals = [1, 5];
const slideTotal = 2;
const clickTotal = computed(() => {
  return clickTotals[slides.value - 1];
})

onKeyStroke('ArrowLeft', () => {
  if (clicks.value === 0 && slides.value > 1) {
    slides.value--;
    clicks.value = clickTotal.value;
  } else if (clicks.value > 0) {
    clicks.value--;
  }
});

onKeyStroke('ArrowRight', () => {
  if (clicks.value >= clickTotal.value && slides.value < slideTotal) {
    slides.value++;
    clicks.value = 0;
  } else if (clicks.value < clickTotal.value) {
    clicks.value++;
  }
});
</script>
<style lang="scss">
.wave-input {
  display: flex;
  flex-grow: 1;
  .slide1-leave-from {
    opacity: 1;
  }

  .slide1-leave-active {
    transition: opacity 1s linear;
  }

  .slide1-leave-to {
    opacity: 0;
  }
}
</style>
