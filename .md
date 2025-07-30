# CSS的盒模型

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
- opcity:0;设置了元素的透明度为0，元素不可见，占据空间位置
- visibility:hidden让元素消失，占据空间位置，一种不可见的状态
- position:obsolute
- clip-paty

# px和rem的区别是什么
- px是像素，显示器上给我们呈现的像素，每个像素的大小是一样，绝对的单位长度
- rem是相对单位，相对于html跟节点的font-size的值，直接给html节点font-size:62.5%;
>1rem =10px;(16px*62.5%=10px)

# CSS的哪些属性可以继承?哪些不可以继承
- 子元素可以继承父元素的样式
1. 字体的一些属性：font
2. 文本的一些属性:line-height
3. 元素的可见性:visibility:hidden
4. 表格布局的属性:border-spacing
5. 列表的属性:list-style
6. 页面样式的属性:page
7. 声音的样式属性


# 预处理器
预处理语言增加了变量、函数、混入等强大功能
> SASS LESS