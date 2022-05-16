<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单显示  -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展示的标题  -->
          <!-- 因为:index的值是strig类型的,我们item.id的值为number类型,所以转换为string类型 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon.slice(8)"></component>
              </el-icon>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item  -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <template #title>
                  <el-icon v-if="subitem.icon">
                    <component :is="subitem.icon.slice(8)"></component>
                  </el-icon>
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单显示  -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon.slice(8)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { Monitor, Setting, Goods, ChatLineRound } from '@element-plus/icons'

import { pathMapToMenu } from '@/utils/map-menus'

import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

// import { useStore } from 'vuex' useStores的类型为any
//所以我们取不到我们login模块中的usermenus属性,所以vuex和ts的兼容性很差
//我们可以使用pinia这个库，这个库的用法和vuex很类似，但他对ts的兼容比vuex要好很多

export default defineComponent({
  components: {
    Monitor,
    Setting,
    Goods,
    ChatLineRound
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    //route可以拿到当前路由对象
    const router = useRouter()
    //拿到当前路径
    const route = useRoute()
    const currentPath = route.path
    //接收匹配到的menu对象。userMenus上面返回的ref对象，所以需要使用.value获取值
    const menu = pathMapToMenu(userMenus.value, currentPath)
    console.log(menu)

    const defaultValue = ref(menu.id + '')

    //menu的类型为什么是any呢没有一个具体类型呢，这是因为我产在请求到这个数据时就没有写对应的一个类型,当时写的就是any
    //所以现在就为any,如果我们当时在请求到菜单数据时，写了明确的数据类型，那么现在menu的类型就可以为我们自己写的那个类型了
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  // width: 100%;

  // logo 布局
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>
