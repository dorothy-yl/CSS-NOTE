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