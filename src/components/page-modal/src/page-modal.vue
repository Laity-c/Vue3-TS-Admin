<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      :title="modalConfig.title ? modalConfig.title : '新建用户'"
      width="30%"
      center
      destroy-on-close
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HyForm
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    //监听defaultInfo的变化为编辑中的表单做一个回显
    watch(
      () => props.defaultInfo,
      //newValue的值为点击编辑中每一行的值
      (newValue) => {
        //因为我们要保存表单中回显的属性和值
        //所以我们直接从我们的配置文件中的formItems中遍历field属性，值需要从每一行的数据中取
        //因为每一行的数据中没有密码的值，所以回显中密码是不会有显示值的
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    //点击确定后的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      //点击确定后隐藏
      dialogVisible.value = false
      //使用defaultInfo属性的长度来判断我们当前点击的是新建的确定还是编辑的确定按钮
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        //新建
        console.log('新建用户')
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
