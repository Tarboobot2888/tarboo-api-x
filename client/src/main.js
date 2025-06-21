import { createApp } from 'vue'
import App from './app.js'
import { initAnalytics } from './utils/analytics'
import { initAnimations } from './utils/animations'

const app = createApp(App)
app.mount('#app')

initAnalytics()
initAnimations()
