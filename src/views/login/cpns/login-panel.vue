<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><user-filled class="icon" /></el-icon> 账号登陆
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><iphone class="icon" /></el-icon> 手机登陆
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox size="mini" v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="logi-btn" @click="handLeLoginClick"
      >立即登陆</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

import { UserFilled, Iphone } from '@element-plus/icons'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
    UserFilled,
    Iphone
  },
  setup() {
    //1.声明属性
    //用来保存保存点击保存密码的boolen值
    const isKeepPassword = ref(true)
    //在组件上绑定ref属性来获取组件实例
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    //保存tab组件上v-model的值，来确定当前使用哪个tab选项
    const currentTab = ref('account')

    //2.声明方法
    const handLeLoginClick = () => {
      // console.log('正在登陆中...')
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('调用phone组件中的处理逻辑')
      }
    }
    return {
      isKeepPassword,
      accountRef,
      currentTab,
      phoneRef,
      handLeLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .account-control {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;

    label {
      margin-top: 10px;
      height: 0;
    }
  }

  .icon {
    vertical-align: middle;
  }

  .logi-btn {
    width: 100%;
  }
}
</style>
