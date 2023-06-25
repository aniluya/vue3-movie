import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import App from './App.vue'
import router from './router/index'
import 'element-plus/es/components/message/style/css'
import './assets/iconfont/iconfont.css'

const app=createApp(App)
const pinia = createPinia()

// 注册pinia
app.use(pinia)

// 注册路由
app.use(router)

app.use(vue3videoPlay)

app.mount('#app')