<template>
  <vue-typed-js :strings="[html]" class="code-pane" v-if="html"></vue-typed-js>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getHighlighter } from "../composables/highlighter";
import { type BundledLanguage, type BundledTheme, type HighlighterGeneric } from 'shiki';
import VueTypedJs from "./v-typed.vue";

interface Props {
  code: string,
  lang: string,
  title?:string
}

const props = defineProps<Props>();
let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
const html = ref('');

onMounted(async () => {
  highlighter = await getHighlighter();
  html.value = highlighter.codeToHtml(props.code, {
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    colorReplacements: {
      'vitesse-dark': {
        '#121212': '#1e1e1e'
      }
    },
    transformers: [
      {
        tokens(tokens) {
          console.log(tokens);
          return tokens;
        }
      }
    ],
    decorations: [
      
    ],
    lang: props.lang
  })
  if (props.title) {
    html.value = `<div class="title">${props.title}</div>` + html.value
  }
})
</script>