<template>
  <div class="category">
    <page-search
      :searchFromConfig="searchFromConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="category"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      pageName="category"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFromConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'category',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    //pageSearch的hooks函数
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

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
      modalConfig
    }
  }
})
</script>

<style scoped></style>
