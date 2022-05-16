<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labeWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.ladel">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.ladel"
              :style="itemLayout"
              :rules="item.rules"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <!-- <el-date-picker
                  :start-placeholder="item.otherOptions.startPlaceholder"
                  :end-placeholder="item.otherOptions.endPlaceholder"
                  :type="item.otherOptions.type"
                ></el-date-picker> -->
                <!-- 使用v-bind传入对象数据的效果和上面一个一个写的效果是一样的 -->
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../type'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    formItems: {
      //如果我们想让一个传递过来的类型为数组类型又为对象类型，就需要引入propType这个类型
      //想我们下面这样来写，并且默认值也需要这样来写
      //我们可以在propType泛型里面对用户传递的数据做一个控制
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labeWidth: {
      type: String,
      default: '100px'
    },
    itemLayout: {
      type: Object,
      default: () => ({ padding: '10px 20px' })
    },
    colLayout: {
      //根据视口宽度，把布局分为几等份
      type: Object,
      default: () => ({
        xl: 6,
        xg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formData = computed({
    //   get: () => props.modelValue,
    //   set: (newValue) => {
    //     // console.log('-----------')
    //     // emit('update:modelValue', newValue)
    //   }
    // })
    // const formData = ref({ ...props.modelValue })
    //因为我们上面formData里面的数据是做了一个浅拷贝，所以绑定的数据是有更改的，但是formDate这个对象是没有更改的
    //所以我们在pagesearch点击重置按钮只有自身的数据发生了改变，但form里面的formData这个对象本身没有发生变化
    //所以在下面watch中监听formData才没有被触发
    //解决办法：就是直接监听双向绑定传递过来的属性，然后在对form页面中绑定的formdata做一个修改
    // watch(
    //   () => props.modelValue,
    //   (newValue) => {
    //     formData.value = { ...newValue }
    //   }
    // )

    // watch(formData, (newValue) => emit('update:modelValue', newValue), {
    //   deep: true
    // })

    //第二种方法，不使用v-model来实现数据的双向绑定
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      // formData
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}

/deep/ .el-icon {
  // color: pink;
  display: flex;
  align-items: center;
}
</style>
