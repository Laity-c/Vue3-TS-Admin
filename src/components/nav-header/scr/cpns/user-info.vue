<template>
  <div cclass="user-info">
    <el-dropdown>
      <div class="icon">
        <div class="icon-item">
          <el-icon :size="20"><chat-dot-round /></el-icon>
          <el-icon :size="20"><management /></el-icon>
          <el-icon :size="20"><bell /></el-icon>
        </div>
        <span class="el-dropdown-link"
          ><span>{{ name }}</span>
          <el-avatar size="small" class="el-dropdown-img">
            <el-icon :size="20">
              <user-filled />
            </el-icon>
          </el-avatar>
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
          <el-dropdown-item @click="handleExitClick">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { UserFilled, Bell, ChatDotRound, Management } from '@element-plus/icons'

import LocalCach from '@/utils/cache'

export default defineComponent({
  components: {
    UserFilled,
    Bell,
    ChatDotRound,
    Management
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.name)

    const handleExitClick = () => {
      LocalCach.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.icon {
  display: flex;
  align-items: center;
  .icon-item {
    display: flex;
    width: 80px;
    margin-right: 10px;
    justify-content: space-between;
    // padding: 0 20px ;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
    .el-dropdown-img {
      margin: 0 10px;
    }
  }
}
</style>
