<template lang="pug">
.error(v-if='commonStore.error')
  .error_content
    h1 {{ commonStore.error.name }}
    | {{ commonStore.error.message }}
    span {{ commonStore.error.id }}
  w_button(fill icon='cross' @click='commonStore.setError(null)') Close
</template>
<script lang="ts" setup>
import { useCommonStore } from '@/stores'

const commonStore = useCommonStore()
</script>
<style lang="sass">
.error
  display: flex
  flex-direction: column
  width: 300px
  max-width: 100%
  background: var(--color-background-100)
  border: 1px solid var(--color-border)
  &_content
    display: flex
    flex-direction: column
    gap: 20px
    padding: 20px
    font-size: 12px
    color: var(--color-text-200)
    word-break: break-all
</style>
