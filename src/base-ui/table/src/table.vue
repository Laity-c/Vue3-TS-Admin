<template>
  <div class="table">
    <!-- table上面的标题和其他想要显示的数据 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="header-handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColum"
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColum"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- //下面template为一个默认的作用域插槽 -->
          <!-- 如果想要获取数据那么需要添加上scope -->
          <template #default="scope">
            <!-- 我们有些数据可能需要改变默认展示数据样子 -->
            <!-- 第一步：先在listData数据中的第一条数据里面写入slotName属性：值 -->
            <!-- 第二步：在定义slot具名插槽，name值为：propItem.slotName。同时插槽里面保留默认数据展示-->
            <!-- 第三步：对listData数据中传入了slotName属性的对象，现在就有一个具名插槽了，可以在使用我们组件时修改要展示的样式名字为slotName的值-->
            <!-- 第四步：在插槽上定义:row="scope.row"可以把数据传递到外面使用具名插槽的地方 -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 使用scope.row可以获取到表格中每一行的数据 -->
              <!-- scope.row是一个对象,[在这里面在传入要展示的名字]就可以把一行数据展示到表格中了 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- table下面显示的分页 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <!-- :currentPage="page.currentPage" -->
        <el-pagination
          v-model:currentPage="currentPage4"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '表格数据'
    },
    listData: {
      //因为传递过来的表格数据，不太确定类型
      //所以就没有像之前那样在Array类型后面加 as PropType<类型> 这种了
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColum: {
      type: Boolean,
      default: false
    },
    showSelectColum: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    //当我们点击了左右箭头，就会从第一页到和二页这样跳转，就会触发下面的函数
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
      console.log(props.listCount)
    }
    //当我们直接点击展示多少条一页数据时的按钮，就会触发下面的函数
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    const currentPage4 = ref(1)
    return {
      handSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      currentPage4
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
