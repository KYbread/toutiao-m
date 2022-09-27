import Vue from 'vue'
import VueRouter from 'vue-router'
// 静态导入
// import Login from '../views/login/index.vue'

Vue.use(VueRouter)

// 路由表
// VueRouter 内部在解析路由配置时，有一个规则，如果component是个函数，
// 只有当访问这个路由路径的时候，再去执行这个函数
const routes = [
  {
    path: '/',
    redirect: '/layout/MyPage'
  },
  {
    path: '/login',
    name: 'login',
    // import() 时动态导入语法，可以放到任何位置执行，执行时，才去加载这个模块
    // 写成函数：动态导入，只有访问对应路径时才会加载对应组件
    //  在'@/views/login'前面加上 /*一段代码，去看VueRouter文档，写成同一个名字最后会被打包到同一个js文件里*/
    component: () => import('@/views/login')
    // component:()=>{
    //  return import('../views/login/index.vue')
    // }
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'HomePage',
        name: 'HomePage',
        component: () => import('@/views/layout/HomePage')
      },
      {
        path: 'VideoPage',
        name: 'VideoPage',
        component: () => import('@/views/layout/VideoPage')
      },
      {
        path: 'QaPage',
        name: 'QaPage',
        component: () => import('@/views/layout/QaPage')
      },
      {
        path: 'MyPage',
        name: 'MyPage',
        component: () => import('@/views/layout/MyPage')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 将路由动态参数映射到组件的 props 中，更推荐这种做法
  }, {
    path: '/user/profile',
    name: 'UserProfile',
    component: () => import('@/views/user/userProfile')
  }
]

const router = new VueRouter({
  routes
})

export default router
