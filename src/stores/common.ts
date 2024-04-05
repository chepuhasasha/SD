import axios from 'axios'
import { defineStore } from 'pinia'

export interface APIError {
  id: string
  name: string
  message: string
}

export const useCommonStore = defineStore('common', {
  state() {
    return {
      error: null as null | APIError,
      image: null as string | null
    }
  },
  actions: {
    setError(error: APIError | null) {
      this.error = error
    },
    setImage(img: string | null) {
      this.image = img
    }
  }
})
