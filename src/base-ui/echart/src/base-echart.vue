<template>
  <div class="base-echart">
    <div ref="echartsDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'

import { EChartsOption } from 'echarts'

import useEchart from '../hooks/UseEchart'

//默认的写法，如果要给属性加类型可以使用下面更为简便的方法
// defineProps({
//   width: {
//     type: String,
//     default: '300px'
//   }
// })

const props = withDefaults(
  defineProps<{
    option: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartsDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartsDivRef.value!)
  //因为当我们传递过来的数据发生了改变，图形也需要根据最新的数据重新渲染
  watchEffect(() => {
    setOptions(props.option)
  })
})
</script>

<style scoped></style>
