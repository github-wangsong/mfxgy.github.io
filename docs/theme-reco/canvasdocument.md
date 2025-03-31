---
title: canvas文档
date: 2023-11-29
---
# canvas

## canvas
::: demo
```vue
  <template>
      <div>
          <canvas id='canvas1' width="600" height="600"></canvas>
      </div>
  </template> 

  <script>
  export default {
      data () {
        return {
          canvas: null,
          ctx: null,
          speed: 0
        }
      },
      mounted () {
        this.$nextTick(() => {
          this.canvas = document.querySelector("#canvas1")
          this.ctx = this.canvas.getContext("2d")
          this.drawCircle(10,10,10,'#ccc','#ccc')
          this.move(() => {
            this.drawCircle(10,10,10,'#ccc','#ccc')
          })
        })
      },
      methods: {
        init () {
          
          //this.drawLine(10,10,50,10, 5)
          //this.drawLine(10,20,50,20, 2)
          //this.drawLine(10,30,50,30, 6)
          //this.drawLine(10,40,50,40)
          //this.continuousLine([[10, 10], [20, 10],[20, 20],[10, 20],[10, 10]])
          //this.drawRect(10,10,40,40)
          //this.drawRect(20,20,20,20)
          //this.drawCircle(30,30,30)
          //this.drawCircle(30,30,20)
          this.drawImage('../../public/logo.png')
        },
        // 画直线
        drawLine (startX, startY, endX, endY, w, lineCap, lineJoin, setLineDash) {
            this.ctx.beginPath()

            this.ctx.lineWidth = w || 1 // 线条粗细
            this.ctx.lineCap = lineCap || 'butt' // 线条开始和结束处的样式butt/round/square
            this.ctx.lineJoin = lineJoin || 'miter' // 线条连接处的样式 miter/bevel/round
            this.ctx.setLineDash(setLineDash || [0, 0]) // 设置线条虚实样式

            this.ctx.moveTo(startX, startY)
            this.ctx.lineTo(endX, endY)
            this.ctx.stroke()
            this.ctx.closePath()
        },
        // 连续画线(多边形)
        continuousLine (arrData) {
          arrData.forEach((item, index) => {
            if (index === 0) {
              this.ctx.moveTo(item[0], item[1])
            } else {
              this.ctx.lineTo(item[0], item[1])
            }
          })
          this.ctx.stroke()
        },
        // 绘制矩形
        drawRect (x, y, w, h, strokeStyle, fillStyle ) {
          this.ctx.rect(x, y, w, h)
          if (strokeStyle) {
            this.ctx.strokeStyle = strokeStyle;
          }
          if (fillStyle) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fill();
          }
          this.ctx.stroke();
        },
        // 绘制圆形
        drawCircle (x, y, r, strokeStyle, fillStyle) {
          this.ctx.save();

          this.ctx.beginPath()
          this.ctx.arc(x, y, r, 0, 360 * Math.PI/180);
          if (strokeStyle) {
            this.ctx.strokeStyle = strokeStyle;
          }
          if (fillStyle) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fill();
          }
          this.ctx.stroke();
          this.ctx.closePath()

          this.ctx.restore();
        },
        drawImage (src, ) {
          const img = new Image();
          img.src = src
          img.onload = () => {
            this.ctx.drawImage(img, 10, 10, 100, 100);
          }
        },
        // 移动
        move () {
          this.speed += 2
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.drawCircle(10 + this.speed,10,10,'#ccc','#ccc')
          // requestAnimationFrame(this.move)
        },
        
      }
  }
  </script>
  <style>
      #canvas1 {
        border: 1px solid #ccc;
      }
  </style>
```
:::

## matter
::: demo
```vue
  <template>
      <div>
          <button @click='handelClick'>按钮</button>
          <div id='matter'></div>
      </div>
  </template> 

  <script>
  export default {
    data () {
      return {
        MainBall: null
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.creatMatter()
      })
    },
    methods: {
      creatMatter () {
        const Matter = this.$matter
        const Engine = Matter.Engine
        const Render = Matter.Render
        const Bodies = Matter.Bodies
        const Composite = Matter.Composite
        const Runner = Matter.Runner

        // 3. 创建引擎
        let engine = Engine.create({
          gravity: { x: 0, y: 0 }, // 关闭重力效果
        })

        // 4. 创建渲染器，并将引擎连接到画布上
        let render = Render.create({
          element: document.getElementById('matter'), // 绑定页面元素
          engine: engine, // 绑定引擎
          options: {
            width: 800,
            height: 400,
            background: 'transparent'
          },
        })

        // 5-2. 创建地面，将isStatic设为true，表示物体静止
        let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

        this.MainBall = this.createMainBall()

        // 6. 将所有物体添加到世界中
        Composite.add(engine.world, [ ground, this.MainBall, ...this.createBall(),...this.createWall()])

        // 7. 执行渲染操作
        Render.run(render)

        // 8. 创建运行方法
        var runner = Runner.create()

        // 9. 运行渲染器
        Runner.run(runner, engine)

      },
      handelClick () {
        this.$matter.Body.applyForce( this.MainBall, this.MainBall.position, {x: 0.01, y: 0});
      },
      createMainBall() {
        // 创建母球
        var cueBall = this.$matter.Bodies.circle(100, 200, 10, {
          restitution: 0.8, // 调整回弹系数以控制球的弹跳
        });
        return cueBall;
      },
      createBall() {
        // 创建被打击的球
        var ballRadius = 10;
        var objectBalls = [];
        var numRows = 6;
        var startX = 500;
        var startY = 200;
        for (var row = 0; row < numRows; row++) {
            var ballsInRow = row + 1;
            var rowStartX = startX;
            var rowStartY = startY - row * ballRadius;
            for (var i = 0; i < ballsInRow; i++) {
                var x = rowStartX + (row - numRows / 2) * ballRadius * 2;
                var y = rowStartY + i * ballRadius * 2;

                var ball = this.$matter.Bodies.circle(x, y, ballRadius, {
                    restitution: 0.8, // 调整回弹系数以控制球的弹跳
                });

                objectBalls.push(ball);
            }
        }
        return objectBalls
      },
      createWall() {
          // 创建一个静态矩形刚体
          var staticRect =  this.$matter.Bodies.rectangle(-10000, -450, 30000, 1000, {
            isStatic: true,
            restitution: 1, // 调整回弹系数以控制球的弹跳
          });

          var staticRectBanner = this.$matter.Bodies.rectangle(0, 850, 30000, 1000, {
            isStatic: true,
            restitution: 1, // 调整回弹系数以控制球的弹跳
          });

          var leftWall = this.$matter.Bodies.rectangle(-4950, 0, 10000, 1000000, {
            isStatic: true,
            restitution: 1, // 调整回弹系数以控制球的弹跳
          });
          var rightWall = this.$matter.Bodies.rectangle(800, 0, 100, 1000000, {
            isStatic: true,
            restitution: 1, // 调整回弹系数以控制球的弹跳
          });
          return [staticRect, staticRectBanner, leftWall, rightWall]
      }
    }
  }
  </script>
  <style>
      #canvas1 {
        border: 1px solid #ccc;
      }
  </style>
```
:::

------

## 绘制图片-drawImage

- 示例
  ```
    const canvas = document.getElementById("canvas");
    const ctx =canvas.getContext("2d");
    const img = document.getElementById("img");

    ctx.drawImage(img, x, y); // 语法一
    ctx.drawImage(img, x, y, width, height); // 语法二
    ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height); // 语法三

  ```
<details>
<summary>属性详情</summary>
  <table>
    <tr>
      <th>参数</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>img</td>
      <td>图像/画布/视频对象</td>
    </tr>
    <tr>
      <td>sx</td>
      <td>可选。开始剪切的 x 坐标位置。</td>
    </tr>
    <tr>
      <td>sy</td>
      <td>可选。开始剪切的 y 坐标位置。</td>
    </tr>
    <tr>
      <td>swidth</td>
      <td>可选。被剪切图像的宽度。</td>
    </tr>
    <tr>
      <td>sheight</td>
      <td>可选。被剪切图像的高度。</td>
    </tr>
    <tr>
      <td>x</td>
      <td>在画布上放置图像的 x 坐标位置。</td>
    </tr>
    <tr>
      <td>y</td>
      <td>在画布上放置图像的 y 坐标位置。</td>
    </tr>
    <tr>
      <td>width</td>
      <td>可选。要使用的图像的宽度。（伸展或缩小图像）</td>
    </tr>
    <tr>
      <td>height</td>
      <td>可选。要使用的图像的高度。（伸展或缩小图像）</td>
    </tr>
  </table>
</details>

---

## 填充文字-fillText

- 示例
  ```
    const canvas = document.getElementById("canvas");
    const ctx =canvas.getContext("2d");

    ctx.fillText(text, x, y, maxWidth);

  ```
<details>
<summary>属性详情</summary>
  <table>
    <tr>
      <th>参数</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>text</td>
      <td>规定在画布上输出的文本。</td>
    </tr>
    <tr>
      <td>x</td>
      <td>在画布上放置图像的 x 坐标位置。</td>
    </tr>
    <tr>
      <td>y</td>
      <td>在画布上放置图像的 y 坐标位置。</td>
    </tr>
    <tr>
      <td>maxWidth</td>
      <td>可选。要使用的图像的宽度。（伸展或缩小图像）</td>
    </tr>
  </table>
</details>

---


