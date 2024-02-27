<template>
  <div :class="wrapClass">
    <code-pane :code="codes['code-1'].template.default" lang="js" :border="false" title="添加HTML" class="code-1"
      :class="clicks > 0 ? 'to-right' : ''" v-if="clicks >= 0"></code-pane>
    <code-pane :code="codes['code-1'].style.basic" lang="css" :border="false" title="编写基础CSS" v-if="clicks === 1 || clicks === 2"
      :options="{ startDelay: 1000 }" class="code-1"></code-pane>
    <code-pane :code="codes['code-1'].style.inputbox" lang="css" :border="false" title="编写输入框样式"
      v-if="clicks === 3" class="code-1"></code-pane>
    <code-pane :code="codes['code-1'].style.inputlabel" lang="css" :border="false" title="编写输入框样式"
      v-if="clicks === 4" class="code-1"></code-pane>
    <code-pane :code="codes['code-1'].script['set-animate']" lang="typescript" :border="false" title="编写JS修改文本结构"
      v-if="clicks >= 5" class="code-1"></code-pane>
    <tooltip v-if="clicks === 6" anchor="#set-animate" placement="right" :offset="{ mainAxis: 100 }"
      :curve-options="{ startPlacement: 'top-left', endPlacement: 'right-mid', ctl1Offset: { y: -10 }, ctl2Offset: { y: -10 }, startOffset: { y: 10, x: -5} }" stroke-color="orange">
      I am tooltipasdfasdffasdfasdfasdfasdfadfsdfsd</tooltip>
    <result-pane class="result" v-if="clicks >= 2">
      <code1></code1>
    </result-pane>
  </div>
</template>
<script setup lang="ts">
import codePane from '@/components/code-pane.vue';
import ResultPane from '@/components/result-pane.vue';
import { useParseVue } from '@/composables/parse-vue';
import { useRouteQuery } from "@vueuse/router";
import Code1 from '../codes/code-1.vue';
import { computed } from 'vue';
import Tooltip from '@/components/tooltip.vue';
const modules = import.meta.glob('../codes/*.vue', { as: 'raw', eager: true });
const codes = useParseVue(modules);
const clicks = useRouteQuery('clicks', 0, { transform: Number });
const slides = useRouteQuery('slides', 1, { transform: Number });
const wrapClass = computed(() => {
  const klass = [`slide-${slides.value}`, `click-${clicks.value}`];
  for (let i = 1; i <= clicks.value; i++) {
    klass.push(`click-after-${i-1}`)
  }
  return klass.join(' ');
})
</script>
<style lang="scss">
.code-1 {
  position: absolute;
  font-weight: bold;
  transform-origin: top left;
  transform: scale(1.5);

  &.to-right {
    transition: transform 1s ease;
    transform: translateX(calc(1680px - 0.3 * 1680px - 40px)) scale(1.5);
  }
}

.slide-2 .result {
  position: absolute;
  right: 20px;
  bottom: 25%;
  width: 30%;
  height: 50%;
}</style>