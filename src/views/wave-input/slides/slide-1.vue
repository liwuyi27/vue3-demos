<template>
  <div class="slide-1">
    <div class="title" :class="{ 'step': show }">
      输入文本波浪动画
    </div>
    <!-- <result-pane class="result" v-if="show"></result-pane> -->
  </div>
</template>
<script setup lang="ts">
import ResultPane from "@/components/result-pane.vue";
import { ref } from "vue";
const show = ref(false)
setInterval(() => {
  show.value = !show.value;
}, 2000)
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
    color: white;
    font-weight: bold;
    font-size: 100px;
    transition: all 1.5s linear;
    position: absolute;
    left: 50%;
    top: 50%;
    // visibility: visible;
    opacity: 1;
     
    &.step {
      opacity: 0;
      // top: 10%
      // visibility: hidden;
    }
  }



  .result {
    height: 500px;
    width: 700px;
    transition: all 1s linear;
  }
}
</style>