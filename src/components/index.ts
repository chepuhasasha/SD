import type { App } from 'vue'

import UserVue from './User.vue'

export default {
  install(vue: App) {
    vue.component('c_user', UserVue)
  }
}
