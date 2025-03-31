---
title: 经验
date: 2020-10-10
tags:
 - 经验
categories:
 -  category1
---


## webpack配置
  ```
  常用loader
  1.【less-loader】用于将less文件翻译成为css
  2.【css-loader】用于将css以CommonJs语法打包到js中
  3.【style-loader】用于动态创建一个style标签，将css引入页面
  4.【file-loader】用于处理其他资源，也可以处理图片资源，核心操作就是：提取资源到指定位置，且可修改文件名等操作。
  5.【url-loader】与file-loader功能几乎一致，优势是可以对图片进行动态转换base64编码（控制limit属性值可以控制阈值）。
              备注：上述两个loader中url-loader应用比file-loader广泛，且url-loader是file-loader的上层封装。
  6.【html-loader】用于处理html中<img>标签的图片。
  6.【esint-loader】对项目中的js语法进行检查。       
  7.【babel-loader】将es6语法转换为es5语法
              备注1：直接使用只能处理简单的语法，Promise等无法处理。
              备注2：借助polyfill完成高级es6语法的转换，缺点：所有都转换，无法按需转换，生成的js体积大。
              备注3：使用core-js配合polyfill完成按需转换。
  8.【postcss-loader】经典的loadr，用于处理css兼容性问题，需要与【postcss】和【postcss-preset-env】配合使用
              备注1：使用的时机为：["css-loader","postcss-loader","less-loader"]。
              备注2：需要在package.json中配置browserslist属性指定具体的兼容规则
              备注3：browserslist是一个单独的库，被广泛用在各种涉及浏览器/移动端的兼容性支持工具中

  ```
  ```
    常用plugin
    1. mini-css-extract-plugin】：用于提取项目中的css为一个单独的文件。
                备注1：使用的时机为：[MiniCssExtractPlugin.loader,"css-loader","postcss-loader",less-loader"]。
                备注2：使用是可以在new时传入具体配置例如：
                {
                   loader: "postcss-loader",
                   options: {
                       postcssOptions: {
                           plugins: ["postcss-preset-env"]
                       }
                   }
               }
    2.【html-webpack-plugin】：根据指定模板，自动创建html文件，且自动引入外部资源
    3.【eslint-plugin-import】：用于配合eslint-loader
    4.【eslint-config-airbnb-base】用于引入airbnb配置好的语法检查规则，否则需要一个一个配置，比较麻烦
    5.【@babel/polyfill】用于处理JS兼容性问题，例如IE浏览器不支持Promise
    6.【optimize-css-assets-webpack-plugin】用于压缩css    
  ```

## webpack.config.js配置
```javascript
  const cofig = {
    entry:'./src/app.js', // 入口文件
    output:{
      filename: "js/[name].bundle.js", // 打包压缩导出之后的文件名称
      path: resolveApp("./dist"), // 导出的路径 基本都是写在dist文件夹下面
      clean: true, //  每次打包之后是否需要 清楚缓存
      publicPath: './' // 上线之后的服务 ，打包的时候回自动的添加都所有路径的前面
    },
    mode: 'development', // 模式配置
    module: {
      rules: [
        {
              test: /\.(scss|sass)$/, // 表示编译后缀名为 scss sass 的文件
              include: [], // 指定需要处理的文件或者 文件夹中符合test指定的类型的文件
              use:[] , // 写需要使用到的loader
        },
        {
          test: /\.js$/,
          include: ['./src'],
          use: {
              loader: 'babel-loader', // *引入babel-loader
              options: {
                presets: ['@babel/preset-env'] // *引入预设
              }
          }
        },
        {
          test: /\.(js|ts|jsx|tsx)$/,
          include: paths.appSrc,
          use: [{
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015'
            }
          }]
        }
      ]
    },
    devServer: {
      static: {
        directory: resolveApp("./public"), // 启动服务默认打开的文件
      },
      port: 8888, // 服务端口
      hot: true, // 热刷新，不用手动刷新浏览器，代码更改 浏览器自动刷新
      open:true, // 自动打开服务器
      proxy: {
        //定义一个标记，如以后api开头的请求都走代理的设置
        '/api': {
          // 要请求的真实服务端基地址 相当于被/api替代了
          target: 'https://...',
          //把api重写为空，因为别人没有 /api
          pathRewrite: {"^/api":""},
            //发送请求头中host会设置成target
          changeOrigin: true
        }
      }
    },
    cache: {
      type: 'filesystem'
    },
    resolve: {
      // 配置哪些文件可以省略后缀名
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      // 路径别名
      alias: {
        '@': paths.appSrc, // 用@符号来代替 src文件夹 路径
      }
    },
    devtool: "eval-cheap-module-source-map", // 报错打印能定位到源代码对应的位置
  }


```
## vue.config.js
  ```
  module.exports = {
    publicPath: './', // 部署应用包时的基本 URL
    outputDir: 'dist', // build 时输出的文件目录
    assetsDir: 'assets', // 静态文件目录
    indexPath: 'index.html',
    filenameHashing: true, // 是否对生成的静态资源在它们的文件名中包含 hash 值
    pages: undefined, // 多页面配置
    lintOnSave: true, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码, 属性值类型是boolean | 'warning' | 'default' | 'error'
    runtimeCompiler: false, // 是否使用包含运行时编译器的vue版本
    transpileDependencies: [], 默认情况下babel-loader 忽略其中的所有文件 nonde_modules
    productionSourceMap: false, // 生产环境是否生成sourcemap
    crossorigin: undefined, // 设置生成的html中link和script标签的crossorigin属性
    integrity: flase, // 是否在生成的html中启用 Subresource Integrity (SRI)
    devServer: { // dev环境下，webpack-dev-server 相关配置
      open: false, // 是否自动打开浏览器
      host: '0.0.0.0', // 域名
      port: 8090, // 端口
      https： false, // 是否使用https
      是否
    },
    configureWebpack: { // webpack配置(对象写法)
      rules:[

      ],
      plugins: [
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        })
      ]
    },
    configureWebpack: config => { // webpack配置(函数写法)

      const plugins = [
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        })
      ];
      config.plugins.push(...plugins);

      // 为生产环境修改配置...
      if (process.env.NODE_ENV === 'production') {
        config.mode = 'production';
        // 打包文件大小配置
        config.performance = {
          maxEntrypointSize: 10000000,
          maxAssetSize: 30000000
        }
      }
    },
    chainWebpack：config => { //允许对内部webpack进行更精细的修改
      
    },
    css: {
      modules: false, // 启用cssmodules
      extract: true, // 是否使用css分离插件
      sourceMap: flase, // 是否为css开启source map
      loaderOptions: {
        scss: {
          // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
          // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
          prependData: `
            @import '@scss/variables.scss';
            @import '@scss/mixins.scss';
            @import '@scss/function.scss';
            $src: '${process.env.VUE_APP_BASE_API}';`
        }
      }
    }


  }

  ```

## vue中实现点击空白区域关闭弹窗
```
<template>
  <!-- 弹窗区域 -->
  <div ref='main' v-show='show'>
    <div class='content'></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      show:false
    }
  },
  mounted(){//组件加载完成后绑定监听
      document.addEventListener("click", this.bodyCloseMenus);
    
  },
  beforeDestroy() {//组件销毁时移除
    document.removeEventListener("click", this.bodyCloseMenus);
  },
  methods:{
    bodyCloseMenus(e){//点击空白区域，关闭弹窗
      let self = this;
      if (this.$refs.main && !this.$refs.main.contains(e.target)) {
        if(this.showBox){
          this.showBox = false
        }
      }
    },
  }

}

</script>

```

## 修改placeholder样式
```
input::placeholder {
    color: green;
}
```


## 在组件上使用v-model
子组件如下：
```
<template>
  <div  >
    <input v-model="text"   type="text">
  </div>
</template>

<script>
export default {
  computed: {
    text: {
      get () {
        return this.value//默认为value值
      },
      set (newValue) {
        this.$emit('input', newValue)//默认为input事件
        this.$emit('change', newValue)//绑定change事件
      }
    }
  },

}
</script>

```

父组件如下：
```
<template>
  <div  >
    <MySearch v-model="inputValue"  @change="changeInput" ></MySearch>
  </div>
</template>

<script>
import MyInput from './componets/MyInput.vue'

export default {
  components:{
    MyInput
  },
  data(){
    return {
      inputValue:'',
    }
  },
  methods:{
    changeInput(e){
      console.log(e)
    }
  }
}
</script>

  
```

## vue脚手架2.0引入ant design

  1. 安装 Ant Design`npm install --save ant-design-vue`
  2. 引入 Ant Design
    - (1)全部引入
      * 在 main.js 中引入并注册全部组件，即可在其它页面中直接使用全部组件
      ```
      import Vue from 'vue'
      import Antd from 'ant-design-vue'
      import 'ant-design-vue/dist/antd.css'
      Vue.use(Antd)
      ```
    - (2)按需引入
      * 安装 babel-plugin-import 插件`npm install --save-dev babel-plugin-import`   
        然后在 babel.config.js 配置插件
      ```
      module.exports = {
        presets: [
          '@vue/cli-plugin-babel/preset'
        ],
        plugins: [
          [
            'import',
            { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }//发现select按需引入后报错，less问题，把true改为'css'
          ]
        ]
      }
      ```
      * 接着在 main.js 按需引入组件
      ```
      import Vue from 'vue'
      import {Button,Icon,Select,Input,DatePicker,Checkbox,Row,Table,Collapse,Pagination,Spin,Radio} from 'ant-design-vue'
      Vue.use(Button).use(Icon).use(Select).use(Input).use(Row).use(Table).use(Collapse).use(Pagination).use(Spin).use(Checkbox).use(DatePicker).use(Radio)
      ```
      * 如果编译时报错`Inline JavaScript is not enabled. Is it set in your options?`,less的问题   
      需要在vue.config.js做如下配置
      ```
      module.exports = defineConfig({
        transpileDependencies: true,
        css: {//less-load版本低于6.0时：vue.config.js 配置
          loaderOptions: {
            less: {
              javascriptEnabled: true
            }
          }
        },
        css: {//less-load版本高于6.0时：vue.config.js 配置
          loaderOptions: {
            less: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        }
      })
      ```



## 小程序轮播图swiper的坑

  - swiper组件外不要加view
  - swiper组件要设置宽度

## 生产环境连接本地pos机接口跨域问题(jsonp)
  ```
  var oScript = document.createElement('script');
  oScript.src = `http://127.0.0.1:8887/PosPay?type=1&callback=callback`
  window.callback = (data) => {
    console.log(data)
  }
  ```


## vue设置proxy代理，如何去查看代理地址

  ```
    devServer: {
      proxy: {
        "/api": {
          target: "https://tcc-dev.interlib.com.cn/", // 开发环境
          onProxyRes (proxyRes, req, res) {
            const realUrl = new URL(req.url || '', 'https://tcc-dev.interlib.com.cn/')
            proxyRes.headers['x-real-url2'] = realUrl
          }
          // changOrigin: true,
          // pathRewrite: {
          //   "^/api": ""
          // }
        }
      },
    },

  ```

## css揭秘
### 实现半透明边框
  ```
    background-clip: padding-box;

    background-clip 背景色所覆盖的范围
    默认值为border-box，可选值为padding-box和content-box

  ```
### 实现多重边框
```
  box-shadow和outline

  box-shadow:0 0 0 10px #655,
            0 0 0 15px deeppink,
            0 2px 5px 15px rgba(0,0,0,.3);
  outline 只适用于双层边框的场景，如果需要更多层边框，用 box-shadow 来实现

```
  + box-shadow 属性接受值最多由五个不同的部分组成。
  + box-shadow: offset-x offset-y blur spread color position;
    - offset-x:水平偏移
    - offset-y:垂直偏移
    - blur:模糊半径
    - spread:扩展半径
    - color:颜色
    - position:默认不填，如设置'inset',变为内阴影

### 灵活的背景定位

```
background-position:right 20px bottom 10px;
background-origin:content-box;

background:
background-color(背景色): blue / rgb(0, 0, 255) / #0000ff / transparent;
background-image(背景图片):url(image.jpg); 
background-repeat(背景平铺):repeat(默认值，在水平和垂直方向平铺) / no-repeat(不平铺) / repeat-x(水平方向平铺) / repeat-y(垂直方向平铺) / inherit(继承父元素);
background-position(背景定位): 0 0 / 50% 50% /right center ; 
background-attachment(背景附着): scroll(滚动) / fixed(固定) / inherit(继承); 

```
### 条纹背景

```
// 水平条纹效果
background: linear-gradient(#fb3 50%, #58a 50%); 
background-size: 100% 30px;
 
// 垂直条纹效果
background: linear-gradient(to right, #fb3 50%, #58a 0);
background-size: 30px 100%;
 
// 斜向条纹
background: linear-gradient(45deg, #fb3 50%, #58a 0);
background-size: 30px 30px;
 
// 同色系条纹
background: repeating-linear-gradient(30deg, #79b, #79b 15px, #58a 0, #58a 30px);
background: #58a;
 
// 同色系条纹 重构
background: repeating-linear-gradient(
  30deg, 
  hsla(0, 0%, 100%, .1),
  hsla(0, 0%, 100%, .1) 15px,
  transparent 0,
  transparent 30px);
  background: #58a;

```