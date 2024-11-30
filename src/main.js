import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mouseClick from './assets/js/mouseClick'
import mouseMove from './assets/js/mouseMove'

createApp(App).use(store).use(router).mount('#app')
