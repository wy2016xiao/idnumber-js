# 正确的构建方式 - 主流库的做法

## 问题：我们现在的做法

❌ **错误做法：**
```
src/
├── index.js      # ES Module 源码
├── index.cjs     # CommonJS 源码 (重复!)
├── constants.js  # ES Module 常量
├── constants.cjs # CommonJS 常量 (重复!)
├── utils.js      # ES Module 工具
├── utils.cjs     # CommonJS 工具 (重复!)
└── ...           # 更多重复文件
```

**问题：**
- 维护多套相同功能的代码
- 容易出错，修改需要同步多个文件
- 代码重复，违反DRY原则

## 正确做法：主流库的方式

### 1. **单一源码，多格式输出**

✅ **正确做法：**
```
src/
├── index.js      # 单一源码 (ES Module)
├── constants.js  # 单一源码
├── utils.js      # 单一源码
└── validators.js # 单一源码

dist/             # 构建输出
├── index.js      # CommonJS (自动生成)
├── index.mjs     # ES Module (自动生成)
├── index.umd.js  # UMD (自动生成)
└── index.d.ts    # TypeScript (自动生成)
```

### 2. **使用现代构建工具**

#### 方案A：Rollup (推荐)

```javascript
// rollup.config.js
export default [
  {
    input: 'src/index.js',           // 单一入口
    output: { file: 'dist/index.js', format: 'cjs' }  // CommonJS
  },
  {
    input: 'src/index.js',           // 同一入口
    output: { file: 'dist/index.mjs', format: 'esm' } // ES Module
  },
  {
    input: 'src/index.js',           // 同一入口
    output: { file: 'dist/index.umd.js', format: 'umd', name: 'IdNumber' } // UMD
  }
];
```

#### 方案B：Webpack

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

#### 方案C：TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    "outDir": "dist"
  }
}
```

### 3. **知名库的实际做法**

#### React
```json
{
  "main": "index.js",
  "module": "index.js",
  "exports": {
    ".": {
      "react-server": "./react-server.js",
      "default": "./index.js"
    }
  }
}
```
- 使用单一文件，通过exports字段支持不同环境

#### Lodash
```json
{
  "main": "lodash.js",
  "module": "lodash.js"
}
```
- 使用UMD格式，自动检测环境

#### date-fns (现代库)
```json
{
  "main": "index.js",
  "module": "index.mjs",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.js"
    }
  }
}
```
- 分离的CommonJS和ES Module文件
- 使用构建工具从单一源码生成

### 4. **我们的改进方案**

#### 当前状态
```
✅ 功能完整
✅ 支持所有格式
❌ 代码重复
❌ 维护困难
```

#### 改进后
```
✅ 功能完整
✅ 支持所有格式
✅ 单一源码
✅ 易于维护
```

#### 具体步骤

1. **保留单一源码**
   ```
   src/
   ├── index.js      # 主入口 (ES Module)
   ├── constants.js  # 常量
   ├── utils.js      # 工具函数
   └── validators.js # 验证器
   ```

2. **使用构建工具**
   ```bash
   npm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-babel rollup-plugin-terser
   ```

3. **配置构建脚本**
   ```javascript
   // rollup.config.js
   export default [
     { input: 'src/index.js', output: { file: 'dist/index.js', format: 'cjs' } },
     { input: 'src/index.js', output: { file: 'dist/index.mjs', format: 'esm' } },
     { input: 'src/index.js', output: { file: 'dist/index.umd.js', format: 'umd', name: 'IdNumber' } }
   ];
   ```

4. **更新package.json**
   ```json
   {
     "scripts": {
       "build": "rollup -c",
       "dev": "rollup -c -w"
     }
   }
   ```

### 5. **构建流程**

```bash
# 开发
npm run dev          # 监听文件变化，自动构建

# 构建
npm run build        # 一次性构建所有格式

# 发布
npm run prepublishOnly  # 构建 + 测试 + 发布
```

### 6. **优势对比**

| 方面 | 当前方式 | 主流方式 |
|------|----------|----------|
| 代码维护 | ❌ 多套重复 | ✅ 单一源码 |
| 构建复杂度 | ❌ 手动转换 | ✅ 自动生成 |
| 错误风险 | ❌ 容易不同步 | ✅ 自动同步 |
| 开发效率 | ❌ 修改多处 | ✅ 修改一处 |
| 文件大小 | ❌ 源码冗余 | ✅ 源码精简 |

## 总结

**主流库的做法：**
1. ✅ 写一套源码 (通常是ES Module)
2. ✅ 用构建工具生成多格式
3. ✅ 自动化构建流程
4. ✅ 单一维护点

**我们的改进方向：**
1. 保留现有的 `src/index.js` 作为单一源码
2. 删除所有 `.cjs` 重复文件
3. 使用 Rollup 等构建工具
4. 自动化生成所有格式

这样就能像主流库一样，只维护一套代码，自动生成所有需要的格式！
