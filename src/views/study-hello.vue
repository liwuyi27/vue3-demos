<template>
  <div>
    <div>I am children-1</div>
    <div>I am children-1</div>
  </div>
</template>
<script setup lang="ts">
import { isArray, isObject, isString } from 'lodash';
import { onMounted, getCurrentInstance, type VNodeNormalizedChildren, type VNodeArrayChildren, isVNode, type VNode, type ComponentInternalInstance } from 'vue';

const vm = getCurrentInstance();

function extractComponents(vm: ComponentInternalInstance, name: string) {
  const children = vm!.subTree.children as VNodeArrayChildren | string;
  if (isString(children)) {
    return [];
  }
  const components: ComponentInternalInstance[] = [];
  children.forEach(child => {
    if (isVNode(child)) {
      traverse(child);
    }
  })

  function traverse(root: VNode) {
    let children: VNodeNormalizedChildren;
    // element
    if (isString(root.type) || root.type === Symbol.for('v-fgt')) {
      children = root.children;
    } else if (isObject(root.type)) {
      const vm = root.component;
      if (!vm) {
        return;
      }
      if (name === vm.type.name) {
        components.push(vm);
        return;
      }
      children = vm.subTree.children;
    } else {
      return;
    }
    if (isArray(children)) {
      children.forEach(child => {
        if (isVNode(child)) {
          traverse(child);
        }
      })
    }
  }
}

onMounted(() => {
  
  extractComponents
})
</script>