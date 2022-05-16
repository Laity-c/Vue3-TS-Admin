<template>
  <span ref="counterRef"></span>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, watch, onMounted } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'
const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, // 保留两位
  duration: 2, // 动画时长
  separator: ',', // 千位分割
  decimal: '.', // 小数分割
  prefix: '￥' // 单位
}

const props = withDefaults(
  defineProps<{
    number: number
    option: CountUpOptions
  }>(),
  {
    number: 0,
    option: () => ({})
  }
)

const counterRef = ref<HTMLElement | null>(null)
const instance = ref<CountUp | null>(null)

//侦听传递过来的数据变化
watch(
  () => props.number,
  () => {
    update(props.number)
  }
)

onMounted(() => {
  createCounter()
})
const createCounter = () => {
  if (!counterRef.value) return
  //把子组件传递过来的配置，和我们的配置数据进行一个合并
  const opts: CountUpOptions = Object.assign(defaultOptions, props.option)
  //保存countUp对象
  instance.value = new CountUp(counterRef?.value, props.number, opts)
  start()
}
//开始动画
const start = () => {
  if (!instance.value) return
  instance?.value.start()
}

//更新最终值并制作动画
const update = (number: number) => {
  if (!instance.value) return
  instance?.value.update(number)
}
</script>

<style scoped lang="less"></style>
