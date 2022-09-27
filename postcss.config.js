module.exports = {
  // 配置使用PostCSS插件
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue: ({ file }) => file.includes('vant') ? 37.5 : 75, // 此处需要return 但是箭头函数只写一条语句可以省略{}和return
      //  file.indexOf('vant') !== -1 ? 37.5 : 75
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
