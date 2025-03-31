---
title: 常用文档
date: 2023-11-29
---

# css文档

## css背景属性-background简写

- 示例
  ```
    background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];

    background: #666 url(../mm.png) no-repeat fixed left top/contain content-box content-box;
    background: url(images/bg.png) no-repeat left top; // 没有指定的值会被设置为它的初始值

  ```
<details> <summary>属性详情</summary>
  <pre>
    <code>
    常用属性：
      background-color: #666; // 背景颜色: 合法的颜色值
      background-image: url(../mm.png); // 背景图像: url( )
      background-repeat: no-repeat;  // 如何重复背景图像: no-repeat，repeat，repeat-x，repeat-y
      background-attachment：fixed; 背景图像是否固定或者随着页面的其余部分滚动：fixed，scroll
      background-position: center center; // 背景图像的位置：(left center right) (top center bottom)/x% y%/ xpx ypx
      background-size: 100% 100%; // 背景图片的尺寸：cover(图片依靠长边缩放)，contain（图像依靠短边缩放）/x% y%/xpx ypx <br>
    不常用的2个属性：
      background-origin: padding-box; 背景图片的定位区域:border-box/padding-box/content-box
      background-clip: border-box; 背景的绘制区域(会对背景进行切割)。border-box/padding-box/content-box
    </code>
  </pre>
</details>

---

## css文本溢出省略-text

- 示例
  ```
    .box { // 单行省略
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
    }

    .box2 { // 多行省略
      word-break: break-all;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

  ```
<details>
<summary>属性详情</summary>
<pre><code>
  text-overflow: 
</code></pre>
</details>

---

## css动画-animation简写

- 示例
  ```
    animation: [animation-name] [animation-duration] [animation-timing-function] [animation-delay] [animation-iteration-count]  [animation-direction] [animation-fill-mode];

    @keyframes move {
      /* 定义动画0-100% */
      0% {
      }
      50% {
        transform: translate(500px,500px) rotate(-720deg) scale(0.5);
      }
      100% {
        transform: translate(0) rotate(-1440deg) scale(0.5);
      }
    }
    animation: move 2s linear 2s 999 alternate forwards;

  ```
<details>
<summary>属性详情</summary>
<pre><code>
  animation-name: move; // 动画名称 
  animation-duration:5s; // 完成所需时间
  animation-timing-function: ease; // 运动曲线 默认ease是慢快慢，linear是匀
  animation-delay: 0.1s; // 开始时间
  animation-iteration-count: 3; // 播放次数  indinite为无限
  animation-direction: alternate; // 结束后是否逆向播放 alternate为是  normal为否
  animation-fill-mode: backwards; // 结束状态 backwards为默认  forwards为停住不回去
</code></pre>
</details>

---

## css过渡-transition简写

- 示例
  ```
    transition: [transition-property] [transition-duration] [transition-timing-function] [transition-delay];

    transition: transform 250ms, opacity 400ms;
  ```
<details>
  <summary>属性详情</summary>
  <pre><code>
    transition-property: width, height; // 指定应用过渡属性的名称 all/none/
    transition-duration: .5s; // 过渡动画所需的时间 1s/1ms
    transition-timing-function: linear; // 过渡动画的运动曲线
    transition-delay: 300ms; // 过渡效果的延迟时间 <br>
    transition-timing-function: cubic-bezier(n, n, n, n); // 在bezier 函数中自定义 0 ~ 1 之间的数值
    transition-timing-function: ease; // 默认值，慢速开始，中间变快，慢速结束；相当于 cubic-bezier(0.25, 0.1, 0.25, 1)。
    transition-timing-function: linear; // 匀速运动；相当于 cubic-bezier(0, 0, 1, 1)。
    transition-timing-function: ease-in; // 慢速开始；相当于 cubic-bezier(0.42, 0, 1, 1)。
    transition-timing-function: ease-out; // 慢速结束；相当于 cubic-bezier(0, 0, 0.58, 1)
    transition-timing-function: ease-in-out; // 慢速开始，慢速结束；相当于 cubic-bezier(0.42, 0, 0.58, 1)
    transition-timing-function: step-start;
    transition-timing-function: step-end;
    transition-timing-function: steps(4, end);
  </code></pre>
</details>

---

## css弹性盒-flex

- 示例
  ```
    display: flex;
    
    flex: [flex-grow] [flex-shrink] [flex-basis];

    flex: 0 1 auto;
  ```
<details>
  <summary>属性详情</summary>
  <pre><code>
    父元素:
      flex-direction: column; // 主轴方向 row(左->右) | row-reverse(右->左) | column(上->下) | column-reverse(下->上);
      flex-wrap: wrap; // nowrap(不换行) | wrap(换行,第一行在上面) | wrap-reverse(不换行,第一行在下面);
      flex-flow: column wrap; // 上面两个属性简写<br>
      justify-content: space-between; // 元素在主轴的对齐方式 flex-start(左对齐) | flex-end(右对齐) | center(居中) | space-between(两端对齐) | space-around(每个项目间隔相等);
      align-items: center; 元素在交叉轴对齐方式 // flex-start(顶端对齐) | flex-end(底部对齐) | center(居中) | baseline(第一行文字基线对齐) | stretch(占满整个容器高度);
      align-content: center; // 元素在辅轴对齐方式 flex-start | flex-end | center | space-between | space-around | stretch;<br>
    子元素:
      flex-grow: 0; 当父元素有多余空间时，子元素如何伸展
      flex-shrink: 1; 当父元素中的空间不足以容纳所有子元素时，子元素如何伸缩
      flex-basis: auto;
      flex: auto; // 以上三个的缩写,有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)
      align-self: auto; //可覆盖align-items属性, auto | flex-start | flex-end | center | baseline | stretch;
      order: 0, // 排列顺序, 数值越小，排列越靠前
  </code></pre>
</details>

---
## css栅格-grid

- 示例
  ```
    display: grid;

  ```
<details>
  <summary>属性详情</summary>
  <pre><code>
    父元素:
      display：grid; // grid 或 inline-grid
      grid-template-columns:200px 300px 100px ; //设置列宽
      grid-template-rows: 50px 50px 50px; // 设置行高
        repeat() 函数:
          grid-template-rows: repeat(2, 50px); // repeat() 函数：可以简化重复的值,第一个参数是重复的次数，第二个参数是所要重复的值
        auto-fill 关键字: 
          grid-template-columns: repeat(auto-fill, 200px) // 列宽200, 自动填充
        fr 关键字:
          grid-template-columns: 200px 1fr 2fr; // 长度单位, 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3
        minmax() 函数:
          grid-template-columns: 1fr 1fr minmax(300px, 2fr); // 第三个列宽最少也是要 300px，但是最大不能大于第一第二列宽的两倍
        auto关键字:
          grid-template-columns: 100px auto 100px; // 两边宽度固定, 中间自适应
      grid-row-gap: 10px; // 行间距
      grid-column-gap: 20px; // 列间距
      grid-gap: 10px 20px; // 简写
    子元素:
  </code></pre>
</details>

---
## css鼠标样式-cursor

- 示例
  
  ```
  cursor: default; // 默认光标
  cursor: pointer; // 超链接的指针小手
  cursor: help; // 指示可用的帮助
  cursor: text; // 指示文本
  cursor: crosshair; // crosshair

  ```


# dom

## 获取dom元素

- 示例
  
  ```
    document.getElementById('id') // 只能通过Id去获取，只能获取一个dom元素
    document.getElementByTagName('div')	// 只能通过标签名去获取，可以获取多个，返回一个元素集合
    document.getElementByClassName('')	// 只能通过类名去获取，可以获取多个，返回一个元素集合

    document.querySelector('选择器') // 只能获取一个
    document.querySelectorAll('选择器') // 元素集合

    document.documentElement	// 获取html
	  document.body	// 获取body
  ```

  <details>
  <summary>dom元素属性详情</summary>
  <table>
    <tr>
      <th>操作元素属性</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>src</td>
      <td>目标地址</td>
    </tr>
    <tr>
      <td>href</td>
      <td>目标</td>
    </tr>
    <tr>
      <td>alt</td>
      <td>目标替换文本</td>
    </tr>
    <tr>
      <td>title</td>
      <td>目标图片提示信息</td>
    </tr>
    <tr>
      <th>操作表单属性</th>
      <th>描述</th>
    </tr>
    <tr>
    <tr>
      <td>type</td>
      <td>更换表单类型</td>
    </tr>
    <tr>
      <td>value</td>
      <td>更换表单内容</td>
    </tr>
    <tr>
      <td>disablied</td>
      <td>表单是否禁用</td>
    </tr>
    <tr>
      <th>操作样式属性</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>style</td>
      <td>行内样式操作</td>
    </tr>
    <tr>
      <td>tagName</td>
      <td>获取标签名</td>
    </tr>
    <tr>
      <td>className</td>
      <td>获取类名</td>
    </tr>
    <tr>
      <td>classList</td>
      <td>获取类名集合</td>
    </tr>
    <tr>
      <td>textContent</td>
      <td>返回带格式文本内容</td>
    </tr>
    <tr>
      <td>innerText</td>
      <td>返回纯文本内容</td>
    </tr>
    <tr>
      <td>innerHTML</td>
      <td>返回 标签 + 格式 + 文本 内容</td>
    </tr>
    
  </table>
  </details>

---


## 获取元素内容
- 示例
  
```javascript
document.write('<div>内容</div>')

const el = document.createElement('div')
el.innerText('内容')
document.appendChild(el)

el.innerHTML('<div>内容</div>')
```
-----------------------------------------------------------------------------------------------------------------------

## 创建dom元素
- 示例
```javascript
document.write('<div>内容</div>')

const el = document.createElement('div')
el.innerText('内容')
document.appendChild(el)

el.innerHTML('<div>内容</div>')
```
<details>
  <summary>区别</summary>
  <pre><code>
    document.write 是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘
    innerHTML 是将内容写入某个 DOM 节点，不会导致页面全部重绘
    innerHTML 创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍微复杂
    createElement() 创建多个元素效率稍低一点点，但是结构更清晰
  </code></pre>
</details>

-----------

## 节点操作
- 示例
---------------------------------------------------------------------------------------------------
  

**父级节点**
```javascript
  node.parentNode //最近的一个父结点， 如果指定的节点没有父节点则返回 null
```
**子节点**
```

  parentNode.childNodes // 返回包含指定节点的子节点的集合
  parentNode.firstChild // 返回第一个子结点
  parentNode.lastChild // 返回最后一个子结点
  node.nextSibling // 返回当前元素的下一个兄弟节点
  node.previousSibling // 返回当前元素的上一个兄弟节点

  parentNode.children  // 返回所有的子元素节点
  parentNode.firstElementChild // 返回第一个元素节点
  parentNode.lastElementChild // 返回最后一个元素节点
  node.nextElementSibling //返回当前元素的下一个兄弟元素节点
  node.previousElementSibling // 返回当前元素的上一个兄弟元素节点

```


**创建添加节点**  
- 示例
```javascript
  document.createElement("元素名") // 创建元素

  node.appendChild(child) // 在后面添加
  node.insertBefore(child, 指定元素) // 在前面添加

  node.removeChild(child); //返回删除的节点
  node.cloneNode(true); //复制节点(克隆节点)
  注意:若括号参数为 true ，则是深度拷贝，会复制节点本身以及里面所有的子节点；若为false,则是浅拷贝，只复制节点本身，不克隆里面的子节点

```
  <details>
  <summary>元素节点常用属性和方法</summary>
  <table>
    <tr>
      <th>属性</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>attributes</td>
      <td>返回一个与该元素相关的所有属性的集</td>
    </tr>
    <tr>
      <td>classList</td>
      <td>返回该元素包含的 class 属性的集合</td>
    </tr>
    <tr>
      <td>clientHeight</td>
      <td>获取元素内部的高度，包含内边距，但不包括水平滚动条、边框和外边距。</td>
    </tr>
    <tr>
      <td>clientTop</td>
      <td>返回该元素距离它上边界的高度</td>
    </tr>
    <tr>
      <td>clientLeft</td>
      <td>返回该元素距离它左边界的宽度</td>
    </tr>
    <tr>
    <tr>
      <td>innerHTML</td>
      <td>设置或获取 HTML 语法表示的元素的后代</td>
    </tr>
    <tr>
      <td>tagName</td>
      <td>返回当前元素的标签名</td>
    </tr>
    <tr>
      <th>方法</th>
      <th>描述</th>
    </tr>
  </table>
  </details>

---

## dom事件 

- 示例
  **标签上添加事件**
  ```html
    <button onclick="btnhandle()">按钮</button>
  ```
  **动态事件绑定**
  ```javascript
    //事件动态绑定
    btn.onmousemove=function(){
        console.log("鼠标移动");
    }
    //移除动态绑定事件
    btn.onmousemove = null;

    function add () {
      console.log('点击事件')
    }
    btn.addEventListener("click", add, false); // 添加
    btn.removeEventListener("click", add, false); // 移除

    注意: false为冒泡, true为捕获, 默认false
  ```
  <details>
  <summary>dom事件</summary>
  <table>
    <tr>
      <th>鼠标事件</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>onclick</td>
      <td>单击事件</td>
    </tr>
    <tr>
      <td>ondblclick</td>
      <td>双击事件</td>
    </tr>
    <tr>
      <td>onmouseover</td>
      <td>鼠标移入</td>
    </tr>
    <tr>
      <td>onmouseout</td>
      <td>鼠标移出</td>
    </tr>
    <tr>
      <td>onmousedown</td>
      <td>鼠标按下</td>
    </tr>
    <tr>
    <tr>
      <td>onmouseup</td>
      <td>鼠标抬起</td>
    </tr>
    <tr>
      <th>键盘事件</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>onkeydown</td>
      <td>键盘按下</td>
    </tr>
    <tr>
      <td>onkeypress</td>
      <td>键盘按下</td>
    </tr>
    <tr>
      <td>onkeyup</td>
      <td>键盘抬起</td>
    </tr>
    <tr>
      <th>表单事件</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>onfocus</td>
      <td>获取焦点</td>
    </tr>
    <tr>
      <td>onblur</td>
      <td>失去焦点</td>
    </tr>
    <tr>
      <td>onchange</td>
      <td>内容改变事件</td>
    </tr>
    <tr>
      <td>oninput</td>
      <td>用户输入事件</td>
    </tr>
    <tr>
      <th>剪切板事件</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>oncopy</td>
      <td>拷贝</td>
    </tr>
    <tr>
      <td>oncut</td>
      <td>剪切</td>
    </tr>
    <tr>
      <td>onpaste</td>
      <td>粘贴</td>
    </tr>
    <tr>
      <th>浏览器事件</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>scroll</td>
      <td>滚动条</td>
    </tr>
    <tr>
      <td>load</td>
      <td>加载完成</td>
    </tr>
    <tr>
      <td>error</td>
      <td>加载失败</td>
    </tr>
    <tr>
      <td>resize</td>
      <td>窗口大小变化</td>
    </tr>
    <tr>
      <td>contentmenu</td>
      <td>右键打开浏览器菜单</td>
    </tr>
  </table>
  </details>
  	　
```
	onmousemove	　
	onmouseover /onmouseout	事件委派必须使用
	onmouseenter/ onmouseleave	　
	onclick/ondbclick	单击/双击
	onmousedown/onmouseup	　
	　	　
	　	　
	onfocus	获取焦点
	onblur	失去焦点
	　	　
	　	　
	childNodes	儿子节点
	children	儿子元素
	parentNode	父亲节点
	parentElement	父亲元素
	　	　
	firstChild	第一个子节点，都认识
	firstElementChild	第一个子元素节点，高级浏览器认识
	lastChild	最后一个节点
	lastElementChild	最后一个子元素节点，高级浏览器认识
	previousSibling	上一个兄弟节点
	previousElmentSibling	上一个兄弟元素节点，高级浏览器认识
	nextSibling	下一个兄弟节点
	nextElemnetSibling	下一个兄弟元素节点，高级浏览器认识




  创建节点	document.write()	根本不用
	innerHTML	　
	document.createElement()	　
	　	　
父元素使用	insertBefore(新节点,参照节点)	插入节点
	replaceChild(新节点,被替换节点)	替换节点
	removeChild(删除的节点)	删除节点
	appendChild(追加的节点)	追加节点
	　	　
	　	　
	clientX / clientY	拿的是鼠标相对视口的 水平距离和垂直距离
	pageX/ pageY	拿的是鼠标相对页面的 水平距离和垂直距离
	offsetX / offsetY	拿的是鼠标相对自身元素的  水平距离和垂直距离
	　	　
	　	　
	setTimeout()	　
	clearTimeout()	　
	setInterval()	　
	clearInterval()	　
	　	　
	　	　
Offset	offsetWidth	内容+padding+border的宽
	offsetHeight	内容+padding+border的高
	offsetLeft	元素的偏移量，left值
	offsetTop	元素的偏移量，top值
Client	clientWidth	内容+padding的宽
	clientHeight	内容+padding的高
	clientLeft	盒子左边框大小
	clientTop	盒子上边框大小
Scroll	scrollWidth	当内容比盒子小的时候，拿的是盒子的clientWidth
当内容比盒子大的时候，拿的是内天offsetWidth+盒子一侧内边距
	scrollHeight	当内容比盒子小的时候，拿的是盒子的clientHeight
当内容比盒子大的时候，拿的是内天offsetHeight+盒子一侧内边距
	scrollLeft	盒子内容向上滚动的距离
	scrollTop	盒子内容向左滚动的距离
	document.documentElement.clientWidth	视口宽
	document.documentElement.clientHeight	视口高
	　	　




Element属性
tagName	　	　
parentNode	　	　
children	　	　
childElementCount	　	　
firstElementChild	　	　
lastElementChild	　	　
previousElementSibling	　	　
nextElementSibling	　	　
　	　	　
插入方法
appendchild()	　	　
insetBefore()	　	　
　	　	　
可批量插入节点的属性和方法
innerHTML	　	　
outerHTML	　	　
insetAdjacentHTML()	　	　
　	　	　	　


关系属性
属性	描述	返回值
parentNode	父节点	Node对象或null
childNodes	子节点列表	NodeList类数组对象
firstChild	子节点第一个	Node对象或null
lastChild	子节点最后一个	Node对象或null
previousSibling	前一个兄弟节点	Node对象或null
nextSibling	后一个兄弟节点	Node对象或null
其他属性
nodeName	用大写字母表示的节点名称	字符串
nodeValue	Text或Comment节点的文本内容	字符串
ownerDocument	节点所属的文档
如果是Document节点
那么这个值为null	Document对象或null
textContent	如果是Text或Conment节点
那么这个值为文本内容
如果是Element或DocumentFragment
那么这个值为所有子孙
Text节点拼接成的文本内容	字符串


节点类型
Element	一个文档中的元素
Attribute	元素的属性
Text	元素的文本内容
Comment	文档中的注释
Document	一个文档
DocumentType	文档类型
DocumentFragment	文档片段，在文档中不存在的节点
　	　

```


