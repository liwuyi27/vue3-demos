<template>
  <code-pane :code="code" lang="js"></code-pane>
</template>
<script setup lang="ts">
import CodePane from "@/components/code-pane.vue";
import { useParseVue } from "@/composables/parse-vue";
import CurveArrow from "@/components/curve-arrow.vue";
const modules = import.meta.glob('./demos/*.vue', { as: 'raw', eager: true });
const codes = useParseVue(modules);
const code = codes['demo-1'].script.default;
</script>