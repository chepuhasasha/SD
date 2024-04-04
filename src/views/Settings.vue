<template lang="pug">
.settings
  .settings_head
    h3 Settings
    w_icon(name='settings')
  w_button(fill icon='plus') Add presets
  w_button(fill icon='down' @click='downloadPresets') Download my presets
</template>
<script lang="ts" setup>
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
</script>
<style lang="sass">
.settings
  display: flex
  flex-direction: column
  background: var(--color-background-100)
  border: 1px solid var(--color-border)
  padding: 20px
  gap: 10px
  &_head
    display: flex
    justify-content: space-between
    align-items: center
    padding-bottom: 20px
</style>
