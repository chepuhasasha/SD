<template lang="pug">
.generate
  .generate_props
    w_textarea(
      label='PROMPT' 
      rows='5' 
      placeholder='Your prompt here...'
      v-model='body.prompt')
    w_textarea(
      label='NEGATIVE PROMPT' 
      rows='5' 
      placeholder='Your negative prompt here...'
      v-model='body.negative_prompt')
    w_select(
      label='aspect ratio'
      :options='values.aspect_ratio.map(value => ({label: value, value}))'
      v-model='body.aspect_ratio'
    )
    w_select(
      label='output format'
      :options='values.output_format.map(value => ({label: value, value}))'
      v-model='body.output_format'
    )
    w_select(
      label='style preset'
      :options='values.style_preset.map(value => ({label: value.replace("-", " "), value}))'
      v-model='body.style_preset'
    )
    w_button(
      icon='right' fill size='l' 
      :disabled='!body.prompt'
      :loaded='load'
      @click='generate'
      ) GENERATE
    pre {{ body }}
    w_input(
      label="Save as preset"
      placeholder='preset name')
      w_button(icon='plus')
  .generate_view(v-if='imageUrl')
    w_button(icon='right' @click='download' mode='ghost' size='s') open in new tab
    img(:src='imageUrl')
  w_empty(v-else message='nothing to watch yet')
</template>
<script lang="ts" setup>
import { useCommonStore, useUserStore, type APIError } from '@/stores'
import { reactive, ref } from 'vue'
import axios from 'axios'
import FormData from 'form-data'

const userStore = useUserStore()
const commonStore = useCommonStore()

const values = {
  aspect_ratio: ['16:9', '1:1', '21:9', '2:3', '3:2', '4:5', '5:4', '9:16', '9:21'],
  style_preset: [
    '3d-model',
    'analog-film',
    'anime',
    'cinematic',
    'comic-book',
    'digital-art',
    'enhance',
    'fantasy-art',
    'isometric',
    'line-art',
    'low-poly',
    'modeling-compound',
    'neon-punk',
    'origami',
    'photographic',
    'pixel-art',
    'tile-texture'
  ],
  output_format: ['jpeg', 'png', 'webp']
}

const body = reactive<Record<string, any>>({
  prompt: '',
  negative_prompt: null,
  seed: null,
  aspect_ratio: null,
  style_preset: null,
  output_format: null
})

const load = ref(false)
const imageUrl = ref<string | null>(null)
const generate = () => {
  load.value = true

  const formData = Object.keys(body).reduce(
    (acc, key) => {
      if (body[key]) {
        acc[key] = body[key]
      }
      return acc
    },
    {} as Record<string, any>
  )

  axios
    .postForm(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      axios.toFormData(formData, new FormData()),
      {
        validateStatus: undefined,
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${userStore.api_key}`,
          Accept: 'image/*'
        }
      }
    )
    .then((res) => {
      const blob = new Blob([res.data], {
        type: res.headers['content-type'] as string
      })
      imageUrl.value = URL.createObjectURL(blob)
    })
    .catch((err) => {
      const error = err.response
        ? (err.response.data as APIError)
        : { id: 'Unknown', name: 'Furious error', message: 'Something went wrong...' }
      commonStore.setError(error)
      return error
    })
    .finally(() => {
      load.value = false
    })
}
const download = () => {
  if (imageUrl.value) {
    let link = document.createElement('a')
    link.href = imageUrl.value
    link.target = '_blank'
    // link.download = `generated.${imageType.value.split('/')[1]}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>
<style lang="sass">
.generate
  display: grid
  grid-template-columns: 400px 1fr
  grid-template-rows: 1fr
  width: 100%
  height: 100%
  gap: 20px

  &_props
    display: flex
    flex-direction: column
    overflow: auto
    padding: 10px
    gap: 10px
    border-right: 1px solid var(--color-border)
    pre
      font-size: 10px
      padding: 10px
      border: 1px solid var(--color-border)
      color: var(--color-text-200)
      white-space: pre-wrap
      word-break: break-all
      overflow: hidden

  &_view
    width: 100%
    height: 100%
    display: flex
    place-content: center
    place-items: center
    background: var(--color-background-300)
    overflow: hidden
    position: relative
    img
      max-width: 100%
      max-height: 100%
    .w_button
      position: absolute
      top: 0
      left: 0
</style>
