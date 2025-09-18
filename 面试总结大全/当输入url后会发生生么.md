# 当输入URL后会发生什么？

这是一个经典的前端面试题，考察的是对网络请求完整流程的理解。

## 1. URL输入（补全和纠错）

### 浏览器处理URL
- **URL补全**：浏览器会根据历史记录、书签、搜索引擎建议等进行URL自动补全
- **协议判断**：如果没有指定协议（http/https），浏览器会默认添加http://或https://
- **格式校验**：检查URL格式是否正确，是否包含非法字符
- **编码处理**：对URL中的中文或特殊字符进行编码（URL编码）

### 浏览器缓存检查
- 检查浏览器缓存中是否有该URL的响应
- 如果有且未过期，直接使用缓存内容
- 如果过期，会发送条件请求（If-Modified-Since等头部）

## 2. DNS解析

### DNS解析步骤
1. **浏览器DNS缓存**：首先检查浏览器自身的DNS缓存
2. **操作系统DNS缓存**：检查操作系统的DNS缓存
3. **hosts文件**：检查本地hosts文件是否有对应记录
4. **路由器缓存**：检查路由器的DNS缓存
5. **ISP DNS服务器**：向ISP的DNS服务器查询
6. **递归查询**：如果ISP DNS服务器没有，会进行递归查询
   - 根DNS服务器 → 顶级域DNS服务器 → 权威DNS服务器

### DNS优化
- **DNS预解析**：`<link rel="dns-prefetch" href="//example.com">`
- **DNS缓存**：合理设置TTL值
- **CDN**：使用CDN可以就近解析

## 3. 建立TCP连接

### TCP三次握手
1. **第一次握手**：客户端发送SYN包（seq=x）到服务器
2. **第二次握手**：服务器回复SYN+ACK包（seq=y, ack=x+1）
3. **第三次握手**：客户端发送ACK包（ack=y+1）

### 连接建立后
- 分配端口号
- 建立socket连接
- 准备数据传输通道

### HTTPS额外步骤（TLS/SSL握手）
1. **ClientHello**：客户端发送支持的加密算法列表
2. **ServerHello**：服务器选择加密算法，发送证书
3. **证书验证**：客户端验证服务器证书
4. **密钥交换**：协商对称加密密钥
5. **握手完成**：开始加密通信

## 4. 发送HTTP/HTTPS请求

### 请求构成
```http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cache-Control: max-age=0
```

### 请求头详解
- **Host**：目标服务器域名
- **User-Agent**：浏览器标识信息
- **Accept**：客户端能够接收的内容类型
- **Accept-Language**：客户端偏好的语言
- **Accept-Encoding**：客户端支持的压缩格式
- **Connection**：连接管理（keep-alive保持连接）
- **Cookie**：会话信息
- **Referer**：来源页面

## 5. 服务器端响应请求

### 服务器处理流程
1. **接收请求**：Web服务器（如Nginx、Apache）接收HTTP请求
2. **路由解析**：根据URL路径确定处理逻辑
3. **权限验证**：检查访问权限、登录状态等
4. **业务处理**：
   - 静态资源：直接返回文件内容
   - 动态内容：执行后端代码（PHP、Java、Node.js等）
   - 数据库查询：如需要，查询数据库获取数据
5. **响应构建**：构建HTTP响应

### HTTP响应格式
```http
HTTP/1.1 200 OK
Date: Thu, 18 Sep 2025 10:00:00 GMT
Server: nginx/1.18.0
Content-Type: text/html; charset=UTF-8
Content-Length: 1024
Cache-Control: max-age=3600
Set-Cookie: sessionid=abc123; HttpOnly
Connection: keep-alive

<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

### 常见状态码
- **200 OK**：请求成功
- **301/302**：重定向
- **304 Not Modified**：资源未修改，使用缓存
- **400 Bad Request**：请求错误
- **401 Unauthorized**：未授权
- **403 Forbidden**：禁止访问
- **404 Not Found**：资源不存在
- **500 Internal Server Error**：服务器内部错误

## 6. 解析渲染页面

### 浏览器渲染流程
1. **HTML解析**：
   - 构建DOM树（Document Object Model）
   - 遇到CSS链接时，并行下载CSS文件
   - 遇到JS链接时，可能阻塞解析（除非是async/defer）

2. **CSS解析**：
   - 解析CSS文件构建CSSOM树（CSS Object Model）
   - CSS不会阻塞DOM构建，但会阻塞渲染

3. **JavaScript执行**：
   - 下载并执行JavaScript代码
   - 可能修改DOM和CSSOM
   - 同步JS会阻塞HTML解析

4. **构建渲染树**：
   - 将DOM树和CSSOM树结合
   - 只包含需要显示的节点
   - 计算每个节点的样式

5. **布局（Layout/Reflow）**：
   - 计算每个节点的精确位置和大小
   - 从根节点开始，递归计算

6. **绘制（Paint）**：
   - 将渲染树的每个节点转换为屏幕上的实际像素
   - 处理颜色、阴影、边框等视觉效果

7. **合成（Composite）**：
   - 将各个图层合成最终的页面
   - GPU加速处理

### 优化策略
- **关键渲染路径优化**：减少阻塞资源
- **资源预加载**：`<link rel="preload">`
- **CSS内联**：关键CSS内联到HTML中
- **JavaScript异步加载**：使用async/defer属性
- **图片懒加载**：延迟加载非关键图片

## 7. HTTP请求结束，断开TCP连接

### 连接管理
1. **Keep-Alive连接**：
   - HTTP/1.1默认使用持久连接
   - 可以复用TCP连接发送多个请求
   - 减少TCP握手开销

2. **连接关闭时机**：
   - 服务器设置的超时时间到达
   - 客户端主动关闭连接
   - 达到最大请求数限制

### TCP四次挥手
1. **第一次挥手**：客户端发送FIN包，表示不再发送数据
2. **第二次挥手**：服务器回复ACK包，确认收到关闭请求
3. **第三次挥手**：服务器发送FIN包，表示也要关闭连接
4. **第四次挥手**：客户端回复ACK包，连接彻底关闭

### 连接状态
- **TIME_WAIT**：客户端等待2MSL时间确保连接完全关闭
- **CLOSE_WAIT**：服务器等待应用程序关闭连接
- **CLOSED**：连接完全关闭

## 性能优化总结

### 网络层面
- 使用CDN加速静态资源
- 启用Gzip压缩
- 合理设置缓存策略
- 使用HTTP/2或HTTP/3
- DNS预解析和预连接

### 浏览器层面
- 减少HTTP请求数量
- 优化关键渲染路径
- 使用浏览器缓存
- 代码分割和懒加载
- 图片优化和懒加载

### 服务器层面
- 使用负载均衡
- 数据库查询优化
- 服务器端缓存（Redis等）
- 静态资源服务器分离

这个完整的流程涉及网络、浏览器、服务器等多个层面的知识，是前端工程师必须掌握的核心概念。