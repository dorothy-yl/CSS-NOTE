# HTML面试题目版 - 评分版
**总分：100分，你的得分：65分**

## 一、HTML语义化基础

### 1. 什么是HTML语义化？（5分）
**你的答案：** HTML语义化是用HTML标签来描述内容的含义以及结构
**得分：4分**

**正确答案：**
HTML语义化是指使用恰当的HTML标签来描述内容的含义和结构，让页面具有良好的结构和语义，便于开发者阅读和维护，同时也利于浏览器、搜索引擎等解析。主要作用包括：
- 提高代码可读性和可维护性
- 有利于SEO优化
- 便于屏幕阅读器等辅助设备解析
- 在CSS加载失败时仍能呈现清晰的页面结构
### 2. 请列举常见的语义化标签（5分）
**你的答案：** nav用于导航连接 footer用于文档或者节的头部 header用于文章或节的脚本 main重点表述重要内容 article用于独立的代码区块 seach用于搜索阶段 figure图片、图标媒体内容 figcaption媒体头部的内容 mark 用于记录重要的事件
**得分：3分**（标签名称基本正确，但描述有误）

**正确答案：**
- `<header>`：页面或区域的头部
- `<nav>`：导航链接区域
- `<main>`：页面主要内容
- `<article>`：独立的文章内容
- `<section>`：文档中的区段
- `<aside>`：侧边栏内容
- `<footer>`：页面或区域的底部
- `<figure>`：图像、图表等媒体内容
- `<figcaption>`：figure元素的标题
- `<mark>`：高亮标记文本
- `<time>`：时间或日期
### 3. 请将下面的非语义化代码改写为语义化代码（5分）
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

**你的答案：**
```html
<header>
  <nav>
    <a>首页</a>
    <a>关于</a>
  </nav>
</header>
<main>
  <article>
    <p1>文章标题</p1>
    <p2>文章内容...</p2>
  </article>
</main>
```
**得分：3分**（语义化标签使用正确，但标签使用有误）

**正确答案：**
```html
<header>
  <nav>
    <a href="#">首页</a>
    <a href="#">关于</a>
  </nav>
</header>
<main>
  <article>
    <h1>文章标题</h1>
    <p>文章内容...</p>
  </article>
</main>
```
**说明：** `<a>`标签需要href属性，标题应使用`<h1>`-`<h6>`标签，内容应使用`<p>`标签，不存在`<p1>`、`<p2>`这样的标签。

## 二、HTML5新特性

### 1. HTML5相比HTML4的主要改进有哪些？（5分）
**你的答案：** 新增语义化标签、简化的文档声明 地理位置API  内存存储 Canvas绘图功能  
**得分：4分**

**正确答案：**
- 新增语义化标签（header、nav、main、article、section、aside、footer等）
- 简化的文档声明（`<!DOCTYPE html>`）
- 新的表单输入类型和属性
- 本地存储（localStorage、sessionStorage）
- 离线应用支持
- 多媒体支持（audio、video标签）
- Canvas 2D绘图和WebGL 3D绘图
- 地理位置API、拖放API、Web Workers等新API
- 更好的语义化和可访问性

### 2. HTML5新增了哪些语义化标签？（5分）
**你的答案：** footer header main article seach figcaption mark figure 
**得分：4分**（标签基本正确，但有拼写错误）

**正确答案：**
- `<header>`：头部
- `<nav>`：导航
- `<main>`：主要内容
- `<article>`：文章
- `<section>`：区段
- `<aside>`：侧边栏
- `<footer>`：底部
- `<figure>`：图像容器
- `<figcaption>`：图像标题
- `<mark>`：高亮文本
- `<time>`：时间
- `<details>`：详情
- `<summary>`：摘要

### 3. HTML5新增了哪些表单输入类型？（5分）
**你的答案：** （未回答）
**得分：0分**

**正确答案：**
- `email`：邮箱输入
- `url`：URL输入
- `tel`：电话号码
- `number`：数字输入
- `range`：滑块
- `date`：日期选择
- `time`：时间选择
- `datetime-local`：本地日期时间
- `month`：月份选择
- `week`：周选择
- `color`：颜色选择
- `search`：搜索框

### 4. HTML5新增了哪些API？（5分）
**你的答案：** Geolocaltion API地理位置的获取    Web sorkt API组件通信    Web works API   Canvas API绘图功能   File API 
**得分：3分**（API名称有拼写错误，但基本正确）

**正确答案：**
- **Geolocation API**：地理位置获取
- **Web Storage API**：本地存储（localStorage、sessionStorage）
- **Web Workers API**：后台线程处理
- **Canvas API**：2D绘图
- **File API**：文件操作
- **Drag and Drop API**：拖放功能
- **History API**：浏览器历史管理
- **WebSocket API**：实时通信
- **Notification API**：桌面通知
- **Fullscreen API**：全屏模式

### 5. Canvas和SVG有什么区别？（5分）
**你的答案：** Canvas适用于游戏和复杂的页面当中  基于XML使用 SVG适用于logo、图标   基于JS使用
**得分：2分**（理解有误，技术基础混淆）

**正确答案：**
| 特性 | Canvas | SVG |
|------|--------|-----|
| 类型 | 位图（像素） | 矢量图 |
| 技术基础 | 基于JavaScript | 基于XML |
| 交互性 | 需要重绘整个画布 | 每个元素可单独操作 |
| 适用场景 | 游戏、图表、复杂动画 | 图标、logo、简单图形 |
| 缩放 | 会失真 | 不会失真 |
| DOM操作 | 不支持 | 支持 |
| 事件处理 | 需要计算坐标 | 直接绑定事件 |
## 三、块级元素与内联元素

### 1. 块级元素与内联元素有什么区别？（5分）
**你的答案：** 块级元素可以独占一行，可以设置宽高    <p><ul><div> 内联元素不可以设置宽高，不可以独占一行  <a><img><span>
**得分：3分**（基本概念正确，但不够完整，且img标签理解有误）

**正确答案：**
| 特性 | 块级元素 | 内联元素 |
|------|----------|----------|
| 显示方式 | 独占一行 | 在同一行显示 |
| 宽高设置 | 可以设置width和height | 不能设置width和height |
| 内外边距 | 可以设置所有方向的margin和padding | 垂直方向的margin和padding不生效 |
| 默认宽度 | 占满父容器 | 由内容决定 |
| 常见标签 | div、p、h1-h6、ul、ol、li、header、section等 | span、a、em、strong、img、input等 |

**注意：** `<img>`虽然是内联元素，但它是**可替换元素**，可以设置宽高。

### 2. 块级元素与内联元素的嵌套规则是什么？（5分）
**你的答案：** 内联元素不可以嵌套块级元素，这是Web3的规定
**得分：2分**（基本规则正确，但表述不准确）

**正确答案：**
1. **块级元素可以包含内联元素和其他块级元素**
2. **内联元素只能包含内联元素，不能包含块级元素**
3. **特殊情况：**
   - `<p>`标签不能包含其他块级元素
   - `<a>`标签在HTML5中可以包含块级元素
   - `<li>`标签可以包含块级元素
4. **HTML规范：** 这是HTML规范的要求，不是"Web3"的规定
## 四、浏览器存储

### 1. 请对比Cookie、localStorage、sessionStorage三种存储方式（10分）

**你的答案：**
```
        存储大小     生命周期       作用域
Cookie    4KB   可以设置过期时间    同源可以访问
localStorage 5-10MB   永久保存，除非手动删除   同源可以访问
sessionStorage  5-10MB   页面会话期间      同源的同一页面
```
**得分：7分**（基本信息正确，但缺少重要特性）

**正确答案：**
| 特性 | Cookie | localStorage | sessionStorage |
|------|--------|--------------|----------------|
| **存储大小** | 4KB | 5-10MB | 5-10MB |
| **生命周期** | 可设置过期时间，默认浏览器关闭时删除 | 永久保存，除非手动删除或清除浏览器数据 | 页面会话期间，标签页关闭时删除 |
| **作用域** | 同源下所有页面 | 同源下所有页面 | 同源的同一标签页 |
| **服务器通信** | 自动随HTTP请求发送 | 不会发送到服务器 | 不会发送到服务器 |
| **API** | document.cookie | localStorage.setItem/getItem | sessionStorage.setItem/getItem |
| **数据类型** | 字符串 | 字符串（需JSON序列化对象） | 字符串（需JSON序列化对象） |
| **安全性** | 可设置httpOnly、secure等属性 | 易受XSS攻击 | 易受XSS攻击 |

### 2. localStorage和sessionStorage有什么区别？（5分）
**你的答案：** localStorage 5-10MB 永久保存，除非手动删除 同源可以访问 sessionStorage 5-10MB 页面会话期间 同源的同一页面
**得分：4分**

**正确答案：**
| 特性 | localStorage | sessionStorage |
|------|--------------|----------------|
| **生命周期** | 永久保存，除非手动删除或清除浏览器数据 | 标签页关闭时删除 |
| **作用域** | 同源的所有标签页和窗口共享 | 仅限于当前标签页 |
| **数据共享** | 多个标签页可以共享数据 | 不同标签页之间不能共享数据 |
| **使用场景** | 长期存储用户偏好、缓存数据 | 临时存储表单数据、页面状态 |

## 五、表单属性与验证

### 1. 请对比以下表单属性的区别：readonly vs disabled、required vs pattern、placeholder vs value（10分）
**你的答案：** （未回答）
**得分：0分**

**正确答案：**

**readonly vs disabled：**
| 特性 | readonly | disabled |
|------|----------|----------|
| **可编辑性** | 不可编辑，但可选择和复制 | 完全不可操作 |
| **表单提交** | 会被提交 | 不会被提交 |
| **样式** | 正常样式 | 通常显示为灰色 |
| **焦点** | 可以获得焦点 | 不能获得焦点 |
| **JavaScript** | 可以通过JS修改值 | 不能通过JS修改值 |

**required vs pattern：**
| 特性 | required | pattern |
|------|----------|---------|
| **验证类型** | 必填验证 | 格式验证 |
| **验证时机** | 检查是否为空 | 检查是否匹配正则表达式 |
| **错误提示** | "请填写此字段" | "请匹配要求的格式" |
| **适用场景** | 必须填写的字段 | 有特定格式要求的字段 |

**placeholder vs value：**
| 特性 | placeholder | value |
|------|-------------|-------|
| **作用** | 提示信息 | 实际值 |
| **显示时机** | 输入框为空时显示 | 始终显示（如果有值） |
| **表单提交** | 不会被提交 | 会被提交 |
| **样式** | 通常为浅色 | 正常文本颜色 |

### 2. 表单提交时，哪些字段会被提交，哪些不会？（5分）
**你的答案：** （未回答）
**得分：0分**

**正确答案：**

**会被提交的字段：**
- 有`name`属性且不是`disabled`的表单元素
- `readonly`的字段（只读但会提交）
- 被选中的`checkbox`和`radio`
- `select`的选中项
- `textarea`的内容

**不会被提交的字段：**
- 没有`name`属性的表单元素
- `disabled`的表单元素
- 未被选中的`checkbox`和`radio`
- `type="button"`、`type="reset"`、`type="submit"`的按钮
- `placeholder`属性（仅为提示信息）

## 六、SEO优化

### 1. 如何优化网站的SEO？（5分）
**你的答案：** 书写HTML语义化标签 使用友好的url 使用良好的数据结构
**得分：3分**（基本方向正确，但不够全面）

**正确答案：**
1. **HTML结构优化：**
   - 使用语义化标签（header、nav、main、article等）
   - 合理使用标题标签（h1-h6）层级
   - 添加alt属性给图片
   - 使用有意义的链接文本

2. **Meta标签优化：**
   - 设置合适的title标签
   - 添加meta description
   - 使用meta keywords（已不太重要）
   - 设置viewport meta标签

3. **内容优化：**
   - 提供高质量、原创内容
   - 合理的关键词密度
   - 内部链接建设
   - 定期更新内容

4. **技术优化：**
   - 友好的URL结构
   - 网站加载速度优化
   - 移动端适配
   - 使用结构化数据（Schema.org）
   - 创建XML网站地图

### 2. 前端页面由哪三部分组成？各自的作用是什么？（5分）
**你的答案：** HTML CSS JS
**得分：2分**（基本正确但缺少详细说明）

**正确答案：**
| 技术 | 作用 | 职责 |
|------|------|------|
| **HTML** | 结构层 | 定义页面的内容结构和语义，提供页面的骨架 |
| **CSS** | 表现层 | 控制页面的样式、布局和视觉效果，美化页面 |
| **JavaScript** | 行为层 | 实现页面的交互功能、动态效果和业务逻辑 |

**三者关系：** HTML提供内容，CSS美化样式，JavaScript增加交互，三者分离使代码更易维护。
## 七、路由模式

### 1. Hash模式和History模式有什么区别？（5分）
**你的答案：** Hash 带# 不需要向服务器发送请求 页面刷新不会出现404 History 不带# 需要向服务器发送请求 页面刷新会出现404
**得分：4分**（基本正确）

**正确答案：**
| 特性 | Hash模式 | History模式 |
|------|----------|-------------|
| **URL格式** | 带#号（如：#/home） | 正常URL（如：/home） |
| **服务器请求** | 不会向服务器发送请求 | 会向服务器发送请求 |
| **页面刷新** | 不会出现404错误 | 需要服务器配置，否则404 |
| **浏览器兼容性** | 兼容性更好 | IE10+ |
| **SEO友好** | 对SEO不友好 | 对SEO友好 |
| **实现原理** | 监听hashchange事件 | 使用pushState/replaceState API |
| **服务器配置** | 无需特殊配置 | 需要配置fallback到index.html |

## 八、伪类与伪元素

### 1. 什么是伪类？请列举常见的伪类（5分）
**你的答案：** :last child :frist child
**得分：2分**（概念理解不够，拼写错误）

**正确答案：**
**伪类**是用来选择处于特定状态的元素，以单个冒号`:`开头。

**常见伪类：**
- `:hover` - 鼠标悬停状态
- `:active` - 激活状态
- `:focus` - 获得焦点状态
- `:visited` - 已访问链接
- `:first-child` - 第一个子元素
- `:last-child` - 最后一个子元素
- `:nth-child(n)` - 第n个子元素
- `:not()` - 否定选择器
- `:disabled` - 禁用状态
- `:checked` - 选中状态

### 2. 什么是伪元素？请列举常见的伪元素（5分）
**你的答案：** ::before ::after ::Frist linner
**得分：2分**（基本理解，但有拼写错误）

**正确答案：**
**伪元素**是用来创建和选择不在HTML中的元素，以双冒号`::`开头（CSS3规范，CSS2使用单冒号）。

**常见伪元素：**
- `::before` - 在元素内容前插入内容
- `::after` - 在元素内容后插入内容
- `::first-line` - 选择第一行文本
- `::first-letter` - 选择第一个字母
- `::selection` - 选择被用户选中的文本
- `::placeholder` - 选择输入框占位符文本

### 3. 伪类与伪元素的主要区别是什么？（5分）
**你的答案：** 伪类有一个 : 伪元素有两个 ::
**得分：2分**（语法区别正确，但缺少本质区别）

**正确答案：**
| 区别 | 伪类 | 伪元素 |
|------|------|--------|
| **语法** | 单冒号`:` | 双冒号`::` |
| **作用** | 选择特定状态的现有元素 | 创建不存在的虚拟元素 |
| **本质** | 描述元素的状态 | 创建新的元素 |
| **示例** | `:hover`、`:first-child` | `::before`、`::after` |
| **DOM影响** | 不创建新元素 | 创建虚拟元素 |

**记忆方法：** 伪类是"假的类"，伪元素是"假的元素"。

---

## 📉 失分点详细分析

### 🔍 主要失分原因统计

**总失分：35分**

#### 1. 未回答题目（15分失分）
- **HTML5新增表单输入类型**：完全未回答 → 失分5分
- **表单属性对比**：完全未回答 → 失分10分  
- **表单提交字段规则**：完全未回答 → 失分5分

💡 **改进建议**：即使不确定答案，也要尝试回答，部分分数总比0分好。

#### 2. 概念理解不够深入（8分失分）
- **HTML语义化定义**：只答出基本概念，缺少作用说明 → 失分1分
- **Canvas和SVG区别**：技术基础完全搞反，理解有误 → 失分3分
- **前端三部分组成**：只列出名称，未说明各自作用 → 失分3分
- **伪类与伪元素区别**：只答出语法区别，缺少本质区别 → 失分1分

💡 **改进建议**：学习时要理解概念的深层含义，不能只记住表面。

#### 3. 拼写和表述错误（6分失分）
- **语义化标签列举**：footer描述错误，seach拼写错误 → 失分2分
- **HTML5 API列举**：多个API名称拼写错误 → 失分2分
- **伪类列举**：frist拼写错误，概念理解不清 → 失分3分
- **伪元素列举**：Frist linner拼写错误 → 失分3分

💡 **改进建议**：答题时要仔细检查拼写，确保技术术语准确。

#### 4. 代码实现错误（4分失分）
- **语义化代码改写**：使用了不存在的p1、p2标签，a标签缺少href属性 → 失分2分
- **块级内联元素嵌套规则**：表述不准确，说成"Web3规定" → 失分3分

💡 **改进建议**：熟练掌握HTML标签的正确使用方法。

#### 5. 回答不够完整（2分失分）
- **SEO优化方法**：只答出3个要点，缺少重要的meta标签、内容优化等 → 失分2分

💡 **改进建议**：回答要全面，多角度思考问题。

### 📊 各知识点掌握情况

| 掌握程度 | 知识点 | 建议 |
|----------|--------|------|
| **较好掌握（80%+）** | HTML语义化概念、HTML5新特性、浏览器存储、路由模式 | 继续保持，深化理解 |
| **一般掌握（60-79%）** | 语义化标签、HTML5 API、块级内联元素、SEO优化 | 加强练习，补充细节 |
| **需要加强（40-59%）** | Canvas/SVG区别、嵌套规则、前端组成、伪类伪元素 | 重点复习，理解原理 |
| **急需补强（0-39%）** | 表单相关知识 | 系统学习，大量练习 |

### 🎯 针对性提升建议

1. **立即行动**：补充表单相关知识，这是最大的失分点
2. **基础巩固**：重新学习HTML标签的正确使用方法
3. **概念深化**：不仅要知道"是什么"，还要理解"为什么"和"怎么用"
4. **实践练习**：多写代码，在实践中加深理解
5. **细心检查**：答题时注意拼写和表述的准确性

---

## 📝 表单验证高频面试题补充

### 1. HTML5表单验证属性有哪些？

**答案：**
- `required`：必填字段
- `pattern`：正则表达式验证
- `min/max`：数值范围限制
- `minlength/maxlength`：字符长度限制
- `step`：数值步进
- `type`：输入类型验证（email、url、tel等）

### 2. 如何自定义表单验证错误信息？

**答案：**
```html
<input type="email" required 
       oninvalid="this.setCustomValidity('请输入正确的邮箱格式')"
       oninput="this.setCustomValidity('')">
```

```javascript
const input = document.querySelector('input[type="email"]');
input.addEventListener('invalid', function() {
    if (this.validity.valueMissing) {
        this.setCustomValidity('邮箱不能为空');
    } else if (this.validity.typeMismatch) {
        this.setCustomValidity('请输入正确的邮箱格式');
    }
});
```

### 3. 表单验证的时机有哪些？

**答案：**
- **实时验证**：`oninput`事件 - 用户输入时验证
- **失焦验证**：`onblur`事件 - 离开输入框时验证
- **提交验证**：`onsubmit`事件 - 表单提交时验证
- **HTML5自动验证**：浏览器内置验证

### 4. 如何阻止HTML5默认验证？

**答案：**
```html
<!-- 方法1：表单添加novalidate属性 -->
<form novalidate>
  <!-- 表单内容 -->
</form>

<!-- 方法2：提交按钮添加formnovalidate -->
<input type="submit" formnovalidate value="提交">
```

```javascript
// 方法3：JavaScript阻止
form.addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止默认提交
    // 自定义验证逻辑
});
```

### 5. 常见的表单验证正则表达式？

**答案：**
```html
<!-- 手机号验证 -->
<input type="tel" pattern="^1[3-9]\d{9}$" title="请输入正确的手机号">

<!-- 身份证验证 -->
<input type="text" pattern="^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$">

<!-- 中文姓名 -->
<input type="text" pattern="^[\u4e00-\u9fa5]{2,4}$" title="请输入2-4位中文姓名">

<!-- 密码强度（至少8位，包含大小写字母和数字） -->
<input type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$">
```

### 6. ValidityState对象的属性有哪些？

**答案：**
```javascript
const input = document.querySelector('input');
const validity = input.validity;

// 验证状态属性
validity.valueMissing    // 必填字段为空
validity.typeMismatch    // 类型不匹配
validity.patternMismatch // 正则不匹配
validity.tooLong         // 超过最大长度
validity.tooShort        // 少于最小长度
validity.rangeUnderflow  // 小于最小值
validity.rangeOverflow   // 大于最大值
validity.stepMismatch    // 不符合步进值
validity.customError     // 自定义错误
validity.valid           // 是否通过验证

// 检查方法
input.checkValidity()    // 返回布尔值
input.reportValidity()   // 显示验证消息
```

### 7. 如何实现实时密码强度检测？

**答案：**
```html
<input type="password" id="password" placeholder="请输入密码">
<div id="strength"></div>
```

```javascript
const password = document.getElementById('password');
const strength = document.getElementById('strength');

password.addEventListener('input', function() {
    const value = this.value;
    let score = 0;
    let feedback = '';
    
    // 长度检查
    if (value.length >= 8) score++;
    else feedback += '至少8位字符 ';
    
    // 大写字母
    if (/[A-Z]/.test(value)) score++;
    else feedback += '包含大写字母 ';
    
    // 小写字母
    if (/[a-z]/.test(value)) score++;
    else feedback += '包含小写字母 ';
    
    // 数字
    if (/\d/.test(value)) score++;
    else feedback += '包含数字 ';
    
    // 特殊字符
    if (/[!@#$%^&*]/.test(value)) score++;
    else feedback += '包含特殊字符';
    
    // 显示强度
    const levels = ['很弱', '弱', '一般', '强', '很强'];
    const colors = ['#ff4757', '#ff6b6b', '#ffa502', '#2ed573', '#1e90ff'];
    
    strength.textContent = `密码强度: ${levels[score] || '很弱'} ${feedback}`;
    strength.style.color = colors[score] || colors[0];
});
```

### 8. 如何实现表单字段的联动验证？

**答案：**
```html
<form>
    <input type="password" id="password" placeholder="密码" required>
    <input type="password" id="confirmPassword" placeholder="确认密码" required>
    <span id="error"></span>
</form>
```

```javascript
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const error = document.getElementById('error');

function validatePasswords() {
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('两次密码输入不一致');
        error.textContent = '两次密码输入不一致';
        return false;
    } else {
        confirmPassword.setCustomValidity('');
        error.textContent = '';
        return true;
    }
}

password.addEventListener('input', validatePasswords);
confirmPassword.addEventListener('input', validatePasswords);
```

### 9. 如何实现文件上传的验证？

**答案：**
```html
<input type="file" id="fileInput" accept=".jpg,.png,.gif" multiple>
<div id="fileError"></div>
```

```javascript
const fileInput = document.getElementById('fileInput');
const fileError = document.getElementById('fileError');

fileInput.addEventListener('change', function() {
    const files = this.files;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    for (let file of files) {
        // 文件大小验证
        if (file.size > maxSize) {
            fileError.textContent = `文件 ${file.name} 超过5MB限制`;
            this.value = '';
            return;
        }
        
        // 文件类型验证
        if (!allowedTypes.includes(file.type)) {
            fileError.textContent = `文件 ${file.name} 类型不支持`;
            this.value = '';
            return;
        }
    }
    
    fileError.textContent = '';
});
```

### 10. 表单提交前的完整验证流程？

**答案：**
```javascript
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止默认提交
    
    let isValid = true;
    const formData = new FormData(this);
    
    // 1. HTML5原生验证
    if (!this.checkValidity()) {
        this.reportValidity();
        return false;
    }
    
    // 2. 自定义业务验证
    const customValidations = [
        validateEmail,
        validatePhone,
        validatePassword,
        validateAge
    ];
    
    for (let validate of customValidations) {
        if (!validate(formData)) {
            isValid = false;
            break;
        }
    }
    
    // 3. 异步验证（如用户名重复检查）
    if (isValid) {
        checkUsernameAvailability(formData.get('username'))
            .then(available => {
                if (available) {
                    submitForm(formData);
                } else {
                    showError('用户名已存在');
                }
            });
    }
});

function validateEmail(formData) {
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('邮箱格式不正确');
        return false;
    }
    return true;
}

// 其他验证函数...
```