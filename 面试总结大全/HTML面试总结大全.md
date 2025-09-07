# HTML面试总结大全

## 一、HTML语义化基础

### 1. 什么是HTML语义化？
HTML语义化是指使用合适的HTML标签来描述内容的含义和结构，而不仅仅是外观展示。

**意义：**
- 便于搜索引擎理解和爬取
- 提高代码可读性和可维护性
- 便于其他设备解析（如屏幕阅读器）
- 有利于SEO优化
- 便于团队协作开发

### 2. 常见语义化标签
- `<header>` - 页面或区块的头部
- `<footer>` - 页面或区块的底部
  
- `<main>` - 页面主要内容
- `<article>` - 独立的内容区块
- `<section>` - 文档中的节或区段

- `<nav>` - 导航链接区域
- `<aside>` - 侧边栏内容
- `<figure>` - 图片、图表等媒体内容
- `<figcaption>` - 媒体内容的标题
- `<mark>` - 标记重要文本

### 3. 语义化实践示例
**非语义化代码：**
```html
<div class="header">
  <div class="nav">
    <div class="nav-item">首页</div>
    <div class="nav-item">关于</div>
  </div>
</div>
<div class="content">
  <div class="article">
    <div class="title">文章标题</div>
    <div class="text">文章内容...</div>
  </div>
</div>
```

**语义化代码：**
```html
<header>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>文章标题</h1>
    <p>文章内容...</p>
  </article>
</main>
```

## 二、HTML5新特性

### 1. HTML5相比HTML4的主要改进
- 新增语义化标签
- 支持音频、视频标签
- Canvas绘图功能
- 本地存储（localStorage、sessionStorage）
- 新的表单控件类型
- 地理定位API
- WebSocket通信
- 简化的文档声明：`<!DOCTYPE html>`

### 2. HTML5新增的语义化标签
- `<header>`, `<footer>`, `<nav>`, `<article>`, `<section>`
- `<aside>`, `<main>`, `<figure>`, `<figcaption>`, `<mark>`

### 3. HTML5新增的表单输入类型
- `email` - 邮箱
- `url` - 网址
- `tel` - 电话
- 
- `number` - 数字
- `date` - 日期
- `time` - 时间
- 
- `search` - 搜索
- `color` - 颜色
- `range` - 范围滑块

### 4. HTML5新增的API
- **Canvas API** - 2D图形绘制（创建画布，画笔）
- **Geolocation API** - 地理位置信息
- **Web Storage API** - 本地存储
- **Web Workers API** - 后台线程
- **WebSocket API** - 全双工通信
- **File API** - 文件处理

### 5. Canvas和SVG的区别
**Canvas特点：**
- 基于像素的位图渲染
- 通过JavaScript绘制
- 不支持事件处理器
- 适合复杂动画、游戏、图像处理

**SVG特点：**
- 基于XML的矢量图形
- 支持CSS样式和DOM事件
- 可缩放不失真
- 适合图标、Logo、简单动画

## 三、块级元素与内联元素

### 1. 区别
**块级元素：**
- 独占一行
- 可设置宽高
- 默认宽度100%
- 如：`<div>`, `<p>`, `<h1>`, `<ul>`

**内联元素：**
- 不独占一行
- 宽高由内容决定
- 不能设置宽高
- 如：`<span>`, `<a>`, `<strong>`, `<img>`

### 2. 嵌套规则
- 内联元素中不可以嵌套块级元素
- 根据W3C标准，这会导致HTML结构不合法

## 四、浏览器存储

### 1. 存储方式对比

| 存储方式 | 存储大小 | 生命周期 | 作用域 | 特点 |
|---------|---------|---------|--------|------|
| Cookie | 4KB | 可设置过期时间 | 同源 | 会随HTTP请求发送 |
| localStorage | 5-10MB | 永久存储 | 同源 | 需要手动清除 |
| sessionStorage | 5-10MB | 会话期间 | 当前标签页 | 关闭标签页自动清除 |

### 2. localStorage和sessionStorage的区别
- **生命周期**：localStorage永久存储，除非手动清除；sessionStorage关闭标签页后清除
- **作用域**：localStorage在同源的所有标签页共享；sessionStorage仅在当前标签页有效
- **API相同**：都有setItem、getItem、removeItem、clear等方法

## 五、表单属性与验证

### 1. 表单属性对比
- `readonly` vs `disabled` - readonly可提交，disabled不可提交
- `required` vs `pattern` - required必填验证，pattern正则验证
- `placeholder` vs `value` - placeholder提示文本，value实际值
- `autocomplete` - 控制浏览器自动填充

### 2. 表单提交规则
- `readonly`字段会被提交
- `disabled`字段不会被提交
- `hidden`字段会被提交
- 空`value`字段会被提交

## 六、SEO优化

### 1. 如何优化网站的SEO
- 合理使用title标签和meta描述
- 使用语义化HTML标签
- 优化URL结构，使用友好的URL
- 提高页面加载速度
- 使用alt属性描述图片
- 构建良好的内部链接结构
- 创建sitemap.xml
- 使用结构化数据

### 2. 页面组成
前端页面由三部分组成：
- **HTML** - 结构层，定义页面内容
- **CSS** - 表现层，定义页面样式
- **JavaScript** - 行为层，定义页面交互

## 七、路由模式

### 1. Hash模式 vs History模式

**Hash模式：**
- URL格式：`#/path`
- 优点：兼容性好，不需要服务器配置
- 缺点：URL不美观，SEO不友好

**History模式：**
- URL格式：`/path`
- 优点：URL美观，SEO友好
- 缺点：需要服务器配置支持

## 八、伪类与伪元素

### 1. 伪类（Pseudo-classes）
用于选择处于特定状态的元素，以冒号（:）开头。

**常见伪类：**
- `:hover` - 鼠标悬停
- `:focus` - 获得焦点
- `:active` - 被激活
- `:visited` - 已访问链接
- `:first-child` - 第一个子元素
- `:last-child` - 最后一个子元素
- `:nth-child(n)` - 第n个子元素

### 2. 伪元素（Pseudo-elements）
用于创建不在DOM中的虚拟元素，以双冒号（::）开头。

**常见伪元素：**
- `::before` - 在元素内容前插入
- `::after` - 在元素内容后插入
- `::first-line` - 选择第一行
- `::first-letter` - 选择第一个字母
- `::selection` - 选择用户选中的文本

### 3. 主要区别
1. **语法**：伪类用单冒号（:），伪元素用双冒号（::）
2. **功能**：伪类选择已存在的元素状态，伪元素创建虚拟元素
3. **内容**：伪类不能添加内容，伪元素可以通过content属性添加内容

## 九、清除浮动

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
- 使用`overflow: hidden`
- 使用`display: flow-root`
- 使用flexbox布局

## 十、兼容性问题

### 1. 常见H5兼容性问题
- iOS Safari的viewport问题
- Android WebView的兼容性
- 不同浏览器的CSS前缀
- 事件处理差异
- 本地存储支持差异

### 2. 解决方案
- 使用CSS前缀
- 使用polyfill
- 特性检测
- 渐进增强

## 十一、编码规范

### 1. 写页面内容应注意什么
- 尽量少用没有语义的标签（如div、span）
- 符合Web标准，内联元素中不嵌套块级元素
- 使用合适的标签表达内容含义
- 保持代码结构清晰

### 2. 最佳实践
- 使用语义化标签
- 保持HTML结构简洁
- 合理使用注释
- 遵循Web标准
- 考虑无障碍访问
