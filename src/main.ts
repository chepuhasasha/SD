import './assets/main.sass'

import { createApp, type App } from 'vue'
import { createPinia } from 'pinia'
import Root from './Root.vue'

import Widgets from './widgets'
import Components from './components'
import Views from './views'
import { useUserStore } from './stores'

declare global {
  interface Window {
    SD: {
      mount: (selector: string, api_key?: string) => void
    }
  }
}

const mount = (selector: string, api_key?: string) => {
  const app = createApp(Root)
  app.use(createPinia())

  if (api_key) {
    const userStore = useUserStore()
    userStore.api_key = api_key
    userStore.getUser()
  }
  app.use(Widgets)
  app.use(Components)
  app.use(Views)
  app.mount(selector)
}

window.SD = { mount }
