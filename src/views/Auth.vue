<template lang="pug">
.auth
  h1 API key required
  | To interact with the Stable Deffusion server, the application needs your API key.
  | We do not store your key, so you must enter it every time you log into the app.
  a(
    href='https://platform.stability.ai/account/keys'
    target='_blank'
  ) Where can I get the key?
  w_input(
    label="Your API key"
    placeholder="sk-IJ4**************VcX"
    v-model="userStore.api_key"
    icon='key')
  w_button(fill icon='login' @click='login' :loaded='load') Log In
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'

const userStore = useUserStore()

const load = ref(false)
const login = () => {
  load.value = true
  userStore.getUser().finally(() => {
    load.value = false
  })
}
</script>
<style lang="sass">
.auth
  display: flex
  flex-direction: column
  gap: 20px
  width: 300px
  max-width: 100%
  padding: 20px
  font-size: 12px
  color: var(--color-text-200)
  background: var(--color-background-100)
  border: 1px solid var(--color-border)
</style>
