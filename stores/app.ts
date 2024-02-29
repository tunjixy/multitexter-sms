import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    title: '',
  }),
  actions: {
    setPageTitle(title: string) {
      this.title = title
    },
  },
})
