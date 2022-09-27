const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '127.0.0.1',
    port: 3005,
    open: true // 浏览器自动打开
  },
  lintOnSave: true, // 关闭eslint的检查(暂时关闭，以后再来开启)
  publicPath: './'
})
