import { defineStore } from 'pinia'
import type { UserProfile } from '@/types/user'

// LocalStorage キー定数
const USER_STORAGE_KEY = 'vue-app-user-data'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    userProfile: null as UserProfile | null,
  }),
  actions: {
    login(profile: UserProfile) {
      this.isAuthenticated = true
      this.userProfile = profile
      // 手動でlocalStorageに保存する場合（pluginを使わない場合）
      // this.saveToStorage()
    },
    logout() {
      this.isAuthenticated = false
      this.userProfile = null
      // 手動でlocalStorageから削除する場合（pluginを使わない場合）
      // this.clearStorage()
    },
    // 手動localStorage管理のメソッド例（pluginを使わない場合）
    // saveToStorage() {
    //   const data = {
    //     isAuthenticated: this.isAuthenticated,
    //     userProfile: this.userProfile
    //   }
    //   localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data))
    // },
    // loadFromStorage() {
    //   try {
    //     const stored = localStorage.getItem(USER_STORAGE_KEY)
    //     if (stored) {
    //       const data = JSON.parse(stored)
    //       this.isAuthenticated = data.isAuthenticated
    //       this.userProfile = data.userProfile
    //     }
    //   } catch (error) {
    //     console.error('Failed to load user data from storage:', error)
    //     this.clearStorage()
    //   }
    // },
    // clearStorage() {
    //   localStorage.removeItem(USER_STORAGE_KEY)
    // }
  },
  persist: {
    // ストレージキーを指定
    key: 'vue-app-user',
    // セキュリティレベルに応じて選択：
    // localStorage: ブラウザを閉じても永続化（利便性重視）
    // sessionStorage: ブラウザを閉じると削除（セキュリティ重視）
    storage: localStorage,
    // 永続化したくない機密データがある場合は include/exclude オプションを使用
    // paths: ['isAuthenticated', 'userProfile'] // 特定のパスのみ永続化したい場合
  },
})
