<template>
  <slide center>
    <step steps="[1,2]">
      <div class="title">输入文本波浪动画</div>
    </step>
    <step>
      <result-pane class="click-any result">
        <code1></code1>
      </result-pane>
    </step>
  </slide>
</template>

<script setup lang="ts"> 
import Code1 from '../codes/code-1.vue';
</script>
<style lang="scss">
.slide-1 {
  position: relative;

  .title {
    color: transparent;
    background-image: linear-gradient(to right,orange, yellow);
    font-size: 70px;
    margin-bottom: 20px;
    background-clip: text;
  }

  .result {
    width: 800px;
    height: 500px;
    transition: height 1s linear, opacity 0.5s 1s linear, flex-grow 1s linear;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &.v-enter-from,
    &.v-leave-to {
      height: 0;
      opacity: 0;
    }

    &.v-enter-to,
    &.v-leave-from {
      height: 500px;
      opacity: 1;
    }
  }


}
</style>