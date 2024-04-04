<template lang="pug">
.root
  .root_head(v-if='userStore.user')
    c_user
    w_button(@click='view = "generate"' :mode='view === "generate" ? "solid" : "ghost"' rounded) Generate
    //- w_button(@click='view = "upscale"' :mode='view === "upscale" ? "solid" : "ghost"' rounded) Upscale
    //- w_button(icon='plus' size="s" mode='ghost' @click='downloadPresets') Add presets
    //- w_button(icon='down' size="s" mode='ghost' @click='downloadPresets') Download my presets
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


const downloadPresets = () => {
  const jsonData: Record<string, any> = {}
  const generate_presets = localStorage.getItem('generate_presets')
  if (generate_presets) {
    jsonData.generate_presets = JSON.parse(generate_presets)
  }

  const jsonString = JSON.stringify(jsonData)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const downloadLink = document.createElement('a')
  downloadLink.href = window.URL.createObjectURL(blob)
  downloadLink.download = 'presets.json'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
const addPresets = () => {

}
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
