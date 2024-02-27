<template>
  <blog>
    <slide>
      <step>step 1-1</step>
      <step>step 1-2</step>
    </slide>
    <slide>
      <step>step 2-1</step>
      <step>step 2-2</step>
    </slide>
  </blog>
</template>
<script setup lang="ts">
import Blog from '@/components/blog.vue';
import Slide from '@/components/slide.vue';
import Step from '@/components/step.vue';
</script>