import type { App } from 'vue'

import AuthVue from './Auth.vue'
import ErrorVue from './Error.vue'
import GenerateVue from './generate/View.vue'

export default {
  install(vue: App) {
    vue.component('v_auth', AuthVue)
    vue.component('v_error', ErrorVue)
    vue.component('v_generate', GenerateVue)
  }
}
