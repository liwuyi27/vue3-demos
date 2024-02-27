<template>
  <div class="slide-1" ref="slideElm">
    <div class="title" v-if="clicks >= 0">
      输入文本波浪动画
    </div>
    <transition>
      <result-pane v-if="clicks === 1" class="result click-any">
        <code1></code1>
      </result-pane>
    </transition>
  </div>
</template>
<script setup lang="ts">
import ResultPane from "@/components/result-pane.vue";
import { ref, onMounted } from "vue";
import { useRouteQuery } from "@vueuse/router";
import { onKeyStroke, useElementBounding } from "@vueuse/core";
import Code1 from '../codes/code-1.vue';
const show = ref(false)
const clicks = useRouteQuery('clicks', 0, { transform: Number });
const slides = useRouteQuery('slides', 1, { transform: Number });
const slideElm = ref();
const { width, height } = useElementBounding(slideElm);
const stepTotal = 2;


</script>
<style lang="scss">
.slide-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-direction: column;
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