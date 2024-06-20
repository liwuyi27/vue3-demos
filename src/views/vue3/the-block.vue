<template>
  <blog>
    <slide center>
      <step>
        <div class="title">图解Vue3渲染流程</div>
      </step>
    </slide>
    <slide>
      <div class="processure-wrapper">
        <code-pane :code="codes['code1'].template['default']" lang="html" :border="true" class="pro1"></code-pane>
        <div class="arrow-container"></div>
        <code-pane :code="codes['code1'].script['vnode']" lang="js" :border="true" class="pro2"></code-pane>
      </div>
        <!-- <step steps="[1,0]">
          <code-pane :code="codes['code1'].template['default']" lang="html" :border="true" class="pro1"></code-pane>
        </step>
        <step>
          <code-pane :code="codes['code1'].script['vnode']" lang="js" :border="true" class="pro2"></code-pane>
        </step> -->
    </slide>
  </blog>
</template>
<script setup lang="ts">
import { useParseVue } from '@/composables/parse-vue';
const modules = import.meta.glob('./codes/*.vue', { as: 'raw', eager: true });
const codes = useParseVue(modules);
</script>
<style lang="scss">
.slide-1 {
  .title {
    color: transparent;
    background-image: linear-gradient(to right, orange, yellow);
    font-size: 70px;
    margin-bottom: 20px;
    background-clip: text;
  }
}

.slide-2 {
  .processure-wrapper {
    display: flex;
    .arrow-container {
      width: 200px;
    }
  }
  // .pro1 {
  //   position: absolute;
  //   left: 10px;
  // }

  // .pro2 {
  //   position: absolute;
  //   left: 300px;
  // }
}
</style>