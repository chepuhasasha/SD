import type { App } from 'vue'

import UserVue from './User.vue'
import EditorVue from './Editor.vue'

export default {
  install(vue: App) {
    vue.component('c_user', UserVue)
    vue.component('c_editor', EditorVue)
  }
}
