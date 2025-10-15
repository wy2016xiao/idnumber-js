# npm 发布指南

## 🎯 发布前准备

### 1. 更新个人信息
编辑 `package.json` 中的作者信息：
```json
{
  "author": {
    "name": "你的名字",
    "email": "your-email@example.com",
    "url": "https://github.com/yourusername"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/idnumber-js.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/idnumber-js/issues"
  },
  "homepage": "https://github.com/yourusername/idnumber-js#readme"
}
```

### 2. 检查包名可用性
```bash
npm view idnumber-js
# 如果返回 404 错误，说明包名可用
```

### 3. 登录 npm
```bash
npm login
# 输入你的 npm 用户名、密码和邮箱
```

## 🚀 发布步骤

### 1. 最终检查
```bash
# 运行测试
npm test

# 构建项目
npm run build

# 检查包内容
npm pack --dry-run
```

### 2. 发布包
```bash
npm publish
```

### 3. 验证发布
```bash
# 检查包信息
npm view idnumber-js

# 测试安装
npm install idnumber-js
```

## 📦 包内容说明

发布后的包将包含：
- `dist/index.js` - CommonJS 版本
- `dist/index.mjs` - ES Module 版本  
- `dist/index.umd.js` - UMD 版本
- `dist/index.d.ts` - TypeScript 类型定义
- `package.json` - 包配置
- `README.md` - 使用文档

## 🔄 版本管理

### 更新版本
```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 小版本 (1.0.0 -> 1.1.0)  
npm version minor

# 大版本 (1.0.0 -> 2.0.0)
npm version major
```

### 发布新版本
```bash
npm version patch
npm publish
```

## 🛠️ 常见问题

### Q: 包名冲突怎么办？
A: 使用作用域包名：`@yourusername/idnumber-js`

### Q: 发布失败怎么办？
A: 检查：
- 网络连接
- npm 登录状态
- 包名是否冲突
- 版本号是否重复

### Q: 如何撤销发布？
A: 24小时内可以撤销：
```bash
npm unpublish idnumber-js@1.0.0
```

### Q: 如何更新已发布的包？
A: 修改版本号后重新发布：
```bash
npm version patch
npm publish
```

## 📈 发布后推广

### 1. 创建 GitHub Release
- 添加版本标签
- 写发布说明
- 上传构建文件

### 2. 更新文档
- 更新 README 中的安装命令
- 添加变更日志
- 更新示例代码

### 3. 社区推广
- 在相关技术社区分享
- 写技术博客介绍
- 收集用户反馈

## 🎉 发布成功！

发布成功后，用户可以通过以下方式使用你的包：

```bash
# 安装
npm install idnumber-js

# 使用
const IdNumber = require('idnumber-js');
console.log(IdNumber.validate('110101199003071234'));
```

恭喜！你的 npm 包已经成功发布！🎊
