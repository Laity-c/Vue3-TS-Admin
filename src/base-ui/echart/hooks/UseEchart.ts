import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'
//注册地图
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  //给外界暴露一个窗口改变后，图形响应式效果的函数
  const updatesize = () => {
    echartInstance.resize()
  }
  //监听窗口大小的改变，调用echart方法实现图形响应式效果
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions,
    updatesize
  }
}
