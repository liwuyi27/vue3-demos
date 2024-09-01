<template>
  <div v-html="msg"></div>
  <a :href="msg">aa</a>

  <div class="menu">
    <div class="logo">
      <h1>logo</h1>
    </div>
    <ul>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const msg = ref('<img src="javascript:alert(`hello`)" onerror="console.log(document.cookie)">');
msg.value = `<a href="javascript:alert('hello')">aa</a>`;
// msg.value = 'javascript:alert("XSS")'

</script>