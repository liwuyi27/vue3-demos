<template>
  <vue-typed-js :strings="strings" class="code-pane" :class="{ border }" :style="borderStyle" v-if="codeHtml"></vue-typed-js>
</template>
<script setup lang="ts">
import { setCDN, getHighlighter, renderToHtml } from "shiki";
import type { Highlighter, } from 'shiki';
import { useShiki } from '@/composables/shiki';
import { computed, onMounted, ref } from "vue";
import VueTypedJs from "./vue-typed-js.vue";
import { isEmpty } from "lodash";
interface Props {
  code: string,
  bg?: string,
  border?: boolean,
  borderStyle?: Record<string, string>,
  lang: string,
  title?: string
}

setCDN('/node_modules/shiki/');

const props = withDefaults(defineProps<Props>(), {
  bg: 'rgb(30, 30, 30)',
  border: true,
});

let highlighter: Highlighter;

const codeHtml = ref('');
const { isInlineSegMark, isBlockSegMark, inlineSegMarkReplace, blockSegMarkReplace, clearLineChar } = useShiki();

const strings = computed(() => {
  const ret = [];
  if (!isEmpty(props.title)) {
    ret.push(`<div class="title">${props.title}</div>`);
  }
  ret.push(codeHtml.value);
  return [ret.join('')];
})

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
  font-size: 14px;
  font-weight: bold;
  .line {
    line-height: 1.3;
  }

  pre {
    padding: 20px;
    margin: 0;
  }

  code {
    font-family: Consolas, 'Courier New', monospace;
  }

  &.border {
    border: 1px solid gray;
  }

  .line {
    display: block;
  }
  .title {
    color: white;
    font-size: 14px;
    padding-left: 20px;
  }
}
</style>