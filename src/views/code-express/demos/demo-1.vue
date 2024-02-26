<template>
  <div class="input-box">
    <input type="text" required>
    <label>请 输 入 您 的 用 户 名 称</label>
  </div>
</template>
<script setup lang="ts">
/* snippet-hello */
function hello() {
  /*seg-foo*/
  console.log('Hello World!');
  /*seg-foo*/
}
/* snippet-hello */


/* snippet-hi */
function hi() {
  console./*seg-foo*/log/*seg-foo*/('Hello World!');
}
/* snippet-hi */
</script>
<style lang="scss" scoped>
.demo-1 {
  color: red;
}
</style>