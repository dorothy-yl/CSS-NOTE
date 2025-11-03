# CSS核心知识面试题汇总 ⭐⭐⭐⭐⭐

> 💡 **重要程度**: 高频必考（约90%的前端面试会涉及）
> 📌 **记忆口诀**: **盒模型content为核、选择器权重记忆、布局单位要灵活**
> 🎯 **学习建议**: 掌握盒模型、选择器优先级、布局单位、display属性四大核心

---

## 📋 快速导航

| 章节 | 重要级别 | 核心内容 | 记忆口诀 |
|------|---------|---------|----------|
| [一、CSS盒模型](#一css盒模型) | ⭐⭐⭐⭐⭐ | 标准盒模型、IE盒模型 | content为核、border-box |
| [二、选择器优先级](#二css选择器的优先级) | ⭐⭐⭐⭐⭐ | 权重计算、层叠规则 | ID类标签、important最大 |
| [三、display属性](#三display属性详解) | ⭐⭐⭐⭐⭐ | inline、block、inline-block | 行内块级记清楚 |
| [四、元素隐藏](#四隐藏元素的方法) | ⭐⭐⭐⭐ | display、visibility、opacity | 显隐占位有区别 |
| [五、CSS单位](#五css单位) | ⭐⭐⭐⭐ | px、rem、em | 绝对相对要分清 |
| [六、CSS继承](#六css属性继承) | ⭐⭐⭐ | 可继承属性、不可继承属性 | 字体文本可继承 |
| [七、CSS预处理器](#七css预处理器) | ⭐⭐⭐ | SASS、LESS、Stylus | 变量嵌套混入 |

---

## 🎯 核心记忆口诀

### CSS全局记忆法
```
盒模型content为核、标准IE要分清
选择器ID类标签、important权重最高
display行内块级、inline-block最灵活
单位px绝对、rem相对根元素
```

### 盒模型记忆法
```
标准盒模型：width只是content宽度
IE盒模型：width包含padding和border
box-sizing: content-box(标准) 或 border-box(IE)
```

### 选择器优先级记忆法
```
!important > 行内样式 > ID > 类/伪类/属性 > 标签 > 通配符
权重：行内1000、ID100、类10、标签1
```

---

## 一、CSS盒模型

### 📝 1. 什么是CSS盒模型？ ⭐⭐⭐⭐⭐ 🔥 ⚠️

**定义：**
- 在HTML页面中，所有元素都可以看成是一个**矩形盒子**
- 盒子由**内容(content)、内边距(padding)、边框(border)、外边距(margin)**四部分组成

**盒子组成部分：**
| 部分 | 说明 | CSS属性 |
|------|------|---------|
| **content** | 内容区域 | width、height |
| **padding** | 内边距，内容与边框之间的距离 | padding |
| **border** | 边框 | border |
| **margin** | 外边距，盒子与其他盒子之间的距离 | margin |

**视觉示意：**
```
┌─────────────── margin ───────────────┐
│  ┌─────────── border ───────────┐   │
│  │  ┌─────── padding ────────┐  │   │
│  │  │                         │  │   │
│  │  │       content           │  │   │
│  │  │                         │  │   │
│  │  └─────────────────────────┘  │   │
│  └───────────────────────────────┘   │
└──────────────────────────────────────┘
```

**记忆口诀：**
```
内容content为核心、padding内边距、border边框、margin外边距
从里到外：content → padding → border → margin
```

---

### 📝 2. 标准盒模型和IE盒模型的区别？ ⭐⭐⭐⭐⭐ 🔥 ⚠️

**核心区别：**
width/height的计算方式不同

#### 标准盒模型（W3C盒模型）
- **width/height** 只包含 **content**
- 元素实际占用宽度 = `margin + border + padding + content`
- CSS设置：`box-sizing: content-box`（默认值）

```css
.box {
  width: 200px;
  padding: 20px;
  border: 10px solid;
  margin: 10px;
  box-sizing: content-box;  /* 标准盒模型 */
}
/* 实际占用宽度 = 10 + 10 + 20 + 200 + 20 + 10 + 10 = 280px */
/* content宽度 = 200px */
```

#### IE盒模型（怪异盒模型）
- **width/height** 包含 **content + padding + border**
- 元素实际占用宽度 = `margin + width`
- CSS设置：`box-sizing: border-box`

```css
.box {
  width: 200px;
  padding: 20px;
  border: 10px solid;
  margin: 10px;
  box-sizing: border-box;  /* IE盒模型 */
}
/* 实际占用宽度 = 10 + 200 + 10 = 220px */
/* content宽度 = 200 - 20*2 - 10*2 = 140px */
```

**对比表格：**
| 特性 | 标准盒模型 | IE盒模型 |
|------|-----------|----------|
| **width包含** | 只有content | content + padding + border |
| **box-sizing** | content-box | border-box |
| **内容宽度计算** | width = content | width - padding - border = content |
| **实际占用宽度** | margin + border + padding + width | margin + width |
| **推荐使用** | 默认行为 | ✅ 更直观，推荐使用 |

**记忆口诀：**
```
标准盒模型：width只是content
IE盒模型：width包含padding和border（更直观）
box-sizing控制：content-box(标准) 或 border-box(IE)
```

**浏览器默认盒模型：**
- **Chrome、Firefox、Safari等现代浏览器**：默认使用**标准盒模型**（content-box）
- **IE6-7（怪异模式）**：使用IE盒模型（border-box）
- **IE8+（标准模式）**：使用标准盒模型（content-box）

**最佳实践：**
```css
/* ✅ 推荐全局设置为IE盒模型，更符合直觉 */
* {
  box-sizing: border-box;
}
```

---

## 二、CSS选择器的优先级

### 📝 3. CSS选择器的优先级规则是什么？ ⭐⭐⭐⭐⭐ 🔥 ⚠️

**CSS的三大特性：**
1. **继承性**：子元素可以继承父元素的某些样式
2. **层叠性**：多个样式可以作用于同一个元素
3. **优先级**：当多个样式冲突时，根据权重决定显示哪个

**优先级从高到低：**
```
!important > 行内样式 > ID选择器 > 类/伪类/属性选择器 > 标签选择器 > 通配符
```

**权重计算：**
| 选择器类型 | 权重 | 示例 |
|-----------|------|------|
| **!important** | ∞（最高） | `color: red !important;` |
| **行内样式** | 1000 | `<div style="color: red">` |
| **ID选择器** | 100 | `#header` |
| **类选择器** | 10 | `.title` |
| **伪类选择器** | 10 | `:hover` |
| **属性选择器** | 10 | `[type="text"]` |
| **标签选择器** | 1 | `div` |
| **伪元素** | 1 | `::before` |
| **通配符** | 0 | `*` |

**权重计算示例：**
```css
/* 权重 = 100 + 10 + 1 = 111 */
#header .nav li { color: red; }

/* 权重 = 10 + 10 + 1 = 21 */
.container .nav li { color: blue; }

/* 权重 = 1 + 1 + 1 = 3 */
div ul li { color: green; }

/* 最终显示红色，因为第一个选择器权重最高 */
```

**特殊规则：**
1. **!important** 优先级最高，但尽量避免使用
2. 权重相同时，后定义的覆盖先定义的
3. 继承的样式权重为0
4. 直接作用于元素的样式优先于继承的样式

**记忆口诀：**
```
!important最霸道
行内样式权重千
ID一百类十个
标签一分通配零
```

---

## 三、display属性详解

### 📝 4. display的常用值及其特点？ ⭐⭐⭐⭐⭐ 🔥

**三大核心值对比：**

| 属性值 | inline（内联） | block（块级） | inline-block（内联块） |
|--------|----------------|---------------|----------------------|
| **独占一行** | ❌ 不独占 | ✅ 独占 | ❌ 不独占 |
| **width/height** | ❌ 不能设置 | ✅ 可以设置 | ✅ 可以设置 |
| **margin/padding** | 只有水平方向 | 所有方向 | 所有方向 |
| **默认宽度** | 由内容决定 | 父容器100% | 由内容决定 |
| **常见元素** | span、a、em | div、p、h1-h6 | img、input、button |

#### 1) inline（内联元素）
```css
span {
  display: inline;
  width: 100px;    /* ❌ 无效 */
  height: 50px;    /* ❌ 无效 */
  margin-top: 10px; /* ❌ 无效 */
}
```

特点：
- 元素在一行内显示，不会换行
- 不能设置width和height
- 只能设置水平方向的margin和padding
- 内容决定元素大小

#### 2) block（块级元素）
```css
div {
  display: block;
  width: 200px;     /* ✅ 有效 */
  height: 100px;    /* ✅ 有效 */
  margin: 20px;     /* ✅ 有效 */
}
```

特点：
- 独占一行，会换行
- 可以设置width和height
- 可以设置所有方向的margin和padding
- 默认宽度是父容器的100%

#### 3) inline-block（内联块级元素）⭐⭐⭐⭐⭐
```css
span {
  display: inline-block;
  width: 120px;     /* ✅ 有效 */
  height: 40px;     /* ✅ 有效 */
  margin: 10px;     /* ✅ 有效 */
}
```

特点：
- 结合了inline和block的特性
- 像inline一样在一行内显示，不会换行
- 像block一样可以设置width、height、margin、padding
- 常用于导航菜单、按钮组、图片列表等

**实际应用示例：**
```html
<style>
  span:first-child {
    display: inline-block;  /* 让span可以设置宽度 */
    width: 120px;          /* 现在可以设置宽度了 */
  }
</style>

<p><span>上次登录时间:</span> <span>2022-7-11</span></p>

<!-- 效果：
上次登录时间:     2022-7-11
第一个span固定120px宽度，布局更整齐
-->
```

**其他display值：**
- `none`：元素不显示，不占空间
- `flex`：弹性布局
- `grid`：网格布局
- `table`：表格布局

**记忆口诀：**
```
inline行内不换行、宽高设置都无效
block块级独占行、宽高边距全能设
inline-block最灵活、行内显示可设宽高
```

---

## 四、隐藏元素的方法

### 📝 5. 如何隐藏元素？各有什么区别？ ⭐⭐⭐⭐

**九种隐藏元素的方法对比：**

| 方法 | 是否占据空间 | 是否可交互 | 是否影响子元素 | 应用场景 |
|------|-------------|-----------|---------------|----------|
| **display: none** | ❌ 不占据 | ❌ 不可交互 | ✅ 影响 | 完全隐藏 |
| **visibility: hidden** | ✅ 占据 | ❌ 不可交互 | ✅ 影响 | 保留布局空间 |
| **opacity: 0** | ✅ 占据 | ✅ 可交互 | ✅ 影响 | 透明动画 |
| **position + left: -9999px** | ❌ 不占据 | ❌ 不可交互 | ✅ 影响 | 移出视口 |
| **clip-path: polygon(0 0)** | ✅ 占据 | ❌ 不可交互 | ✅ 影响 | 裁剪隐藏 |
| **transform: scale(0)** | ✅ 占据 | ❌ 不可交互 | ✅ 影响 | 缩放动画 |
| **height: 0 + overflow: hidden** | ❌ 不占据 | ❌ 不可交互 | ✅ 影响 | 折叠动画 |
| **z-index: -1** | ✅ 占据 | ❌ 不可交互 | ❌ 不影响 | 层级隐藏 |
| **filter: blur(0)** | ✅ 占据 | ✅ 可交互 | ✅ 影响 | 模糊效果 |

**详细说明：**

#### 1) display: none（最常用）
```css
.hide {
  display: none;  /* 元素完全消失，不占空间 */
}
```
- ✅ 完全隐藏，不占据空间
- ❌ 不可交互
- 触发重排（reflow）和重绘（repaint）

#### 2) visibility: hidden
```css
.hide {
  visibility: hidden;  /* 元素不可见，但占据空间 */
}
```
- ✅ 占据空间位置
- ❌ 不可交互
- 只触发重绘（repaint）

#### 3) opacity: 0
```css
.hide {
  opacity: 0;  /* 透明度为0，元素透明但仍占据空间 */
}
```
- ✅ 占据空间
- ⚠️ 仍可交互（可以点击）
- 适合做渐变动画

#### 4) 移出视口
```css
.hide {
  position: absolute;
  left: -9999px;  /* 移到屏幕外 */
}
```

#### 5) 裁剪路径
```css
.hide {
  clip-path: polygon(0 0, 0 0, 0 0, 0 0);  /* 裁剪为0大小 */
}
```

**记忆口诀：**
```
display不占位、visibility占位不可见
opacity透明可点击、position移出视口外
```

---

## 五、CSS单位

### 📝 6. px和rem的区别是什么？ ⭐⭐⭐⭐⭐ 🔥

**核心区别：**
| 单位 | 类型 | 参考基准 | 响应式 | 应用场景 |
|------|------|----------|--------|----------|
| **px** | 绝对单位 | 固定像素 | ❌ 不响应 | 固定尺寸、边框 |
| **rem** | 相对单位 | 根元素font-size | ✅ 响应式 | 响应式布局 |
| **em** | 相对单位 | 父元素font-size | ✅ 响应式 | 组件内部 |
| **%** | 相对单位 | 父元素尺寸 | ✅ 响应式 | 宽高比例 |
| **vw/vh** | 相对单位 | 视口宽高 | ✅ 响应式 | 全屏布局 |

#### px（像素）
```css
.box {
  width: 200px;    /* 固定200像素 */
  font-size: 16px;
}
```
- 绝对单位，显示器上的物理像素
- 每个像素大小固定
- 不会随屏幕尺寸变化

#### rem（root em）
```css
html {
  font-size: 16px;  /* 根元素字体大小 */
}

.box {
  width: 10rem;     /* 10 * 16px = 160px */
  font-size: 1.5rem;  /* 1.5 * 16px = 24px */
}
```
- 相对于根元素(html)的font-size
- 修改html的font-size，所有rem单位的元素都会等比缩放
- 适合做响应式布局

**常用技巧：**
```css
html {
  font-size: 62.5%;  /* 16px * 62.5% = 10px */
}

/* 现在 1rem = 10px，方便计算 */
.box {
  width: 20rem;  /* 200px */
  padding: 1.5rem;  /* 15px */
}
```

#### em
```css
.parent {
  font-size: 20px;
}

.child {
  font-size: 1.5em;  /* 1.5 * 20px = 30px */
}
```
- 相对于父元素的font-size
- 会产生层层嵌套的倍数关系

**记忆口诀：**
```
px绝对像素固定值
rem相对根元素font-size
em相对父元素会嵌套
vw/vh相对视口百分比
```

---

## 六、CSS属性继承

### 📝 7. 哪些CSS属性可以继承？ ⭐⭐⭐

**可继承属性（字体、文本、列表）：**

#### 1) 字体属性
- `font-family` - 字体系列
- `font-size` - 字体大小
- `font-weight` - 字体粗细
- `font-style` - 字体样式
- `font` - 字体简写

#### 2) 文本属性
- `color` - 文本颜色
- `line-height` - 行高
- `text-align` - 文本对齐
- `text-indent` - 文本缩进
- `letter-spacing` - 字符间距
- `word-spacing` - 单词间距

#### 3) 元素可见性
- `visibility` - 可见性

#### 4) 列表样式
- `list-style` - 列表样式
- `list-style-type` - 列表项标记
- `list-style-position` - 列表项位置

**不可继承属性（布局、盒模型）：**
- `display` - 显示类型
- `width`、`height` - 宽高
- `margin`、`padding` - 外边距、内边距
- `border` - 边框
- `position` - 定位
- `float` - 浮动
- `background` - 背景

**记忆口诀：**
```
字体文本可继承、颜色行高也能传
盒模型布局不继承、宽高边距各自算
```

---

## 七、CSS预处理器

### 📝 8. 常见的CSS预处理器有哪些？ ⭐⭐⭐

**四大预处理器对比：**

| 预处理器 | 语法 | 社区 | 特点 | 推荐度 |
|----------|------|------|------|--------|
| **SASS/SCSS** | .sass/.scss | 最成熟 | 功能最强大 | ⭐⭐⭐⭐⭐ |
| **LESS** | .less | 成熟 | 简单易用 | ⭐⭐⭐⭐ |
| **Stylus** | .styl | 较小 | 语法最灵活 | ⭐⭐⭐ |
| **PostCSS** | .css | 活跃 | 插件化、后处理 | ⭐⭐⭐⭐⭐ |

#### 1) SASS/SCSS（推荐）
```scss
// 变量
$primary-color: #3498db;

// 嵌套
.nav {
  background: $primary-color;

  ul {
    list-style: none;
  }

  li {
    display: inline-block;
  }
}

// 混入（Mixin）
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include flex-center;
}
```

#### 2) LESS
```less
// 变量
@primary-color: #3498db;

// 嵌套
.nav {
  background: @primary-color;

  ul {
    list-style: none;
  }
}

// 混入
.flex-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  .flex-center();
}
```

#### 3) PostCSS（后处理器）
```css
/* 自动添加浏览器前缀 */
.box {
  display: flex;  /* PostCSS会自动添加 -webkit-flex 等前缀 */
}
```

**预处理器的优势：**
1. 变量：统一管理颜色、尺寸等
2. 嵌套：更清晰的层级结构
3. 混入：复用样式代码
4. 函数：进行计算和逻辑处理
5. 模块化：@import拆分文件

**记忆口诀：**
```
SASS功能最强大、LESS简单易上手
Stylus语法最灵活、PostCSS插件化处理
```

---

## 八、核心速记（10分钟快速复习）

### 1. 盒模型
```
组成：content + padding + border + margin（从里到外）
标准盒模型：width = content
IE盒模型：width = content + padding + border（推荐）
box-sizing: content-box(标准) | border-box(IE)
```

### 2. 选择器优先级
```
!important > 行内1000 > ID100 > 类10 > 标签1 > 通配符0
权重相同：后定义覆盖先定义
继承样式：权重为0
```

### 3. display属性
```
inline：行内、不换行、不能设宽高
block：块级、独占一行、可设宽高
inline-block：行内块、不换行、可设宽高（最灵活）
none：不显示、不占空间
```

### 4. 元素隐藏
```
display:none - 不占空间、不可交互
visibility:hidden - 占空间、不可交互
opacity:0 - 占空间、可交互
```

### 5. CSS单位
```
px：绝对单位、固定像素
rem：相对根元素font-size、响应式布局
em：相对父元素font-size、组件内部
vw/vh：相对视口、全屏布局
```

### 6. 继承属性
```
可继承：字体(font-*)、文本(color、line-height、text-align)
不可继承：盒模型(width、height、margin、padding、border)
```

### 7. 预处理器
```
SASS：功能最强、社区最大
LESS：简单易用、Bootstrap使用
PostCSS：插件化、后处理（Autoprefixer）
```

---

## 九、TOP 15 高频面试题速答

### Q1: 什么是CSS盒模型？⭐⭐⭐⭐⭐ 🔥
所有元素都是矩形盒子，由content、padding、border、margin四部分组成。

### Q2: 标准盒模型和IE盒模型的区别？⭐⭐⭐⭐⭐ 🔥
标准盒模型width只包含content；IE盒模型width包含content+padding+border。

### Q3: 如何切换盒模型？⭐⭐⭐⭐⭐ 🔥
使用box-sizing属性：content-box(标准)、border-box(IE)。

### Q4: CSS选择器优先级顺序？⭐⭐⭐⭐⭐ 🔥
!important > 行内样式 > ID > 类/伪类/属性 > 标签 > 通配符

### Q5: inline、block、inline-block的区别？⭐⭐⭐⭐⭐ 🔥
inline不换行不能设宽高；block独占一行可设宽高；inline-block不换行可设宽高。

### Q6: display:none和visibility:hidden的区别？⭐⭐⭐⭐
display:none不占空间；visibility:hidden占空间但不可见。

### Q7: px和rem的区别？⭐⭐⭐⭐⭐ 🔥
px是绝对单位固定像素；rem相对根元素font-size，适合响应式布局。

### Q8: 如何实现1rem=10px？⭐⭐⭐⭐
设置html { font-size: 62.5%; }（16px * 62.5% = 10px）

### Q9: 哪些CSS属性可以继承？⭐⭐⭐
字体属性(font-*)、文本属性(color、line-height、text-align)、列表样式。

### Q10: opacity:0和visibility:hidden的区别？⭐⭐⭐⭐
opacity:0可以交互（可点击）；visibility:hidden不可交互。

### Q11: 如何隐藏元素且不占空间？⭐⭐⭐⭐
display:none 或 position:absolute + left:-9999px

### Q12: em和rem的区别？⭐⭐⭐⭐
em相对父元素font-size；rem相对根元素font-size。

### Q13: 常见的CSS预处理器有哪些？⭐⭐⭐
SASS/SCSS（功能强）、LESS（易用）、Stylus（灵活）、PostCSS（后处理）。

### Q14: box-sizing的默认值是什么？⭐⭐⭐⭐
content-box（标准盒模型）

### Q15: 如何让inline元素可以设置宽高？⭐⭐⭐⭐
设置display: inline-block 或 display: block

---

## 十、答题技巧与模板

### 模板1: 盒模型类问题
```
1. 组成：content、padding、border、margin
2. 标准 vs IE：width包含范围不同
3. box-sizing：content-box vs border-box
4. 推荐：border-box更直观
```

### 模板2: 选择器优先级
```
1. 优先级顺序：!important > 行内 > ID > 类 > 标签
2. 权重计算：1000、100、10、1
3. 特殊规则：权重相同后定义覆盖
4. 避免：尽量不用!important
```

### 模板3: display对比
```
1. 列举三种类型特点
2. 使用表格对比（换行、宽高、应用场景）
3. 举例说明使用场景
4. 记忆口诀总结
```

### 模板4: 隐藏元素方案
```
1. 列举多种方法
2. 对比占位、交互、性能
3. 说明适用场景
4. 推荐最佳实践
```

---

## 📖 学习建议

### 必须掌握（⭐⭐⭐⭐⭐）
1. CSS盒模型（标准 vs IE）
2. box-sizing属性的使用
3. 选择器优先级计算
4. display三大值（inline、block、inline-block）
5. px和rem的区别和使用

### 重要理解（⭐⭐⭐⭐）
6. 元素隐藏的多种方法及区别
7. CSS单位（px、rem、em、vw/vh）
8. CSS属性继承规则
9. 盒模型实际宽度计算

### 加分项（⭐⭐⭐）
10. CSS预处理器的使用
11. 响应式布局的单位选择
12. 性能优化（重排和重绘）

---

**最后更新**: 2025-09-30
**难度等级**: ⭐⭐⭐⭐⭐（基础必会）
**面试频率**: 极高（约90%的前端面试会涉及）