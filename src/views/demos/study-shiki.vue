<template>
  <div v-html="html"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { codeToHtml } from "shiki";

const code = 'const a = 1';
const html = ref('');
onMounted(async () => {
  html.value = await codeToHtml(code, {
  lang: 'javascript',
  theme: 'vitesse-dark'
})
})

</script>