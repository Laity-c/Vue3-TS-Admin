<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- v-model:page是我们自定义传递过去名称 -->
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >{{ contentTableConfig.newBtnTitle ?? '新建数据' }}</el-button
        >
      </template>

      <!-- 2.列中的插槽 -->
      <!-- #status="scope"后面scope可以获取到内部插槽传递过来的数据 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            v-if="isUpdate"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><edit /></el-icon>编辑
          </el-button>
          <el-button
            v-if="isDelete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><delete /></el-icon>删除
          </el-button>
        </div>
      </template>

      <!-- 在page-content中动态插入剩于的插槽 -->
      <!-- 如果有些公共的插槽需要写在上面，就在下面return false -->
      <!-- 做了这些操作我们写在单个页面的插槽就能正常获取到数据渲染了-->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { Edit, Delete } from '@element-plus/icons'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

import HyTable from '@/base-ui/table'

export default defineComponent({
  components: {
    HyTable,
    Edit,
    Delete
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    //获取权限的操作
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    //双向绑定pageInfo
    //当table中绑定的值发生了改变，下面属性里的数据也会发生改变
    const pageInfo = ref({ pageSize: 10, currentPage: 1 })
    console.log(pageInfo.value)

    //当上面数据改变后，下面就会被监听到
    watch(pageInfo, () => getPageData())
    //发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListActions', {
        pageName: props.pageName,
        queryInfo: {
          // 请求数据偏移,当前页数据乘以获取多少条数据就是我们要偏移的数量
          // 10(条) * 1(页) = 10 到第二页了就从第10条开始请求 10 * 2 = 20
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          // 默认从0开始pageInfo.value.pageSize 点击右箭头就变成1了
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
        //我们可以把搜索框中传递过来的数据合并到发送网络请求中的参数中去
      })
    }

    getPageData()
    //从vuex获取数据
    const dataList = computed(() =>
      //我们直接使用getters来获取数据，函数名为pageListDate因为函数内返回的是一个函数，参数为pageName值
      //所以我们需要获取使用pageListDate后在调用返回的函数，在传递pageName
      store.getters[`system/pageListDate`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    //获取其他的动态插槽名称
    //我们把公共的插槽名都排除出来
    //然后在把不是公共的插槽名都存放在otherPropsSlots属性里面
    const otherPropsSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    //删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropsSlots,
      getPageData,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
