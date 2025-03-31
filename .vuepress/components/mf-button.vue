<template>
  <button class='mf-button'
    @click='handelClick'
    :disabled='disabled || loading'
    :autofocus='autofocus'
    :type="nativeType"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'MfButton',
  props: {
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    loading: { // 加载中
      type: Boolean,
      default: false
    },
    autofocus: { // 是否自动获取焦点
      type: Boolean,
      default: false
    },
    nativeType: { // 原生type， submit/reset/button
      type: String,
      default: 'button'
    },
    
  },
  data () {
    return {}
  },
  methods: {
    handelClick (e) {
      this.$emit('click', e)
    }
  }

}
</script>

<style scoped lang='stylus'>
button{
  /* 清除默认边框 */
  border:0;
  outline:none;
  /*清除默认背景 */
  background-color: transparent;
}
.mf-button {
  padding: 5px 10px;
  border-radius: 5px;
  background: #cff;
  color: #fff;
	background-color: #6496c8;
  box-shadow: 0 5px #27496d;
}

</style>