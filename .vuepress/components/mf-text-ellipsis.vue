<!-- 动态显示多行文本 -->
<template>
  <div class='mf-text-ellipsis'>
    <input v-model="isShow" type="checkbox" :id="name">
    <span ref='text' class='text' :style='{"max-height": isShow ? "none" : (1.5 * rowNum) + "em" }'>
      <label v-show='showBtn' class="show-all" :for="name">
        <span v-show='!isShow' class='show-all-before'>...</span>
        <span>{{isShow ? collapseText : expandText}}</span>
      </label>
      <span>{{content}}</span>
    </span>
  </div>
</template>
<script>
export default {
  name: 'MftextEllipsis',
  props: {
    rowNum: { // 展示行数
      type: Number,
      default: 3
    },
    name: { // 唯一值
      require: true,
      default: 'textShow'
    },
    content: { // 文本
      type: [String, Number],
      defalut: ''
    },
    expandText: {
      type: String,
      default: '展开'
    },
    collapseText: {
      type: String,
      default: '收起'
    }
  },
  data () {
    return {
      isShow: false,
      showBtn: false
    }
  },
  watch: {
    textContent: {
      handler () {
        this.$nextTick(() => {
          const el = this.$refs.text
          if (!el) return
          if (el.scrollHeight > el.clientHeight) {
            this.showBtn = true
          } 
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
input {
  position:absolute;
  visibility: hidden;
}
.mf-text-ellipsis {
  display: flex;
  overflow: hidden;
  .text {
    text-indent: 2em;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    max-height: 4.5em;
    position: relative;
    word-break:break-all;
    word-wrap:break-word;
  }
  .text::before{
    content: '';
    float: right;
    height: 100%;
    margin-bottom: -1.49em;
  }
  .show-all {
    position: relative;
    float: right;
    clear: both;
    color: #006699;
    text-indent: 0;
    padding-left: 1em;
    cursor: pointer;
  }
  .show-all-before{
    position: absolute;
    left: -0.2em;
    color: #333;
  }
}
</style>
