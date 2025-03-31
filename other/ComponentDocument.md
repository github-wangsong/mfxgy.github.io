---
title: 组件文档
date: 2020-10-10
tags:
 - html
categories:
 -  category1
---


## 发布订阅模式

::: demo

```vue
    <template>
    <div>
        <MfButton @click='openModal'>点击</MfButton>
    </div>
    
    </template> 

    <script>
    // 发布者
    function PubSub(){
        this.eventListeners = {}
    }
    PubSub.prototype.on = function (event, handel) {
        if (typeof handel !== 'function') {
            return
        }
        if (this.eventListeners[event]) {
            this.eventListeners[event].push(handel)
        } else {
            this.eventListeners[event] = [handel]
        }
    }
    PubSub.prototype.emit = function (event, ...arg) {
        if (!this.eventListeners[event]) {
            return
        } else {
            this.eventListeners[event].apply(this, arg)
        }
    },
    PubSub.prototype.off = function (event, handel) {
        if (typeof handel !== 'function') {
            return
        }
        if (!this.eventListeners[event]) {
            return
        } else {
            this.eventListeners[event] = this.eventListeners[event].filter((item) => {
                return item !== handel
            })
        }
    }

    export default {
        data() {
            return {
            }
        },
        methods: {
            openModal () {
                let obj = new PubSub()
                let fun1 = function () {
                    console.log('aaa', 'fun1')
                }
                let fun2 = function () {
                    console.log('aaa', 'fun2')
                }
                obj.on('aaa',fun1)
                obj.on('aaa',fun2)
                obj.emit('aaa', 'bbb')
                
               
            }
        }
    }
    </script>

```
:::
## Button Modal

::: demo

```vue
    <template>
    <div>
        <MfModal v-model='showModal' position='center' :maskClosable='true' :mask='true' useDrag title='标题' :closable='false' :footer='false'>
            <div style='max-height: 200px; overflow: auto'>
                <div v-for='item in 50' :key='item'>
                    {{item}}
                </div>
            </div>
        </MfModal>
        <MfButton @click='openModal'>点击</MfButton>
    </div>
    
    </template> 

    <script>
    export default {
        data() {
            return {
                showModal: false
            }
        },
        components: {
            MfButton: () => import('../.vuepress/components/mf-button.vue'),
            MfModal: () => import('../.vuepress/components/mf-modal.vue'),
        },
        methods: {
            openModal () {
                this.showModal = !this.showModal
            }
        }
    }
    </script>

```
:::



## text-ellipsis
::: demo
```vue
    <template>
        <div>
            <div class='box'>
                <MftextEllipsis :rowNum='2' name='mf-text-ellipsis' :content='content' ></MftextEllipsis>
            </div>
        </div>
    </template> 

    <script>
    export default {
        data() {
            return {
                content: '豫章故郡，洪都新府，星分翼轸，地接衡庐，襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟，人杰地灵，徐孺下陈蕃之榻。'
            }
        },
        components: {
            MftextEllipsis: () => import('../.vuepress/components/mf-text-ellipsis.vue'),
        }
    }
    </script>
    <style>
        .box {
            width: 200px;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
    </style>
```
:::
## pagination
::: demo
```vue
    <template>
        <div>
            <h4>基础分页</h4>
            <MfPagination v-model='currents.current1' :size='pageSizes.pageSize1' :total='50' ></MfPagination>

            <h4>更多分页</h4>
            <MfPagination v-model='currents.current2' :size='pageSizes.pageSize2' :total='500' ></MfPagination>

            <h4>改变每页条数</h4>
            <MfPagination v-model='currents.current3' :size.sync='pageSizes.pageSize3' :total='500' showSizeChanger ></MfPagination>
            <MfPagination v-model='currents.current4' :size.sync='pageSizes.pageSize4' :total='500' showSizeChanger :sizeOptions='sizeOptions' ></MfPagination>

            <h4>快速跳转到某一页</h4>
            <MfPagination v-model='currents.current5' :size='pageSizes.pageSize5' :total='500' showQuickJumper ></MfPagination>
            <!-- <MfPagination v-model='current' :size.sync='pageSize' :total='500' @change='handelChange' :sizeOptions='sizeOptions' showQuickJumper showSizeChanger ></MfPagination> -->
        </div>
    </template> 

    <script>
        export default {
            data() {
                return {
                    currents: {
                        current1: 1,
                        current2: 1,
                        current3: 1,
                        current4: 1,
                        current4: 5,
                    },
                    pageSizes: {
                        pageSize1: 10,
                        pageSize2: 10,
                        pageSize3: 10,
                        pageSize4: 10,
                        pageSize5: 10,
                    },
                    sizeOptions: [5, 10, 50, 100]
                }
            },
            components: {
                MfPagination: () => import('../.vuepress/components/mf-pagination.vue'),
            },
            methods: {
                handelChange (val) {
                    console.log(val)
                }
            }
        }
    </script>
    <style>
        
    </style>
```
:::
## Cascader multiple choices
::: demo
```vue
    <template>
        <div>
            <MfCascader/>
        </div>
    </template> 

    <script>
        export default {
            data() {
                return {
                    
                }
            },
            components: {
                MfCascader: () => import('../.vuepress/components/mf-cascader.vue'),
            },
            methods: {
                init () {
                }
            }
        }
    </script>
    <style>
        
    </style>
```
:::