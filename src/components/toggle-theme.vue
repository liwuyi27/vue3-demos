<template>
  <a class="i-ri:sun-line dark:i-ri:moon-inline" @click="toggle">
    <i class="i-ri-sun-line dark:i-ri-moon-line"></i>
  </a>
</template>
<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { nextTick } from 'vue';

const isDark = useDark();
function toggle(event: MouseEvent) {
  // @ts-expect-error exprerimental API
  const isAppearanceTransition = document.startViewTransition 
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value;
    return;
  }

  const x = event.clientX;
  const y = event.clientY;

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]

    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath
      },
      {
        duration: 400,
        easing: 'ease-out',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      },
    )
  })
}
</script>