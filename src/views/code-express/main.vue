<template>
  <code-pane :code="code" lang="html" class="code-html" :border="true" title="添加HTML" :class="move ? 'before-move' : 'move'"></code-pane>
</template>
<script setup lang="ts">
import CodePane from "@/components/code-pane.vue";
import { useParseVue } from "@/composables/parse-vue";
import { ref } from "vue";
const modules = import.meta.glob('./demos/*.vue', { as: 'raw', eager: true });
const codes = useParseVue(modules);
const code = codes['demo-1'].template.default;
const move = ref(false);
setInterval(() => {
  move.value = !move.value;
}, 2000);
</script>
<style lang="scss">
.code-html {
  transition: transform 2s cubic-bezier(.25,.8,.25,1);
  font-weight: bold;
  transform-origin: top left;
}

.move {
  transform: perspective(1px) scale(0.8, 0.8) translateX(calc(100vw - 80%));
}
</style>