/* eslint-disable */
//这个声明我们.vue文件的一个模块
//DefineComponent这个是用来控制我们vue文件中{}中能写哪些属性的
//这样能使我们组件中的代码变得更加严谨
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any
declare module '*.json'
