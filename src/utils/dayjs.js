import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime.js'

dayjs.locale('zh-cn')
// console.log(dayjs().format('YYYY-MM-DD'))
dayjs.extend(relativeTime)

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用
// 其实过滤器就相当于一个全局使用的方法(仅供模板使用)
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方法：{{ 表达式 | 过滤器名称 }}
Vue.filter('relativeTime', value => dayjs().to(dayjs(value)))

// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()
