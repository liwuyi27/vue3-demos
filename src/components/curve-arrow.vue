<template>
  <svg version="1.1" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" :style="svgStyle">
    <path :d="svgPath" :stroke="strokeColor" :stroke-width="strokeWidth" fill="transparent"></path>
  </svg>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { isArray } from 'lodash';
import { Curve, type PointOptions, type Point } from "./curve";

interface Props {
  startElm: HTMLElement,
  endElm: HTMLElement,
  options: PointOptions
  strokeColor?: string,
  strokeWidth?: number,
  arrowDeg?: number,
  arrowLen?: number,
  debug?: boolean,
  padding?: number
}

const props = withDefaults(defineProps<Props>(), {
  strokeColor: 'white',
  strokeWidth: 3,
  arrowDeg: 30,
  arrowLen: 15,
  debug: false
})

const arrowRadian = computed(() => {
  return props.arrowDeg / 180 * Math.PI;
})

const width = ref(0);
const height = ref(0);
const left = ref(0);
const top = ref(0);

const svgStyle = computed(() => {
  return {
    position: 'fixed' as const,
    left: left.value,
    top: top.value
  }
})

const svgPath = ref('');

onMounted(() => {
  svgPath.value = draw();
})

function draw() {
  const curve = new Curve({ 
    startElm: props.startElm,
    endElm: props.endElm,
    padding: props.padding
  });
  width.value = curve.container.width;
  height.value = curve.container.height;
  left.value = curve.container.left;
  top.value = curve.container.top;
  const { p0, p1, p2, p } = curve.getPoints(props.options);
  const d = [];
  d.push(`M ${join(p0)}`);
  // draw cubic bezier curve
  d.push(`C ${join([p1, p2, p])}`);
  // draw arrow
  const arrowPoints = [createArrowPoint(p2, p, true), createArrowPoint(p2, p, false)];
  d.push(`M ${join(p)} L ${join(arrowPoints[0])}`);
  d.push(`M ${join(p)} L ${join(arrowPoints[1])}`);
  return d.join(',');
}

function join(point: Point | Point[]) {
  const points = isArray(point) ? point : [point];
  const ret: string[] = [];
  points.forEach(p => {
    ret.push(`${p.x} ${p.y}`);
  })
  return ret.join(',');
}

function createArrowPoint(p2: Point, p: Point, clockwise: boolean) {
  const alpha = Math.atan2(p.y - p2.y, p.x - p2.x);
  const beta = clockwise ? alpha + arrowRadian.value : alpha - arrowRadian.value;
  const point: Point = {
    x: p.x - Math.cos(beta) * props.arrowLen,
    y: p.y - Math.sin(beta) * props.arrowLen
  }
  return point;
}
</script>