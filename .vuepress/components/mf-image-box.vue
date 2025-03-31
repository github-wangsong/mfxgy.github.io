<template>
  <div class='mf-image-box' @click='handelClick'>
    <img :imgStyle='imgStyle' v-if='src' referrerPolicy="no-referrer" :src="src" alt="暂无图片" @load="onLoadImg" @error="defaultImg" >
    <div v-show='!(src&&!loading)' class='mf-image-box-c' >
      <img :imgStyle='imgStyle' :src='bgUrl' alt="">
      <div class='img-name'>{{loading ? '加载中...' : title}}</div>
    </div>
    <div v-show='src&&!loading&&showTitle' class='img-name'>{{title}}</div>
    <!-- <a-spin class='spin' :spinning='loading' /> -->
  </div>
</template>

<script>
export default {
  props: {
    src: { // 图片路径
      type: String,
      default: ''
    },
    title: { // 标题名称
      type: String,
      default: ''
    },
    bgUrl: {  // 默认路径
      type: String,
      default: require('https://img1.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-lpic.gif')
    },
    imgStyle: {
      type: Object,
      default: () => ({
        "height": "100%"
      })
    }
  },
  data () {
    return {
      showTitle: false,
      loading: false
    }
  },
  watch: {
    src: {
      handler (val) {
        this.showTitle = false
        if (val) {
          this.loading = true
        } else {
          this.loading = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    
  },
  methods: {
    defaultImg (event) {
      this.showTitle = true
      this.loading = false
      event.target.src = this.bgUrl
    },
    onLoadImg () { //加载完成时触发
      this.loading = false
    },
    handelClick (e) {
      this.$emit('click', e)
    }
  },

}
</script>

<style scoped lang='stylus'>
.mf-image-box {
  position: relative;
  color: #fff;
  width: 92px;
  height: 138px;
  .mf-image-box-c {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
img{
  // height: 100%;
  // width: 100%;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.img-name {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%,-50%);
  width: 85%;
  overflow:hidden;
  text-align: center;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  word-break:break-all;
  word-wrap:break-word;
}
</style>