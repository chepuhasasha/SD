<template lang="pug">
.editor
  .editor_bar(v-if='editable')
    w_button(icon='plus' @click='input.click()')
    input(ref='input' type="file" accept="image/*" @change="handleImageUpload")
    w_button(icon='down' @click='save')
  canvas(ref="canvas")
  //- w_empty(v-if="!commonStor e.image" message='nothing to watch yet')
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as PIXI from 'pixi.js'
import { useCommonStore } from '@/stores'

const props = defineProps({
  editable: { type: Boolean as PropType<boolean>, default: true }
})
const commonStore = useCommonStore()
const input = ref(null)

const canvas = ref<HTMLCanvasElement | null>(null)
let app: PIXI.Application | null = null
let container: null | PIXI.Container = null

const refresh = async () => {
  if (!canvas.value || !commonStore.image) return
  const rect = canvas.value.getBoundingClientRect()
  if (!app) {
    app = new PIXI.Application({
      view: canvas.value,
      resizeTo: canvas.value,
      width: rect.width,
      height: rect.height,
      backgroundColor: 0x181818,
      antialias: true
    })
    app.stage.eventMode = 'static'
    app.stage.removeAllListeners()
  }
  if (container) {
    app.stage.removeChild(container)
  }
  const texture = await PIXI.Assets.load(commonStore.image)
  const image = new PIXI.Sprite(texture)
  container = new PIXI.Container()
  container.eventMode = 'static'
  image.anchor.x = 0.5
  image.anchor.y = 0.5
  container.addChild(image)
  container.x = app.renderer.width / 2
  container.y = app.renderer.height / 2
  app.stage.addChild(container)
  const cursor = app.stage.addChild(
    new PIXI.Graphics()
      .beginFill(0x0086ec, 0.2)
      .lineStyle({ color: 0x0086ec, alpha: 0.87, width: 1 })
      .drawCircle(0, 0, 10)
      .endFill()
  )

  cursor.position.set(app.screen.width / 2, app.screen.height / 2)
  app.stage.addEventListener('wheel', wheel)
  app.stage.addEventListener('pointermove', (e) => {
    if (!app) return
    cursor.position.x = (e.global.x - app.stage.position.x) / app.stage.scale.x
    cursor.position.y = (e.global.y - app.stage.position.y) / app.stage.scale.y
  })
  app.resize()
}

function base64ToBlob(base64String: string): { blob: Blob; mime: string } {
  const byteString = atob(base64String.split(',')[1])
  const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return { blob: new Blob([ab], { type: mimeString }), mime: mimeString.split('/')[1] }
}

const save = () => {
  if (app && container) {
    app.renderer.extract.base64(container).then((data) => {
      const file = base64ToBlob(data)
      const url = URL.createObjectURL(file.blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${new Date().toISOString()}.${file.mime}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
  }
}

// Обработка загрузки изображения
const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length > 0) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        commonStore.setImage(e.target.result)
      }
    }
    reader.readAsDataURL(files[0])
  }
}

// Обработка события прокрутки колеса мыши (зум)
const wheel = (event: PIXI.FederatedWheelEvent) => {
  if (!app || !canvas.value) return
  const scaleChange = event.deltaY > 0 ? 0.1 : -0.1 // Уменьшение или увеличение масштаба в зависимости от направления прокрутки
  const zoom = 1 + scaleChange
  const localPointerPosition = app.stage.toLocal(new PIXI.Point(event.global.x, event.global.y))
  app.stage.scale.x *= zoom
  app.stage.scale.y *= zoom

  const minScale = 0.1
  const maxScale = 2
  app.stage.scale.x = Math.min(Math.max(app.stage.scale.x, minScale), maxScale)
  app.stage.scale.y = Math.min(Math.max(app.stage.scale.y, minScale), maxScale)

  const newLocalPointerPosition = app.stage.toLocal(new PIXI.Point(event.global.x, event.global.y))
  app.stage.position.x += (newLocalPointerPosition.x - localPointerPosition.x) * app.stage.scale.x
  app.stage.position.y += (newLocalPointerPosition.y - localPointerPosition.y) * app.stage.scale.y
}

const mouse = {
  isRightButtonDown: false,
  lastPointerPosition: {
    x: 0,
    y: 0
  }
}
const pointerDown = (event: MouseEvent) => {
  // Правая кнопка мыши
  if (event.button === 2) {
    mouse.isRightButtonDown = true
    mouse.lastPointerPosition.x = event.clientX
    mouse.lastPointerPosition.y = event.clientY
  }
}
const pointerUp = (event: MouseEvent) => {
  // Правая кнопка мыши
  if (event.button === 2) {
    mouse.isRightButtonDown = false
  }
}
const pointerMove = (event: MouseEvent) => {
  if (mouse.isRightButtonDown && app && canvas.value) {
    const deltaX = event.clientX - mouse.lastPointerPosition.x
    const deltaY = event.clientY - mouse.lastPointerPosition.y
    mouse.lastPointerPosition.x = event.clientX
    mouse.lastPointerPosition.y = event.clientY
    app.stage.position.x += deltaX
    app.stage.position.y += deltaY
  }
}

watch(
  () => commonStore.image,
  (n) => {
    if (n) {
      refresh()
    }
  }
)

onMounted(() => {
  if (!canvas.value) return
  canvas.value.addEventListener('contextmenu', (event) => event.preventDefault()) // Предотвращаем контекстное меню браузера
  canvas.value.addEventListener('pointerdown', pointerDown)
  canvas.value.addEventListener('pointerup', pointerUp)
  canvas.value.addEventListener('pointermove', pointerMove)
  refresh()
})
onUnmounted(() => {
  if (!canvas.value || !app) return
  app.destroy()
})
</script>

<style lang="sass">
.editor
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  background: var(--color-background-100)
  position: relative
  overflow: hidden
  canvas
    width: 100%
    height: 100%
  &_bar
    display: flex
    width: 100%
    border-bottom: 1px solid var(--color-border)
    input
      display: none
  .empty
    position: absolute
    height: 100%
    width: 100%
</style>
