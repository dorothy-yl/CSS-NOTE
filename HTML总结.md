# 标签语义化的意义
- 便于机器理解结果，（搜索爬虫，便于其他设备解析（读屏幕软件、盲人设备、移动设备））
- 便于团队开发和维护，让开发者更容易理解，减少差异化

# 写页面内容应注意什么？
- 尽量少些没有语义的标签，例如：div,span

- 在写块级元素和内联元素的时候应符合web的标准来写，内连元素中不可以嵌套块级元素

# 什么是HTML5,与HTML有什么区别
- HTML5是HTML的新标准，可以直接插入动画、视频、丰富的图标等。
- HTML很长一段代码，不利于记忆;HTML5简单声明，方便记忆<!DOCTYPE html>

# 什么是伪类，什么是伪元素

## 伪类（Pseudo-classes）
伪类是用于选择处于特定状态的元素，以冒号（:）开头。

### 常见伪类：
- `:hover` - 鼠标悬停时的状态
- `:focus` - 元素获得焦点时的状态
- `:active` - 元素被激活时的状态
- `:visited` - 已访问的链接
- `:link` - 未访问的链接
- `:first-child` - 第一个子元素
- `:last-child` - 最后一个子元素
- `:nth-child(n)` - 第n个子元素

### 示例：
```css
a:hover {
    color: red;
}

p:first-child {
    font-weight: bold;
}
```

## 伪元素（Pseudo-elements）
伪元素是用于创建不在DOM中的虚拟元素，以双冒号（::）开头。

### 常见伪元素：
- `::before` - 在元素内容前插入内容
- `::after` - 在元素内容后插入内容
- `::first-line` - 选择元素的第一行
- `::first-letter` - 选择元素的第一个字母
- `::selection` - 选择用户选中的文本

### 示例：
```css
p::before {
    content: "前缀：";
}

p::after {
    content: "后缀";
}

p::first-letter {
    font-size: 2em;
    color: red;
}
```

## 主要区别：
1. **语法**：伪类用单冒号（:），伪元素用双冒号（::）
2. **功能**：伪类选择已存在的元素状态，伪元素创建虚拟元素
3. **内容**：伪类不能添加内容，伪元素可以通过content属性添加内容

# 如何用伪类清除浮动

## 清除浮动的原理
浮动元素会脱离文档流，导致父元素高度塌陷。使用伪元素清除浮动是一种常用的解决方案。

## 使用::after伪元素清除浮动

### 方法一：clearfix类（推荐）
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

### 方法二：简化版clearfix
```css
.clearfix::after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
```

### 方法三：现代浏览器版本
```css
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}
```

## HTML使用示例
```html
<div class="clearfix">
    <div class="float-left">浮动元素1</div>
    <div class="float-left">浮动元素2</div>
</div>
```

```css
.float-left {
    float: left;
    width: 50%;
}
```

## 其他清除浮动的方法

### 1. 使用overflow属性
```css
.parent {
    overflow: hidden; /* 或 overflow: auto */
}
```

### 2. 使用display: flow-root（现代方法）
```css
.parent {
    display: flow-root;
}
```

### 3. 使用flexbox
```css
.parent {
    display: flex;
}
```

## 为什么使用伪元素清除浮动？
1. **不添加额外HTML元素**：保持HTML结构清洁
2. **可复用**：通过CSS类实现，可在多处使用
3. **兼容性好**：支持各种浏览器
4. **语义清晰**：CSS负责样式，HTML负责结构

# DOCTYPE的作用
- DOCTYPE声明必须是HTML文档的第一行，位于`<html>`标签之前
- 告诉浏览器用哪种HTML或XHTML规范来解析HTML文档
- 不加DOCTYPE会导致浏览器进入怪异模式(Quirks Mode)，影响页面渲染

## HTML5的DOCTYPE
```html
<!DOCTYPE html>
```

## HTML4.01的DOCTYPE
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

# 块级元素和内联元素的区别

## 块级元素（Block Elements）
- **独占一行**：每个块级元素都从新行开始
- **可设置宽高**：width、height属性有效
- **可设置所有边距**：margin、padding的上下左右都有效
- **默认宽度**：占满父容器的100%宽度

### 常见块级元素：
`div`、`p`、`h1-h6`、`ul`、`ol`、`li`、`form`、`table`、`section`、`article`、`header`、`footer`

## 内联元素（Inline Elements）
- **不换行**：在同一行内显示
- **不可设置宽高**：width、height属性无效
- **垂直边距无效**：margin、padding的上下无效，左右有效
- **宽度由内容决定**：根据内容自适应

### 常见内联元素：
`span`、`a`、`img`、`input`、`select`、`textarea`、`label`、`strong`、`em`

## 内联块元素（Inline-block Elements）
- **不换行**：在同一行显示
- **可设置宽高**：width、height属性有效
- **可设置所有边距**：margin、padding都有效

```css
display: inline-block;
```

# HTML5新增的语义化标签

## 结构标签
- `<header>` - 头部区域
- `<nav>` - 导航区域
- `<main>` - 主要内容区域
- `<section>` - 内容章节
- `<article>` - 独立文章内容
- `<aside>` - 侧边栏内容
- `<footer>` - 底部区域

## 内容标签
- `<figure>` - 媒体内容容器
- `<figcaption>` - 媒体内容标题
- `<mark>` - 高亮文本
- `<time>` - 时间标记
- `<details>` - 折叠内容
- `<summary>` - 折叠内容标题

## 示例
```html
<header>
  <nav>导航菜单</nav>
</header>
<main>
  <article>
    <section>文章内容</section>
  </article>
  <aside>侧边栏</aside>
</main>
<footer>底部信息</footer>
```

# meta标签的作用

meta标签提供关于HTML文档的元信息，不会显示在页面上，但对浏览器和搜索引擎很重要。

## 常用meta标签

### 字符编码
```html
<meta charset="UTF-8">
```

### 视口设置（移动端必须）
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### SEO相关
```html
<meta name="description" content="页面描述">
<meta name="keywords" content="关键词1,关键词2">
<meta name="author" content="作者名">
```

### HTTP等效标签
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="refresh" content="5;url=http://example.com">
```

# src和href的区别

## src（source）
- **用途**：引入资源文件
- **行为**：浏览器会**暂停解析**当前文档，去获取资源
- **应用**：`<img>`、`<script>`、`<iframe>`等

```html
<img src="image.jpg" alt="图片">
<script src="script.js"></script>
```

## href（hypertext reference）
- **用途**：建立链接关系
- **行为**：浏览器会**并行下载**资源，不阻塞文档解析
- **应用**：`<a>`、`<link>`等

```html
<a href="page.html">链接</a>
<link href="style.css" rel="stylesheet">
```

# script标签的defer和async区别

## 普通script标签
```html
<script src="script.js"></script>
```
- HTML解析暂停，下载并执行脚本，然后继续解析

## defer属性
```html
<script defer src="script.js"></script>
```
- HTML解析继续，脚本并行下载
- HTML解析完成后，按顺序执行脚本
- **适用于**：依赖DOM的脚本

## async属性
```html
<script async src="script.js"></script>
```
- HTML解析继续，脚本并行下载
- 脚本下载完立即执行（可能打断HTML解析）
- **适用于**：独立的脚本（如统计代码）

## 执行时机对比
1. **defer**：DOM解析完成 → 执行脚本
2. **async**：脚本下载完成 → 立即执行

# iframe的优缺点

## 优点
- **页面隔离**：独立的浏览器环境
- **内容复用**：可以嵌入其他网站内容
- **安全隔离**：不同源的内容无法互相访问
- **并行加载**：不阻塞主页面加载

## 缺点
- **SEO不友好**：搜索引擎难以索引iframe内容
- **增加HTTP请求**：每个iframe都是一个额外请求
- **影响性能**：占用更多内存和CPU
- **移动端兼容**：部分移动设备支持不好
- **调试困难**：错误难以定位

```html
<iframe src="https://example.com" 
        width="100%" 
        height="300"
        frameborder="0">
</iframe>
```

# HTML5表单验证

## 新增input类型
```html
<input type="email" required>
<input type="url" required>
<input type="number" min="1" max="100">
<input type="date">
<input type="tel">
<input type="search">
```

## 验证属性
- `required` - 必填
- `pattern` - 正则验证
- `min/max` - 数值范围
- `minlength/maxlength` - 长度限制

```html
<input type="text" 
       pattern="[0-9]{3}-[0-9]{4}" 
       title="格式：123-4567">
```

## 自定义验证
```javascript
const input = document.querySelector('input');
input.setCustomValidity('请输入正确格式');
```

# Web语义化最佳实践

## 原则
1. **结构清晰**：用正确的标签表达内容
2. **层次分明**：合理使用标题标签(h1-h6)
3. **语义准确**：选择最符合内容意义的标签

## 好的实践
```html
<article>
  <header>
    <h1>文章标题</h1>
    <time datetime="2024-01-01">2024年1月1日</time>
  </header>
  <p>文章内容...</p>
  <footer>
    <address>作者信息</address>
  </footer>
</article>
```

## 避免的做法
```html
<!-- 不好的做法 -->
<div class="title">标题</div>
<div class="content">内容</div>

<!-- 好的做法 -->
<h1>标题</h1>
<p>内容</p>
```

# HTML性能优化技巧

## 1. 减少HTTP请求
- 合并CSS/JS文件
- 使用CSS Sprites
- 内联小图片（base64）

## 2. 压缩优化
- 启用Gzip压缩
- 压缩图片
- 移除不必要的空白和注释

## 3. 资源加载优化
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="font.woff2" as="font" crossorigin>

<!-- DNS预解析 -->
<link rel="dns-prefetch" href="//example.com">

<!-- 预连接 -->
<link rel="preconnect" href="https://api.example.com">
```

## 4. 图片优化
```html
<!-- 响应式图片 -->
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="描述">
</picture>

<!-- 懒加载 -->
<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy">
```

## 5. 关键渲染路径优化
- CSS放在头部
- JavaScript放在底部或使用async/defer
- 内联关键CSS