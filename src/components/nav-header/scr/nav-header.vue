<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="isFold ? 'fold' : 'expand'"></component>
    </el-icon>
    <div class="conter">
      <hy-bread-croumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import UserInfo from './cpns/user-info.vue'
import HyBreadCroumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: { Fold, Expand, UserInfo, HyBreadCroumb },
  setup(props, { emit }) {
    //控制导航菜单展开
    const isFold = ref(false)
    //点击后修改导航菜单的宽度
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //面包屑数据 => [{name: '',path: ''}]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const crrentPath = route.path
      return pathMapBreadcrumbs(userMenus, crrentPath)
    })
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .conter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
