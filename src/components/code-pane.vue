<template>
  <div v-html="codeHtml" class="code-pane"></div>
</template>
<script setup lang="ts">
import { setCDN, getHighlighter, renderToHtml } from "shiki";
import type { Highlighter,  } from 'shiki';
import { useShiki } from '@/composables/shiki';
import { onMounted, ref } from "vue";
interface Props {
  code: string
}

setCDN('/node_modules/shiki/');

const props = defineProps<Props>();

let highlighter: Highlighter;

const codeHtml = ref('');
const { isInlineSegMark, isBlockSegMark, inlineSegMarkReplace, blockSegMarkReplace, clearLineChar } = useShiki();

onMounted(async () => {
  highlighter = await getHighlighter({ theme: 'dark-plus' });
  highlightCode();
})

function highlightCode() {
  const tokens = highlighter.codeToThemedTokens(props.code, 'javascript');
  codeHtml.value = renderToHtml(tokens, {
    bg: 'rgb(30, 30, 30)',
    elements: {
      line({ className, children, line }) {
        if (isBlockSegMark(line)) {
          return blockSegMarkReplace(line);
        }
        return `<span class="${className}">${children}</span>`
      },
      token({ style, children, tokens }) {
        if (isInlineSegMark(tokens, children)) {
          return inlineSegMarkReplace(children);
        }
        return `<span style="${style}">${children}</span>`
      }
    }
  });
  codeHtml.value = clearLineChar(codeHtml.value);
}
</script>
<style lang="scss">
.code-pane {
  pre {
    padding: 20px;
  }
  .line {
    display: block;
  }
}
</style>