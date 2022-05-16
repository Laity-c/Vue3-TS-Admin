<template>
  <div class="page-search">
    <hy-form v-bind="searchFromConfig" v-model="formDate">
      <template #header>
        <h2 class="title">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-buts">
          <el-button @click="handleResetClick">
            <el-icon class="el-icon--right"><refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon class="el-icon--right"><search /></el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
import { Refresh, Search } from '@element-plus/icons'

export default defineComponent({
  components: {
    HyForm,
    Refresh,
    Search
  },
  props: {
    searchFromConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    //在我们写组件双向绑定时，数据最好使用ref不要使用reactive,使用reactive可能会发生一些问题
    //双向绑定的属性应该是由配置文件上的field属性来决定的
    //优化后的好处！！！！
    /* 因为我们在配置文件中配置了多少个选项，那么就有多少个field属性，
      那么我们就可以把这些field属性的值取出来做为父组件和子组件中做双向绑定的属性名 */
    //没优化前的坏处????
    /* 如果直接是我们下面这种写死的方法，那么我们在其他页面中使用的时候，有些页面又不需要绑定某些属性，但由于
     我们的属性都是固定的，所以会导致全绑定上 */
    //优化一：formData里面的属性应该动态来决定
    //取出配置对象
    const formItems = props.searchFromConfig?.formItems ?? []

    const formOriginData: any = {}

    // 把配置对象中的field属性值取出做为我们formOriginData每个属性的key，赋值为''
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    //最后在把所有有field属性的对象加到到我们要双向绑定的属性中
    const formDate = ref(formOriginData)

    //优化二：用户点击了重置
    const handleResetClick = () => {
      //我们这里直接是修改的formDate的值，是无法影响我们form页面中formDate中const formData = ref({ ...props.modelValue })的值
      formDate.value = formOriginData
      //所以我们直接修改formDate是没有用的，需要像下面一样，修改formDate中每个属性的值
      //所以就能影响到form页面中浅拷贝中的值了
      // for (const key in formOriginData) {
      //   formDate.value[`${key}`] = formOriginData[key]
      // }

      emit('resetBtnClick') //重置是不需要传递参数的
    }

    //优化三：当用户点击了搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formDate.value) //搜索是需要把搜索框中所有数据都传递过去
    }
    return {
      formDate,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.title {
  color: red;
}

.handle-buts {
  text-align: right;
  padding: 0 20px 20px 0;
  i {
    display: inline;
  }
}
</style>
