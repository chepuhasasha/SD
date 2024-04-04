<template lang="pug">
.user(v-if='userStore.user')
  img(:src='userStore.user.profile_picture')
  .user_info
    .user_email {{ userStore.user.email }}
    .user_id {{ userStore.user.id }}
  w_button(icon='logout' rounded @click='logout')
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const logout = () => {
  userStore.api_key = null
  userStore.user = null
}
</script>
<style lang="sass">
.user
  display: flex
  padding: 10px
  gap: 10px
  background: var(--color-background-200)
  // outline: 1px solid var(--color-border)
  width: 300px
  img
    width: 40px
    height: 40px
    border-radius: 4px
  &_info
    overflow: hidden
    display: flex
    flex-direction: column
    gap: 4px
    justify-content: center
  &_email
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    font-size: 14px
    color: var(--color-text-200)
  &_id
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    font-size: 10px
    color: var(--color-text-300)
</style>
