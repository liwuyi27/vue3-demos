<template>
  <div class="tooltip" ref="tooltipElm">
    <slot></slot>
  </div>
  <CurveArrow v-if="elmReady" :start-elm="tooltipElm!" :end-elm="anchorElm!" :options="curveOptions" v-bind="$attrs"></CurveArrow>
</template>
<script setup lang="ts">
import { computePosition, flip, offset, shift, type OffsetOptions, type Placement } from '@floating-ui/dom';
import { unrefElement } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import CurveArrow from "@/components/curve-arrow.vue";
import type { PointOptions } from './curve';

interface Props {
  anchor: string,
  placement?: Placement,
  offset?: OffsetOptions,
  curveOptions: PointOptions
}
const props = defineProps<Props>();
const tooltipElm = ref<HTMLElement>();
const anchorElm = ref<HTMLElement>();
const elmReady = computed(() => {
  return tooltipElm.value && anchorElm.value && afterComputePosition.value; 
});
const afterComputePosition = ref(false);
onMounted(() => {
  anchorElm.value = document.querySelector(props.anchor) as HTMLElement;
  computePosition(unrefElement(anchorElm)!, unrefElement(tooltipElm)!, {
    placement: props.placement,
    middleware: [offset(props.offset), flip(), shift()]
  }).then(({ x, y }) => {
    Object.assign(unrefElement(tooltipElm)!.style, {
      left: `${x}px`,
      top: `${y}px`
    })
    afterComputePosition.value = true;
  })
})
</script>
<style lang="scss">
.tooltip {
  position: absolute;
  width: max-content;
  padding: 5px;
  border-radius: 4px;
  background: #fff;
  color: black;
}
</style>