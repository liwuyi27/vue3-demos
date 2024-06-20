<template>
  <TestVnodeChildren>
    <div>abc</div>
    <div>adfs</div>
    <template v-slot:[name]>
      <div>Hello</div>
    </template>
  </TestVnodeChildren>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TestVnodeChildren from './test-vnode-chidlren.vue';
const name = ref('hello')
</script>