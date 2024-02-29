import { defineStore } from 'pinia'
import type { UserStore } from '~/types/auth'

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => ({
    user: null,
    userDetail: null,
  }),
  getters: {
    isLoggedIn(): boolean {
      return !!useCookie('mt_token').value
    },
  },
})
