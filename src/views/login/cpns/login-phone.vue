<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verification">
        <div class="get-code">
          <el-input v-model="phone.verification"></el-input>
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      verification: ''
    })

    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;

  .get-btn {
    margin-left: 10px;
  }
}
</style>
