<template>
  <div class="department">
    <page-search
      :searchFromConfig="searchFromConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="department"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modeleConfigRef"
      :defaultInfo="defaultInfo"
      pageName="department"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFromConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    //pageSearch的hooks函数
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    //2.动态添加部门列表
    const store = useStore()
    const modeleConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'parentId'
      )
      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { title: item.name, value: item.id }
        }
      )
      return modalConfig
    })
    //pageModal的hooks函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      searchFromConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modeleConfigRef
    }
  }
})
</script>

<style scoped></style>
