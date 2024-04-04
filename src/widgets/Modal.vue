<template lang="pug">
.w_modal_wrap
  .w_modal(@click.stop, :style="{ width, height }")
    .w_modal_header
      .w_modal_header_title {{ title }}
      slot(name="header")
      w_button(@click="$emit('close')" icon='cross')
    .w_modal_body
      slot
    .w_modal_footer
      slot(name="footer")
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  title: { type: String as PropType<string>, default: 'info' },
  width: { type: String as PropType<string>, default: 'auto' },
  height: { type: String as PropType<string>, default: 'auto' }
})
</script>
<style lang="sass">
.w_modal
  display: flex
  flex-direction: column

  max-width: 100vw
  max-height: 100vh

  background: var(--color-background-100)
  border: 1px solid var(--color-border)
  box-shadow: 10px 10px 0px var(--color-interactive-primary)

  &_wrap
    display: flex
    align-items: center
    justify-content: center

    position: fixed
    z-index: 99
    top: 0
    left: 0
    width: 100vw
    height: 100vh

    background: var(--color-interactive-transparent)
  &_header, &_footer
    display: flex
    justify-content: space-between
    align-items: center
    gap: 10px
    background: var(--color-background-100)
    &_title
      padding: 10px
      font-size: 14px
      width: 100%
      font-weight: 600
  &_body
    display: flex
    flex-direction: column
    // padding: 10px
    gap: 10px
    height: 100%

    overflow-y: auto
    overflow-x: hidden

    border-top: 1px solid var(--color-border)
    border-bottom: 1px solid var(--color-border)
    background: var(--color-background-200)
</style>
