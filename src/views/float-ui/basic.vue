<template>
  <div class="container">
    <button id="button">My button</button>
    <div id="tooltip">My tooltip</div>
  </div>
</template>
<script setup lang="ts">
import { computePosition, flip, shift, offset } from "@floating-ui/dom";
import { onMounted } from "vue";
onMounted(() => {
  const button = document.querySelector('#button') as HTMLElement;
  const tooltip = document.querySelector('#tooltip') as HTMLElement;
  computePosition(button, tooltip, {
    placement: 'top',
    middleware: [offset(6), flip(), shift()]
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`
    })
  })
})
</script>
<style lang="scss">
.tooltip {
  background: #fff;
  color: black;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
  width: max-content;
  position: absolute;
  top: 0;
  left: 0;
}
</style>