# CSS的盒模型

Flexbox是CSS弹性盒子的布局模块，可以实现对齐，分布和空间分配
弹性盒子的核心：
1.父控子（亲父子）
- 父盒子控制子盒子如何排列布局
-  父盒子称为容器，子盒子称为项目
2.



- 在HTML页面中的所有元素都可以看成是一个盒子

- 盒子的组成:内容content、内边距padding、边框border、外边距margin、
#### 盒模型的类型
- 标准盒模型
   margin+border+padding+content
- IE盒模型
    margin+content(padding+border)
    ---
>控制盒模型的模式：
box-sizing:content-box(默认值，标准盒模型)、border-box(IE盒模型)**\

---
---
# CSS选择器的优先级
* CSS的特性：继承性，层叠行，优先级
> 优先级：在写css的时候，会给同一个元素添加多个样式，谁的权重高就显示谁的样式
- 标签、类/伪类/属性、全局选择器、行内样式、id、!importent
- !importent > 行内样式 > id >  类/伪类/属性 > 标签 >  全局选择器

## 隐藏元素的方法有那些
- display:none;元素在页面上消失，不占据空间
- opacity:0;设置了元素的透明度为0，元素不可见，占据空间位置
- visibility:hidden让元素消失，占据空间位置，一种不可见的状态
- position:absolute;将元素脱离文档流，配合left:-9999px等移出视口
- clip-path:polygon(0 0,0 0,0 0,0 0);通过裁剪路径隐藏元素
- transform:scale(0);将元素缩放为0
- height:0;overflow:hidden;设置高度为0并隐藏溢出内容
- z-index:-1;配合position将元素置于其他元素下方

# px和rem的区别是什么
- px是像素，显示器上给我们呈现的像素，每个像素的大小是一样，绝对的单位长度
- rem是相对单位，相对于html跟节点的font-size的值，直接给html节点font-size:62.5%;
>1rem =10px;(16px*62.5%=10px)

# CSS的哪些属性可以继承?哪些不可以继承
- 子元素可以继承父元素的样式
1. 字体列表：font-family(设置字体的系列，字体族)  font-size（(字体的大小)   font-weight(设置字体的粗细)
2. 文本属性:line-height(设置行高，行间距),text-align(设置文本水平对齐方式),color
3. 元素的可见性:visibility:hidden
4. 列表样式:list-style



# 预处理器
预处理语言增加了变量、函数、混入等强大功能
> SASS LESS Stylus PostCSS

## 主要预处理器对比
### SASS/SCSS
- 功能最强大，社区最成熟
- 支持变量($variable)、嵌套、混入(mixin)、继承(@extend)
- 两种语法：缩进语法(.sass)和SCSS语法(.scss)
- 需要Ruby环境或Node-sass/Dart-sass

### LESS
- 语法简单，易上手
- 支持变量(@variable)、嵌套、混入、函数
- 可在浏览器端运行(less.js)
- Bootstrap 3使用LESS

### Stylus
- 语法最灵活，可省略花括号、冒号、分号
- 功能强大，内置函数丰富
- 主要在Node.js社区流行

### PostCSS
- 不是预处理器，是后处理器
- 通过插件系统扩展功能(如Autoprefixer自动添加前缀)
- 可与其他预处理器配合使用
- 性能优秀，构建速度快


span 元素的默认 display 值
span 元素的默认 display 值是 inline。
display 属性的主要值
1. inline（内联元素）
特点：
元素在一行内显示，不会换行
不能设置 width 和 height
只能设置水平方向的 margin 和 padding
内容决定元素大小
常见元素：span、a、em、strong、img 等
2. block（块级元素）
特点：
独占一行，会换行
可以设置 width 和 height
可以设置所有方向的 margin 和 padding
默认宽度是父容器的100%
常见元素：div、p、h1-h6、ul、li 等
3. inline-block（内联块级元素）
特点：
结合了 inline 和 block 的特性
像 inline 一样在一行内显示，不会换行
像 block 一样可以设置 width、height、margin、padding
内容决定元素大小，但可以通过CSS控制
常见应用：导航菜单、按钮组、图片列表等
为什么需要 inline-block？
在你的代码中：
span:first-child {
  display: inline-block;  /* 让span可以设置宽度 */
  width: 120px;          /* 现在可以设置宽度了 */
}
问题：
span 默认是 inline，不能设置 width
如果你直接写 width: 120px，浏览器会忽略这个属性
解决方案：
设置 display: inline-block
现在 span 既可以保持在一行内显示，又可以设置固定宽度
实际效果对比
<!-- 原始HTML -->
<p><span>上次登录时间:</span> <span>2022-7-11</span></p>
默认情况（display: inline）：
上次登录时间: 2022-7-11
两个 span 紧挨着显示
宽度由内容决定
使用 display: inline-block + width: 120px：
上次登录时间:     2022-7-11
第一个 span 固定120px宽度
第二个 span 紧跟在后面
整体布局更整齐
这就是为什么你需要 inline-block 的原因！