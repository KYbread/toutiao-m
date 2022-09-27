/*
 封装本地存储操作模块
*/

/*
 存储数据
*/
export const setItem = (key, value) => {
  // console.log(typeof value === 'object')
  // console.log(value)
  // if (typeof value === 'object') {
  //   localStorage.setItem(key, JSON.stringify(value))
  // } else {
  //   localStorage.setItem(key, value)
  // }
  localStorage.setItem(key, JSON.stringify(value))
}

/*
 获取数据
*/
export const getItem = key => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
    // 这里如果报错了，try内部下方的代码不执行了
  } catch (err) {
    return data
  }
}

/*
 删除数据
*/
// 没有意义
// export const removeItem = key => {
//   localStorage.removeItem(key)
// }
