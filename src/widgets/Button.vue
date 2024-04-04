<template lang="pug">
button.w_button(
  :class='classes'
  :style='{width: fill ? "100%" : "max-content"}'
  v-bind='$attrs' :disabled='disabled || loaded')
  slot
  w_icon(v-if='icon' :name='icon' :size='size')
  w_loader.w_button_loader(v-if='loaded')
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'

const props = defineProps({
  mode: {
    type: String as PropType<'solid' | 'ghost'>,
    default: 'solid'
  },
  size: { type: String as PropType<'s' | 'm' | 'l'>, default: 'm' },
  icon: { type: String as PropType<string | null>, default: null },
  fill: { type: Boolean as PropType<boolean>, default: false },
  disabled: { type: Boolean as PropType<boolean>, default: false },
  loaded: { type: Boolean as PropType<boolean>, default: false },
  rounded: { type: Boolean as PropType<boolean>, default: false }
})

const classes = computed(() => ({
  [`w_button__${props.mode}`]: true,
  [`w_button__${props.size}`]: true,
  [`w_button__rounded`]: props.rounded,
}))
</script>
<style lang="sass" title="BASE">
.w_button
  position: relative
  display: flex
  align-items: center
  justify-content: space-between
  white-space: nowrap
  cursor: pointer
  margin: 0
  border: none
  outline: none
  text-align: left
  transition: all ease 0.3s

  &:active
    transform: scale(0.99)

  &:disabled
    opacity: 0.5
    cursor: not-allowed

  &:focus-visible
    outline: 2px solid var(--color-interactive-primary)

  &_loader
    position: absolute !important
    top: 0
    left: 0
    width: 100%
</style>
<style lang="sass" title="SIZING">
.w_button
  &__s
    padding: 4px 6px
    height: 28px
    gap: 6px
    font-weight: 500
    font-size: 12px
    line-height: 14px

  &__m
    padding: 10px
    height: 40px
    gap: 10px
    font-size: 14px
    font-weight: 500
    line-height: 20px

  &__l
    padding: 20px
    height: 68px
    gap: 16px
    font-weight: 600
    font-size: 16px
    line-height: 26px
</style>
<style lang="sass" title="MODES">
.w_button
  &__rounded
    border-radius: 4px
  &__solid
    background: var(--color-interactive-transparent)
    border: 2px solid var(--color-interactive-transparent)
    color: var(--color-interactive-primary)
    white-space: nowrap
    path
      stroke: var(--color-interactive-primary)

  &__ghost
    background: none
    border: 2px solid transparent
    color: var(--color-interactive-primary)
    path
      stroke: var(--color-interactive-primary)
  &__icon
    background: none
    // outline: 1px solid var(--color-border)
    color: var(--color-text-200)
    path
      stroke: var(--color-text-200)
    &:hover
      background: var(--color-background-200)
      color: var(--color-text-100)
      path
        stroke: var(--color-text-100)

  &__solid, &__ghost
    &:hover
      background: var(--color-interactive-primary)
      color: var(--color-interactive-secondary)
      border-color: var(--color-interactive-transparent)
      path
        stroke: var(--color-interactive-secondary)
</style>
