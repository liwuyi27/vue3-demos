<template>
  <div v-html="codeHtml" class="code-pane" :class="{ border }" :style="borderStyle"></div>
</template>
<script setup lang="ts">
import { setCDN, getHighlighter, renderToHtml } from "shiki";
import type { Highlighter,  } from 'shiki';
import { useShiki } from '@/composables/shiki';
import { onMounted, ref } from "vue";
interface Props {
  code: string,
  bg?: string,
  border?: boolean,
  borderStyle?: Record<string, string>
  lang: string
}

setCDN('/node_modules/shiki/');

const props = withDefaults(defineProps<Props>(), {
  bg: 'rgb(30, 30, 30)',
  border: true,
});

let highlighter: Highlighter;

const codeHtml = ref('');
const { isInlineSegMark, isBlockSegMark, inlineSegMarkReplace, blockSegMarkReplace, clearLineChar } = useShiki();

onMounted(async () => {
  highlighter = await getHighlighter({ theme: 'dark-plus' });
  highlightCode();
})

function highlightCode() {
  const tokens = highlighter.codeToThemedTokens(props.code, props.lang);
  codeHtml.value = renderToHtml(tokens, {
    bg: props.bg,
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
    margin: 0;
  }
  &.border {
    border: 1px solid gray;
  }
  .line {
    display: block;
  }
}
</style>