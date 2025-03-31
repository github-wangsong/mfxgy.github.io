<template>
  <div class="mf-pagination-box" :style='{"justify-content": bottomPosition}'>
    <div style="margin-right:10px">
      <!-- {{ currentPageStartNum }} to {{ currentPageEndNum }} of <span style="color:#E06D11">{{total}}</span> -->
      <!-- <span style="color:#E06D11">共{{pageNum}}页</span> -->
    </div>
    <button type='button' :disabled='this.value === 1' class="mf-pagination-item mf-pagination-item-active"  @click="goPage(value - 1)">&lt;</button>
    <!-- <button class="mf-pagination-item"
    @click="goPage(value - value % 5 - (value % 5 == 0 ? 5 : 0) + item)"
    v-for="item in numList" :key="item"
    :class="{'mf-pagination-item-active': item == (value % 5 ? value % 5 : 5)}">
      {{value - value % 5 - (value % 5 == 0 ? 5 : 0) + item}}
    </button> -->
    <button v-show='showPageList[0] > 1' @click="goPage(1)" class="mf-pagination-item">1</button>
    <button class='mf-ellipsis-btn' @mouseenter="showLeftFast = true" @mouseleave="showLeftFast = false"  v-show='showPageList[0] > 2' >
      <span>...</span>
      <span v-show='showLeftFast' @click='goPage(value-5)' class='mf-fast-btn'><<</span>
      <i v-show='showLeftFast' class='mf-ellipsis-btn-Tooltip'>向前移动五页</i>
    </button>
    <button class="mf-pagination-item"
    @click="goPage(item)"
    v-for="item in showPageList" :key="item"
    :class="{'mf-pagination-item-active': item == value}">
      {{item}}
    </button>
    <button class='mf-ellipsis-btn' @mouseenter="showRightFast = true" @mouseleave="showRightFast = false" v-show='showPageList[showPageList.length-1] < pageNum - 1'>
      <span>...</span>
      <span v-show='showRightFast' @click='goPage(value+5)' class='mf-fast-btn'>>></span>
      <i v-show='showRightFast' class='mf-ellipsis-btn-Tooltip'>向后移动五页</i>
    </button>
    <button v-show='showPageList[showPageList.length-1] < pageNum' @click="goPage(pageNum)" class="mf-pagination-item">{{pageNum}}</button>
    <button :disabled='this.value === this.pageNum' class="mf-pagination-item mf-pagination-item-active"  @click="goPage(value + 1)">></button>
    <select v-if='showSizeChanger' :value="size" ref='selectSize' @change='changeSize' class="mf-pagination-item" name="" id="">
      <option v-for="(item, index) in sizeOptions" :key="index" :value="item">{{item}}/页</option>
    </select>
    <div v-if='showQuickJumper' style="margin-left:10px;display: flex; align-items: center">
      <span>跳至</span>
      <input type="number"  class="mf-pagination-item" style="width:50px;text-align: center;" ref="inputNum" v-model="inputValue" @blur='goPage($refs.inputNum.value * 1)' @keyup="handelKeyup">
      <span>页</span>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    total: { // 总数
      type: Number,
      default: 0
    }, 
    size: { // 每页条数
      type: Number,
      default: 10
    },
    value: { // 当前页数
      type: Number,
      default: 1
    },
    sizeOptions: { // 每页显示多少条
      type: Array,
      default: () => [10, 20, 30, 50]
    },
    showQuickJumper: { // 是否显示快捷跳转
      type: Boolean,
      default: false
    },
    showSizeChanger: { // 是否改变每页条数
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  data: function () {
    return {
      inputValue: undefined,
      showRightFast: false,
      showLeftFast: false
    };
  },
  mounted () {
  },
  computed:{
    bottomPosition () {
      let str = ''
      switch (this.align) {
        case 'left':
          str = 'flex-start'
          break;
        case 'center':
          str = 'center'
          break;
        case 'right':
          str = 'flex-end'
          break;
      }
      return str
    },
    currentPageStartNum () { // 当前页开始数字
      return this.value * this.size - this.size + 1
    },
    currentPageEndNum () { // 当前页结束数字
      return (this.value * this.size > this.total) ? this.total : this.value * this.size
    },
    pageNum () { // 总共多少页
      const all = Math.ceil(this.total / this.size )
      if (this.value > all) {
        this.$emit('input', all)
      }
      return all
    },
    numList () { // 展示的页码列表
      if (this.pageNum<=5) {
        return this.pageNum
      } else {
        if(this.value%5>0&&(this.pageNum - this.pageNum%5)==(this.value - this.value%5)){
          return this.pageNum%5?this.pageNum%5:5
        }else{
          return 5
        }
      }
    },
    showPageList () {
      let arr = []
      let a = 2
      if (this.value <= 2) {
        a = this.value -1
      }
      if (this.value >= this.pageNum-1) {
        a = this.value - this.pageNum + 4
      }
      for(let i = 0; i < 5; i++) {
        
        arr.push(i + this.value - a)
      }
      return arr

    }
  },
  methods: {
    goPage (num) {
      if (this.value === num) return
      if (num < 1) {
        num = 1
      }
      if (num > this.pageNum) {
        num = this.pageNum
      }
      this.$emit('input', num)

      this.$emit('change', num)
    },
    changeSize (e) {
      this.$emit('update:size', this.$refs.selectSize.value * 1)
      this.$emit('changePage',)
    },
    handelKeyup () {
      console.log('111111111')
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
  cursor: pointer;
}
.mf-pagination-box{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  white-space:nowrap;
}
.mf-pagination-item{
  border:1px solid #ccc;
  border-radius: 3px;
  padding:6px;
  margin:10px;
  box-sizing: border-box;
  font-size:var(--fz16);
}
.mf-pagination-item-active{
  background-color: #216096;
  border-color: #216096;
  color:#fff;
}
.mf-ellipsis-btn {
  position: relative;
  .mf-fast-btn {
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    background: #fff;
    color: #216096;
    font-weight: 700;
  }
  .mf-ellipsis-btn-Tooltip {
    position: absolute;
    bottom: -6px;
    right: 0;
    transform: translate(100%, 100%);
    border: 1px solid #333;
    padding: 5px;
    background: #fff;
    border-radius: 2px;
    font-size: 12px;
    font-style:normal
  }

}
</style>