import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import TDesign from 'tdesign-vue-next'
import 'virtual:svg-icons-register'
import { loadingFadeOut } from 'virtual:app-loading'
// 关闭首屏动画
loadingFadeOut()
createApp(App).use(router).use(store).use(TDesign).mount('#app')
