<template>
  <div class="not-found">
    <el-empty description="404 Not Found">
      <el-button type="primary" @click="returnBtnClick">返回上一级</el-button>
    </el-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'

export default defineComponent({
  setup() {
    const returnBtnClick = () => {
      router.push('./main')
    }
    return {
      returnBtnClick
    }
  }
})
</script>

<style scoped></style>
