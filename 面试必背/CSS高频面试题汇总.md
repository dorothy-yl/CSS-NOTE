# CSS 高频面试题汇总

## 快速导航

### 核心必背知识点
| 知识点 | 重要级别 | 页码 |
|--------|---------|------|
| 盒子模型 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第1节 |
| BFC | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第2节 |
| Flex布局 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第3节 |
| Grid布局 | ⭐⭐⭐⭐ 🔥 | 第4节 |
| 定位(position) | ⭐⭐⭐⭐⭐ 🔥 | 第5节 |
| 水平垂直居中 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | 第6节 |
| 选择器优先级 | ⭐⭐⭐⭐⭐ | 第7节 |
| 伪类和伪元素 | ⭐⭐⭐⭐ | 第8节 |

### 高频考点
| 知识点 | 重要级别 | 页码 |
|--------|---------|------|
| 响应式布局 | ⭐⭐⭐⭐ | 第9节 |
| rem/em/px/vw | ⭐⭐⭐⭐ | 第10节 |
| 层叠上下文 | ⭐⭐⭐⭐ | 第11节 |
| 浮动和清除浮动 | ⭐⭐⭐⭐ | 第12节 |
| CSS3新特性 | ⭐⭐⭐⭐ | 第13节 |
| 动画和过渡 | ⭐⭐⭐⭐ | 第14节 |
| 移动端适配 | ⭐⭐⭐⭐ | 第15节 |

### 重要知识点
| 知识点 | 重要级别 | 页码 |
|--------|---------|------|
| CSS预处理器 | ⭐⭐⭐ | 第16节 |
| CSS性能优化 | ⭐⭐⭐ | 第17节 |
| 隐藏元素方式 | ⭐⭐⭐ | 第18节 |
| 重绘和回流 | ⭐⭐⭐ | 第19节 |
| CSS变量 | ⭐⭐⭐ | 第20节 |

---

## 一、CSS基础

### 1. 盒子模型
#### 热度：⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目1：什么是CSS盒子模型？标准盒模型和怪异盒模型的区别是什么？

**答案：**
CSS盒子模型是CSS布局的基础，由内容(content)、内边距(padding)、边框(border)、外边距(margin)四部分组成。

**标准盒模型（W3C盒模型）：**
- 计算方式：`width = content`
- 元素实际宽度 = `width + padding + border + margin`
- 通过 `box-sizing: content-box` 设置（默认值）

**怪异盒模型（IE盒模型）：**
- 计算方式：`width = content + padding + border`
- 元素实际宽度 = `width + margin`
- 通过 `box-sizing: border-box` 设置

```css
/* 标准盒模型 */
.box1 {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 10px solid #000;
  /* 实际宽度 = 200 + 20*2 + 10*2 = 260px */
}

/* 怪异盒模型 */
.box2 {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 10px solid #000;
  /* 实际宽度 = 200px，content = 200 - 20*2 - 10*2 = 140px */
}
```

**追问：实际开发中更推荐使用哪种？**
更推荐使用 `border-box`，因为：
1. 更符合直觉，设置的width就是最终宽度
2. 方便计算和布局
3. 在响应式布局中更好用

```css
/* 常见的全局设置 */
* {
  box-sizing: border-box;
}
```

---

### 2. BFC（块级格式化上下文）
#### 热度：⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目2：什么是BFC？如何创建BFC？BFC有什么作用？

**答案：**
BFC（Block Formatting Context，块级格式化上下文）是Web页面中盒模型布局的CSS渲染模式，指一个独立的渲染区域。

**BFC的创建方式：**
1. 根元素（`<html>`）
2. `float` 不为 `none`
3. `position` 为 `absolute` 或 `fixed`
4. `display` 为 `inline-block`、`table-cell`、`table-caption`、`flex`、`inline-flex`、`grid`、`inline-grid`
5. `overflow` 不为 `visible`（常用 `hidden`、`auto`、`scroll`）

**BFC的特性和作用：**

**1. 清除浮动**
```css
/* 父元素创建BFC可以包含浮动子元素 */
.container {
  overflow: hidden; /* 创建BFC */
}
.child {
  float: left;
}
```

**2. 防止margin重叠**
```css
/* 不同BFC中的元素margin不会重叠 */
.wrapper {
  overflow: hidden; /* 创建BFC */
}
```

**3. 阻止元素被浮动元素覆盖（实现两栏布局）**
```css
.left {
  float: left;
  width: 200px;
}
.right {
  overflow: hidden; /* 创建BFC，不会被left覆盖 */
}
```

---

### 3. Flex布局
#### 热度：⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目3：详细说明Flex布局的属性和使用场景

**答案：**

**容器属性（6个）：**

```css
.container {
  display: flex;

  /* 1. flex-direction: 主轴方向 */
  flex-direction: row | row-reverse | column | column-reverse;

  /* 2. flex-wrap: 换行 */
  flex-wrap: nowrap | wrap | wrap-reverse;

  /* 3. flex-flow: direction和wrap的简写 */
  flex-flow: row wrap;

  /* 4. justify-content: 主轴对齐 */
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;

  /* 5. align-items: 交叉轴对齐 */
  align-items: flex-start | flex-end | center | baseline | stretch;

  /* 6. align-content: 多行交叉轴对齐 */
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

**项目属性（6个）：**

```css
.item {
  /* 1. order: 排序，数值越小越靠前 */
  order: 0;

  /* 2. flex-grow: 放大比例，默认0 */
  flex-grow: 0;

  /* 3. flex-shrink: 缩小比例，默认1 */
  flex-shrink: 1;

  /* 4. flex-basis: 分配空间前的初始大小 */
  flex-basis: auto | 200px;

  /* 5. flex: grow shrink basis的简写 */
  flex: 0 1 auto; /* 默认值 */
  flex: 1; /* 等同于 1 1 0% */
  flex: auto; /* 等同于 1 1 auto */
  flex: none; /* 等同于 0 0 auto */

  /* 6. align-self: 单个项目的对齐 */
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

**常见应用场景：**

```css
/* 1. 水平垂直居中 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. 等分布局 */
.item {
  flex: 1;
}

/* 3. 左右固定，中间自适应 */
.left, .right {
  flex: 0 0 200px;
}
.center {
  flex: 1;
}

/* 4. 底部固定布局 */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
.footer {
  flex: 0 0 auto;
}
```

**追问：flex: 1 的含义？**
`flex: 1` 等同于 `flex: 1 1 0%`：
- `flex-grow: 1` - 可以放大，会占据剩余空间
- `flex-shrink: 1` - 可以缩小
- `flex-basis: 0%` - 初始大小为0，完全根据内容和flex-grow分配空间

---

### 4. Grid布局
#### 热度：⭐⭐⭐⭐ 🔥

#### 题目4：Grid布局的基本使用和与Flex的区别

**答案：**

**Grid基本属性：**

```css
.container {
  display: grid;

  /* 定义行列 */
  grid-template-columns: 100px 200px 100px; /* 3列 */
  grid-template-columns: repeat(3, 1fr); /* 3列等分 */
  grid-template-columns: 200px auto 200px; /* 固定+自适应 */
  grid-template-rows: 100px 200px;

  /* 间距 */
  grid-gap: 10px;
  gap: 10px; /* 新语法 */
  column-gap: 10px;
  row-gap: 10px;

  /* 对齐 */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  justify-content: start | end | center | stretch | space-between | space-around | space-evenly;
  align-content: start | end | center | stretch | space-between | space-around | space-evenly;
}

.item {
  /* 占据网格 */
  grid-column: 1 / 3; /* 从第1条线到第3条线 */
  grid-row: 1 / 2;
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}
```

**Grid与Flex的区别：**

| 特性 | Flex | Grid |
|-----|------|------|
| 维度 | 一维布局（行或列） | 二维布局（行和列） |
| 适用场景 | 组件内部布局、一维排列 | 页面整体布局、复杂二维布局 |
| 对齐方式 | 主轴和交叉轴 | 行和列独立控制 |
| 项目控制 | 项目自身属性影响布局 | 容器定义网格，项目填充 |

**实际应用示例：**

```css
/* 响应式网格布局 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* 圣杯布局 */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "aside main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
.header { grid-area: header; }
.aside { grid-area: aside; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

---

### 5. 定位(position)
#### 热度：⭐⭐⭐⭐⭐ 🔥

#### 题目5：CSS定位的几种方式及其区别

**答案：**

| 定位类型 | 特点 | 定位参照 | 是否脱离文档流 |
|---------|------|---------|---------------|
| static | 默认值，正常文档流 | - | 否 |
| relative | 相对定位 | 自身原位置 | 否（占据原空间） |
| absolute | 绝对定位 | 最近的非static祖先 | 是 |
| fixed | 固定定位 | 视口(viewport) | 是 |
| sticky | 粘性定位 | 最近滚动祖先 | 部分脱离 |

**详细说明：**

```css
/* 1. relative: 相对自身定位，不影响其他元素 */
.relative {
  position: relative;
  top: 10px;
  left: 10px;
  /* 相对原位置偏移，原位置仍占据空间 */
}

/* 2. absolute: 相对最近的非static父元素定位 */
.parent {
  position: relative; /* 作为定位参照 */
}
.absolute {
  position: absolute;
  top: 0;
  right: 0;
  /* 脱离文档流，不占据空间 */
}

/* 3. fixed: 相对视口定位，滚动不变 */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* 常用于返回顶部、悬浮按钮等 */
}

/* 4. sticky: 粘性定位，滚动到阈值时固定 */
.sticky {
  position: sticky;
  top: 0;
  /* 滚动到距顶部0时固定，常用于表头 */
}
```

**追问：absolute和fixed的包含块是什么？**
- `absolute`：最近的 `position` 不为 `static` 的祖先元素
- `fixed`：视口（viewport）
- 如果没有定位祖先，`absolute` 相对于初始包含块（通常是html）

---

### 6. 水平垂直居中
#### 热度：⭐⭐⭐⭐⭐ 🔥 ⚠️

#### 题目6：实现元素水平垂直居中的多种方法

**答案：**

**方法1：Flex布局（推荐）**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**方法2：Grid布局**
```css
.container {
  display: grid;
  place-items: center; /* align-items + justify-items */
}
/* 或者 */
.container {
  display: grid;
}
.item {
  justify-self: center;
  align-self: center;
}
```

**方法3：绝对定位 + transform**
```css
.item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**方法4：绝对定位 + margin auto**
```css
.item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 200px;  /* 需要固定宽高 */
  height: 100px;
}
```

**方法5：绝对定位 + 负margin**
```css
.item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 100px;
  margin-left: -100px; /* -width/2 */
  margin-top: -50px;   /* -height/2 */
}
```

**方法6：table-cell（老方法）**
```css
.container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.item {
  display: inline-block;
}
```

**方法7：line-height（单行文本）**
```css
.container {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
```

**方法对比：**

| 方法 | 优点 | 缺点 | 推荐度 |
|-----|------|------|--------|
| Flex | 简单、灵活、响应式 | IE10+ | ⭐⭐⭐⭐⭐ |
| Grid | 简单、强大 | IE不支持 | ⭐⭐⭐⭐⭐ |
| absolute+transform | 兼容性好、不需要固定尺寸 | 需要定位上下文 | ⭐⭐⭐⭐ |
| absolute+margin | 可靠 | 需要固定宽高 | ⭐⭐⭐ |
| table-cell | 兼容性最好 | 语义不佳、限制多 | ⭐⭐ |

---

### 7. 选择器优先级
#### 热度：⭐⭐⭐⭐⭐

#### 题目7：CSS选择器优先级的计算规则

**答案：**

**优先级从高到低：**
1. `!important` - 最高优先级
2. 内联样式 - 权重 1000
3. ID选择器 - 权重 100
4. 类/伪类/属性选择器 - 权重 10
5. 标签/伪元素选择器 - 权重 1
6. 通配符/继承 - 权重 0

**计算规则：**
```css
/* (内联, ID, 类/伪类/属性, 标签/伪元素) */

div                        /* (0, 0, 0, 1) = 1 */
.class                     /* (0, 0, 1, 0) = 10 */
#id                        /* (0, 1, 0, 0) = 100 */
div.class                  /* (0, 0, 1, 1) = 11 */
#id .class div             /* (0, 1, 1, 1) = 111 */
div p span                 /* (0, 0, 0, 3) = 3 */
div.class1.class2          /* (0, 0, 2, 1) = 21 */
div:hover                  /* (0, 0, 1, 1) = 11 */
div::before                /* (0, 0, 0, 2) = 2 */
div[data-id="1"]          /* (0, 0, 1, 1) = 11 */

/* !important 覆盖一切 */
div { color: red !important; }
```

**示例题目：**
```css
/* 以下哪个样式会生效？ */
#app .container div { color: red; }      /* (0,1,1,1) = 111 */
.wrap .container .box { color: blue; }   /* (0,0,3,0) = 30 */
div div div { color: green; }            /* (0,0,0,3) = 3 */

/* 答案：red，因为111 > 30 > 3 */
```

**注意事项：**
1. `!important` 应该尽量避免使用
2. 权重不会进位，10个class不等于1个ID
3. 继承的样式权重为0，任何直接指定的样式都会覆盖继承
4. 相同权重时，后面的样式覆盖前面的

---

### 8. 伪类和伪元素
#### 热度：⭐⭐⭐⭐

#### 题目8：伪类和伪元素的区别及常用场景

**答案：**

**区别：**
- **伪类（:）**：选择处于特定状态的元素
- **伪元素（::）**：创建不在DOM树中的元素

**常用伪类：**

```css
/* 链接状态 */
a:link { }     /* 未访问 */
a:visited { }  /* 已访问 */
a:hover { }    /* 悬停 */
a:active { }   /* 激活 */

/* 结构伪类 */
:first-child       /* 第一个子元素 */
:last-child        /* 最后一个子元素 */
:nth-child(n)      /* 第n个子元素 */
:nth-child(2n)     /* 偶数 */
:nth-child(2n+1)   /* 奇数 */
:nth-of-type(n)    /* 同类型第n个 */
:only-child        /* 唯一子元素 */

/* 表单伪类 */
:focus            /* 获得焦点 */
:checked          /* 选中状态 */
:disabled         /* 禁用状态 */
:enabled          /* 启用状态 */
:valid            /* 验证通过 */
:invalid          /* 验证失败 */
:required         /* 必填 */
:optional         /* 可选 */

/* 其他伪类 */
:not(selector)    /* 否定伪类 */
:empty            /* 无子元素 */
:root             /* 根元素 */
```

**常用伪元素：**

```css
/* 内容伪元素 */
::before {
  content: "前缀";
  /* 在元素内容前插入 */
}
::after {
  content: "后缀";
  /* 在元素内容后插入 */
}

/* 选择伪元素 */
::first-letter { }  /* 首字母 */
::first-line { }    /* 首行 */
::selection { }     /* 选中文本 */

/* 输入占位符 */
::placeholder {
  color: #999;
}
```

**实际应用场景：**

```css
/* 1. 清除浮动 */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 2. 添加图标 */
.icon::before {
  content: "\f007";
  font-family: "Font Awesome";
}

/* 3. 面包屑分隔符 */
.breadcrumb li:not(:last-child)::after {
  content: " / ";
}

/* 4. 三角形箭头 */
.tooltip::after {
  content: "";
  position: absolute;
  border: 5px solid transparent;
  border-top-color: #000;
}

/* 5. 斑马条纹 */
tr:nth-child(even) {
  background: #f5f5f5;
}

/* 6. 自定义复选框 */
input[type="checkbox"]:checked + label::before {
  content: "✓";
}
```

**追问：::before和::after必须设置content吗？**
是的，必须设置 `content` 属性，否则伪元素不会渲染。`content` 可以为空字符串 `""`。

---

## 二、布局相关

### 9. 响应式布局
#### 热度：⭐⭐⭐⭐

#### 题目9：实现响应式布局的方法有哪些？

**答案：**

**1. 媒体查询（Media Query）**
```css
/* 移动端优先 */
.container {
  width: 100%;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* 桌面 */
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

/* 常见断点 */
/* 手机: < 768px */
/* 平板: 768px - 1199px */
/* 桌面: >= 1200px */
```

**2. 百分比布局**
```css
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
.col {
  width: 50%; /* 父元素宽度的50% */
}
```

**3. Flex弹性布局**
```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  flex: 1 1 300px; /* 最小300px，可伸缩 */
}
```

**4. Grid网格布局**
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

**5. rem/em相对单位**
```css
html {
  font-size: 16px;
}
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}
.box {
  width: 20rem; /* 相对于根元素字体大小 */
}
```

**6. vw/vh视口单位**
```css
.hero {
  width: 100vw;  /* 视口宽度的100% */
  height: 100vh; /* 视口高度的100% */
}
.sidebar {
  width: 20vw;   /* 视口宽度的20% */
}
```

**7. clamp()函数**
```css
.text {
  /* clamp(最小值, 理想值, 最大值) */
  font-size: clamp(14px, 2vw, 20px);
}
```

**完整响应式方案示例：**
```css
/* 移动优先 + 多种方案结合 */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 3rem);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

---

### 10. rem/em/px/vw单位
#### 热度：⭐⭐⭐⭐

#### 题目10：CSS单位rem、em、px、vw的区别和使用场景

**答案：**

| 单位 | 相对于 | 特点 | 使用场景 |
|-----|--------|------|---------|
| px | 固定单位 | 像素，绝对单位 | 边框、小图标 |
| em | 父元素字体大小 | 相对单位，可继承 | 内边距、行高 |
| rem | 根元素字体大小 | 相对单位，统一参照 | 整体布局、字体 |
| vw/vh | 视口宽度/高度 | 1vw=视口宽1% | 全屏元素、响应式 |
| % | 父元素对应属性 | 相对单位 | 宽度布局 |

**详细说明：**

```css
/* 1. px：像素 */
.box {
  width: 200px;
  border: 1px solid #000;
  /* 固定大小，不会随屏幕或字体变化 */
}

/* 2. em：相对父元素 */
.parent {
  font-size: 16px;
}
.child {
  font-size: 2em;      /* 32px = 16px * 2 */
  padding: 1em;        /* 32px（相对自身字体） */
  margin: 1em;         /* 32px */
}

/* 3. rem：相对根元素 */
html {
  font-size: 16px;     /* 1rem = 16px */
}
.box {
  font-size: 1.5rem;   /* 24px = 16px * 1.5 */
  width: 20rem;        /* 320px */
  padding: 2rem;       /* 32px */
}

/* 4. vw/vh：视口单位 */
.hero {
  width: 100vw;        /* 视口宽度100% */
  height: 100vh;       /* 视口高度100% */
  font-size: 5vw;      /* 视口宽度的5% */
}

/* 5. %：百分比 */
.container {
  width: 80%;          /* 父元素宽度的80% */
}
.child {
  width: 50%;          /* 父元素宽度的50% */
  height: 50%;         /* 父元素高度的50% */
}
```

**rem适配方案：**

```javascript
// 根据屏幕宽度设置根元素字体大小
function setRem() {
  const width = document.documentElement.clientWidth;
  const fontSize = width / 375 * 16; // 以375px设计稿为基准
  document.documentElement.style.fontSize = fontSize + 'px';
}
setRem();
window.addEventListener('resize', setRem);
```

```css
/* 设计稿375px，元素宽度100px */
.box {
  width: 6.25rem; /* 100 / 16 = 6.25 */
}
```

**使用建议：**
1. **布局**：使用 `%`、`flex`、`grid`、`vw`
2. **字体**：使用 `rem`，方便整体缩放
3. **内外边距**：使用 `rem` 或 `em`
4. **边框、阴影**：使用 `px`，保持锐利
5. **移动端适配**：使用 `rem` + viewport设置

---

### 11. 层叠上下文(z-index)
#### 热度：⭐⭐⭐⭐

#### 题目11：z-index的工作原理和层叠上下文

**答案：**

**层叠上下文的创建条件：**
1. 根元素（`html`）
2. `position` 为 `relative/absolute` 且 `z-index` 不为 `auto`
3. `position` 为 `fixed` 或 `sticky`
4. `opacity` 小于 `1`
5. `transform`、`filter`、`perspective` 不为 `none`
6. `mix-blend-mode` 不为 `normal`
7. `will-change` 指定了某些属性
8. `isolation` 为 `isolate`
9. flex/grid容器的子元素，且 `z-index` 不为 `auto`

**层叠顺序（从下到上）：**
1. 背景和边框（层叠上下文的根元素）
2. 负 `z-index`
3. 块级盒子
4. 浮动盒子
5. 内联盒子
6. `z-index: 0` / `z-index: auto`
7. 正 `z-index`

```css
/* 示例1：z-index只在定位元素中生效 */
.box1 {
  position: relative;
  z-index: 1; /* 生效 */
}
.box2 {
  z-index: 999; /* 无效，因为没有定位 */
}

/* 示例2：层叠上下文的嵌套 */
.parent {
  position: relative;
  z-index: 1;
}
.child {
  position: relative;
  z-index: 9999; /* 仍然在parent的层叠上下文内 */
}
.uncle {
  position: relative;
  z-index: 2; /* 会覆盖child */
}

/* 示例3：transform创建层叠上下文 */
.box {
  transform: translate(0, 0); /* 创建层叠上下文 */
}
```

**常见问题：**

```html
<!-- 为什么z-index很大也不生效？ -->
<div style="position:relative; z-index:1;">
  <div style="position:relative; z-index:9999;">A</div>
</div>
<div style="position:relative; z-index:2;">B</div>

<!-- 答案：A被限制在父元素的层叠上下文内，B会覆盖A -->
```

**解决方案：**
```css
/* 方案1：提升层级到同一上下文 */
/* 方案2：使用isolation: isolate 创建新的层叠上下文 */
.parent {
  isolation: isolate;
}
```

---

### 12. 浮动和清除浮动
#### 热度：⭐⭐⭐⭐

#### 题目12：浮动的原理和清除浮动的方法

**答案：**

**浮动的特性：**
1. 脱离文档流，但不脱离文本流
2. 向左或向右移动，直到碰到父元素边界或其他浮动元素
3. 浮动元素会变为块级元素（可设置宽高）
4. 父元素高度塌陷

```css
.float-left {
  float: left;
}
.float-right {
  float: right;
}
```

**清除浮动的方法：**

**方法1：额外标签法（不推荐）**
```html
<div class="parent">
  <div class="float">浮动元素</div>
  <div style="clear: both;"></div>
</div>
```

**方法2：父元素overflow（推荐）**
```css
.parent {
  overflow: hidden; /* 或auto，触发BFC */
}
```

**方法3：伪元素清除（最推荐）**
```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
/* 或更完整的 */
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
```

**方法4：父元素也浮动（不推荐）**
```css
.parent {
  float: left;
}
```

**方法5：父元素设置高度（不推荐）**
```css
.parent {
  height: 300px;
}
```

**方法6：使用Flex或Grid代替（现代方案）**
```css
.parent {
  display: flex;
  /* 或 display: grid */
}
```

**最佳实践：**
```css
/* 定义清除浮动的工具类 */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 使用 */
<div class="parent clearfix">
  <div class="float">...</div>
</div>
```

---

### 13. CSS3新特性
#### 热度：⭐⭐⭐⭐

#### 题目13：CSS3有哪些新特性？

**答案：**

**1. 选择器**
```css
/* 属性选择器 */
[attr^="value"]  /* 以value开头 */
[attr$="value"]  /* 以value结尾 */
[attr*="value"]  /* 包含value */

/* 伪类选择器 */
:nth-child(n)
:nth-of-type(n)
:not(selector)
:target
```

**2. 边框和背景**
```css
/* 圆角 */
border-radius: 10px;

/* 阴影 */
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

/* 多背景 */
background:
  url(img1.png) 0 0 no-repeat,
  url(img2.png) 100% 0 no-repeat;

/* 渐变 */
background: linear-gradient(to right, red, blue);
background: radial-gradient(circle, red, blue);

/* 背景大小和定位 */
background-size: cover;
background-origin: border-box;
background-clip: text;
```

**3. 变换(Transform)**
```css
transform: translate(50px, 100px);  /* 平移 */
transform: rotate(45deg);           /* 旋转 */
transform: scale(1.5);              /* 缩放 */
transform: skew(10deg, 20deg);      /* 倾斜 */
transform: translate3d(x, y, z);    /* 3D变换 */
```

**4. 过渡(Transition)**
```css
transition: property duration timing-function delay;
transition: all 0.3s ease;
transition: width 0.5s ease-in-out 0.1s;
```

**5. 动画(Animation)**
```css
@keyframes slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}
.box {
  animation: slide 2s ease infinite;
}
```

**6. 弹性盒子(Flexbox)**
```css
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
```

**7. 网格布局(Grid)**
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;
```

**8. 多列布局**
```css
column-count: 3;
column-gap: 20px;
column-rule: 1px solid #ddd;
```

**9. 媒体查询**
```css
@media (max-width: 768px) {
  /* 响应式样式 */
}
```

**10. 其他新特性**
```css
/* 滤镜 */
filter: blur(5px);
filter: brightness(1.2);
filter: contrast(1.5);

/* 混合模式 */
mix-blend-mode: multiply;

/* calc计算 */
width: calc(100% - 50px);

/* CSS变量 */
:root {
  --main-color: #333;
}
.box {
  color: var(--main-color);
}

/* 自适应单位 */
width: 50vw;
height: 100vh;
font-size: clamp(14px, 2vw, 20px);
```

---

### 14. 动画和过渡
#### 热度：⭐⭐⭐⭐

#### 题目14：transition和animation的区别，如何实现动画？

**答案：**

**transition vs animation：**

| 特性 | transition | animation |
|-----|-----------|-----------|
| 触发方式 | 需要事件触发（如hover） | 自动播放 |
| 循环 | 只执行一次 | 可设置循环次数 |
| 关键帧 | 只有开始和结束 | 可定义多个关键帧 |
| 控制能力 | 简单 | 强大（暂停、反向等） |
| 适用场景 | 简单的状态变化 | 复杂的动画效果 |

**Transition详解：**

```css
.box {
  /* 简写 */
  transition: property duration timing-function delay;

  /* 完整写法 */
  transition-property: all;           /* 过渡属性 */
  transition-duration: 0.3s;          /* 持续时间 */
  transition-timing-function: ease;   /* 时间函数 */
  transition-delay: 0s;               /* 延迟时间 */

  /* 多个属性 */
  transition:
    width 0.3s ease,
    height 0.3s ease 0.1s,
    background 0.5s;
}

/* 时间函数 */
ease                 /* 慢-快-慢 */
linear               /* 匀速 */
ease-in              /* 慢-快 */
ease-out             /* 快-慢 */
ease-in-out          /* 慢-快-慢（更明显） */
cubic-bezier(n,n,n,n) /* 自定义贝塞尔曲线 */

/* 示例 */
.button {
  background: blue;
  transition: background 0.3s ease;
}
.button:hover {
  background: red;
}
```

**Animation详解：**

```css
/* 1. 定义关键帧 */
@keyframes slide {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
}

/* 2. 应用动画 */
.box {
  /* 简写 */
  animation: name duration timing-function delay iteration-count direction fill-mode;

  /* 完整写法 */
  animation-name: slide;                    /* 动画名称 */
  animation-duration: 2s;                   /* 持续时间 */
  animation-timing-function: ease;          /* 时间函数 */
  animation-delay: 0s;                      /* 延迟 */
  animation-iteration-count: infinite;      /* 次数（infinite无限） */
  animation-direction: normal;              /* 方向 */
  animation-fill-mode: forwards;            /* 填充模式 */
  animation-play-state: running;            /* 播放状态 */
}

/* animation-direction的值 */
normal      /* 正向播放 */
reverse     /* 反向播放 */
alternate   /* 交替播放（正-反-正...） */
alternate-reverse /* 交替反向（反-正-反...） */

/* animation-fill-mode的值 */
none        /* 不改变默认行为 */
forwards    /* 保持最后一帧 */
backwards   /* 应用第一帧（延迟期间） */
both        /* 同时应用forwards和backwards */
```

**实用动画示例：**

```css
/* 1. 淡入动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.fade-in {
  animation: fadeIn 0.5s ease;
}

/* 2. 弹跳动画 */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.bounce {
  animation: bounce 1s ease infinite;
}

/* 3. 旋转加载 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.loading {
  animation: spin 1s linear infinite;
}

/* 4. 呼吸效果 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.pulse {
  animation: pulse 2s ease infinite;
}

/* 5. 抖动效果 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
.shake {
  animation: shake 0.5s ease;
}
```

**性能优化建议：**
1. 优先使用 `transform` 和 `opacity`，它们触发合成层，性能最好
2. 避免动画 `width`、`height`、`margin` 等会触发回流的属性
3. 使用 `will-change` 提前告知浏览器
```css
.box {
  will-change: transform, opacity;
}
```

---

### 15. 移动端适配
#### 热度：⭐⭐⭐⭐

#### 题目15：移动端适配方案有哪些？

**答案：**

**方案1：viewport + rem（最常用）**

```html
<!-- viewport设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

```javascript
// 动态设置rem
function setRem() {
  const baseSize = 16; // 基准大小
  const baseWidth = 375; // 基准宽度（设计稿宽度）
  const scale = document.documentElement.clientWidth / baseWidth;
  document.documentElement.style.fontSize = baseSize * scale + 'px';
}
setRem();
window.addEventListener('resize', setRem);
```

```css
/* 设计稿中100px的元素 */
.box {
  width: 6.25rem; /* 100 / 16 = 6.25 */
  height: 6.25rem;
}
```

**方案2：vw/vh方案**

```css
/* 1vw = 设计稿宽度的1%，以375px设计稿为例 */
/* 100px = 100 / 375 * 100vw = 26.67vw */
.box {
  width: 26.67vw;
  height: 26.67vw;
  font-size: 4vw; /* 15px = 15 / 375 * 100 = 4vw */
}

/* 限制最大最小值 */
.text {
  font-size: clamp(12px, 4vw, 18px);
}
```

**方案3：flexible方案（阿里）**

```html
<script src="flexible.js"></script>
```

```javascript
// flexible.js 核心逻辑
(function(win, lib) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var rem = docEl.clientWidth / 10; // 分成10份
  docEl.style.fontSize = rem + 'px';
})(window, window['lib'] || (window['lib'] = {}));
```

```css
/* 设计稿750px，元素100px */
.box {
  width: 1.33rem; /* 100 / 75 = 1.33 */
}
```

**方案4：媒体查询**

```css
/* 小屏手机 */
@media (max-width: 375px) {
  html { font-size: 12px; }
}

/* 标准手机 */
@media (min-width: 376px) and (max-width: 414px) {
  html { font-size: 14px; }
}

/* 大屏手机 */
@media (min-width: 415px) {
  html { font-size: 16px; }
}
```

**方案5：postcss-px-to-viewport（推荐）**

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,   // 设计稿宽度
      unitPrecision: 5,     // 转换精度
      viewportUnit: 'vw',   // 单位
      selectorBlackList: [], // 不转换的类
      minPixelValue: 1,     // 最小转换值
      mediaQuery: false     // 是否转换媒体查询
    }
  }
}
```

```css
/* 写代码时直接用px */
.box {
  width: 100px; /* 自动转换为 26.67vw */
}
```

**1px问题解决：**

```css
/* 方案1：transform缩放 */
.border {
  position: relative;
}
.border::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #ddd;
  transform: scaleY(0.5);
}

/* 方案2：viewport设置 */
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">

/* 方案3：使用border-image */
.border {
  border-bottom: 1px solid transparent;
  border-image: url(data:image/png;base64,...) 0 0 2 0 stretch;
}
```

**适配方案对比：**

| 方案 | 优点 | 缺点 | 推荐度 |
|-----|------|------|--------|
| rem | 兼容性好，灵活 | 需要JS | ⭐⭐⭐⭐ |
| vw/vh | 纯CSS，性能好 | 兼容性稍差 | ⭐⭐⭐⭐⭐ |
| flexible | 成熟方案 | 需要引入库 | ⭐⭐⭐ |
| 媒体查询 | 兼容性最好 | 断点有限 | ⭐⭐⭐ |
| px-to-vw | 开发体验好 | 需要构建工具 | ⭐⭐⭐⭐⭐ |

---

## 三、进阶知识

### 16. CSS预处理器
#### 热度：⭐⭐⭐

#### 题目16：CSS预处理器（Sass/Less）的特性和使用

**答案：**

**主要特性：**

**1. 变量**
```scss
// Sass
$primary-color: #333;
$font-size: 14px;

.box {
  color: $primary-color;
  font-size: $font-size;
}
```

```less
// Less
@primary-color: #333;
@font-size: 14px;

.box {
  color: @primary-color;
  font-size: @font-size;
}
```

**2. 嵌套**
```scss
.nav {
  background: #fff;

  ul {
    list-style: none;

    li {
      display: inline-block;

      a {
        color: #333;

        &:hover {  // & 表示父选择器
          color: red;
        }
      }
    }
  }
}
```

**3. 混合(Mixin)**
```scss
// Sass
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}

.box {
  @include flex-center;
  @include size(100px, 200px);
}
```

**4. 继承**
```scss
%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.btn-primary {
  @extend %button-base;
  background: blue;
}

.btn-danger {
  @extend %button-base;
  background: red;
}
```

**5. 函数**
```scss
@function calculate-rem($px) {
  @return $px / 16 * 1rem;
}

.box {
  width: calculate-rem(100px); // 6.25rem
}
```

**6. 循环**
```scss
@for $i from 1 through 5 {
  .col-#{$i} {
    width: 20% * $i;
  }
}

// 生成
.col-1 { width: 20%; }
.col-2 { width: 40%; }
// ...
```

**7. 条件语句**
```scss
@mixin theme($dark: false) {
  @if $dark {
    background: #000;
    color: #fff;
  } @else {
    background: #fff;
    color: #000;
  }
}
```

**8. 导入**
```scss
@import 'variables';
@import 'mixins';
@import 'base';
```

**Sass vs Less 对比：**

| 特性 | Sass | Less |
|-----|------|------|
| 变量 | `$var` | `@var` |
| 混合 | `@mixin` / `@include` | `.mixin()` |
| 继承 | `@extend` | `:extend` |
| 条件 | `@if/@else` | `when()` |
| 循环 | `@for/@each/@while` | 有限支持 |
| 函数 | 强大 | 基本 |

---

### 17. CSS性能优化
#### 热度：⭐⭐⭐

#### 题目17：CSS性能优化的方法有哪些？

**答案：**

**1. 减少重排和重绘**
```css
/* 使用transform代替top/left */
/* 不好 */
.box {
  position: absolute;
  top: 0;
  transition: top 0.3s;
}
.box:hover {
  top: 100px; /* 触发重排 */
}

/* 好 */
.box {
  transform: translateY(0);
  transition: transform 0.3s;
}
.box:hover {
  transform: translateY(100px); /* 只触发合成 */
}
```

**2. 优化选择器**
```css
/* 避免复杂选择器 */
/* 不好 */
div.container ul li a span { } /* 层级太深 */
[data-v-xxxxx][data-v-xxxxx] { } /* 属性选择器 */

/* 好 */
.link-text { } /* 直接类名 */

/* 避免通配符 */
* { } /* 性能差 */
```

**3. 减少CSS文件大小**
```css
/* 合并相同样式 */
.btn-primary, .btn-secondary {
  padding: 10px 20px;
}

/* 使用缩写 */
/* 不好 */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;

/* 好 */
margin: 10px 20px;
```

**4. 使用CSS containment**
```css
.widget {
  contain: layout style paint; /* 隔离渲染 */
}
```

**5. 使用will-change提示浏览器**
```css
.box {
  will-change: transform, opacity;
}

/* 动画结束后移除 */
.box.animated {
  animation: slide 1s;
}
.box.animated-end {
  will-change: auto;
}
```

**6. 避免@import**
```css
/* 不好：@import会阻塞并行下载 */
@import url("style.css");

/* 好：使用link标签 */
<link rel="stylesheet" href="style.css">
```

**7. 使用字体显示策略**
```css
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2');
  font-display: swap; /* 优先显示后备字体 */
}
```

**8. 关键CSS内联**
```html
<head>
  <style>
    /* 首屏关键CSS内联 */
    .header { ... }
    .hero { ... }
  </style>
  <link rel="stylesheet" href="main.css">
</head>
```

**9. 删除未使用的CSS**
```bash
# 使用 PurgeCSS
npx purgecss --css style.css --content index.html --output dist/
```

**10. 硬件加速**
```css
.box {
  transform: translateZ(0); /* 开启硬件加速 */
  /* 或 */
  transform: translate3d(0, 0, 0);
}
```

---

### 18. 隐藏元素的方式
#### 热度：⭐⭐⭐

#### 题目18：隐藏元素有哪些方法？它们的区别是什么？

**答案：**

| 方法 | 占据空间 | 触发事件 | 可访问性 | 继承 | 过渡动画 |
|-----|---------|---------|---------|------|---------|
| `display: none` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `visibility: hidden` | ✅ | ❌ | ❌ | ✅ | ✅ |
| `opacity: 0` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `height: 0` | ❌ | ❌ | ❌ | ❌ | ✅ |
| `position: absolute` | ❌ | ✅ | ✅ | ❌ | ✅ |
| `clip-path` | ✅ | ❌ | ❌ | ❌ | ✅ |
| `transform: scale(0)` | ✅ | ❌ | ✅ | ❌ | ✅ |

**详细说明：**

```css
/* 1. display: none - 完全移除 */
.hide1 {
  display: none;
  /* 不占空间，不能交互，不可见 */
}

/* 2. visibility: hidden - 隐藏但占位 */
.hide2 {
  visibility: hidden;
  /* 占空间，不能交互，不可见 */
}

/* 3. opacity: 0 - 透明但存在 */
.hide3 {
  opacity: 0;
  /* 占空间，可以交互，不可见 */
}

/* 4. height: 0 + overflow: hidden */
.hide4 {
  height: 0;
  overflow: hidden;
  /* 不占空间，不能交互，不可见 */
}

/* 5. position: absolute + left: -9999px */
.hide5 {
  position: absolute;
  left: -9999px;
  /* 不占空间，可以交互（理论上），不可见 */
}

/* 6. clip-path */
.hide6 {
  clip-path: polygon(0 0, 0 0, 0 0);
  /* 占空间，不能交互，不可见 */
}

/* 7. transform: scale(0) */
.hide7 {
  transform: scale(0);
  /* 占空间，不能交互，不可见 */
}

/* 8. z-index: -1 */
.hide8 {
  position: relative;
  z-index: -1;
  /* 占空间，可能被覆盖，可见但在后面 */
}
```

**使用场景：**
- **display: none**：不需要过渡动画的隐藏
- **visibility: hidden**：需要占位的隐藏，支持过渡
- **opacity: 0**：需要淡入淡出动画
- **height: 0**：折叠面板、手风琴效果
- **position + left**：SEO友好的隐藏（屏幕阅读器可读）

---

### 19. 重绘和回流
#### 热度：⭐⭐⭐

#### 题目19：什么是重绘和回流？如何减少重绘和回流？

**答案：**

**概念：**
- **回流（Reflow）**：元素的几何属性变化，浏览器需要重新计算布局
- **重绘（Repaint）**：元素的外观变化，但布局不变，浏览器重新绘制

**触发回流的操作：**
```javascript
// 1. 修改DOM结构
element.appendChild(newElement);
element.remove();

// 2. 修改几何属性
element.style.width = '100px';
element.style.height = '100px';
element.style.padding = '10px';
element.style.margin = '10px';
element.style.border = '1px solid';
element.style.display = 'block';

// 3. 获取布局信息（强制同步布局）
element.offsetWidth;
element.offsetHeight;
element.clientWidth;
element.scrollTop;
getComputedStyle(element);

// 4. 修改字体大小
element.style.fontSize = '16px';

// 5. 窗口大小变化
window.resize();
```

**只触发重绘的操作：**
```javascript
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.visibility = 'hidden';
element.style.outline = '1px solid red';
```

**优化方法：**

**1. 批量修改样式**
```javascript
// 不好：每次修改触发一次回流
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// 好：使用class，只触发一次回流
element.className = 'new-style';

// 好：使用cssText
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
```

**2. 离线操作DOM**
```javascript
// 不好
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = i;
  ul.appendChild(li); // 1000次回流
}

// 好：使用DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = i;
  fragment.appendChild(li);
}
ul.appendChild(fragment); // 1次回流
```

**3. 使用absolute/fixed脱离文档流**
```css
.animating {
  position: absolute; /* 脱离文档流，回流影响小 */
}
```

**4. 使用transform/opacity代替几何属性**
```css
/* 不好：触发回流 */
.box {
  transition: left 0.3s;
}
.box:hover {
  left: 100px;
}

/* 好：只触发合成 */
.box {
  transition: transform 0.3s;
}
.box:hover {
  transform: translateX(100px);
}
```

**5. 缓存布局信息**
```javascript
// 不好
for (let i = 0; i < 100; i++) {
  element.style.left = element.offsetLeft + 1 + 'px'; // 每次都读取
}

// 好
let left = element.offsetLeft;
for (let i = 0; i < 100; i++) {
  left += 1;
}
element.style.left = left + 'px';
```

**6. 使用虚拟滚动**
```javascript
// 只渲染可见区域的元素
const visibleItems = items.slice(startIndex, endIndex);
```

**7. 使用will-change**
```css
.box {
  will-change: transform;
}
```

**回流 vs 重绘性能：**
- 回流成本 >> 重绘成本
- 回流必定导致重绘
- 重绘不一定导致回流

---

### 20. CSS变量
#### 热度：⭐⭐⭐

#### 题目20：CSS变量（自定义属性）的使用

**答案：**

**基本语法：**

```css
/* 定义变量：使用 -- 前缀 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
  --spacing: 10px;
}

/* 使用变量：var() 函数 */
.box {
  color: var(--primary-color);
  font-size: var(--font-size);
  padding: var(--spacing);

  /* 提供默认值 */
  background: var(--bg-color, #fff);
}
```

**作用域：**

```css
/* 全局变量 */
:root {
  --global-color: red;
}

/* 局部变量 */
.container {
  --local-color: blue;
}

.container .child {
  color: var(--local-color); /* blue */
  background: var(--global-color); /* red */
}
```

**动态修改：**

```javascript
// 获取变量
const root = document.documentElement;
const color = getComputedStyle(root).getPropertyValue('--primary-color');

// 设置变量
root.style.setProperty('--primary-color', '#e74c3c');

// 删除变量
root.style.removeProperty('--primary-color');
```

**实际应用：**

**1. 主题切换**
```css
:root {
  --bg-color: #fff;
  --text-color: #333;
}

[data-theme="dark"] {
  --bg-color: #333;
  --text-color: #fff;
}

body {
  background: var(--bg-color);
  color: var(--text-color);
}
```

```javascript
// 切换主题
document.documentElement.setAttribute('data-theme', 'dark');
```

**2. 响应式设计**
```css
:root {
  --container-width: 1200px;
  --gutter: 20px;
}

@media (max-width: 768px) {
  :root {
    --container-width: 100%;
    --gutter: 10px;
  }
}

.container {
  width: var(--container-width);
  padding: 0 var(--gutter);
}
```

**3. 组件变量**
```css
.button {
  --button-bg: #3498db;
  --button-hover-bg: #2980b9;
  --button-padding: 10px 20px;

  background: var(--button-bg);
  padding: var(--button-padding);
}

.button:hover {
  background: var(--button-hover-bg);
}

/* 修改特定按钮 */
.button.large {
  --button-padding: 15px 30px;
}
```

**4. 数学计算**
```css
:root {
  --base-size: 16px;
}

.heading {
  font-size: calc(var(--base-size) * 2); /* 32px */
}

.small {
  font-size: calc(var(--base-size) * 0.875); /* 14px */
}
```

**CSS变量 vs Sass变量：**

| 特性 | CSS变量 | Sass变量 |
|-----|---------|---------|
| 运行时 | 可在浏览器中修改 | 编译时确定 |
| 作用域 | 支持继承和级联 | 块级作用域 |
| 计算 | 可参与calc() | 编译时计算 |
| 兼容性 | IE不支持 | 编译后兼容所有浏览器 |
| 使用场景 | 主题切换、动态样式 | 变量管理、代码复用 |

---

## 总结

### 必背核心知识点（面试必考）⭐⭐⭐⭐⭐

1. **盒子模型** - 标准盒模型和怪异盒模型的区别
2. **BFC** - 创建方式和应用场景
3. **Flex布局** - 容器和项目属性，常见布局
4. **定位** - 5种定位方式的区别
5. **水平垂直居中** - 至少掌握3种方法
6. **选择器优先级** - 权重计算规则

### 高频考点（面试常考）⭐⭐⭐⭐

7. **Grid布局** - 基本使用和与Flex的区别
8. **伪类和伪元素** - 区别和应用场景
9. **响应式布局** - 媒体查询、rem、vw等方案
10. **单位** - rem/em/px/vw的区别
11. **层叠上下文** - z-index的工作原理
12. **浮动** - 清除浮动的方法
13. **CSS3新特性** - 动画、过渡、变换等
14. **移动端适配** - rem方案、vw方案、1px问题

### 重要知识点（加分项）⭐⭐⭐

15. **预处理器** - Sass/Less的使用
16. **性能优化** - 减少重排重绘、优化选择器
17. **隐藏元素** - display/visibility/opacity的区别
18. **重绘回流** - 概念和优化方法
19. **CSS变量** - 使用方法和应用场景

### 学习建议

1. **先理解概念**，再动手实践
2. **多写代码**，各种布局都要手写一遍
3. **关注兼容性**，了解各浏览器差异
4. **性能优化**，理解浏览器渲染原理
5. **跟进新特性**，关注CSS新标准

### 面试准备

- 能手写常见布局（圣杯、双飞翼、Flex、Grid）
- 能解释CSS工作原理（层叠、继承、优先级）
- 能优化CSS性能（减少重排重绘）
- 能解决实际问题（1px、居中、适配）
- 了解最新特性（container queries、:has()等）

---

**祝你面试顺利！🎉**
