<template lang="pug">
.w_textarea(:class='{w_textarea__error: error}')
  label(v-if='label') {{ label }}{{ error ? `: ${error}` : null }}
  .w_textarea_wrap
    .w_textarea_icon(v-if='icon')
      w_icon(:name='icon')
    textarea(
      v-bind='$attrs'
      @input="update",
      :value="modelValue"
      @blur="blur"
    )
    .w_textarea_clear(v-if='modelValue && clearBtn' @click='clear')
      w_icon(name='cross')
    slot
</template>
<script lang="ts" setup>
import type { PropType } from "vue";

const props = defineProps({
  icon: { type: String as PropType<string>, default: null },
  label: { type: String as PropType<string>, default: null },
  error: { type: String as PropType<string>, default: null },
  clearBtn: { type: Boolean as PropType<boolean>, default: false },
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: null,
  },
  format: { type: Function, default: (v: any) => v },
});
const emit = defineEmits(["update:modelValue"]);
const blur = (e: Event) => {
  const value: any = props.format(props.modelValue);
  (e.target as HTMLInputElement).value = value as string;
};
const update = (e: Event) => {
  const value = props.format((e.target as HTMLInputElement).value);
  emit("update:modelValue", value);
};

const clear = () => {
  emit("update:modelValue", null);
}
</script>
<style lang="sass">
.w_textarea
  display: flex
  flex-direction: column
  gap: 4px
  width: 100%

  label
    font-size: 10px
    text-transform: uppercase
    color: var(--color-text-300)
  textarea
    height: 40px
    width: 100%
    background: var(--color-background-200)
    // border: 1px solid var(--color-border)
    border: none
    border-left: 4px solid var(--color-border)
    outline: none
    padding: 10px
    color: var(--color-text-100)
    height: 100%
    width: 100%
    resize: none
    // overflow: hidden
    min-height: 40px
    &:hover, &:focus
      border-color: var(--color-interactive-primary)
  &_wrap
    display: flex
    align-items: center
    gap: 4px
    height: max-content
  &_icon
    width: 40px
    min-width: 40px
    display: flex
    align-items: center
    justify-content: center
    margin-right: -4px

  &_clear
    cursor: pointer
    display: flex
    align-items: center
    padding: 10px
    background: var(--color-background-100)
    border: 1px solid var(--color-background-100)
    margin-left: -4px
    height: 100%
    &:hover
      background: var(--color-background-200)
      

  &__error
    label
      color: var(--color-error)
    border-left: 4px solid var(--color-error)
    padding-left: 8px
</style>
