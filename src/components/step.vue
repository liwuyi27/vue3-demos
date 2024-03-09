<template>
  <Transition mode="out-in">
    <slot  v-if="show"></slot>
  </Transition>
</template>
<script setup lang="ts">
import { getChildrenIndex } from '@/composables/children-count';
import { stepKey } from '@/keys';
import { useRouteQuery } from '@vueuse/router';
import { isNil, isArray, isNumber, isString } from 'lodash';
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue';
interface Props {
  steps?: number[] | string | number,
  class?: any
}
const props = defineProps<Props>();
const myStep = ref(-1);
const curStep = useRouteQuery('step', 1, { transform: Number });
const curSlide = useRouteQuery('slide', 1, { transform: Number });
const { stepTotal, mySlide } = inject(stepKey)!

onMounted(() => {
  myStep.value = getChildrenIndex(getCurrentInstance()!, 'step', 'slide') + 1;
})

const show = computed(() => {
  if (curSlide.value !== mySlide.value) {
    return false;
  }
  return steps.value.includes(curStep.value);
})

const steps = computed(() => {
  if (isNil(props.steps)) {
    return [myStep.value];
  }
  if (isNumber(props.steps)) {
    return [props.steps];
  }
  if (isArray(props.steps)) {
    return props.steps;
  }
  if (isString(props.steps)) {
    return parseStepRange(props.steps);
  }
  return [];
})

function parseStepRange(range: string) {
  const stepRangeRegx = /([[(])(\d),(-?\d)([\])])/g;
  const ret: number[] = [];
  let match;
  do {
    match = stepRangeRegx.exec(range);
    if (!match) break;
    let start = Number(match[2]);
    let end = Number(match[3]);
    if (end <= 0) {
      end = stepTotal.value + end;
    }
    if (match[1] === '(') {
      start = start + 1;
    }
    if (match[4] === ')') {
      end = end - 1;
    }
    for (let i = start; i <= end; i++) {
      ret.push(i);
    }
  } while (match);
  return ret;
}

</script>