<template>
  <slide>
    <step steps="[1,-1]">
      <code-pane :code="codes['code-1'].template.default" lang="js" title="添加 HTML" class="basic-html"></code-pane>
    </step>
    <step steps="[2,3]">
      <code-pane :code="codes['code-1'].style.basic" lang="css" title="添加基本 CSS"></code-pane>
    </step>
    <step steps="[3,0]">
      <result-pane class="result">
        <code1></code1>
      </result-pane>
    </step>
    <step>
      <code-pane :code="codes['code-1'].style.inputbox" lang="css" title="添加 input box css"></code-pane>
    </step>
    <step>
      <code-pane :code="codes['code-1'].style.inputlabel" lang="css" title="添加 input label css"></code-pane>
    </step>
    <step>
      <code-pane :code="codes['code-1'].style.inputlabelcolor" lang="css" title="添加 input label color css"></code-pane>
    </step>
    <step steps="[7,8]">
      <code-pane :code="codes['code-1'].script['set-animate']" lang="js" title="添加 set animate"></code-pane>
    </step>
    <step>
      <tooltip anchor="#query" placement="right" :offset="{ mainAxis: 2 }" :curve-options="{ startPlacement: 'left-mid', endPlacement: 'right-mid' }">
        I am tooltip
      </tooltip>
    </step>
    <step></step>
  </slide>
</template>

<script lang="ts" setup>
import { useParseVue } from '@/composables/parse-vue';
import Code1 from '../codes/code-1.vue';
const modules = import.meta.glob('../codes/*.vue', { as: 'raw', eager: true });
const codes = useParseVue(modules);
</script>

<style lang="scss">
.slide-2 {
  &.step1-typed .basic-html {
    position: absolute;
    transform: translate(950px, 50px) scale(1.5);
    transition: transform 1.5s;
  }

  &.step8-typed, &.step8-typing {
    .basic-html {
      transition: none;
    }
  }

  .result {
    width: 40%;
    height: 50%;
    position: absolute;
    left: 950px;
    top: 300px;
  }

  &.step9-typing,
  &.step9-typed {
    & .result {
      width: auto;
      height: auto;
      left: -20px;
      top: -20px;
      bottom: -20px;
      right: -20px;
      transition: all 1s ease;
    }
  }
}
</style>
