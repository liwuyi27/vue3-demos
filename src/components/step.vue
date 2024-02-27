<template>
  <Transition>
    <div class="step" v-if="show">
      <slot></slot>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { getChildrenIndex } from '@/composables/children-count';
import { useRouteQuery } from '@vueuse/router';
import { isNil, isArray, isNumber, isString } from 'lodash';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
interface Props {
  steps?: number[] | string | number
}
const props = defineProps<Props>();
const myStep = ref(-1);
const curStep = useRouteQuery('step', 1, { transform: Number });

onMounted(() => {
  myStep.value = getChildrenIndex(getCurrentInstance()!, 'step') + 1;
  console.log(myStep.value);
})

const show = computed(() => {
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
  const stepRangeRegx = /([[(])(\d),(\d)([\])])/g;
  const ret: number[] = [];
  let match;
  do {
    match = stepRangeRegx.exec(range);
    if (!match) break;
    let start = Number(match[2]);
    let end = Number(match[3]);
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