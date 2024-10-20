<template>
  <div class="yj-form">
    <slot name="header"></slot>
    <el-form
      :model="value"
      :label-width="labelWidth"
      ref="yjRuleForm"
      :disabled="disabled"
      :label-position="labelPosition"
      @submit.native.prevent
    >
      <el-row :gutter="gutter">
        <template v-for="item in formItems">
          <el-col v-bind="{ ...colLayout, ...item.colLayout }" :key="item.label">
            <YJFormItemPhone
              v-if="item.type === 'phone'"
              v-bind="item"
              v-model="value[item.field]"
              v-model:phoneCountry="value['phoneCountry']"
              :disabled="item.disabled"
              :style="item.style || itemStyle"
            ></YJFormItemPhone>
            <el-form-item
              v-else-if="item.hidden != true"
              :label="item.label"
              :style="item.style || itemStyle"
              :prop="item.prop"
              :label-width="item.labelWidth"
              :rules="item.rules"
              :ref="item.refName"
              :class="{ 'is-required': item.required }"
            >
              <slot v-if="item.slotName" :name="item.slotName" v-bind="item"></slot>
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :disabled="item.disabled || item?.otherOptions?.disabled"
                :placeholder="`abc(`item.placeholder`)`"
                :show-password="item.type === 'password'"
                :value="value[`${item.field}`]"
                v-bind="item?.otherOptions"
                @input="changeValue($event, item.field)"
              ></el-input>
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :disabled="item.disabled || item?.otherOptions?.disabled"
                :placeholder="`abc(`item.placeholder`)`"
                :show-password="item.type === 'password'"
                :value="value[`${item.field}`]"
                v-bind="item?.otherOptions"
                @input="changeValue($event, item.field)"
              ></el-input>
              <baseSendCode
                v-else-if="item.type === 'send'"
                :disabled="item.disabled || item?.otherOptions?.disabled"
                :placeholder="item.placeholder"
                :sendReqFn="item.sendReqFn"
                :value="value[`${item.field}`]"
                v-bind="item.otherOptions"
                @input="changeValue($event, item.field)"
              ></baseSendCode>
              <el-select
                v-else-if="item.type === 'select'"
                :disabled="item?.disabled"
                :placeholder="item.placeholder"
                style="width: 100%"
                :value="value[`${item.field}`]"
                @input="changeValue($event, item.field)"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
              <el-select
                v-else-if="item.type === 'selectTree'"
                :placeholder="item.placeholder"
                style="width: 100%"
                :disabled="!!value.selectTreeDisabled"
                :clearable="item.clearable"
                :value="value[`${item.field}`]"
                @input="changeValue($event, item.field)"
                @clear="selectTreeClearHandle(item)"
                ref="selectblur"
              >
                <el-option style="height: 100%; background: #fff" value="code">
                  <el-tree
                    :data="item.otherOptions.data"
                    accordion
                    node-key="code"
                    ref="updatetree"
                    highlight-current
                    :props="item.otherOptions.defaultProps"
                    :expand-on-click-node="false"
                    @node-click="
                      (data) => {
                        nodeChange(data, value, item);
                      }
                    "
                  ></el-tree>
                </el-option>
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'datepicker'"
                :disabled="item.disabled"
                v-bind="item.otherOptions"
                :placeholder="item.placeholder"
                style="width: 100%"
                :value="value[`${item.field}`]"
                :value-format="item.valueFormat || 'timestamp'"
                @input="changeValue($event, item.field)"
              ></el-date-picker>
              <el-cascader
                v-else-if="item.type === 'cascader'"
                :disabled="item.disabled"
                v-bind="item.otherOptions"
                :placeholder="item.placeholder"
                :value="value[`${item.field}`]"
                style="width: 100%"
                @input="changeValue($event, item.field)"
              ></el-cascader>
              <el-autocomplete
                ref="el-autocomplete"
                v-else-if="item.type === 'autocomplete'"
                :disabled="item?.disabled"
                style="width: 100%"
                :value="value[`${item.field}`]"
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                v-on="item.listeners"
                @input="changeValue($event, item.field)"
              ></el-autocomplete>
              <el-select
                v-else-if="item.type === 'filterable'"
                v-model="value[`${item.field}`]"
                v-bind="item.otherOptions"
                :disabled="item.disabled"
                filterable
                remote
                reserve-keyword
                :placeholder="item.placeholder"
                :remote-method="remoteMethod"
                :loading="loading"
                @change="
                  (event) => {
                    selectChange(event, item.field);
                  }
                "
              >
                <el-option
                  v-for="(item, index) in options"
                  :key="item.value + '-' + index"
                  :label="item.value"
                  :value="item"
                ></el-option>
              </el-select>
              <el-radio-group v-if="item.type == 'radio'" v-model="value[`${item.field}`]">
                <el-radio v-for="radio in item.radioList" :key="radio.label" :label="radio.label">
                  {{ radio.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 占位用的 -->
            <el-form-item
              v-else-if="item?.colLayout?.placeholder == true"
              label="占位"
              :style="{ visibility: 'hidden' }"
            ></el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  import baseSendCode from '@/base-ui/baseSendCode/index.js';
  import YJFormItemPhone from '@/components/YJFormItems/YJFormItemPhone';
  export default {
    name: 'yj-form',
    props: {
      labelPosition: {
        type: String,
        default: 'right',
      },
      gutter: {
        type: Number,
        default: 20,
      },
      // is-required
      doSearchTeacher: {
        type: Function, // 下拉框中远程搜索 “搜索老师” 用的方法
      },
      value: {
        type: Object, // 表单数据对象
        required: true,
      },
      formItems: {
        // 每一项 formItem
        type: Array,
        // 非基本数据类型的默认值，必须用箭头函数（数组、对象）
        default: () => [],
      },
      labelWidth: {
        //表单 label 的宽度
        type: String,
        default: '100px',
      },
      // 修改el-form-item
      itemStyle: {
        type: Object,
        default: () => ({ padding: '10px 20px' }),
      },
      // 修改col的span尺寸，不传为默认值
      colLayout: {
        // 可以传入el-col 的所有属性
        type: Object,
        default: () => ({
          // xl: 6, // >1920
          // lg: 8,
          // md: 12,
          sm: 24,
          xs: 24,
        }),
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        loading: true,
        options: [],
      };
    },
    methods: {
      buttonClick() {},
      //  formItems 中的 type 为 input、password、select、selectTree、datepicker、cascader、autocomplete的item的value发生改变的时候触发
      changeValue(value, field) {
        // console.log( 'input',this.value,value, field )
        // console.log(value, field);
        this.$emit('input', { ...this.value, [field]: value });
      },
      //  远程搜索
      async remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          const res = await this.doSearchTeacher(query);
          this.loading = false;
          this.options = res;
          //  options的数据是 doSearchTeacher 处理后的数据,比原始数据少很多.需要其他数据,需要在doSearchTeacher添加进来.
        } else {
          this.options = [];
        }
      },
      // formItems 中的 type 为 filterable 时，item的value发生改变会触发
      selectChange(event, field) {
        this.$emit('selectValue', {
          value: event,
          field,
        });
      },
      //  selectTree 的 el-tree 节点被点击
      nodeChange(data, value, item) {
        value[`${item.field}`] = data.name;
        this.$refs.selectblur[0].blur();
        // 主要作用：因为我选择options中的某一项，只能用name去显示，但是在提交服务器的时候需要用id，但是此只能绑定一个属性
        // 所以先传递到page-model中暂时存到otherInfo中。
        this.$emit('selectTreeNodeChange', { [item.field]: data.code });
      },
      // 当type=selectTree模式下时，点击清空按钮时的回调
      selectTreeClearHandle(item) {
        // 也需要调用一下选择option中树的改变
        this.$emit('selectTreeNodeChange', { [item.field]: '' });
      },
    },
    components: {
      baseSendCode,
      YJFormItemPhone,
    },
  };
</script>

<style lang="scss" scoped>
  .yj-form {
    padding: 20px 20px 0 0;
  }
</style>
