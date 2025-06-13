import { defineStore } from 'pinia'
import type { UserProfile } from '../types/user'



export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    userProfile: null as UserProfile | null,
  }),
  actions: {
    login(profile: UserProfile) {
      this.isAuthenticated = true
      this.userProfile = profile
    },
    logout() {
      this.isAuthenticated = false
      this.userProfile = null
    },
  },
  persist: {
    key: 'vue-app-user',
    storage: localStorage,
  },
})
