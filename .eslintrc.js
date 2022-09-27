module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    // 关闭组件单个单词名称校验
    // 'vue/multi-word-component-names': 'off'
    // 关闭驼峰命名校验
    // 'vue/custom-event-name-casing': 'off'
    // 关闭修改props校验
    'vue/no-mutating-props': 'off'
  }
}
