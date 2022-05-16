<template>
  <div class="role">
    <page-search
      :searchFromConfig="searchFromConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <div class="tree-menu">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { mapMenuLeafKeys } from '@/utils/map-menus'

import { ElTree } from 'element-plus'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFromConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    // pageSearch处理hook
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    //1.处理pageModal的hook
    const editCallback = (item: any) => {
      const leafKeys = mapMenuLeafKeys(item.menuList)
      //为什么要使用nextTick呢，是因为当我们直接点编辑时数据还没有完成绑定
      //因为我们数据也是点击编辑时才拿到的，所以不会那么快绑定上去，所以需要使用nextTick下一次执行
      //这个时间数据就已经有了，也能绑定成功
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    // pageModal的hook
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    //为了让我们数据是动态的，我们使用computed给数据做一个包裹
    const menus = computed(() => store.state.entirMenu)

    //保存选中权限数据的属性
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFromConfig,
      modalConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.tree-menu {
  margin-left: 25px;
}
</style>
