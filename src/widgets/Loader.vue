<template lang="pug">
.w_loader
  .w_loader_item(:style='loader' v-show="show")
    .w_loader_item_value(:style='value')
  .w_loader_message(v-if='message')
    .w_loader_percent(v-if='percent || percent === 0') {{ percent }}%
    | {{ message  }}
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'

const props = defineProps({
  size: { type: String as PropType<'s' | 'm' | 'l'>, default: 's' },
  message: { type: String as PropType<string | null>, default: null },
  percent: { type: Number as PropType<number | null>, default: null },
  show: { type: Boolean as PropType<boolean>, default: true },

})

const loader = computed(() => {
  const map = {
    s: 4,
    m: 10,
    l: 20
  }
  return {
    height: map[props.size] + 'px'
  }
})
const value = computed(() => {
  return {
    width: props.percent ? `${props.percent}%` : '100%',
    animation: props.percent ? 'none' : 'animloader 3s ease infinite'
  }
})
</script>
<style lang="sass">
.w_loader
  width: 100%
  &_message
    display: flex
    gap: 4px
    line-height: 12px
    font-size: 12px
    color: var(--color-text-300)
    font-family: "Roboto Mono", monospace
  &_percent
    line-height: 12px
    font-size: 12px
    color: var(--color-interactive-primary)
    font-family: "Roboto Mono", monospace
  &_item
    // border-radius: 2px
    background: var(--color-interactive-transparent)
    width: 100%
    height: 4px
    display: block
    position: relative
    overflow: hidden
    &_value
      transition: all 0.3s ease
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0
      box-sizing: border-box
      background: var(--color-interactive-primary)

@keyframes animloader
  0%
    left: 0
    transform: translateX(-100%)
  100%
    left: 100%
    transform: translateX(0%)
</style>
