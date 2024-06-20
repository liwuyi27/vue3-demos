<template>
  <div></div>
</template>
<script lang="ts">
import { h } from 'vue';

export default {
  setup() {
    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve(() => h())
      })
    })
  }
}
</script>