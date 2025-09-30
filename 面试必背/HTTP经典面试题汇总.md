# HTTP经典面试题汇总

## 一、HTTP基础知识

### 1. 什么是HTTP？HTTP的特点是什么？

📝 **面试背诵要点：**

**定义：**
- HTTP（HyperText Transfer Protocol）超文本传输协议
- 应用层协议，基于TCP/IP协议栈
- 用于客户端和服务器之间传输超文本数据

**HTTP的五大特点：**
1. **无连接**：每次连接只处理一个请求（HTTP/1.0）
2. **无状态**：协议本身不保存请求和响应的信息
3. **简单快速**：请求方法简单，服务器响应快速
4. **灵活**：可以传输任意类型的数据
5. **基于请求-响应模式**：客户端发起请求，服务器返回响应

### 2. HTTP报文结构是什么？

📝 **面试背诵要点：**

**请求报文结构：**
```http
# 请求行
GET /api/users HTTP/1.1

# 请求头
Host: www.example.com
User-Agent: Mozilla/5.0
Content-Type: application/json
Authorization: Bearer token

# 空行

# 请求体（GET请求通常没有）
{"name": "张三", "age": 25}
```

**响应报文结构：**
```http
# 状态行
HTTP/1.1 200 OK

# 响应头
Content-Type: application/json
Content-Length: 1024
Set-Cookie: sessionId=abc123

# 空行

# 响应体
{"code": 0, "data": {...}}
```

**四个组成部分：**
1. **起始行**：请求行或状态行
2. **头部字段**：描述报文的属性
3. **空行**：头部和主体的分隔标志
4. **消息主体**：实际传输的数据

### 3. GET和POST的区别？

📝 **面试背诵要点：**

| 区别点 | GET | POST |
|--------|-----|------|
| **语义** | 获取资源 | 提交数据 |
| **参数位置** | URL中 | 请求体中 |
| **参数大小** | 有限制（2KB-8KB） | 理论上无限制 |
| **安全性** | 参数暴露在URL | 相对安全 |
| **幂等性** | 幂等 | 非幂等 |
| **可缓存** | 可缓存 | 不可缓存 |
| **书签** | 可收藏为书签 | 不可收藏 |
| **历史记录** | 参数保留在历史 | 参数不保留 |
| **编码类型** | application/x-www-form-urlencoded | 多种编码类型 |

**深层理解：**
- 本质上GET和POST都是TCP连接，没有本质区别
- 区别主要是HTTP规范和浏览器/服务器的限制
- GET产生一个TCP数据包，POST产生两个（先发header，再发body）

### 4. HTTP和HTTPS的区别？

📝 **面试背诵要点：**

| 对比项 | HTTP | HTTPS |
|--------|------|-------|
| **全称** | 超文本传输协议 | 安全的超文本传输协议 |
| **端口** | 80 | 443 |
| **安全性** | 明文传输 | SSL/TLS加密 |
| **证书** | 不需要 | 需要CA证书 |
| **速度** | 较快 | 较慢（加密解密） |
| **SEO** | 无优势 | 搜索引擎优先 |
| **成本** | 低 | 需要证书费用 |

**HTTPS = HTTP + SSL/TLS**

**HTTPS工作原理：**
1. 客户端请求建立HTTPS连接
2. 服务器返回证书（包含公钥）
3. 客户端验证证书合法性
4. 客户端生成对称密钥，用公钥加密发送
5. 服务器用私钥解密获得对称密钥
6. 双方使用对称密钥加密通信

## 二、HTTP状态码

### 1. 常见HTTP状态码及其含义？

📝 **面试背诵要点：**

**1xx 信息性状态码（较少使用）：**
- `100 Continue`：继续，客户端应继续请求
- `101 Switching Protocols`：切换协议（如WebSocket）

**2xx 成功状态码：**
- `200 OK`：请求成功
- `201 Created`：创建成功（POST/PUT）
- `202 Accepted`：已接受，但未处理完
- `204 No Content`：成功但无返回内容
- `206 Partial Content`：范围请求成功

**3xx 重定向状态码：**
- `301 Moved Permanently`：永久重定向（SEO友好）
- `302 Found`：临时重定向
- `303 See Other`：查看其他位置
- `304 Not Modified`：资源未修改（协商缓存）
- `307 Temporary Redirect`：临时重定向（不改变请求方法）

**4xx 客户端错误：**
- `400 Bad Request`：请求语法错误
- `401 Unauthorized`：未认证
- `403 Forbidden`：无权限
- `404 Not Found`：资源不存在
- `405 Method Not Allowed`：方法不允许
- `408 Request Timeout`：请求超时
- `409 Conflict`：请求冲突
- `413 Payload Too Large`：请求体过大
- `429 Too Many Requests`：请求过多

**5xx 服务器错误：**
- `500 Internal Server Error`：服务器内部错误
- `501 Not Implemented`：功能未实现
- `502 Bad Gateway`：网关错误
- `503 Service Unavailable`：服务不可用
- `504 Gateway Timeout`：网关超时

### 2. 301和302的区别？

📝 **面试背诵要点：**

**301 Moved Permanently（永久重定向）：**
- 资源永久移动到新位置
- 搜索引擎会更新索引
- 浏览器会缓存重定向
- SEO权重会转移

**302 Found（临时重定向）：**
- 资源临时移动
- 搜索引擎不更新索引
- 浏览器不缓存
- SEO权重不转移

**使用场景：**
```javascript
// 301场景：网站域名更换
app.get('/*', (req, res) => {
  res.redirect(301, 'https://newdomain.com' + req.url);
});

// 302场景：临时维护页面
app.get('/api/*', (req, res) => {
  res.redirect(302, '/maintenance');
});
```

## 三、HTTP请求方法

### 1. HTTP有哪些请求方法？

📝 **面试背诵要点：**

**九种请求方法：**

1. **GET**：获取资源
   - 幂等、安全、可缓存
   - 用于查询操作

2. **POST**：提交数据
   - 非幂等、不安全、不可缓存
   - 用于创建资源

3. **PUT**：更新资源（完整更新）
   - 幂等、不安全、不可缓存
   - 用于更新整个资源

4. **PATCH**：部分更新
   - 非幂等、不安全、不可缓存
   - 用于部分更新资源

5. **DELETE**：删除资源
   - 幂等、不安全、不可缓存
   - 用于删除操作

6. **HEAD**：获取响应头
   - 类似GET但不返回响应体
   - 用于检查资源是否存在

7. **OPTIONS**：获取支持的方法
   - 用于CORS预检请求
   - 返回Allow头部

8. **CONNECT**：建立隧道
   - 用于HTTPS代理

9. **TRACE**：追踪路径
   - 用于测试或诊断

### 2. 什么是幂等性？

📝 **面试背诵要点：**

**定义：**
- 多次执行同一操作，结果保持一致
- 不会产生副作用的累积

**幂等的方法：**
- GET：多次获取同一资源
- PUT：多次更新为同一状态
- DELETE：多次删除同一资源
- HEAD：多次获取同一头部

**非幂等的方法：**
- POST：多次创建会产生多个资源
- PATCH：可能基于当前状态更新

**实际应用：**
```javascript
// 幂等操作：设置用户年龄为25
PUT /users/1
{"age": 25}

// 非幂等操作：给用户年龄加1
POST /users/1/age/increment
```

## 四、HTTP头部字段

### 1. 常用的HTTP请求头有哪些？

📝 **面试背诵要点：**

**通用头部：**
- `Host`：请求的主机名
- `User-Agent`：客户端信息
- `Accept`：可接受的内容类型
- `Accept-Language`：可接受的语言
- `Accept-Encoding`：可接受的编码（gzip、deflate）
- `Authorization`：认证信息
- `Cookie`：客户端Cookie
- `Content-Type`：请求体类型
- `Content-Length`：请求体长度
- `Referer`：请求来源页面
- `Origin`：请求源（CORS）

**缓存相关：**
- `Cache-Control`：缓存控制
- `If-Modified-Since`：协商缓存
- `If-None-Match`：协商缓存（ETag）

### 2. 常用的HTTP响应头有哪些？

📝 **面试背诵要点：**

**通用响应头：**
- `Content-Type`：响应内容类型
- `Content-Length`：响应内容长度
- `Content-Encoding`：内容编码方式
- `Set-Cookie`：设置Cookie
- `Location`：重定向地址
- `Server`：服务器信息

**缓存相关：**
- `Cache-Control`：缓存策略
- `Expires`：过期时间
- `ETag`：资源标识
- `Last-Modified`：最后修改时间

**安全相关：**
- `Access-Control-*`：CORS相关
- `Content-Security-Policy`：CSP策略
- `X-Frame-Options`：防止点击劫持
- `X-XSS-Protection`：XSS防护
- `Strict-Transport-Security`：HSTS

### 3. Content-Type有哪些常见类型？

📝 **面试背诵要点：**

**常见MIME类型：**

```javascript
// 文本类型
'text/html'                  // HTML
'text/plain'                 // 纯文本
'text/css'                   // CSS
'text/javascript'            // JavaScript

// 应用类型
'application/json'           // JSON数据
'application/xml'            // XML数据
'application/x-www-form-urlencoded'  // 表单默认
'application/octet-stream'   // 二进制流

// 多部分类型
'multipart/form-data'        // 文件上传

// 图片类型
'image/jpeg'                 // JPEG图片
'image/png'                  // PNG图片
'image/gif'                  // GIF图片
'image/webp'                 // WebP图片

// 音视频类型
'audio/mpeg'                 // MP3音频
'video/mp4'                  // MP4视频
```

## 五、HTTPS安全机制

### 1. HTTPS的加密原理？

📝 **面试背诵要点：**

**混合加密机制：**
- 使用非对称加密传输对称密钥
- 使用对称加密传输数据

**TLS/SSL握手过程：**
1. **Client Hello**：客户端发送支持的TLS版本、加密套件
2. **Server Hello**：服务器选择TLS版本和加密套件
3. **Certificate**：服务器发送证书（包含公钥）
4. **Server Hello Done**：服务器hello阶段结束
5. **Client Key Exchange**：客户端生成预主密钥，用公钥加密发送
6. **Change Cipher Spec**：客户端切换到加密模式
7. **Finished**：客户端发送加密的握手消息
8. **Change Cipher Spec**：服务器切换到加密模式
9. **Finished**：服务器发送加密的握手消息

### 2. 什么是中间人攻击？如何防范？

📝 **面试背诵要点：**

**中间人攻击（MITM）：**
- 攻击者位于通信双方之间
- 截获并可能篡改通信内容
- 双方都认为在与对方直接通信

**攻击方式：**
1. DNS劫持
2. ARP欺骗
3. 代理服务器
4. WiFi热点

**防范措施：**
1. **使用HTTPS**：加密通信
2. **证书验证**：验证服务器身份
3. **证书固定**：Certificate Pinning
4. **HSTS**：强制使用HTTPS
5. **避免公共WiFi**：使用VPN

### 3. 数字证书的作用？

📝 **面试背诵要点：**

**作用：**
1. **身份验证**：证明服务器身份
2. **传递公钥**：安全地传递服务器公钥
3. **防止篡改**：CA的数字签名保证证书完整性

**证书包含信息：**
- 证书版本号
- 证书序列号
- 签名算法
- 颁发者信息
- 有效期
- 主体信息（域名）
- 公钥信息
- CA的数字签名

**证书链验证过程：**
1. 验证证书是否在有效期内
2. 验证证书域名是否匹配
3. 验证证书是否被吊销
4. 验证CA签名是否有效
5. 递归验证上级CA直到根证书

## 六、HTTP版本演进

### 1. HTTP/1.0、HTTP/1.1、HTTP/2的区别？

📝 **面试背诵要点：**

**HTTP/1.0：**
- 每个请求都需要建立新的TCP连接
- 不支持断点续传
- 不支持Host头部

**HTTP/1.1：**
- **持久连接**：Connection: keep-alive
- **管道化**：可以同时发送多个请求
- **Host头部**：支持虚拟主机
- **断点续传**：Range和Content-Range
- **缓存控制**：Cache-Control
- **分块传输**：Transfer-Encoding: chunked

**HTTP/2：**
- **二进制分帧**：二进制协议替代文本协议
- **多路复用**：一个连接并行处理多个请求
- **头部压缩**：HPACK算法压缩头部
- **服务器推送**：主动推送资源
- **流优先级**：设置请求优先级

### 2. HTTP/2的多路复用是什么？

📝 **面试背诵要点：**

**定义：**
- 在一个TCP连接上并行发送多个请求/响应
- 不再需要按顺序等待响应

**实现原理：**
1. 将HTTP消息分解为帧（Frame）
2. 帧标识所属的流（Stream）
3. 帧可以交错发送
4. 接收端根据流ID重组消息

**优势：**
- 解决队头阻塞问题
- 减少TCP连接数量
- 提高带宽利用率
- 降低延迟

**与HTTP/1.1对比：**
```javascript
// HTTP/1.1 - 串行请求
请求1 → 响应1 → 请求2 → 响应2

// HTTP/2 - 并行请求
请求1 ↘
请求2 → 响应1、响应2交错返回
请求3 ↗
```

### 3. HTTP/3有什么新特性？

📝 **面试背诵要点：**

**核心改变：**
- 基于UDP的QUIC协议
- 不再使用TCP

**主要特性：**
1. **0-RTT连接建立**：减少握手延迟
2. **连接迁移**：更换网络不断连
3. **没有队头阻塞**：独立的流
4. **前向纠错**：减少重传
5. **更好的拥塞控制**

**QUIC协议优势：**
- 集成TLS1.3
- 连接ID不依赖IP
- 独立的流控制
- 更快的连接建立

## 七、HTTP安全相关

### 1. 什么是XSS攻击？如何防范？

📝 **面试背诵要点：**

**XSS（跨站脚本攻击）类型：**

1. **反射型XSS**：恶意脚本在URL中
2. **存储型XSS**：恶意脚本存储在数据库
3. **DOM型XSS**：修改DOM结构

**防范措施：**
```javascript
// 1. 输入验证和过滤
function sanitizeInput(input) {
  return input.replace(/<script>/gi, '');
}

// 2. 输出编码
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// 3. CSP响应头
res.setHeader('Content-Security-Policy', "default-src 'self'");

// 4. HttpOnly Cookie
res.cookie('session', sessionId, { httpOnly: true });

// 5. X-XSS-Protection
res.setHeader('X-XSS-Protection', '1; mode=block');
```

### 2. 什么是CSRF攻击？如何防范？

📝 **面试背诵要点：**

**CSRF（跨站请求伪造）：**
- 利用用户已登录的身份
- 在用户不知情的情况下发送请求
- 执行非预期的操作

**攻击原理：**
1. 用户登录受信任网站A
2. 用户访问恶意网站B
3. 网站B向网站A发送请求
4. 浏览器自动带上Cookie
5. 网站A执行操作

**防范措施：**
```javascript
// 1. CSRF Token
app.use(csrfProtection);
app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

// 2. 验证Referer
if (req.headers.referer !== 'https://trusted.com') {
  return res.status(403).send('Forbidden');
}

// 3. SameSite Cookie
res.cookie('session', sessionId, { sameSite: 'strict' });

// 4. 双重Cookie验证
const token = req.cookies.csrfToken;
const headerToken = req.headers['x-csrf-token'];
if (token !== headerToken) {
  return res.status(403).send('CSRF token mismatch');
}
```

## 八、HTTP性能优化

### 1. 如何优化HTTP请求？

📝 **面试背诵要点：**

**减少请求数量：**
1. **资源合并**：CSS/JS文件合并
2. **雪碧图**：多个小图合并
3. **内联资源**：小文件内联
4. **懒加载**：按需加载资源

**减少请求大小：**
1. **压缩**：Gzip/Brotli压缩
2. **图片优化**：WebP格式、合适尺寸
3. **代码压缩**：去除空格注释
4. **Tree Shaking**：移除无用代码

**利用缓存：**
1. **强缓存**：Cache-Control
2. **协商缓存**：ETag/Last-Modified
3. **Service Worker**：离线缓存
4. **CDN缓存**：边缘节点缓存

**其他优化：**
```javascript
// 1. 使用HTTP/2
server.listen(443, {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  allowHTTP1: true
});

// 2. 预加载关键资源
<link rel="preload" href="style.css" as="style">
<link rel="prefetch" href="next-page.js">
<link rel="dns-prefetch" href="//api.example.com">
<link rel="preconnect" href="//cdn.example.com">

// 3. 启用Keep-Alive
res.setHeader('Connection', 'keep-alive');
res.setHeader('Keep-Alive', 'timeout=5, max=1000');
```

### 2. 什么是HTTP长连接和短连接？

📝 **面试背诵要点：**

**短连接（HTTP/1.0默认）：**
- 每个请求都新建TCP连接
- 请求完成后立即关闭
- 简单但开销大

**长连接（HTTP/1.1默认）：**
- 复用TCP连接
- Connection: keep-alive
- 减少握手开销
- 需要管理连接池

**连接管理：**
```javascript
// Nginx配置
keepalive_timeout 65;  // 65秒超时
keepalive_requests 100; // 最多100个请求

// Node.js配置
const http = require('http');
const agent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 10,
  maxFreeSockets: 5
});
```

## 九、经典面试题总结

### 高频考点清单

**必背知识点：**
1. ✅ HTTP和HTTPS的区别
2. ✅ GET和POST的区别
3. ✅ HTTP状态码分类和常见状态码
4. ✅ 强缓存和协商缓存
5. ✅ 跨域问题和解决方案
6. ✅ HTTP/1.1和HTTP/2的区别
7. ✅ HTTPS加密原理
8. ✅ XSS和CSRF攻击及防范
9. ✅ Cookie、Session、Token的区别
10. ✅ HTTP请求方法和幂等性

**进阶知识点：**
1. ⚡ HTTP/2多路复用原理
2. ⚡ TLS握手过程
3. ⚡ HTTP/3和QUIC协议
4. ⚡ WebSocket协议
5. ⚡ HTTP性能优化策略
6. ⚡ RESTful API设计
7. ⚡ OAuth2.0认证流程
8. ⚡ 内容协商机制
9. ⚡ HTTP代理原理
10. ⚡ CDN工作原理

### 面试答题技巧

1. **结构化回答**：定义 → 特点 → 原理 → 应用 → 对比
2. **由浅入深**：先答基础概念，再深入原理
3. **结合实践**：理论结合实际项目经验
4. **主动扩展**：适当延伸相关知识点
5. **诚实谦虚**：不确定的内容不要强答

掌握这些HTTP知识点，足以应对大部分前端面试中的HTTP相关问题！