import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import types from '@/store/types'

Vue.use(Vuex)

// 使用常量来存储本地存储的token数据属性名，写错了会有报错提示
const TOKEN_KEY = 'userToken'

export default new Vuex.Store({
  state: {
    // 将token存储在vuex容器中，方便vue监听数据变化
    // 再将数据存到本地存储，实现数据持久化
    // user: JSON.parse(localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY),
    AriticlesListParams: {
      channel_id: 0,
      timestamp: +new Date()
    }
  },
  getters: {
  },
  mutations: {
    [types.mutations.setUser] (state, data) {
      console.log('hehe')
      state.user = data
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
