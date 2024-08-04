<template>
  <div class="vue-typed-js" ref="typedElm"></div>
</template>
<script setup lang="ts">
import { unrefElement } from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import Typed, { type TypedOptions } from 'typed.js';
import { onMounted, ref, watch } from 'vue';
interface Props {
  strings: string[],
  options?: TypedOptions
}
const props = defineProps<Props>();
const typedElm = ref();
let typed: Typed;
const typing = useRouteQuery('typing', 'false', { transform: Boolean });

onMounted(() => {
  createTyped();
});

watch(() => props.strings, () => {
  typed?.destroy();
  typed = createTyped();
})

function createTyped() {
  let typed = new Typed(unrefElement(typedElm), {
    strings: props.strings,
    typeSpeed: 15,
    showCursor: false,
    ...props.options,
    onComplete: () => {
      typing.value = false;
    }
  })
  typing.value = true;
  return typed;
}
</script>