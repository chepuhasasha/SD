import type { App } from 'vue'

import IconVue from './Icon.vue'
import LoaderVue from './Loader.vue'
import UtilizationVue from './Utilization.vue'
import InputVue from './Input.vue'
import ButtonVue from './Button.vue'
import ModalVue from './Modal.vue'
import EmptyVue from './Empty.vue'
import SelectVue from './Select.vue'
import TextareaVue from './Textarea.vue'

export default {
  install(vue: App) {
    vue.component('w_icon', IconVue)
    vue.component('w_loader', LoaderVue)
    vue.component('w_util', UtilizationVue)
    vue.component('w_input', InputVue)
    vue.component('w_button', ButtonVue)
    vue.component('w_modal', ModalVue)
    vue.component('w_empty', EmptyVue)
    vue.component('w_select', SelectVue)
    vue.component('w_textarea', TextareaVue)
  }
}
