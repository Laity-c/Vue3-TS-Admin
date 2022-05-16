<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
