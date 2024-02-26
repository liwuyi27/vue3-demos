<template>
  <div :class="wrapClass">
    <code-pane :code="codes['code-1'].template.default" lang="js" :border="false" title="输入HTML" class="code-1" :class="clicks > 0 ? 'to-right' : ''" v-if="clicks >= 0"></code-pane>
    <code-pane :code="codes['code-1'].style.basic" lang="css" :border="false" title="输入CSS" v-if="clicks === 1" :options="{ startDelay: 1000 }" class="code-1" ></code-pane>
    <code-pane :code="codes['code-1'].style.inputbox" lang="css" :border="false" title="输入What the hell" v-if="clicks === 2" class="code-1" ></code-pane>
    <code-pane :code="codes['code-1'].style.inputlabel" lang="css" :border="false" title="输入What the hell" v-if="clicks === 3" class="code-1" ></code-pane>
    <code-pane :code="codes['code-1'].script['set-animate']" lang="typescript" :border="false" title="输入What the hell" v-if="clicks >= 4" class="code-1" ></code-pane>
    <tooltip v-if="clicks === 5" anchor="#set-animate" placement="bottom" :offset="{ mainAxis: 200 }">I am tooltip</tooltip>
    <result-pane class="result">
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
    transform: translateX(calc(1680px - 100%)) scale(1);
  }
}
.slide-2 .result {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 35%;
  height: 50%;
}   
</style>