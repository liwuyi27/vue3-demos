<template>
  <div class="blog">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { getChildrenCount } from '@/composables/children-count';
import { slideKey } from '@/keys';
import { onKeyStroke } from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import { computed, getCurrentInstance, onMounted, provide, ref } from 'vue';

const slideTotal = ref(0);
const stepTotals = ref<number[]>([]);

function updateStepTotals(slide: number, stepTotal: number) {
  stepTotals.value[slide] = stepTotal;
}
provide(slideKey, {
  slideTotal,
  stepTotals, 
  updateStepTotals
})

const curSlide = useRouteQuery('slide', 1, { transform: Number });
const curStep = useRouteQuery('step', 1, { transform: Number });
const stepTotal = computed(() => {
  return stepTotals.value[curSlide.value];
})

onKeyStroke('ArrowLeft', () => {
  if (curStep.value === 1 && curSlide.value > 1) {
    curSlide.value--;
    curStep.value = stepTotal.value;
  } else if (curStep.value > 1) {
    curStep.value--;
  }
});

onKeyStroke('ArrowRight', () => {
  if (curStep.value >= stepTotal.value && curSlide.value < slideTotal.value) {
    curSlide.value++;
    curStep.value = 1;
  } else if (curStep.value < stepTotal.value) {
    curStep.value++;
  }
});
onMounted(() => {
  slideTotal.value = getChildrenCount(getCurrentInstance()!, 'slide');
})
</script>