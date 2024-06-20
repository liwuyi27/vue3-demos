<template>
  <Suspense>
    <AsyncComp></AsyncComp>
    <template #fallback>
      <div>I am Fallback</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import { ComponentOptions, h} from 'vue';

const AsyncComp: ComponentOptions = {
  setup() {
    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve(() => h('div', 'a'));
        console.log('after resolve');
      }, 2000)
    });
    let inP;
    const p2 = p.then(() => {
      console.log('in then');
      inP = Promise.resolve('Hello P2');
      return inP
    });
    console.log(inP === p2);
    // p2.then((res) => console.log('p2 res: ', res))
    return p;
  }
}
</script>