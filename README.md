# idnumber-js

中国身份证号码及其他证件号码处理工具库，支持验证、解析、生成等功能。

## 安装

```bash
npm install idnumber-js
```

## 使用方法

### CommonJS (Node.js)

```javascript
const { validateIdCard, getCardType, generateIdCard } = require('idnumber-js');

// 验证身份证
console.log(validateIdCard('110101199003074515')); // true

// 获取证件类型
console.log(getCardType('110101199003074515')); // '1'

// 生成身份证
console.log(generateIdCard(1)); // '410694197705168550'
```

### ES Module (现代环境)

```javascript
import { validateIdCard, getCardType, generateIdCard } from 'idnumber-js';

// 验证身份证
console.log(validateIdCard('110101199003074515')); // true

// 获取证件类型
console.log(getCardType('110101199003074515')); // '1'

// 生成身份证
console.log(generateIdCard(1)); // '410694197705168550'
```

### 浏览器 (UMD)

```html
<script src="https://unpkg.com/idnumber-js/dist/index.umd.js"></script>
<script>
  console.log(IdNumber.validateIdCard('110101199003074515')); // true
  console.log(IdNumber.getCardType('110101199003074515')); // '1'
  console.log(IdNumber.generateIdCard('chinese')); // '410694197705168550'
</script>
```

## API 文档

### validateIdCard(idCard, types?)

验证证件号码是否有效。

**参数：**
- `idCard` (string): 证件号码
- `types` (number|string|Array, 可选): 证件类型，支持单个类型或类型数组

**返回值：**
- `boolean`: 是否有效

**示例：**
```javascript
// 自动检测类型并验证
validateIdCard('110101199003074515'); // true

// 指定类型验证
validateIdCard('110101199003074515', 1); // true
validateIdCard('110101199003074515', [1, 'G']); // true
```

### getCardType(idCard)

获取证件类型。

**参数：**
- `idCard` (string): 证件号码

**返回值：**
- `string|undefined`: 证件类型代码，没找到返回undefined

**示例：**
```javascript
getCardType('110101199003074515'); // '1'
getCardType('invalid'); // undefined
```

### generateIdCard(type, options?)

生成证件号码。

**参数：**
- `type` (string|number): 证件类型
- `options` (object, 可选): 生成选项

**返回值：**
- `string`: 生成的证件号码

**示例：**
```javascript
// 生成身份证
generateIdCard(1);

// 生成指定性别的身份证
generateIdCard(1, { gender: 'male' });

// 生成香港通行证
generateIdCard('G');
```

## 支持的证件类型

| 类型代码 | 类型名称 | 说明 |
|---------|---------|------|
| `1`, `'1'` | 中国身份证 | 18位身份证号码 |
| `'G'` | 香港通行证 | 港澳通行证 |
| `'M'` | 澳门通行证 | 港澳通行证 |
| `'L'` | 华侨护照 | 中国护照 |
| `'6'` | 台湾通行证 | 大陆居民往来台湾通行证 |
| `'I'` | 港澳台居民居住证 | 居住证 |
| `'8'` | 外国人居留证 | 外国人永久居留身份证 |
| `'P'` | 普通护照 | 普通护照 |

## 生成选项

```javascript
const options = {
  province: '北京市',        // 省份
  gender: 'male',           // 性别: 'male' | 'female'
  startYear: 1990,          // 开始年份
  endYear: 2000,            // 结束年份
  region: 'HK',             // 地区: 'HK' | 'Macao' | 'TW'
  newVersion: true,         // 是否新版本
  type: 'ordinary',         // 证件类型
  format: '18digit'         // 格式
};

generateIdCard(1, options);
```

## 环境要求

- Node.js >= 8.0.0
- 支持现代浏览器

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 测试
npm test

# 开发模式
npm run dev
```

## 许可证

MIT