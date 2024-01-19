<template>
  <div class="demo-1">
    <span>Hello World!</span>
    <ul>
      <li>good morning</li>
      <li>good afternoon</li>
      <li>good evening</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
/* snippet-hello */
function hello() {
  console.log('Hello World!')
}
/* snippet-hello */

/* snippet-hi */
function hi() {
  console.log('Hello World!')
}
/* snippet-hi */
</script>
<style lang="scss" scoped>
.demo-1 {
  color: red;
}
</style>