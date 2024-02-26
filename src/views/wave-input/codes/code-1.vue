<template>
  <div class="input-box">
    <input type="text" required>
    <label>请输入您的用户名称</label>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
function setAnimate() {
  /* snippet-set-animate */
  let label = document.querySelector('label')!;
  const a = `hello world!`/* seg-set-animate */;/* seg-set-animate */
  label.innerHTML = label.innerHTML.split('').map((letters, i) => {
    return `<span 
    style="transition-delay:${i * 30}ms;
    filter: hue-rotate(${i * 10}deg)">
    ${letters}
    </span>`
  }).join('');
  /* snippet-set-animate */
}
onMounted(() => {
  setAnimate();
})
</script>
<style lang="scss">
/* snippet-basic */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #29313a;
}

/* snippet-basic */

.click-1, .click-2,.click-3, .click-any {
  /* snippet-inputbox */
  .input-box {
    position: relative;
    width: 350px;
  }

  .input-box input {
    position: relative;
    width: 100%;
    padding: 10px 0;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid #999;
    color: #fff;
    letter-spacing: 0.05em;
    font-size: 1.25em;
    transition: 0.5s;
  }

  /* snippet-inputbox */
}

.click-2, .click-3, .click-any{
  /* snippet-inputlabel */
  .input-box label {
    position: absolute;
    left: 0;
    padding: 10px 0;
    pointer-events: none;
    color: #666;
    user-select: none;
  }

  .input-box label span {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    font-size: 1.25rem;
    letter-spacing: 0.0.5rem;
    transition: 0.25s cubic-bezier(0.5, 1, 0.5, 1.5);
  }
  /* snippet-inputlabel */
}

.click-3, .click-any {
  /* snippet-inputlabelcolor */
  .input-box input:focus~label span,
  .input-box input:valid~label span {
    color: #0f0;
    text-shadow: 0 0 5px #0f0,
      0 0 15px #0f0,
      0 0 30px #0f0;
    transform: translateY(-30px);
  }

  .input-box input:focus,
  .input-box input:valid {
    border-bottom: 2px solid #fff;
  }
  /* snippet-inputlabelcolor */
}
</style>