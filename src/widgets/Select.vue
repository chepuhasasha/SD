<template lang="pug">
.w_select(ref='selectDiv' :class="{w_select__disabled: disabled, w_select__error: error}")
  label(v-if='label') {{ label }}{{ error ? ": "+error : "" }}
  slot
  .w_select_area(@click='open')
    .w_select_area_value {{ isMulty ? modelValue.map(v => format(v)).join(', ') || placeholder : format(modelValue) || placeholder }}
    .w_select_area_count(v-if='isMulty && modelValue.length > 0') {{ modelValue.length }}
    w_icon(v-if='options && options.length > 0' :name='isOpen ? "up" : "down"')
  slot(name='area')
Teleport(to='body')
  .w_select_pop_wrap(v-if='isOpen ' @click='close')
    .w_select_pop(@click.stop :style='area' @pointerleave='close')
      .w_select_pop_search(v-if='search')
        input(v-model='searchValue' placeholder='search...')
        .w_select_pop_search_clear(v-if='searchValue' @click='searchValue = null')
          w_icon(name='cross')
      .w_select_pop_body(v-if='filter.length > 0')
        .w_select_pop_option(
          v-for='option in filter'
          @click='select(option.value)'
          :class='{w_select_pop_option__selected: Array.isArray(modelValue) && modelValue.map(v => format(v)).includes(format(option.value)) || format(modelValue) === format(option.value)}'
          ) {{ option.label }}
      .w_select_empty(v-else) No results: "{{ searchValue }}"
      .w_select_pop_clear(v-if='isMulty && modelValue.length > 0' @click='clear') CLEAR: {{ modelValue.length }}
        w_icon(name='cross')

</template>
<script lang="ts" setup>
import { ref, type PropType, reactive, computed, watch, type Prop } from 'vue'

const emit = defineEmits(['update:modelValue', 'close'])
const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object] as PropType<string | number | null | (string | number)[]>,
    default: null
  },
  format: { type: Function, default: (v: any) => v },
  search: { type: Boolean as PropType<boolean>, default: false },
  disabled: { type: Boolean as PropType<boolean>, default: false },
  error: { type: String as PropType<string>, default: null },
  label: { type: String as PropType<string>, default: null },
  placeholder: { type: String as PropType<string>, default: 'Select...' },
  options: {
    type: Array as PropType<{ value: string | number; label: string }[]>,
    default: () => []
  },
  maxHeight: { type: Number as PropType<number>, default: 300 }
})

const selectDiv = ref<null | HTMLDivElement>(null)
const area = reactive({
  top: '0px',
  left: '0px',
  width: '100px',
  maxHeight: '300px'
})
const isOpen = ref(false)
const isMulty = computed(() => Array.isArray(props.modelValue))
const searchValue = ref<string | null>(null)
const filter = computed(() => {
  if (searchValue.value) {
    return props.options.filter((o) =>
      o.label.toLowerCase().includes((searchValue.value as string).toLowerCase())
    )
  }
  return props.options
})

const open = () => {
  if (props.disabled) {
    return
  }
  if (selectDiv.value) {
    const rect = selectDiv.value.getBoundingClientRect()
    const ofset = window.innerHeight - (rect.top + props.maxHeight)
    if (ofset < 0) {
      area.top = rect.top + ofset - 20 + 'px'
    } else {
      area.top = rect.top + 'px'
    }
    area.left = rect.left + 'px'
    area.width = rect.width + 'px'
    area.maxHeight = props.maxHeight + 'px'
  }
  if (props.options && props.options.length > 0) {
    isOpen.value = true
  }
}
const close = () => {
  isOpen.value = false
  searchValue.value = null
  emit('close')
}
const select = (option: string) => {
  if (Array.isArray(props.modelValue)) {
    if (props.modelValue.map((v) => props.format(v)).includes(props.format(option))) {
      emit('update:modelValue', [
        ...props.modelValue.filter((o) => props.format(o) != props.format(option))
      ])
    } else {
      emit('update:modelValue', [...props.modelValue, option])
    }
  } else {
    emit('update:modelValue', option)
    close()
  }
}
const clear = () => {
  if (isMulty.value) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', null)
  }
  close()
}

watch(
  () => props.options.length,
  (n) => {
    if (n === 0) {
      clear()
    }
  }
)
</script>
<style lang="sass">
.w_select
  display: flex
  flex-direction: column
  gap: 4px
  width: 100%
  max-width: 100%
  label
    font-size: 10px
    text-transform: uppercase
    color: var(--color-text-300)

  &__error
    label
      color: var(--color-error)
    border-left: 4px solid var(--color-error)
    padding-left: 8px
  &__disabled
    opacity: 0.5
    cursor: not-allowed
    .w_select_area
      cursor: not-allowed
      &:hover
        border-color: var(--color-background-100)
  &_empty
    padding: 10px
    font-size: 12px
    color: var(--color-text-300)
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    width: 100%
    max-width: 100%
  &_area
    cursor: pointer
    display: flex
    align-items: center
    gap: 10px
    background: var(--color-background-200)
    width: 100%
    height: 40px
    padding: 10px
    border-left: 4px solid var(--color-border)
    &:hover
      // background: var(--color-background-100)
      border-color: var(--color-interactive-primary)

    &_value
      width: 100%
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: 12px
    &_count
      font-size: 12px
      font-weight: 700
      color: var(--color-interactive-primary)

  &_pop
    position: absolute
    display: flex
    flex-direction: column
    gap: 1px
    // border-radius: 4px
    background: var(--color-background-100)
    border: 1px solid var(--color-border)
    overflow: hidden
    // box-shadow: 0px 0px 10px rgba(0,0,0,0.5)

    &_search
      width: 100%
      display: flex
      align-items: center
      background: var(--color-background-200)
      &_clear
        cursor: pointer
        display: flex
        align-items: center
        justify-content: center
        height: 34px
        width: 34px
      input
        background: none
        width: 100%
        padding: 6px 10px
        font-size: 10px
        border: none
        outline: none
        color: var(--color-text-100)

    &_body
      overflow-y: auto
      overflow-x: hidden
      height: 100%
      &::-webkit-scrollbar
        width: 4px
        height: 4px

    &_option
      cursor: pointer
      padding: 6px 10px
      font-size: 12px
      color: var(--color-text-200)
      &:hover
        color: var(--color-text-100)
        background: var(--color-background-200)
      &__selected
        background: var(--color-interactive-transparent)
        color: var(--color-interactive-primary)
        &:hover
          background: var(--color-background-300)
          color: var(--color-text-100)

    &_clear
      cursor: pointer
      display: flex
      justify-content: space-between
      align-items: center
      font-size: 10px
      padding: 6px 10px
      background: var(--color-background-100)
      &:hover
        background: var(--color-background-300)



    &_wrap
      position: fixed
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      background: rgba(0,0,0,0)
      z-index: 99
</style>
