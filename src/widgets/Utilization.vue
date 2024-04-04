<template lang="pug">
.w_utilization(:style='{width: width+"px", height: width+"px"}')
  svg.w_utilization_svg(
    :class='{w_utilization__load: percent === null}'
    :viewBox="`0 0 ${width} ${width}`")
    circle.w_utilization_circle(
      :cx="width / 2"
      :cy="width / 2"
      :r="width / 2 - 2"
      stroke-width="4"
      :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset")
  .w_utilization_slot
    slot
</template>
<script lang="ts" setup>
import { ref, type PropType, computed } from 'vue'

const props = defineProps({
  width: { type: Number as PropType<number>, default: 50 },
  percent: { type: Number as PropType<number>, default: null }
})
const circumference = ref(2 * (props.width / 2 - 2) * Math.PI)
const dashOffset = computed(
  () => circumference.value - (circumference.value / 100) * (props.percent || 0)
)
</script>
<style lang="sass">
.w_utilization
  position: relative
  &_svg
    height: 100%
    transform: rotate(-90deg)
    circle
      fill: none
      stroke: var(--color-accent)

  &__load
    transform: rotate(0deg)
    animation: rotate 2s ease-in-out infinite
    circle
      animation: dash 2s ease-in-out infinite
  &_slot
    display: flex
    align-items: center
    justify-content: center
    top: 0
    height: 100%
    width: 100%
    position: absolute

@keyframes rotate
  100%
    transform: rotate(360deg)
@keyframes dash
  0%
    stroke-dasharray: 0, 144
    stroke-dashoffset: -144
  50%
    stroke-dasharray: 144, 144
    stroke-dashoffset: 0
  100%
    stroke-dasharray: 0, 144
    stroke-dashoffset: -144
</style>
