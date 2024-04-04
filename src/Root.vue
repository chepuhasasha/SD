<template lang="pug">
.root
  .root_head(v-if='userStore.user')
    c_user
    w_button(@click='view = "generate"' :mode='view === "generate" ? "solid" : "ghost"' rounded) Generate
  .root_content(v-if='userStore.user')
    v_generate(v-show='view === "generate"')

  .root_modal(v-if='!userStore.user')
    v_auth
  .root_modal(v-if='commonStore.error')
    v_error
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useCommonStore, useUserStore } from './stores'

const userStore = useUserStore()
const commonStore = useCommonStore()
const view = ref('generate')
</script>
<style lang="sass">
.root
  display: flex
  flex-direction: column

  width: 100vw
  height: 100vh
  overflow: hidden

  background: var(--color-background-100)

  &_head
    display: flex
    gap: 20px
    align-items: center
    height: max-content
    background: var(--color-background-200)
    border-bottom: 1px solid var(--color-border)

  &_content
    height: 100%
    overflow: hidden

  &_modal
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh

    display: flex
    place-content: center
    place-items: center

    backdrop-filter: blur(4px)
</style>
