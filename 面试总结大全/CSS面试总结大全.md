# CSS面试总结大全

## 一、CSS盒模型

### 1. 盒模型组成部分
CSS盒模型包含四个部分：
- **content（内容）** - 元素的实际内容
- **padding（内边距）** - 内容与边框之间的空间
- **border（边框）** - 围绕内容和内边距的边框
- **margin（外边距）** - 元素与其他元素之间的空间

### 2. 标准盒模型 vs IE盒模型

**标准盒模型（content-box）：**
- width/height只包含content
- 总宽度 = width + padding + border + margin
- 默认行为

**IE盒模型（border-box）：**
- width/height包含content + padding + border
- 总宽度 = width + margin
- 通过`box-sizing: border-box`设置

### 3. 盒模型计算示例
```css
.box {
    width: 300px;
    padding: 30px;
    border: 5px solid #333;
    margin: 20px;
}
```

**标准盒模型总宽度：** 300 + (30×2) + (5×2) + (20×2) = 410px
**IE盒模型总宽度：** 300 + (20×2) = 340px

## 二、CSS选择器与优先级

### 1. 选择器优先级规则
优先级从高到低：
1. `!important` - 最高优先级
2. 内联样式 - 1000
3. ID选择器 - 100
4. 类选择器/属性选择器/伪类 - 10
5. 标签选择器 - 1
6. 通配符 - 0

### 2. 优先级计算示例
```css
a) style="color: red;"                    = 1000
b) #nav .menu li a:hover                  = 100 + 10 + 1 + 1 + 10 = 122
c) .header .nav ul li                     = 10 + 10 + 1 + 1 = 22
d) nav > ul > li > a                      = 1 + 1 + 1 + 1 = 4
e) * { color: black; }                    = 0
f) #content p.highlight                   = 100 + 1 + 10 = 111
```

**排序：** a > b > f > c > d > e

### 3. 选择器类型
- **基本选择器**：`*`, `E`, `#id`, `.class`
- **组合选择器**：`E F`, `E>F`, `E+F`, `E~F`
- **属性选择器**：`[attr]`, `[attr=value]`, `[attr^=value]`
- **伪类选择器**：`:hover`, `:focus`, `:nth-child()`
- **伪元素选择器**：`::before`, `::after`, `::first-line`

## 三、CSS布局

### 1. 水平垂直居中方法

**方法1：Flexbox（推荐）**
```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

**方法2：Grid**
```css
.parent {
    display: grid;
    place-items: center;
}
```

**方法3：绝对定位 + transform**
```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

**方法4：绝对定位 + margin auto**
```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 100px;
}
```

### 2. 三列布局实现

**Flex布局实现：**
```css
.container {
    display: flex;
    min-height: 100vh;
}
.left {
    width: 200px;
    background: #f0f0f0;
}
.right {
    width: 200px;
    background: #f0f0f0;
}
.center {
    flex: 1;
    background: #fff;
}
```

**Grid布局实现：**
```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    min-height: 100vh;
}
```

### 3. 响应式布局方案

**媒体查询：**
```css
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}
```

**Flexbox响应式：**
```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.card {
    flex: 1 1 calc(33.333% - 14px); /* 3列 */
}
@media (max-width: 1023px) {
    .card {
        flex: 1 1 calc(50% - 10px); /* 2列 */
    }
}
@media (max-width: 767px) {
    .card {
        flex: 1 1 100%; /* 1列 */
    }
}
```

## 四、BFC（块级格式化上下文）

### 1. 什么是BFC
BFC是一个独立的渲染区域，内部元素的布局不会影响外部元素。

### 2. 触发BFC的条件
- 根元素（`<html>`）
- 浮动元素（`float`不为`none`）
- 绝对定位元素（`position`为`absolute`或`fixed`）
- `display`为`inline-block`、`table-cell`、`flex`、`grid`等
- `overflow`不为`visible`

### 3. BFC的应用场景
- **清除浮动**：父元素创建BFC可以包含浮动子元素
- **防止margin重叠**：相邻元素的垂直margin不会合并
- **防止元素被浮动元素覆盖**：BFC元素不会被浮动元素覆盖
- **自适应两栏布局**：利用BFC实现自适应宽度

### 4. BFC应用示例
```css
/* 清除浮动 */
.container {
    overflow: hidden; /* 创建BFC */
}

/* 防止margin重叠 */
.box {
    overflow: hidden; /* 创建BFC */
    margin: 20px 0;
}
```

## 五、CSS单位

### 1. 单位类型对比

| 单位 | 特点 | 使用场景 |
|------|------|----------|
| px | 绝对单位，固定像素值 | 边框、1px细线、小图标 |
| em | 相对单位，相对于父元素字体大小 | 相对于父元素的场景 |
| rem | 相对单位，相对于根元素字体大小 | 字体大小、布局尺寸 |
| vw/vh | 视口宽度/高度的百分比 | 全屏布局 |
| % | 相对于父元素的百分比 | 响应式布局 |

### 2. rem适配方案
```css
/* 设置根元素字体大小 */
html {
    font-size: 625%; /* 1rem = 100px */
}

/* 使用rem单位 */
.button {
    width: 2.4rem;    /* 240px ÷ 100px */
    height: 0.48rem;  /* 48px ÷ 100px */
    font-size: 0.16rem; /* 16px ÷ 100px */
}
```

### 3. 响应式单位使用场景
- **使用px**：边框、1px细线、小图标、固定尺寸元素
- **使用rem**：字体大小、布局尺寸、需要缩放的元素
- **使用em**：相对于父元素字体大小的场景
- **使用vw/vh**：全屏布局、视口相关尺寸

## 六、CSS3新特性

### 1. 常用CSS3特性
- **圆角**：`border-radius`
- **阴影**：`box-shadow`、`text-shadow`
- **渐变**：`linear-gradient`、`radial-gradient`
- **动画**：`animation`、`transition`
- **变换**：`transform`
- **弹性布局**：`flexbox`
- **网格布局**：`grid`

### 2. Transform变换函数
- **平移**：`translate(x, y)`、`translateX()`、`translateY()`
- **旋转**：`rotate(angle)`、`rotateX()`、`rotateY()`、`rotateZ()`
- **缩放**：`scale(x, y)`、`scaleX()`、`scaleY()`
- **倾斜**：`skew(x, y)`、`skewX()`、`skewY()`
- **矩阵**：`matrix()`、`matrix3d()`

### 3. 动画实现

**淡入淡出效果：**
```css
@keyframes fadeInOut {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
}

.fade-element {
    animation: fadeInOut 2s ease-in-out infinite;
}

/* 或使用transition */
.fade-hover {
    opacity: 1;
    transition: opacity 0.3s ease;
}
.fade-hover:hover {
    opacity: 0.5;
}
```

### 4. Transition vs Animation
- **Transition**：需要触发条件，只能定义开始和结束状态，一次性
- **Animation**：可自动执行，可定义多个关键帧，可循环播放，更复杂的动画

## 七、元素隐藏方法

### 1. 隐藏方法对比

| 方法 | 是否占空间 | 是否可交互 | 使用场景 |
|------|------------|------------|----------|
| `display: none` | 否 | 否 | 完全移除，骨架屏切换 |
| `visibility: hidden` | 是 | 否 | 隐藏但占空间，Tab切换 |
| `opacity: 0` | 是 | 是 | 透明但可交互，图片懒加载 |
| `position: absolute; left: -9999px` | 否 | 否 | 移出视口 |
| `clip-path: polygon(0 0, 0 0, 0 0, 0 0)` | 是 | 否 | 裁剪隐藏 |

### 2. 场景选择
- **骨架屏切换**：`display: none/block` - 需要完全替换内容
- **下拉菜单**：`display: none/block` 或 `visibility` - 快速切换
- **图片懒加载占位**：`opacity: 0` 配合过渡 - 平滑显示效果
- **Tab切换**：`display: none/block` - 只显示当前内容

## 八、CSS继承

### 1. 可继承的属性
- **字体系列**：`font-family`、`font-size`、`font-weight`
- **文本属性**：`color`、`line-height`、`text-align`
- **可见性**：`visibility`
- **列表样式**：`list-style`

### 2. 不可继承的属性
- **盒模型**：`width`、`height`、`padding`、`margin`、`border`
- **定位**：`position`、`top`、`left`、`right`、`bottom`
- **背景**：`background`、`background-color`
- **显示**：`display`、`float`、`clear`

## 九、Flex布局

### 1. 容器属性
- `display: flex` - 设置为flex容器
- `flex-direction` - 主轴方向（row/column）
- `justify-content` - 主轴对齐方式
- `align-items` - 交叉轴对齐方式
- `flex-wrap` - 是否换行
- `align-content` - 多行对齐方式

### 2. 项目属性
- `flex-grow` - 放大比例
- `flex-shrink` - 缩小比例
- `flex-basis` - 基础大小
- `flex` - 简写属性
- `align-self` - 单个项目对齐方式
- `order` - 排序

### 3. Flex布局示例
```css
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.item {
    flex: 1;
    align-self: flex-start;
    order: 1;
}
```

## 十、Grid布局

### 1. 容器属性
- `display: grid` - 设置为grid容器
- `grid-template-columns` - 列轨道大小
- `grid-template-rows` - 行轨道大小
- `grid-gap` - 网格间距
- `justify-items` - 水平对齐
- `align-items` - 垂直对齐
- `place-items` - 简写属性

### 2. 项目属性
- `grid-column` - 列位置
- `grid-row` - 行位置
- `grid-area` - 区域名称
- `justify-self` - 单个项目水平对齐
- `align-self` - 单个项目垂直对齐

### 3. Grid布局示例
```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    grid-gap: 20px;
}

.header {
    grid-column: 1 / -1;
}
.sidebar {
    grid-row: 2;
}
.main {
    grid-column: 2;
    grid-row: 2;
}
.footer {
    grid-column: 1 / -1;
}
```

## 十一、响应式设计

### 1. 响应式设计原理
网页能够根据不同设备屏幕大小自动调整布局和样式。

### 2. 实现方法
- **媒体查询**：`@media`
- **弹性布局**：`flex`、`grid`
- **相对单位**：`%`、`rem`、`vw`、`vh`
- **响应式图片**：`srcset`、`sizes`

### 3. 媒体查询断点
```css
/* 移动端 */
@media (max-width: 767px) { }

/* 平板端 */
@media (min-width: 768px) and (max-width: 1023px) { }

/* 桌面端 */
@media (min-width: 1024px) { }
```

### 4. 响应式图片
```html
<img src="small.jpg" 
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
     alt="响应式图片">
```

## 十二、性能优化

### 1. CSS性能优化
- 避免使用`@import`
- 减少重绘和回流
- 使用`transform`和`opacity`做动画
- 合理使用选择器
- 压缩CSS文件
- 使用CSS预处理器

### 2. 减少重绘和回流
- 使用`transform`代替改变位置属性
- 使用`opacity`代替`visibility`
- 避免频繁操作DOM
- 批量修改样式
- 使用`will-change`属性

### 3. 动画性能优化
```css
.animated-element {
    will-change: transform, opacity;
    transform: translateZ(0); /* 开启硬件加速 */
}
```

## 十三、清除浮动

### 1. 使用伪元素清除浮动
```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

.clearfix::before {
    content: "";
    display: table;
}
```

### 2. 其他清除浮动的方法
```css
/* 方法1：使用overflow */
.parent {
    overflow: hidden;
}

/* 方法2：使用display: flow-root */
.parent {
    display: flow-root;
}

/* 方法3：使用flexbox */
.parent {
    display: flex;
}
```

## 十四、CSS预处理器

### 1. 常用预处理器
- **Sass/SCSS** - 功能最强大
- **Less** - 学习成本低
- **Stylus** - 语法最灵活

### 2. 预处理器特性
- 变量
- 嵌套
- 混合（Mixins）
- 继承
- 函数
- 条件语句
- 循环

### 3. SCSS示例
```scss
$primary-color: #007bff;
$font-size: 16px;

@mixin button-style($bg-color, $text-color) {
    background-color: $bg-color;
    color: $text-color;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
}

.button {
    @include button-style($primary-color, white);
    font-size: $font-size;
    
    &:hover {
        opacity: 0.8;
    }
}
```

## 十五、CSS模块化

### 1. CSS模块化方案
- **BEM命名规范**
- **CSS Modules**
- **Styled Components**
- **CSS-in-JS**

### 2. BEM命名规范
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }

/* Modifier */
.card--large { }
.card__title--highlighted { }
```

### 3. CSS Modules示例
```css
/* styles.module.css */
.title {
    color: blue;
}

.content {
    font-size: 14px;
}
```

```javascript
// component.js
import styles from './styles.module.css';

function Component() {
    return (
        <div>
            <h1 className={styles.title}>Title</h1>
            <p className={styles.content}>Content</p>
        </div>
    );
}
```
