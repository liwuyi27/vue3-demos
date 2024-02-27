<template>
  <div class="slide" v-show="show">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, inject, onMounted, ref } from "vue";
import { slideKey } from "../keys";
import { useRouteQuery } from "@vueuse/router";
import { getChildrenCount, getChildrenIndex } from "@/composables/children-count";
const { updateStepTotals } = inject(slideKey)!;
const curSlide = useRouteQuery('slide', 1, { transform: Number });
const stepTotal = ref(0);
const mySlide = ref(-1); 

const show = computed(() => {
  return mySlide.value === curSlide.value; 
})

onMounted(() => {
  stepTotal.value = getChildrenCount(getCurrentInstance()!, 'step');
  mySlide.value = getChildrenIndex(getCurrentInstance()!, 'slide') + 1; 
  updateStepTotals(mySlide.value, stepTotal.value);    
})

</script>