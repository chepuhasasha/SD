<template lang="pug">
.w_input(:class='classes')
  label(v-if='label') {{ label }}{{ error ? `: ${error}` : null }}
  slot(name='body')
  .w_input_wrap
    .w_input_icon(v-if='icon')
      w_icon(:name='icon' :size='size')
    input(
      :disabled='disabled'
      v-bind='$attrs'
      @input="update",
      :value="modelValue"
      @blur="blur"
    )
    slot
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'

const props = defineProps({
  label: { type: String as PropType<string>, default: null },
  icon: { type: String as PropType<string>, default: null },
  error: { type: String as PropType<string>, default: null },
  disabled: { type: Boolean as PropType<boolean>, default: false },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: null
  },
  format: { type: Function, default: (v: any) => v },
  size: { type: String as PropType<'s' | 'm' | 'l'>, default: 'm' }
})
const emit = defineEmits(['update:modelValue'])
const blur = (e: Event) => {
  const value: any = props.format(props.modelValue)
  ;(e.target as HTMLInputElement).value = value as string
}
const update = (e: Event) => {
  const value = props.format((e.target as HTMLInputElement).value)
  emit('update:modelValue', value)
}

const classes = computed(() => ({
  [`w_input__error`]: props.error,
  [`w_input__disabled`]: props.disabled,
  [`w_input__${props.size}`]: true
}))
</script>
<style lang="sass">
.w_input
  display: flex
  flex-direction: column
  gap: 4px
  width: 100%

  label
    font-size: 10px
    text-transform: uppercase
    color: var(--color-text-300)
  input
    // height: 40px
    width: 100%
    background: var(--color-background-200)
    border: none
    border-left: 4px solid var(--color-border)
    outline: none
    padding: 10px
    color: var(--color-text-100)
    &:hover, &:focus
      background: var(--color-background-200)
      border-color: var(--color-interactive-primary)
  &_icon
    display: flex
    place-content: center
    place-items: center
    border: 1px solid var(--color-border)
  &_wrap
    display: flex
    align-items: center
    // gap: 4px
    span
      font-size: 10px
      color: var(--color-text-300)

  &__error
    label
      color: var(--color-error)
    border-left: 4px solid var(--color-error)
    padding-left: 8px
    input
      border-color: var(--color-error)

  &__s
    input
      height: 28px
      padding: 4px
    .w_input_icon
      height: 28px
      min-width: 28px
  &__m
    input
      height: 40px
      padding: 10px
    .w_input_icon
      height: 40px
      min-width: 40px
  &__l
    input
      padding: 14px

  &__disabled
    opacity: 0.5
    cursor: not-allowed
    input
      cursor: not-allowed
      &:hover
        border-color: var(--color-background-100)
</style>
