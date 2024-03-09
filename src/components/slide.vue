<template>
  <div class="slide" v-show="show" :class="klass">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, inject, onMounted, provide, ref } from "vue";
import { slideKey, stepKey } from "../keys";
import { useRouteQuery } from "@vueuse/router";
import { getChildrenCount, getChildrenIndex } from "@/composables/children-count";

interface Props {
  center?: boolean,
  direction?: 'col' | 'row' | 'row-reverse' | 'col-reverse'
}

const props = withDefaults(defineProps<Props>(), {
  center: false,
  direction: `col`
});

const { updateStepTotals } = inject(slideKey)!;
const curSlide = useRouteQuery('slide', 1, { transform: Number });
const curStep = useRouteQuery('step', 1, { transform: Number });
const stepTotal = ref(0);
const mySlide = ref(-1);
const typing = useRouteQuery('typing', 'false', { transform: String });

provide(stepKey, {
  mySlide,
  stepTotal
})

const show = computed(() => {
  return mySlide.value === curSlide.value; 
})

const klass = computed(() => {
  const ret = [`slide-${mySlide.value}`, `flex-${props.direction}`];
  for (let i = 1; i <= curStep.value; i++) {
    ret.push(`after-step-${i - 1}`);
    if (i < curStep.value) {
      ret.push(`step${i}-typed`)
    } else if (typing.value === 'true') { 
      ret.push(`step${i}-typing`)
    } else {
      ret.push(`step${i}-typed`)
    }
  }
  if (props.center) {
    ret.push('center')
  }
  return ret.join(' ')
})

onMounted(() => {
  stepTotal.value = getChildrenCount(getCurrentInstance()!, 'step');
  mySlide.value = getChildrenIndex(getCurrentInstance()!, 'slide', 'blog') + 1; 
  updateStepTotals(mySlide.value, stepTotal.value);    
})

</script>
<style lang="scss">
.slide {
  position: relative;
  display: flex;
  flex-grow: 1;
  &.center {
    justify-content: center;
    align-items: center;
  }

  &.flex-col {
    flex-direction: column;
  }
}
</style>