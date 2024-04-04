import type { App } from 'vue'

import AuthVue from './Auth.vue'
import ErrorVue from './Error.vue'
import SettingsVue from './Settings.vue'
import WorkspaceVue from './generate/View.vue'

export default {
  install(vue: App) {
    vue.component('v_auth', AuthVue)
    vue.component('v_generate', WorkspaceVue)
    vue.component('v_error', ErrorVue)
    vue.component('v_settings', SettingsVue)
  }
}
