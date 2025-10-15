# 发布指南

## 发布前检查

1. **确保所有功能正常工作**
   ```bash
   npm run test
   npm run example
   ```

2. **检查构建结果**
   ```bash
   npm run build
   ls -la dist/
   ```

3. **验证包内容**
   ```bash
   npm pack --dry-run
   ```

## 发布步骤

1. **登录npm**
   ```bash
   npm login
   ```

2. **发布包**
   ```bash
   npm publish
   ```

3. **验证发布**
   ```bash
   npm view idnumber-js
   ```

## 版本管理

使用语义化版本控制：

- **主版本号**：不兼容的API修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

更新版本：
```bash
npm version patch  # 修订版本
npm version minor  # 次版本
npm version major  # 主版本
```

## 注意事项

1. 确保 `dist/` 目录包含所有必要的文件
2. 确保 `README.md` 和 `package.json` 信息完整
3. 确保所有测试通过
4. 确保代码符合ES5标准，兼容Node.js 8+

## 发布后验证

1. 安装发布的包：
   ```bash
   npm install idnumber-js@latest
   ```

2. 测试基本功能：
   ```javascript
   const IdNumber = require('idnumber-js');
   console.log(IdNumber.validate('110101199003071234'));
   ```

3. 检查CDN可用性（如果配置了）：
   ```html
   <script src="https://unpkg.com/idnumber-js/dist/index.umd.js"></script>
   ```
