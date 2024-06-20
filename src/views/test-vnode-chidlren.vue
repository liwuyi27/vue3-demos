<template>
  <div>
    Hello World!
    <slot :name="name"></slot>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, onMounted,ref } from "vue";
const vm = getCurrentInstance()!;
const name = ref('hello')
onMounted(() => {
  console.log(vm.subTree.children);
})
</script>