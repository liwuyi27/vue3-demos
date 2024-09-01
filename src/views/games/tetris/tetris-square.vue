<template>
  <span></span>
</template>
<script setup lang="ts">
interface Props {
  status: 'active' | 'inactive' | 'removing'
}

const props = defineProps<Props>()

</script>
<style lang="scss" scoped>

</style>