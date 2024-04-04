<template lang="pug">
.empty
  w_icon(name='eye_off' color='var(--color-text-300)')
  | {{ message }}
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  message: { type: String as PropType<string | null>, default: null }
})
</script>
<style lang="sass">
.empty
  display: flex
  flex-direction: column
  gap: 10px
  width: 100%
  height: 100%
  place-content: center
  place-items: center
  font-size: 10px
  color: var(--color-text-300)
</style>
