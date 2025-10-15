# idnumber-js

中国身份证号码及其他证件号码处理工具库，支持验证、解析、生成等功能。

## 功能特性

- ✅ **证件验证**：支持多种中国证件号码格式验证
- ✅ **证件解析**：解析证件号码获取详细信息（性别、年龄、生日、省份等）
- ✅ **证件生成**：生成符合规则的伪证件号码（用于测试）
- ✅ **多格式支持**：支持18位身份证、港澳通行证、华侨护照、台湾通行证等
- ✅ **ES5兼容**：兼容Node.js 8+和现代浏览器
- ✅ **TypeScript支持**：提供完整的类型定义

## 支持的证件类型

| 类型代码 | 证件名称 | 示例格式 |
|---------|---------|---------|
| 1 | 二代居民身份证 | 110101199003071234 |
| I | 港澳台居民居住证 | 811010199003071234 |
| G | 香港居民来往内地通行证 | H12345678 |
| M | 澳门居民来往内地通行证 | M12345678 |
| L | 华侨护照 | G12345678, E12345678 |
| 6 | 台湾居民来往大陆通行证 | 12345678, T12345678 |
| 8 | 外国人永久居留身份证 | 911010199003071234 |

## 安装

```bash
npm install idnumber-js
```

## 使用方法

### Node.js 环境

#### CommonJS 方式（推荐，兼容性最好）

```javascript
const IdNumber = require('idnumber-js');

// 验证身份证号码
const isValid = IdNumber.validate('110101199003071234');
console.log(isValid); // true

// 解析身份证信息
const info = IdNumber.parse('110101199003071234');
console.log(info);
// {
//   valid: true,
//   type: '1',
//   typeName: '二代居民身份证',
//   gender: '男',
//   age: 34,
//   birthday: '1990-03-07',
//   province: '北京市',
//   error: ''
// }

// 生成身份证号码
const generatedId = IdNumber.generate({
  gender: 'male',
  province: '11',
  startYear: 1990,
  endYear: 1995
});
console.log(generatedId); // 110101199203071234
```

#### ES模块方式（Node.js 14+）

```javascript
// 方式1：导入默认导出
import IdNumber from 'idnumber-js';

// 方式2：导入命名导出
import { 
  idCardValidate, 
  parseIdCard, 
  generateIdCard 
} from 'idnumber-js';

// 使用
const isValid = idCardValidate('110101199003071234');
const info = parseIdCard('110101199003071234');
const generatedId = generateIdCard({ gender: 'male' });
```

#### TypeScript 方式

```typescript
import IdNumber, { 
  idCardValidate, 
  parseIdCard, 
  generateIdCard,
  ParseResult 
} from 'idnumber-js';

const isValid: boolean = idCardValidate('110101199003071234');
const info: ParseResult = parseIdCard('110101199003071234');
const generatedId: string = generateIdCard({ gender: 'male' });
```

### 浏览器环境

#### UMD 方式（推荐，兼容性最好）

```html
<script src="https://unpkg.com/idnumber-js/dist/index.umd.js"></script>
<script>
  // 验证身份证号码
  const isValid = IdNumber.validate('110101199003071234');
  console.log(isValid); // true
  
  // 生成身份证号码
  const generatedId = IdNumber.generate();
  console.log(generatedId);
</script>
```

#### ES模块方式（现代浏览器）

```html
<script type="module">
  import IdNumber from 'https://unpkg.com/idnumber-js/dist/index.mjs';
  
  // 验证身份证号码
  const isValid = IdNumber.validate('110101199003071234');
  console.log(isValid); // true
  
  // 生成身份证号码
  const generatedId = IdNumber.generate();
  console.log(generatedId);
</script>
```

## 模块格式支持

| 格式 | 文件 | 环境 | Node.js版本 | 说明 |
|------|------|------|-------------|------|
| CommonJS | `dist/index.js` | Node.js | 8+ | 推荐，兼容性最好 |
| ES Module | `dist/index.mjs` | Node.js/浏览器 | 14+ | 现代环境推荐 |
| UMD | `dist/index.umd.js` | 浏览器 | - | 浏览器环境推荐 |
| TypeScript | `dist/index.d.ts` | 所有 | - | 类型定义 |

### 自动模块解析

库支持 `package.json` 的 `exports` 字段，会根据环境自动选择正确的模块格式：

- **Node.js + require()**: 自动使用 CommonJS 版本
- **Node.js + import**: 自动使用 ES Module 版本  
- **浏览器 + script**: 使用 UMD 版本
- **TypeScript**: 自动加载类型定义

## API 文档

### 验证功能

#### `validate(idCard)`
验证身份证号码是否有效。

**参数：**
- `idCard` (string): 身份证号码

**返回值：**
- `boolean`: 是否有效

**示例：**
```javascript
IdNumber.validate('110101199003071234'); // true
IdNumber.validate('123456789012345678'); // false
```

#### `getCardType(cardNo)`
获取证件类型代码。

**参数：**
- `cardNo` (string): 证件号码

**返回值：**
- `string`: 证件类型代码

**示例：**
```javascript
IdNumber.getCardType('110101199003071234'); // '1'
IdNumber.getCardType('H12345678'); // 'G'
```

### 解析功能

#### `parse(idCard)`
解析身份证号码，返回详细信息。

**参数：**
- `idCard` (string): 身份证号码

**返回值：**
- `Object`: 解析结果对象
  - `valid` (boolean): 是否有效
  - `type` (string): 证件类型代码
  - `typeName` (string): 证件类型名称
  - `gender` (string): 性别
  - `age` (number): 年龄
  - `birthday` (string): 生日 (YYYY-MM-DD格式)
  - `province` (string): 省份
  - `error` (string): 错误信息

**示例：**
```javascript
const result = IdNumber.parse('110101199003071234');
console.log(result.gender); // '男'
console.log(result.age); // 34
console.log(result.province); // '北京市'
```

#### `getGender(idCard)`
获取性别。

**参数：**
- `idCard` (string): 身份证号码

**返回值：**
- `string`: '男' 或 '女'

#### `getAge(birthday)`
根据生日计算年龄。

**参数：**
- `birthday` (string): 生日 (YYYYMMDD格式)

**返回值：**
- `number`: 年龄

### 生成功能

#### `generate(options)`
生成随机身份证号码。

**参数：**
- `options` (Object, 可选): 生成选项
  - `province` (string): 省份代码，如 '11' 表示北京
  - `gender` (string): 性别，'male' 或 'female'
  - `startYear` (number): 出生年份范围开始，默认 1950
  - `endYear` (number): 出生年份范围结束，默认 2005

**返回值：**
- `string`: 生成的身份证号码

**示例：**
```javascript
// 生成随机身份证
IdNumber.generate();

// 生成指定性别和省份的身份证
IdNumber.generate({
  gender: 'male',
  province: '11',
  startYear: 1990,
  endYear: 1995
});
```

#### `generateHKMacaoPermit(options)`
生成港澳居民来往内地通行证。

**参数：**
- `options` (Object, 可选): 生成选项
  - `region` (string): 地区，'HK' 或 'Macao'
  - `newVersion` (boolean): 是否使用新版格式，默认 true

**示例：**
```javascript
IdNumber.generateHKMacaoPermit({ region: 'HK' }); // H12345678
IdNumber.generateHKMacaoPermit({ region: 'Macao', newVersion: false }); // MA123456
```

#### `generateChinesePassport(options)`
生成华侨护照。

**参数：**
- `options` (Object, 可选): 生成选项
  - `type` (string): 护照类型
    - 'ordinary': 普通护照 (G/E + 8位数字)
    - 'electronic': 电子护照 (EA/EB/EC/ED/EE/EF + 7位数字)
    - 'official': 公务护照 (D + 8位数字)
    - 'diplomatic': 外交护照 (DE + 7位数字)

**示例：**
```javascript
IdNumber.generateChinesePassport({ type: 'ordinary' }); // G12345678
IdNumber.generateChinesePassport({ type: 'electronic' }); // EA1234567
```

#### `generateTWPermit(options)`
生成台湾居民来往大陆通行证。

**参数：**
- `options` (Object, 可选): 生成选项
  - `format` (string): 格式类型
    - '8digit': 8位数字
    - '10digit': 10位数字
    - 'letter': 字母开头格式
    - '18digit': 18位数字

**示例：**
```javascript
IdNumber.generateTWPermit({ format: '8digit' }); // 12345678
IdNumber.generateTWPermit({ format: 'letter' }); // T12345678
```

## 工具函数

#### `trim(str)`
去掉字符串头尾空格。

#### `trimAll(str)`
去掉字符串中所有空格。

#### `isNull(obj)`
判断参数是否为null或undefined。

## 常量

#### `state`
省份代码映射对象。

#### `cardTypeMap`
证件类型映射对象。

## 使用示例

### 完整的身份证处理流程

```javascript
const IdNumber = require('idnumber-js');

// 1. 生成身份证
const idCard = IdNumber.generate({
  gender: 'male',
  province: '11', // 北京
  startYear: 1990,
  endYear: 1995
});

console.log('生成的身份证:', idCard);

// 2. 验证身份证
const isValid = IdNumber.validate(idCard);
console.log('验证结果:', isValid);

// 3. 解析身份证信息
const info = IdNumber.parse(idCard);
console.log('解析结果:', info);

// 4. 获取具体信息
console.log('性别:', IdNumber.getGender(idCard));
console.log('年龄:', IdNumber.getAge(info.birthday.replace(/-/g, '')));
console.log('省份:', info.province);
```

### 处理多种证件类型

```javascript
const IdNumber = require('idnumber-js');

// 生成各种证件
const idCard = IdNumber.generate();
const hkPermit = IdNumber.generateHKMacaoPermit({ region: 'HK' });
const passport = IdNumber.generateChinesePassport();
const twPermit = IdNumber.generateTWPermit();

console.log('身份证:', idCard);
console.log('香港通行证:', hkPermit);
console.log('华侨护照:', passport);
console.log('台湾通行证:', twPermit);

// 识别证件类型
console.log('身份证类型:', IdNumber.getCardType(idCard));
console.log('香港通行证类型:', IdNumber.getCardType(hkPermit));
console.log('华侨护照类型:', IdNumber.getCardType(passport));
console.log('台湾通行证类型:', IdNumber.getCardType(twPermit));
```

## 系统要求

- Node.js >= 8.0.0
- 现代浏览器（支持ES5）

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### 1.0.0
- 初始版本发布
- 支持身份证号码验证、解析、生成
- 支持港澳通行证、华侨护照、台湾通行证等
- 提供完整的TypeScript类型定义