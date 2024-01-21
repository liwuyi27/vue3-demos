<template>
  <div class="anchor" ref="anchor"></div>
  <div class="target" ref="target"></div>
  <curve-arrow :start-elm="anchor" :end-elm="target" :options="pointOptions" v-if="anchor && target"></curve-arrow>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CurveArrow from '@/components/curve-arrow.vue';
import type { PointOptions } from '@/components/curve';

const anchor = ref();
const target = ref();

const pointOptions: PointOptions = {
  startPlacement: 'right-mid',
  endPlacement: 'top-mid',
  ctl1Offset: { y: 50, x: 0 },
  linear: false
}

</script>
<style lang="scss">
.anchor {
  position: absolute;
  left: 30px;
  top: 30px;
  width: 100px;
  height: 100px;
  background-color: red;
}

.target {
  position: absolute;
  left: 300px;
  top: 300px;
  width: 150px;
  height: 100px;
  background-color: orange;
}
</style>