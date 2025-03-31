<template>
  <div v-if='value'  class='mf-modal-box'>
    <div ref='mfModalMask' class='mf-modal-mask' :style='hideMaskStyle' @touchmove.prevent>
      <div class='mf-modal-card' ref='mfModalCard' :style='{"top": positionValue }' >
        <div class='mf-modal-card-top' :class='{"useDrag": useDrag}' ref='mfModalCardTop'></div>
        <div class='mf-modal-card-head'>
          <div class='mf-modal-default-head'>
            <span class='mf-modal-head-title'>{{title}}</span>
            <button v-if='closable' @click='handelCancel' class='mf-close-icon'>×</button>
          </div>
        </div>
        <div class='mf-modal-card-content'>
          <div v-if="$slots.default"><slot></slot></div>
        </div>
        <div v-if='footer' class='mf-modal-card-footer'>
          <div class='mf-modal-default-footer'>
            <button @click='handelCancel'>取消</button>
            <button @click='handelOk'>确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MfButton',
  props: {
    value: { // 展示/隐藏
      type: Boolean,
      default: false
    },
    useDrag: { // 使用拖拽
      type: Boolean,
      default: false
    },
    maskClosable: { // 点击蒙层是否允许关闭
      type: Boolean,
      default: true
    },
    mask: { // 是否显示遮罩
      type: Boolean,
      default: true
    },
    title: { // 标题
      type: String,
      default: ''
    },
    zIndex: {
      default: 1000
    },
    position: { // 弹窗所处位置
      type: String,
      default: 'center'
    },
    closable: { // 是否显示右上角关闭按钮
      type: Boolean,
      default: true
    },
    footer: { // 是否展示底部按钮
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  watch: {
    value (val) {
      if (val) {
        this.$nextTick(() => {
          if (this.maskClosable) {
            document.addEventListener("click", this.bodyCloseMenus);
          }
          if (this.useDrag) {
            this.drag()
          }
          // 蒙版下方内容禁止滚动
          document.body.style.overflow ='hidden'
        })
      } else {
        document.removeEventListener("click", this.bodyCloseMenus);
        document.body.style.overflow = null
      }
    }
  },
  computed: {
    hideMaskStyle () {
      let obj = {
        "z-index": this.zIndex
      }
      if (this.mask) {
      } else {
        if (this.maskClosable) {
          obj.background = 'transparent'
        } else {
          ogj.width = 0
          ogj.height = 0
        }
      }
      return obj
    },
    positionValue () {
      if (this.position === 'top') {
        return '25%'
      }
      if (this.position === 'center') {
        return '50%'
      }
      if (this.position === 'bottom') {
        return '75%'
      }
    }
  },
  methods: {
    bodyCloseMenus (e) { // 点击遮罩层，关闭弹窗
      let self = this;
      // if (this.$refs.mfModalMask && !this.$refs.mfModalMask.contains(e.target)) {
      if (this.$refs.mfModalMask === e.target) {
        if (this.value) {
          this.$emit('input', false)
        }
      }
    },
    handelCancel (e) { // 取消按钮
      this.$emit('input', false)
      this.$emit('cancel')
    },
    handelOk (e) { // 取消按钮
      this.$emit('ok', false)
    },
    getTranslateValue (el, val) { // 获取当前元素tanslate值
      const translates = document.defaultView.getComputedStyle(el, null).transform
      let str = translates.replace(")","");
      let split = str.split(',');
      if (val === 'x') {
        return Number(split[split.length-2])
      } else {
        return Number(split[split.length-1])
      }
    },
    drag (e) { // 拖拽功能
      const tiggerEl = this.$refs.mfModalCardTop;
      const moveEl = this.$refs.mfModalCard;

      tiggerEl.addEventListener('mousedown', (e) => {
        const disx = e.pageX - moveEl.offsetLeft
        const disy = e.pageY - moveEl.offsetTop
        const translateX = this.getTranslateValue(moveEl, 'x')
        const translateY = this.getTranslateValue(moveEl, 'y')

        document.onmousemove = function (e) {
          const clientWidth = document.documentElement.clientWidth
          const clientHeight = document.documentElement.clientHeight
       
          let left = e.pageX - disx
          let top = e.pageY - disy
          if (left <= -translateX) {
            left = -translateX
          }
          if (left >= clientWidth + translateX) {
            left = clientWidth + translateX
          }
          if (top <= -translateY) {
            top = - translateY
          }
          if (top >= clientHeight + translateY) {
            top = clientHeight + translateY
          }
          moveEl.style.left = left + 'px'
          moveEl.style.top = top + 'px'
        }
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null
        }
      })
    },
  }

}
</script>

<style scoped lang='stylus'>
  .mf-modal-box {
    .mf-modal-mask {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100vh;
      margin: auto;
      background: rgba(0, 0, 0 ,.3);
      z-index: 1000;
      .mf-modal-card {
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        .mf-modal-card-top {
          height: 20px;
          &.useDrag:hover {
            cursor: move;
          }
        }
        .mf-modal-card-head {
          
          .mf-modal-default-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            font-size: 20px;
            font-weight: 700;
            .mf-modal-head-title {

            }
            .mf-close-icon {
              
            }
          }
        }
        .mf-modal-card-content {

        }
      }
    }
  }
</style>