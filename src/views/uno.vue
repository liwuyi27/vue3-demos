<template>
  <span class="mr-2 flex" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: '100', delay: 100 } }">Hello World!</span>
  <span>Hi World!</span>
</template>