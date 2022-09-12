import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // rem移动适配

// 按钮用于触发一个操作，如提交表单
import { Button } from 'vant'

// 加载全局样式//less样式好像不能用缩写
import '@/styles/index.less'
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
