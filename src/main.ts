import { createApp } from 'vue'
// import VueLesson from './vue-lesson.vue'
// import VueLesson2 from './vue-lesson-2.vue
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(router).use(pinia).mount('#app')
