import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api'
import 'amfe-flexible' // rem移动适配
import './plugins/vant.js'

import '@/utils/dayjs'

// 按钮用于触发一个操作，如提交表单

// 加载全局样式//less样式好像不能用缩写
import '@/styles/index.less'

// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
Vue.prototype._ = _

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
