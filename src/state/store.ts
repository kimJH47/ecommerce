import { defineStore } from 'pinia'

export const useStatusStore = defineStore('status', {
  state: () => ({
    isSuccess: false
  }),
  actions: {
    setSuccess(status: boolean) {
      this.isSuccess = status
    }
  }
})
