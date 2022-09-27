export default {
  mutations: {
    // 此处需要一个字符串类型的唯一值,Symbol类型虽然是唯一的,但不适用这里
    // setUser: Symbol('setUser'),
    // setUser: 'root-setUser',
    setUser: 'setUser',
    hehe: Symbol('')
  },
  actions: {

  }
}
