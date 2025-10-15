# 模块格式支持说明

## 为什么需要支持多种模块格式？

不同的环境和工具链对模块格式有不同的要求：

- **Node.js 8-13**: 只支持 CommonJS (`require/module.exports`)
- **Node.js 14+**: 支持 ES Module (`import/export`)
- **现代浏览器**: 支持 ES Module (`<script type="module">`)
- **旧浏览器**: 只支持 UMD (`<script>` 标签)
- **TypeScript**: 需要类型定义文件

## 实现方案

### 1. package.json 配置

```json
{
  "main": "dist/index.js",           // CommonJS 入口
  "module": "dist/index.mjs",        // ES Module 入口
  "browser": "dist/index.umd.js",    // 浏览器 UMD 入口
  "types": "dist/index.d.ts",        // TypeScript 类型定义
  "exports": {
    ".": {
      "import": "./dist/index.mjs",   // ES Module 导入
      "require": "./dist/index.js",   // CommonJS 导入
      "types": "./dist/index.d.ts"    // TypeScript 类型
    }
  }
}
```

### 2. 文件结构

```
dist/
├── index.js      # CommonJS 版本
├── index.mjs     # ES Module 版本
├── index.umd.js  # UMD 版本（浏览器）
└── index.d.ts    # TypeScript 类型定义
```

### 3. 构建策略

#### 方案A：单一源码，多格式输出（推荐）

```javascript
// 源码使用 ES Module 语法
export function validate() { ... }
export default { validate, ... };

// 构建时转换为不同格式
// CommonJS: module.exports = { ... }
// UMD: (function() { ... })()
```

#### 方案B：分别维护不同格式

```javascript
// src/index.js (CommonJS)
module.exports = { ... };

// src/index.mjs (ES Module)  
export { ... };

// src/index.umd.js (UMD)
(function() { ... })();
```

## 各格式特点

### CommonJS (`dist/index.js`)

```javascript
// 使用方式
const IdNumber = require('idnumber-js');
const { validate } = require('idnumber-js');

// 特点
- 兼容性最好
- 支持 Node.js 8+
- 同步加载
- 运行时解析
```

### ES Module (`dist/index.mjs`)

```javascript
// 使用方式
import IdNumber from 'idnumber-js';
import { validate } from 'idnumber-js';

// 特点
- 现代标准
- 支持 Tree Shaking
- 静态分析
- 需要 Node.js 14+ 或现代浏览器
```

### UMD (`dist/index.umd.js`)

```html
<!-- 使用方式 -->
<script src="idnumber-js/dist/index.umd.js"></script>
<script>
  const isValid = IdNumber.validate('110101199003071234');
</script>

<!-- 特点 -->
- 浏览器兼容性最好
- 自动检测环境
- 支持 AMD/CommonJS/全局变量
- 文件较大
```

### TypeScript (`dist/index.d.ts`)

```typescript
// 使用方式
import IdNumber, { ParseResult } from 'idnumber-js';

// 特点
- 类型安全
- 智能提示
- 编译时检查
- 支持所有模块格式
```

## 构建工具选择

### 1. Rollup（推荐）

```javascript
// rollup.config.js
export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'dist/index.js', format: 'cjs' }
  },
  // ES Module
  {
    input: 'src/index.js', 
    output: { file: 'dist/index.mjs', format: 'es' }
  },
  // UMD
  {
    input: 'src/index.js',
    output: { file: 'dist/index.umd.js', format: 'umd', name: 'IdNumber' }
  }
];
```

### 2. Webpack

```javascript
// webpack.config.js
module.exports = [
  {
    entry: './src/index.js',
    output: { filename: 'index.js', library: 'IdNumber', libraryTarget: 'commonjs2' }
  },
  {
    entry: './src/index.js',
    output: { filename: 'index.mjs', library: { type: 'module' } },
    experiments: { outputModule: true }
  }
];
```

### 3. 自定义构建脚本

```javascript
// build.js
const fs = require('fs');

// 读取源码
const source = fs.readFileSync('src/index.js', 'utf8');

// 转换为 CommonJS
const commonjs = source.replace(/export/g, 'module.exports');

// 转换为 UMD
const umd = `(function() { ${commonjs} })();`;

// 写入文件
fs.writeFileSync('dist/index.js', commonjs);
fs.writeFileSync('dist/index.umd.js', umd);
```

## 最佳实践

### 1. 优先使用 ES Module 源码

```javascript
// src/index.js
export function validate() { ... }
export default { validate, ... };
```

### 2. 使用 package.json exports 字段

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

### 3. 提供完整的类型定义

```typescript
// dist/index.d.ts
export interface ParseResult { ... }
export function validate(id: string): boolean;
export default { validate, ... };
```

### 4. 测试所有格式

```javascript
// test-commonjs.js
const IdNumber = require('./dist/index.js');

// test-esmodule.mjs  
import IdNumber from './dist/index.mjs';

// test-browser.html
<script src="./dist/index.umd.js"></script>
```

## 总结

通过支持多种模块格式，你的库可以：

- ✅ 兼容所有 Node.js 版本（8+）
- ✅ 支持现代浏览器和旧浏览器
- ✅ 提供 TypeScript 类型支持
- ✅ 支持 Tree Shaking 优化
- ✅ 自动选择最佳格式

这样用户无论使用什么环境，都能以最合适的方式使用你的库！
