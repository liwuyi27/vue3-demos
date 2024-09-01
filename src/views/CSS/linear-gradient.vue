<template>
  <!-- <div class="loading-animation">

  </div> -->
  <div class="expanded"></div>
  <div class="mask">
    <div class="left"></div>
    <div class="mid"></div>
    <div class="right"></div>
  </div>
</template>
<style lang="scss" scoped>
.loading-animation {
  width: 200px;
  height: 200px;
  // background: linear-gradient(-45deg, red 25%, #ffffff 45%, red 65%);
  // background-color: orange;
  // background-position: 100px 100px;
  // background-repeat: no-repeat;
  // animation: skeleton-loading 1.2s ease-in-out infinite;
  // background-size: 400% 100%;
  background-color: transparent;
  border: 1px solid black;
  transform: translate(600px);
  position: absolute;
  z-index: 1000;
}

.mask {
  display: flex;
  height: 200px;
  position: absolute;
  .left {
    width: 600px;
    background-color: white;
  }
  .mid {
    background-color: transparent;
    width: 200px;
  }
  .right {
    width: 600px;
    background-color: white;
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

@keyframes Tr {
  0% {
    left: 20px;
  }

  100% {
    left: 620px;
  }
}

.expanded {
  width: 800px;
  height: 200px;
  background-color: orange;
  background: linear-gradient(-45deg, red 25%, #ffffff 45%, red 65%);
  position: absolute;
  animation: Tr 1.2s ease-in-out infinite;
}
</style>