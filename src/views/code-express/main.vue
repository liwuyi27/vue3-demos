<template>
  <div>
    Hello World!
  </div>
</template>
<script setup lang="ts">
import { useParseVue } from "@/composables/parse-vue";
const modules = import.meta.glob('./demos/*.vue', { as: 'raw', eager: true });
const codes = useParseVue(modules);
console.log(codes);
</script>