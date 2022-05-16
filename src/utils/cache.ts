class LocalCach {
  //存储
  //我们也可以给setCache方法传入第三个参数(布尔值)来控制以哪种方法存储数据
  //具体代码逻辑再在方法中实现
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  //获取
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  //删除
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  //全部清空
  clearCathe() {
    window.localStorage.clear()
  }
}

export default new LocalCach()
