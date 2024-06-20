<template>
  <div>
    <button @click="toggle()">toggle</button>
    <Transition enter-active-class="animate__wobble animate__animated" leave-active-class="animate__wobble animate__animated" appear @enter-cancelled="onEnterCancelled"
      @leave-cancelled="onLeaveCancelled" mode="default">
      <div v-if="show">Hello World!</div>
      <div v-else>Nice to see you</div>
    </Transition>
  </div>
</template>
<script setup>
import { useToggle } from '@vueuse/core';
import { ref } from 'vue';
const show = ref(true);
const toggle = useToggle(show);
const onEnterCancelled = () => {
  console.log('I am enter cancelled!')
}

const onLeaveCancelled = () => {
  console.log('I am leave cancelled!')
}
</script>