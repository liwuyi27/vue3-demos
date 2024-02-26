<template>
  <el-card shadow="always" class="slide-operate">
    <el-button circle :icon="ArrowLeftBold" type="primary" @click="removeStep"></el-button>
    <el-button circle :icon="VideoPause" type="primary" v-if="playing" @click="togglePlaying()"></el-button>
    <el-button circle :icon="VideoPlay" type="primary" v-else @click="togglePlaying()"></el-button>
    <el-button circle :icon="ArrowRightBold" type="primary" @click="addStep"></el-button>
  </el-card>
</template>
<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold, VideoPlay, VideoPause } from "@element-plus/icons-vue";
import { useToggle, useVModels } from "@vueuse/core";
interface Props {
  step: number,
  playing: boolean,
  stepTotal: number,
}

const props = defineProps<Props>();
const emits = defineEmits(['update:step', 'update:playing']);
const { step, playing } = useVModels(props, emits);
const togglePlaying = useToggle(playing);

function addStep() {
  if (step.value >= props.stepTotal) {
    step.value = props.stepTotal;
  } else {
    step.value++;
  }
}

function removeStep() {
  if (step.value <= 0) {
    step.value = 0;
  } else {
    step.value--;
  }
}

</script>
<style lang="scss" scoped>
.slide-operate {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>