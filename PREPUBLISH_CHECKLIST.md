# 发布前检查清单

## ✅ 必需检查项

### 1. 包名检查
- [x] 包名 `idnumber-js` 可用
- [x] 包名符合 npm 命名规范
- [x] 包名与功能匹配

### 2. package.json 配置
- [x] `name`: idnumber-js
- [x] `version`: 1.0.0
- [x] `description`: 清晰描述功能
- [x] `main`: dist/index.js (CommonJS)
- [x] `module`: dist/index.mjs (ES Module)
- [x] `browser`: dist/index.umd.js (UMD)
- [x] `types`: dist/index.d.ts (TypeScript)
- [x] `exports`: 现代模块解析
- [x] `files`: 只包含必要文件
- [x] `keywords`: 相关关键词
- [x] `author`: 作者信息
- [x] `license`: MIT
- [x] `repository`: GitHub 仓库
- [x] `bugs`: 问题反馈地址
- [x] `homepage`: 项目主页

### 3. 代码质量
- [x] 所有测试通过
- [x] 构建成功
- [x] 无语法错误
- [x] 无重复代码
- [x] 代码格式统一

### 4. 文档完整性
- [x] README.md 详细
- [x] API 文档完整
- [x] 使用示例清晰
- [x] 安装说明正确
- [x] 版本兼容性说明

### 5. 构建输出
- [x] dist/index.js (CommonJS)
- [x] dist/index.mjs (ES Module)
- [x] dist/index.umd.js (UMD)
- [x] dist/index.d.ts (TypeScript)
- [x] 所有文件大小合理

## ⚠️ 发布前最后检查

### 1. 测试所有使用方式
```bash
# CommonJS
node -e "const IdNumber = require('./dist/index.js'); console.log(IdNumber.validate('110101199003071234'));"

# ES Module (需要 Node.js 14+)
node --input-type=module -e "import IdNumber from './dist/index.mjs'; console.log(IdNumber.validate('110101199003071234'));"
```

### 2. 检查文件大小
```bash
ls -la dist/
```

### 3. 验证包内容
```bash
npm pack --dry-run
```

### 4. 检查依赖
```bash
npm audit
```

## 🚀 发布步骤

### 1. 登录 npm
```bash
npm login
```

### 2. 发布包
```bash
npm publish
```

### 3. 验证发布
```bash
npm view idnumber-js
```

## 📝 发布后工作

### 1. 创建 GitHub Release
- 添加版本标签
- 写发布说明
- 上传构建文件

### 2. 更新文档
- 更新 README 中的安装命令
- 添加变更日志
- 更新示例代码

### 3. 推广
- 在相关社区分享
- 写技术博客
- 收集用户反馈

## 🔧 常见问题

### Q: 包名已存在怎么办？
A: 修改 package.json 中的 name 字段，如 `@thovino/idnumber-js`

### Q: 发布失败怎么办？
A: 检查网络连接、npm 登录状态、包名冲突等

### Q: 如何更新版本？
A: 使用 `npm version patch/minor/major` 命令

### Q: 如何撤销发布？
A: 24小时内可以使用 `npm unpublish` 撤销
