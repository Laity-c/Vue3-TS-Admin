<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const store = useStore()

    //为什么这里使用reactive不使用ref呢？
    //因为像这种关第联系比较紧密的属性，都推荐使用reactive
    const account = reactive({
      //如果从localStorage中获取不到值，那么就传入''
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    //绑定elform组件实例
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      //通过调用elform上validate方法来确定我们输入的信息是否都是正确的
      //validate中的形参valid会返回true和false，为true就代表输入的账号和密码都难过了验证
      formRef.value?.validate((valid) => {
        if (valid) {
          //1.判断是否需要记住密码
          if (isKeepPassword) {
            //本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            //不需要记住密码，那么就清除本地缓在
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          //2.开始进行验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
