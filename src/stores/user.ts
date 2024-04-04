import axios from 'axios'
import { defineStore } from 'pinia'
import { useCommonStore, type APIError } from './common'

export interface Organization {
  id: string
  name: string
  role: string
  is_default: boolean
}
export interface User {
  id: string
  email: string
  profile_picture: string
  organizations: Organization[]
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      user: null as null | User,
      api_key: null as string | null
    }
  },
  actions: {
    getUser() {
      const commonStore = useCommonStore()
      return new Promise((resolve: (user: User) => void, reject: (err: APIError) => void) => {
        axios
          .get<User>('https://api.stability.ai/v1/user/account', {
            headers: {
              Authorization: `Bearer ${this.api_key}`
            }
          })
          .then((res) => {
            this.user = res.data
            resolve(this.user)
          })
          .catch((err) => {
            const error = err.response
              ? (err.response.data as APIError)
              : { id: 'Unknown', name: 'Furious error', message: 'Something went wrong...' }
            commonStore.setError(error)
            reject(error)
            return error
          })
      })
    }
  }
})
