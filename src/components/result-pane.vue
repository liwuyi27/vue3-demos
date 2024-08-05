<template>
  <div class="result-pane">
    <slot></slot>
  </div>
</template>
<style lang="scss">
.result-pane {
  // box-shadow: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07);
  background-color: rgb(57, 73, 88);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  html.dark &{
    background-color: rgb(57, 73, 88);
  }
}
</style>