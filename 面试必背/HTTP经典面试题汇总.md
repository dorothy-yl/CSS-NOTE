# HTTP经典面试题汇总

## 快速导航

| 章节 | 重要级别 | 核心记忆口诀 | 页面定位 |
|------|---------|-------------|---------|
| HTTP基础知识 | ⭐⭐⭐⭐⭐ | **无连接无状态、简单灵活、请求响应** | [跳转](#一http基础知识) |
| GET vs POST | ⭐⭐⭐⭐⭐ 🔥 | **参数位置、幂等性、缓存性** | [跳转](#3get和post的区别) |
| HTTP vs HTTPS | ⭐⭐⭐⭐⭐ 🔥 | **端口明密、速度快慢、证书有无** | [跳转](#4http和https的区别) |
| HTTP状态码 | ⭐⭐⭐⭐⭐ | **1信息2成功3重定向4客户5服务** | [跳转](#二http状态码) |
| 301 vs 302 | ⭐⭐⭐⭐ | **永久临时、缓存不缓、SEO转移** | [跳转](#2301和302的区别) |
| HTTPS握手 | ⭐⭐⭐⭐⭐ | **客户请求、服务证书、客户生成、双向加密** | [跳转](#1https的加密原理) |
| HTTP请求方法 | ⭐⭐⭐⭐ | **GET查POST提、PUT全PATCH部、DELETE删** | [跳转](#三http请求方法) |
| HTTP缓存 | ⭐⭐⭐⭐⭐ 🔥 | **强制协商、时间标识** | [跳转](#八http性能优化) |
| 跨域解决 | ⭐⭐⭐⭐⭐ 🔥 | **CORS首选、JSONP兼容、代理转发** | [跳转](#九http缓存与跨域) |
| HTTP版本演进 | ⭐⭐⭐⭐⭐ 🔥 | **1.0短连、1.1长连、2多路、3基UDP** | [跳转](#六http版本演进) |
| HTTP/2多路复用 | ⭐⭐⭐⭐⭐ 🔥 ⚠️ | **一连多流、帧交错、流ID重组** | [跳转](#2http2的多路复用是什么重点) |
| XSS防范 | ⭐⭐⭐⭐ | **输入过滤、输出编码、CSP头部** | [跳转](#1什么是xss攻击如何防范) |
| CSRF防范 | ⭐⭐⭐⭐ | **Token验证、Referer检查、SameSite** | [跳转](#2什么是csrf攻击如何防范) |

## 一、HTTP基础知识

### 核心记忆口诀：**无连接无状态、简单灵活、请求响应**

### 1. 什么是HTTP？HTTP的特点是什么？⭐⭐⭐⭐⭐

📝 **面试背诵要点：**

**记忆口诀：无连接无状态、简单灵活、请求响应**

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

### 2. HTTP报文结构是什么？⭐⭐⭐⭐

📝 **面试背诵要点：**

**记忆口诀：起始头空体（起始行、头部、空行、主体）**

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

### 3. GET和POST的区别？⭐⭐⭐⭐⭐ 🔥

📝 **面试背诵要点：**

**记忆口诀：参数位置、幂等性、缓存性**

#### GET vs POST 详细对比表

| 区别点 | GET | POST | 说明 |
|--------|-----|------|------|
| **语义** | 获取资源 | 提交数据 | RESTful设计 |
| **参数位置** | URL中（Query String） | 请求体中（Request Body） | 核心区别 |
| **参数大小** | 有限制（2KB-8KB） | 理论上无限制 | 浏览器/服务器限制 |
| **安全性** | 参数暴露在URL | 相对安全 | 敏感数据用POST |
| **幂等性** | 幂等 | 非幂等 | 重要特性 |
| **可缓存** | 可缓存 | 不可缓存 | 性能影响 |
| **书签** | 可收藏为书签 | 不可收藏 | 用户体验 |
| **历史记录** | 参数保留在历史 | 参数不保留 | 隐私考虑 |
| **后退按钮** | 无害 | 数据会被重新提交 | 重要提示 |
| **编码类型** | application/x-www-form-urlencoded | 多种（form-data、json等） | 灵活性 |
| **TCP数据包** | 1个（header+data一起） | 2个（header先，data后） | 传输层差异 |
| **浏览器刷新** | 无害 | 浏览器会提示确认 | 用户体验 |

**深层理解：**
- 本质上GET和POST都是TCP连接，没有本质区别
- 区别主要是HTTP规范和浏览器/服务器的限制
- GET产生一个TCP数据包，POST产生两个（先发header，再发body）

**使用场景：**
```javascript
// GET - 查询、获取数据
GET /api/users?page=1&size=10

// POST - 创建、提交数据
POST /api/users
Body: {"name": "张三", "age": 25}
```

### 4. HTTP和HTTPS的区别？⭐⭐⭐⭐⭐ 🔥

📝 **面试背诵要点：**

**记忆口诀：端口明密、速度快慢、证书有无**

#### HTTP vs HTTPS 详细对比表

| 对比项 | HTTP | HTTPS | 说明 |
|--------|------|-------|------|
| **全称** | 超文本传输协议 | 安全的超文本传输协议 | Secure |
| **端口** | 80 | 443 | 核心区别 |
| **安全性** | 明文传输 | SSL/TLS加密 | 最重要区别 |
| **证书** | 不需要 | 需要CA证书 | 成本差异 |
| **速度** | 较快 | 较慢（加密解密） | 性能影响 |
| **SEO** | 无优势 | 搜索引擎优先 | Google推荐 |
| **成本** | 低 | 需要证书费用 | 经济考虑 |
| **握手** | TCP三次握手 | TCP + TLS握手 | 建连差异 |
| **协议层** | 应用层 | 应用层 + 安全层 | 架构差异 |
| **URL前缀** | http:// | https:// | 显著标识 |

**核心公式：HTTPS = HTTP + SSL/TLS**

**HTTPS工作原理：**

**记忆口诀：客户请求、服务证书、客户生成、双向加密**

1. **客户端请求建立HTTPS连接**（Client Hello）
2. **服务器返回证书**（包含公钥）
3. **客户端验证证书合法性**
4. **客户端生成对称密钥**，用公钥加密发送
5. **服务器用私钥解密**获得对称密钥
6. **双方使用对称密钥加密通信**

## 二、HTTP状态码

### 核心记忆口诀：**1信息2成功3重定向4客户5服务**

### 1. 常见HTTP状态码及其含义？⭐⭐⭐⭐⭐

📝 **面试背诵要点：**

**记忆口诀：1信息2成功3重定向4客户5服务**

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

### 2. 301和302的区别？⭐⭐⭐⭐

📝 **面试背诵要点：**

**记忆口诀：永久临时、缓存不缓、SEO转移**

#### 301 vs 302 vs 304 对比表

| 对比项 | 301 Permanent | 302 Found | 304 Not Modified |
|--------|--------------|-----------|-----------------|
| **含义** | 永久重定向 | 临时重定向 | 资源未修改 |
| **缓存** | 浏览器会缓存 | 不缓存 | 协商缓存 |
| **搜索引擎** | 更新索引 | 不更新索引 | 不适用 |
| **SEO权重** | 会转移 | 不转移 | 不适用 |
| **使用场景** | 域名更换、URL规范化 | 临时维护、A/B测试 | 缓存验证 |
| **返回内容** | 新URL | 新URL | 无内容（读缓存） |

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

**304 Not Modified（协商缓存）：**
- 资源未修改，使用缓存
- 配合Last-Modified或ETag使用
- 减少传输，提高性能

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

// 304场景：协商缓存
app.get('/api/data', (req, res) => {
  const lastModified = '2024-01-01';
  if (req.headers['if-modified-since'] === lastModified) {
    res.status(304).end(); // 返回304，客户端使用缓存
  } else {
    res.setHeader('Last-Modified', lastModified);
    res.json(data);
  }
});
```

## 三、HTTP请求方法

### 核心记忆口诀：**GET查POST提、PUT全PATCH部、DELETE删**

### 1. HTTP有哪些请求方法？⭐⭐⭐⭐

📝 **面试背诵要点：**

**记忆口诀：GET查POST提、PUT全PATCH部、DELETE删、HEAD OPTIONS辅助**

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

### 2. 什么是幂等性？⭐⭐⭐⭐

📝 **面试背诵要点：**

**记忆口诀：多次执行，结果一致（GET PUT DELETE幂等，POST非幂等）**

**定义：**
- 多次执行同一操作，结果保持一致
- 不会产生副作用的累积

**幂等的方法：**
- GET：多次获取同一资源
- PUT：多次更新为同一状态
- DELETE：多次删除同一资源（删除后再删除，结果不变）
- HEAD：多次获取同一头部

**非幂等的方法：**
- POST：多次创建会产生多个资源
- PATCH：可能基于当前状态更新

#### HTTP方法对比表

| 方法 | 幂等性 | 安全性 | 可缓存 | 请求体 | 响应体 | 使用场景 |
|------|--------|--------|--------|--------|--------|---------|
| **GET** | 是 | 是 | 是 | 否 | 是 | 查询数据 |
| **POST** | 否 | 否 | 否 | 是 | 是 | 创建资源 |
| **PUT** | 是 | 否 | 否 | 是 | 是 | 完整更新 |
| **PATCH** | 否 | 否 | 否 | 是 | 是 | 部分更新 |
| **DELETE** | 是 | 否 | 否 | 否 | 是 | 删除资源 |
| **HEAD** | 是 | 是 | 是 | 否 | 否 | 获取头部 |
| **OPTIONS** | 是 | 是 | 否 | 否 | 是 | 获取支持方法 |

**实际应用：**
```javascript
// 幂等操作：设置用户年龄为25（多次执行结果一样）
PUT /users/1
{"age": 25}

// 非幂等操作：给用户年龄加1（多次执行结果不同）
POST /users/1/age/increment

// 幂等操作：删除用户（删除后再删除，结果不变）
DELETE /users/1
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

### 核心记忆口诀：**1.0短连、1.1长连、2多路、3基UDP**

### 1. HTTP/1.0、HTTP/1.1、HTTP/2的区别？⭐⭐⭐⭐⭐ 🔥

📝 **面试背诵要点：**

**记忆口诀：1.0短连、1.1长连、2多路、3基UDP**

#### HTTP版本演进对比表

| 特性 | HTTP/1.0 | HTTP/1.1 | HTTP/2 | HTTP/3 |
|------|---------|---------|--------|--------|
| **连接方式** | 短连接 | 长连接（keep-alive） | 单连接多路复用 | QUIC（基于UDP） |
| **队头阻塞** | 有 | 有 | HTTP层无，TCP层有 | 完全解决 |
| **协议格式** | 文本 | 文本 | 二进制分帧 | 二进制 |
| **头部压缩** | 无 | 无 | HPACK | QPACK |
| **服务器推送** | 不支持 | 不支持 | 支持 | 支持 |
| **并发请求** | 串行 | 管道化（有限） | 真正并行 | 真正并行 |
| **握手延迟** | 高 | 中 | 中 | 低（0-RTT） |
| **虚拟主机** | 不支持 | 支持（Host头） | 支持 | 支持 |
| **断点续传** | 不支持 | 支持（Range） | 支持 | 支持 |
| **TCP连接数** | 每请求一个 | 6个左右 | 1个 | 0个（UDP） |

**HTTP/1.0：**
- 每个请求都需要建立新的TCP连接
- 不支持断点续传
- 不支持Host头部
- **特点：短连接，简单但低效**

**HTTP/1.1：**
- **持久连接**：Connection: keep-alive
- **管道化**：可以同时发送多个请求（但响应必须按序）
- **Host头部**：支持虚拟主机
- **断点续传**：Range和Content-Range
- **缓存控制**：Cache-Control
- **分块传输**：Transfer-Encoding: chunked
- **特点：长连接，大幅提升性能**

**HTTP/2：**（⭐⭐⭐⭐⭐ 高频考点）
- **二进制分帧**：二进制协议替代文本协议
- 🔥 **多路复用**：一个连接并行处理多个请求（⚠️ 重点中的重点）
- **头部压缩**：HPACK算法压缩头部
- **服务器推送**：主动推送资源
- **流优先级**：设置请求优先级
- **特点：真正的并行，极大提升性能**

**HTTP/3：**
- **基于QUIC协议**（UDP）
- **0-RTT连接建立**
- **完全解决队头阻塞**
- **连接迁移**
- **特点：最快的HTTP，移动网络优势明显**

### 2. HTTP/2的多路复用是什么？⭐⭐⭐⭐⭐（重点）

📝 **面试背诵要点：**

**定义：**
- 🔥 **在一个TCP连接上并行发送多个请求/响应**
- 🔥 **不再需要按顺序等待响应**

**实现原理：**（⚠️ 高频考点）
1. **将HTTP消息分解为帧（Frame）** - 最小的通信单位
2. **帧标识所属的流（Stream）** - 每个流有唯一ID
3. **帧可以交错发送** - 不同流的帧可以混合传输
4. **接收端根据流ID重组消息** - 保证消息完整性

**优势：**（⚠️ 必背）
- ✅ **解决HTTP层队头阻塞问题** - 一个请求阻塞不影响其他请求
- ✅ **减少TCP连接数量** - 从6个减少到1个
- ✅ **提高带宽利用率** - 充分利用网络带宽
- ✅ **降低延迟** - 并行处理，响应更快

**与HTTP/1.1对比：**（⚠️ 面试常问）
```javascript
// HTTP/1.1 - 串行请求（队头阻塞）
请求1 → 响应1 → 请求2 → 响应2
❌ 问题：响应1慢会阻塞响应2

// HTTP/2 - 并行请求（多路复用）
请求1 ↘
请求2 → 响应1、响应2交错返回
请求3 ↗
✅ 优势：请求同时进行，互不阻塞
```

**核心概念详解：**

1. **帧（Frame）**：
   - HTTP/2通信的最小单位
   - 包含：帧头（类型、标志、流ID）+ 帧体（数据）
   - 类型：DATA帧、HEADERS帧、PRIORITY帧等

2. **流（Stream）**：
   - 已建立连接内的双向字节流
   - 每个流都有唯一的ID
   - 客户端发起的流ID为奇数
   - 服务端发起的流ID为偶数

3. **多路复用过程示例：**
```javascript
// 客户端同时请求3个资源
[请求1: /index.html]  → Stream ID: 1
[请求2: /style.css]   → Stream ID: 3
[请求3: /script.js]   → Stream ID: 5

// 服务器交错发送响应帧
帧1: Stream 1 HEADERS (index.html 响应头)
帧2: Stream 3 HEADERS (style.css 响应头)
帧3: Stream 1 DATA (index.html 部分数据)
帧4: Stream 5 HEADERS (script.js 响应头)
帧5: Stream 3 DATA (style.css 完整数据)
帧6: Stream 1 DATA (index.html 剩余数据)
帧7: Stream 5 DATA (script.js 数据)

// 客户端根据Stream ID重组
Stream 1: 帧1 + 帧3 + 帧6 → 完整的 index.html
Stream 3: 帧2 + 帧5 → 完整的 style.css
Stream 5: 帧4 + 帧7 → 完整的 script.js
```

**常见面试问题：**

❓ **Q1: 多路复用完全解决了队头阻塞问题吗？**
📌 **A**: 只解决了HTTP层的队头阻塞，但**TCP层仍存在队头阻塞**。如果TCP丢包，整个连接都会阻塞等待重传。这就是HTTP/3改用QUIC（基于UDP）的原因。

❓ **Q2: HTTP/2为什么只用一个TCP连接？**
📌 **A**:
- 减少握手开销（TLS握手成本高）
- 避免TCP慢启动
- 减少服务器资源消耗
- 多路复用已解决并发问题

❓ **Q3: HTTP/2的多路复用和HTTP/1.1的管道化有什么区别？**
📌 **A**:
- **HTTP/1.1管道化**：请求可以并行发送，但响应必须按顺序返回（FIFO）
- **HTTP/2多路复用**：请求和响应都可以乱序并行，通过流ID标识

```javascript
// HTTP/1.1 管道化
请求: 1 → 2 → 3
响应: 1 → 2 → 3 ❌ 必须按顺序，响应1慢会阻塞2和3

// HTTP/2 多路复用
请求: 1 → 2 → 3
响应: 2 → 3 → 1 ✅ 可以乱序，谁快谁先返回
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

### 3. 总共有10个资源,每个资源RTT为100ms,服务端响应时间忽略不计,请问在HTTP1.0、HTTP1.1、HTTP2、HTTP3四个版本下分别建立几个TCP连接?总时长是多少?

📝 **面试背诵要点:**

**前置知识:**
- RTT (Round-Trip Time): 往返时延,数据包从发送到接收到响应的时间
- TCP三次握手需要1个RTT
- TLS握手需要2个RTT (简化计算,实际可能更复杂)
- 假设浏览器默认最大并发连接数为6

**HTTP/1.0:**
- **TCP连接数**: 10个 (每个请求一个新连接)
- **计算过程**:
  - 每个资源: TCP握手(1 RTT) + TLS握手(2 RTT) + 请求响应(1 RTT) = 4 RTT
  - 由于最多6个并发,分两批: 第一批6个并行,第二批4个并行
  - 总时长 = 2批 × 4 RTT × 100ms = **800ms**
- **特点**: 串行连接,短连接,开销最大

**HTTP/1.1:**
- **TCP连接数**: 6个 (持久连接,复用连接)
- **计算过程**:
  - 建立6个连接: (1 RTT + 2 RTT) × 100ms = 300ms
  - 第一批6个资源并行: 1 RTT × 100ms = 100ms
  - 第二批4个资源并行(复用连接): 1 RTT × 100ms = 100ms
  - 总时长 = 300ms + 100ms + 100ms = **500ms**
- **特点**: 持久连接,管道化,但有队头阻塞

**HTTP/2:**
- **TCP连接数**: 1个 (多路复用)
- **计算过程**:
  - 建立连接: (1 RTT + 2 RTT) × 100ms = 300ms
  - 10个资源并行传输: 1 RTT × 100ms = 100ms
  - 总时长 = 300ms + 100ms = **400ms**
- **特点**: 单连接多路复用,二进制分帧,无应用层队头阻塞

**HTTP/3:**
- **TCP连接数**: 0个 (基于UDP的QUIC)
- **计算过程**:
  - QUIC握手(集成TLS): 1 RTT × 100ms = 100ms (0-RTT更快)
  - 10个资源并行传输: 1 RTT × 100ms = 100ms
  - 总时长 = 100ms + 100ms = **200ms**
- **特点**: 基于UDP,无队头阻塞,更快的握手

**对比总结表:**

| 版本 | TCP连接数 | 总时长 | 握手开销 | 主要特点 |
|------|----------|--------|---------|---------|
| HTTP/1.0 | 10个 | 800ms | 高 | 短连接,串行 |
| HTTP/1.1 | 6个 | 500ms | 中 | 持久连接 |
| HTTP/2 | 1个 | 400ms | 低 | 多路复用 |
| HTTP/3 | 0个 | 200ms | 极低 | QUIC,0-RTT |

**面试加分点:**
```javascript
// 实际优化建议
// 1. HTTP/1.1: 使用域名分片突破6连接限制
// 资源分布在多个子域名: cdn1.example.com, cdn2.example.com

// 2. HTTP/2: 避免域名分片,合并到一个域名
// 单一连接复用,减少握手开销

// 3. HTTP/3: 0-RTT连接恢复
// 首次连接后,后续连接可以0-RTT建立
const response = await fetch(url, {
  method: 'GET',
  cache: 'no-cache',
  // 使用early data加速
});

// 4. 预连接优化
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="//cdn.example.com">
```

## 九、HTTP缓存与跨域

### 核心记忆口诀：**强制协商、时间标识、CORS首选**

### 1. HTTP缓存策略有哪些？⭐⭐⭐⭐⭐ 🔥

📝 **面试背诵要点：**

**记忆口诀：强制协商、时间标识（强缓存不请求，协商缓存要验证）**

#### 强缓存 vs 协商缓存对比表

| 对比项 | 强缓存 | 协商缓存 |
|--------|--------|---------|
| **是否发请求** | 不发请求 | 发请求验证 |
| **状态码** | 200（from cache） | 304 Not Modified |
| **相关头部** | Cache-Control、Expires | Last-Modified、ETag |
| **优先级** | 先检查强缓存 | 强缓存失效后检查 |
| **性能** | 最快（直接读缓存） | 较快（需要验证） |
| **适用场景** | 不变的静态资源 | 可能变化的资源 |

**强缓存（Cache-Control / Expires）：**

```javascript
// 1. Cache-Control（HTTP/1.1，优先级更高）
res.setHeader('Cache-Control', 'max-age=3600'); // 缓存1小时

// Cache-Control常用指令：
// - max-age=秒数：缓存有效期
// - no-cache：需要协商缓存验证
// - no-store：完全不缓存
// - public：可被任何缓存（CDN、代理）
// - private：只能被浏览器缓存
// - must-revalidate：过期后必须验证

// 2. Expires（HTTP/1.0，绝对时间）
res.setHeader('Expires', 'Wed, 21 Oct 2025 07:28:00 GMT');
```

**协商缓存（Last-Modified / ETag）：**

```javascript
// 1. Last-Modified / If-Modified-Since（基于时间）
// 服务器首次响应
res.setHeader('Last-Modified', 'Wed, 21 Oct 2024 07:28:00 GMT');

// 客户端再次请求
req.headers['if-modified-since']; // 浏览器自动带上

// 服务器验证
if (req.headers['if-modified-since'] === lastModified) {
  res.status(304).end(); // 未修改，返回304
} else {
  res.send(newData); // 已修改，返回200和新数据
}

// 2. ETag / If-None-Match（基于内容哈希）
// 服务器首次响应
const etag = crypto.createHash('md5').update(content).digest('hex');
res.setHeader('ETag', etag);

// 客户端再次请求
req.headers['if-none-match']; // 浏览器自动带上

// 服务器验证
if (req.headers['if-none-match'] === etag) {
  res.status(304).end(); // 内容未变，返回304
} else {
  res.send(newData); // 内容已变，返回200
}
```

**缓存流程图：**
```
浏览器请求资源
    ↓
检查强缓存（Cache-Control/Expires）
    ↓
有效？ → 是 → 直接使用缓存（200 from cache）
    ↓ 否
发送请求到服务器（带上Last-Modified/ETag）
    ↓
服务器验证协商缓存
    ↓
未修改？ → 是 → 返回304，使用缓存
    ↓ 否
返回200和新资源
```

**最佳实践：**
```javascript
// 静态资源（JS/CSS/图片）- 强缓存 + 文件名哈希
res.setHeader('Cache-Control', 'max-age=31536000'); // 1年
// 文件名：main.a1b2c3.js（变化时文件名变，自动失效）

// HTML - 不缓存或协商缓存
res.setHeader('Cache-Control', 'no-cache');

// API接口 - 协商缓存
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('ETag', etag);
```

### 2. 跨域问题及解决方案？⭐⭐⭐⭐⭐ 🔥

📝 **面试背诵要点：**

**记忆口诀：CORS首选、JSONP兼容、代理转发**

**什么是跨域？**
- 浏览器同源策略限制
- 协议、域名、端口任一不同即为跨域
- 只有浏览器有跨域限制（服务器间通信无跨域）

**同源示例：**
```javascript
// 当前页面：http://www.example.com:80/page.html

// 同源
http://www.example.com:80/api/data ✅

// 跨域
https://www.example.com:80/api/data ❌ 协议不同
http://api.example.com:80/data ❌ 域名不同
http://www.example.com:8080/data ❌ 端口不同
```

#### 跨域解决方案对比表

| 方案 | 优点 | 缺点 | 适用场景 | 支持方法 |
|------|------|------|---------|---------|
| **CORS** | 官方标准、支持所有方法 | 需要服务器支持 | 现代浏览器 | 所有HTTP方法 |
| **JSONP** | 兼容老浏览器 | 只支持GET、安全风险 | 老项目兼容 | 仅GET |
| **代理** | 简单、安全 | 增加服务器负担 | 开发环境 | 所有方法 |
| **Nginx反向代理** | 高性能 | 需要运维配置 | 生产环境 | 所有方法 |
| **postMessage** | 跨窗口通信 | 仅限iframe | 页面间通信 | 不适用HTTP |
| **WebSocket** | 双向通信 | 需要特殊协议 | 实时通信 | WebSocket协议 |

**1. CORS（推荐）：**

```javascript
// 服务器端设置（Node.js）
app.use((req, res, next) => {
  // 允许的源（*代表所有，生产环境建议指定域名）
  res.setHeader('Access-Control-Allow-Origin', 'https://example.com');

  // 允许的方法
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // 允许的头部
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 允许携带Cookie
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 预检请求缓存时间
  res.setHeader('Access-Control-Max-Age', '86400'); // 24小时

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 简单请求 vs 预检请求
// 简单请求：GET/POST/HEAD + 简单头部
// 预检请求：PUT/DELETE 或自定义头部（先发OPTIONS）
```

**2. JSONP（老浏览器兼容）：**

```javascript
// 前端
function handleResponse(data) {
  console.log(data);
}

const script = document.createElement('script');
script.src = 'http://api.example.com/data?callback=handleResponse';
document.body.appendChild(script);

// 后端（Node.js）
app.get('/data', (req, res) => {
  const callback = req.query.callback;
  const data = {name: '张三', age: 25};
  res.send(`${callback}(${JSON.stringify(data)})`);
});

// 缺点：只支持GET、安全风险（XSS）
```

**3. 代理（开发环境推荐）：**

```javascript
// Vite配置
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}

// Webpack配置
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  }
}
```

**4. Nginx反向代理（生产环境）：**

```nginx
server {
  listen 80;
  server_name www.example.com;

  location /api/ {
    proxy_pass http://api.example.com/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

## 十、经典面试题总结

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

### 核心知识点速记（15分钟快速复习）

#### 1. HTTP基础（记忆口诀：无连接无状态、简单灵活、请求响应）
- HTTP是应用层协议，基于TCP/IP
- 五大特点：无连接、无状态、简单快速、灵活、请求-响应模式
- 报文结构：起始行、头部、空行、主体

#### 2. GET vs POST（记忆口诀：参数位置、幂等性、缓存性）
- GET：URL传参、幂等、可缓存、查询
- POST：Body传参、非幂等、不可缓存、提交
- 本质都是TCP连接，区别是HTTP规范

#### 3. HTTP vs HTTPS（记忆口诀：端口明密、速度快慢、证书有无）
- HTTP：80端口、明文、快速、无证书
- HTTPS：443端口、SSL/TLS加密、较慢、需CA证书
- HTTPS = HTTP + SSL/TLS

#### 4. HTTPS握手（记忆口诀：客户请求、服务证书、客户生成、双向加密）
1. Client Hello：客户端发起
2. Server Certificate：服务器返回证书（含公钥）
3. Client Key Exchange：客户端生成对称密钥，公钥加密发送
4. 服务器私钥解密，获得对称密钥
5. 双方用对称密钥加密通信

#### 5. HTTP状态码（记忆口诀：1信息2成功3重定向4客户5服务）
- 1xx：信息性（100 Continue、101 Switching）
- 2xx：成功（200 OK、201 Created、204 No Content）
- 3xx：重定向（301永久、302临时、304缓存）
- 4xx：客户端错误（400、401、403、404）
- 5xx：服务器错误（500、502、503、504）

#### 6. 301 vs 302（记忆口诀：永久临时、缓存不缓、SEO转移）
- 301：永久重定向、浏览器缓存、SEO权重转移
- 302：临时重定向、不缓存、SEO权重不转移
- 304：协商缓存、资源未修改

#### 7. HTTP请求方法（记忆口诀：GET查POST提、PUT全PATCH部、DELETE删）
- GET：查询、幂等、安全、可缓存
- POST：创建、非幂等、不可缓存
- PUT：完整更新、幂等
- PATCH：部分更新、非幂等
- DELETE：删除、幂等

#### 8. HTTP版本演进（记忆口诀：1.0短连、1.1长连、2多路、3基UDP）
- HTTP/1.0：短连接、每请求一个TCP
- HTTP/1.1：长连接（keep-alive）、管道化、虚拟主机
- HTTP/2：多路复用、二进制分帧、头部压缩、服务器推送
- HTTP/3：基于QUIC（UDP）、0-RTT、完全解决队头阻塞

#### 9. HTTP/2多路复用（记忆口诀：一连多流、帧交错、流ID重组）
- 一个TCP连接并行处理多个请求
- HTTP消息分解为帧（Frame）
- 帧属于流（Stream），有唯一ID
- 帧可以交错发送，接收端根据流ID重组
- 解决HTTP层队头阻塞（TCP层仍存在）

#### 10. HTTP缓存（记忆口诀：强制协商、时间标识）
**强缓存**：
- Cache-Control（max-age）、Expires
- 不发请求，直接读缓存
- 状态码：200 from cache

**协商缓存**：
- Last-Modified / If-Modified-Since（基于时间）
- ETag / If-None-Match（基于内容哈希）
- 发请求验证，未修改返回304

#### 11. 跨域解决方案（记忆口诀：CORS首选、JSONP兼容、代理转发）
- CORS：官方标准，设置Access-Control-Allow-*头部
- JSONP：老浏览器兼容，只支持GET
- 代理：开发环境（Vite/Webpack proxy）
- Nginx反向代理：生产环境

#### 12. 安全防范
- XSS：输入过滤、输出编码、CSP、HttpOnly Cookie
- CSRF：CSRF Token、验证Referer、SameSite Cookie
- HTTPS：防中间人攻击

### 高频面试题TOP 20（必背）

1. **HTTP和HTTPS的区别？** → 端口明密、速度快慢、证书有无
2. **GET和POST的区别？** → 参数位置、幂等性、缓存性
3. **HTTP状态码有哪些？** → 1信息2成功3重定向4客户5服务
4. **301和302的区别？** → 永久临时、缓存不缓、SEO转移
5. **强缓存和协商缓存的区别？** → 强缓存不请求，协商缓存要验证
6. **跨域问题如何解决？** → CORS首选、JSONP兼容、代理转发
7. **HTTP/1.1和HTTP/2的区别？** → 长连接vs多路复用
8. **HTTP/2多路复用原理？** → 一连多流、帧交错、流ID重组
9. **HTTPS握手过程？** → 客户请求、服务证书、客户生成、双向加密
10. **什么是幂等性？** → 多次执行结果一致
11. **如何优化HTTP性能？** → 减少请求、压缩、缓存、HTTP/2
12. **XSS和CSRF的区别及防范？** → XSS注入脚本，CSRF伪造请求
13. **Cookie、Session、Token的区别？** → 存储位置、安全性
14. **HTTP长连接和短连接？** → keep-alive、复用TCP
15. **什么是队头阻塞？** → HTTP/1.1有，HTTP/2部分解决，HTTP/3完全解决
16. **Content-Type有哪些？** → json、form-data、urlencoded
17. **RESTful API设计原则？** → 资源、动词（HTTP方法）、状态码
18. **如何防止重复提交？** → Token、防抖、loading状态
19. **HTTP请求流程？** → DNS → TCP → HTTP → 渲染
20. **如何做接口安全？** → HTTPS、签名、限流、鉴权

### 答题模板与技巧

#### 模板1：对比类问题（GET vs POST、HTTP vs HTTPS）
```
1. 【定义】：先说是什么
2. 【核心区别】：列出3-5个主要区别（用表格）
3. 【深层原理】：解释为什么有这些区别
4. 【使用场景】：什么时候用哪个
5. 【代码示例】：简单代码演示
```

#### 模板2：原理类问题（HTTPS握手、多路复用）
```
1. 【概念】：一句话定义
2. 【流程】：分步骤说明（1234）
3. 【关键点】：强调重点（用记忆口诀）
4. 【优势/解决的问题】：为什么这么设计
5. 【实际应用】：结合项目经验
```

#### 模板3：方案类问题（跨域、缓存、优化）
```
1. 【问题定义】：先说清楚问题是什么
2. 【解决方案】：列举3-4种方案
3. 【对比分析】：优缺点、适用场景（表格）
4. 【推荐方案】：说明推荐哪个，为什么
5. 【代码实现】：核心代码
```

### 答题技巧

1. **结构化回答**：定义 → 特点 → 原理 → 应用 → 对比
   - 不要一口气全说完，分点说，有条理

2. **由浅入深**：先答基础概念，再深入原理
   - 如果面试官继续追问，说明想听更深的

3. **结合实践**：理论结合实际项目经验
   - "在我之前的项目中，我用XXX解决了XXX问题"

4. **主动扩展**：适当延伸相关知识点
   - "说到HTTP/2，不得不提HTTP/3..."
   - 但不要过度扩展，控制在2-3分钟

5. **使用对比表格**：复杂对比用表格思维
   - 面试时可以说"从几个维度对比一下"

6. **记忆口诀法**：帮助记忆，展示专业性
   - "我有个记忆技巧：端口明密、速度快慢..."

7. **诚实谦虚**：不确定的内容不要强答
   - "这个我了解不深，但我知道XXX"
   - "我可以从XXX角度来回答"

8. **常见追问预判**：
   - 说HTTP/2多路复用 → 可能问"完全解决队头阻塞了吗？"
   - 说HTTPS → 可能问"具体握手过程？"
   - 说缓存 → 可能问"实际项目中怎么用？"

### 易错点提醒

1. **HTTP/2多路复用**：只解决了HTTP层队头阻塞，TCP层仍存在
2. **HTTPS**：不是完全安全，仍可能有证书伪造、降级攻击
3. **强缓存**：状态码是200，不是304（304是协商缓存）
4. **POST**：并非绝对安全，只是参数不在URL，仍需HTTPS
5. **GET请求**：可以有body，但不推荐（规范不支持）
6. **幂等性**：DELETE是幂等的（删除后再删除，结果一样）
7. **CORS**：简单请求不需要预检，复杂请求需要OPTIONS预检
8. **跨域**：只有浏览器有限制，服务器间通信没有跨域
9. **Cookie**：HttpOnly防XSS，SameSite防CSRF
10. **HTTP/3**：基于UDP不代表不可靠，QUIC在应用层实现可靠性

### 加分项

1. **画图说明**：如HTTPS握手流程、HTTP/2帧结构
2. **提及性能数据**：如"HTTP/2可以减少50%的页面加载时间"
3. **说出版本历史**：如"HTTP/2基于Google的SPDY协议"
4. **安全意识**：主动提及安全问题和防范
5. **最佳实践**：说出业界推荐的做法
6. **新技术**：提及HTTP/3、QUIC等前沿技术
7. **性能优化**：结合CDN、压缩、缓存等综合方案
8. **问题排查**：说出如何定位HTTP相关问题（抓包、Network面板）

---

## 附录：记忆口诀汇总

1. **HTTP特点**：无连接无状态、简单灵活、请求响应
2. **GET vs POST**：参数位置、幂等性、缓存性
3. **HTTP vs HTTPS**：端口明密、速度快慢、证书有无
4. **HTTPS握手**：客户请求、服务证书、客户生成、双向加密
5. **状态码**：1信息2成功3重定向4客户5服务
6. **301 vs 302**：永久临时、缓存不缓、SEO转移
7. **HTTP请求方法**：GET查POST提、PUT全PATCH部、DELETE删
8. **幂等性**：多次执行，结果一致
9. **HTTP版本**：1.0短连、1.1长连、2多路、3基UDP
10. **多路复用**：一连多流、帧交错、流ID重组
11. **HTTP缓存**：强制协商、时间标识
12. **跨域方案**：CORS首选、JSONP兼容、代理转发
13. **XSS防范**：输入过滤、输出编码、CSP头部
14. **CSRF防范**：Token验证、Referer检查、SameSite
15. **报文结构**：起始头空体

---

## 结语

掌握这些HTTP知识点，你将能够：

- **应对90%的前端面试HTTP相关问题**
- **深入理解Web通信原理**
- **具备HTTP性能优化能力**
- **了解Web安全防范要点**
- **掌握跨域、缓存等实际问题解决方案**

**复习建议：**
1. 第1遍：完整阅读，理解概念（2-3小时）
2. 第2遍：重点记忆口诀和对比表格（1小时）
3. 第3遍：面试前快速复习核心知识点（15分钟）
4. 实战：结合项目经验，思考如何应用

**持续学习：**
- 关注HTTP/3的发展和应用
- 实践中遇到问题及时查阅和总结
- 跟踪浏览器和HTTP协议的新特性

祝你面试成功！加油！