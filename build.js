/**
 * 简化构建脚本 - 兼容Node.js 8+
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 开始构建...');

// 确保dist目录存在
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// 读取源码文件
const sourceFiles = [
  'constants.js',
  'utils.js', 
  'validators.js',
  'parsers.js',
  'generators.js'
];

// 合并所有源码
let combinedSource = '';
sourceFiles.forEach(file => {
  const filePath = path.join('src', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    combinedSource += content + '\n\n';
  }
});

// 读取主入口文件
const mainSource = fs.readFileSync('src/index.js', 'utf8');

// 1. 生成 CommonJS 版本
const commonjsCode = (combinedSource + mainSource)
  .replace(/import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"];?/g, '') // 移除import
  .replace(/export\s+{([^}]+)};?/g, '') // 移除export
  .replace(/export\s+function\s+(\w+)/g, 'function $1') // export function -> function
  .replace(/export\s+const\s+(\w+)/g, 'const $1') // export const -> const
  .replace(/export\s+default\s+/, 'module.exports = '); // export default -> module.exports

// 添加 module.exports
const moduleExports = `
module.exports = {
  // 验证相关
  idCardValidate,
  validate: idCardValidate,
  validateIdCard: idCardValidate,
  isValidHKMacaoPermit,
  isValidChinesePassport,
  isValidHKTWResidencePermit,
  isValidTWPermit,
  isValidForeignerOldIdCard,
  isValidPassport,
  
  // 解析相关
  getCardTypeByNumber,
  getCardType: getCardTypeByNumber,
  getCardTypeName,
  getSex,
  getGender: getSex,
  getAge,
  getBirthdayFromIdCard,
  getBirthday: getBirthdayFromIdCard,
  parseIdCard,
  parse: parseIdCard,
  
  // 生成相关
  generateIdCard,
  generate: generateIdCard,
  generateHKMacaoPermit,
  generateHKTWResidencePermit,
  generateChinesePassport,
  generateTWPermit,
  generatePassport,
  
  // 工具函数
  trim,
  trimAll,
  isNull,
  
  // 常量
  state,
  cardTypeMap
};
`;

fs.writeFileSync('dist/index.js', commonjsCode + moduleExports);

// 2. 生成 ES Module 版本
const esModuleCode = combinedSource + mainSource;
fs.writeFileSync('dist/index.mjs', esModuleCode);

// 3. 生成 UMD 版本
const umdCode = `(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.IdNumber = factory());
}(this, (function () {
  'use strict';
  
  ${commonjsCode}
})));`;

fs.writeFileSync('dist/index.umd.js', umdCode);

// 4. 生成 TypeScript 定义
const tsCode = `/**
 * 身份证号码处理工具类 - TypeScript类型定义
 */

export interface ParseResult {
  valid: boolean;
  type: string;
  typeName: string;
  gender: string;
  age: number;
  birthday: string;
  province: string;
  error: string;
}

export interface GenerateOptions {
  province?: string;
  gender?: 'male' | 'female';
  startYear?: number;
  endYear?: number;
  region?: 'HK' | 'Macao' | 'TW';
  newVersion?: boolean;
  type?: 'ordinary' | 'official' | 'diplomatic' | 'electronic' | 'hk' | 'macao';
  format?: '8digit' | '10digit' | 'letter' | '18digit';
}

// 主要API接口
export interface IdNumberAPI {
  validate: (idCard: string) => boolean;
  validateIdCard: (idCard: string) => boolean;
  getCardType: (cardNo: string) => string;
  getCardTypeName: (cardType: string) => string;
  getGender: (idCard: string) => string;
  getAge: (birthday: string) => number;
  getBirthday: (idNumber: string, idType: string) => string;
  parse: (idCard: string) => ParseResult;
  generate: (options?: GenerateOptions) => string;
  generateHKMacaoPermit: (options?: GenerateOptions) => string;
  generateChinesePassport: (options?: GenerateOptions) => string;
  generateTWPermit: (options?: GenerateOptions) => string;
  trim: (str: string) => string;
  trimAll: (str: string) => string;
  isNull: (obj: any) => boolean;
  state: Record<string, string>;
  cardTypeMap: Record<string, string>;
}

// 命名导出
export declare function idCardValidate(idCard: string): boolean;
export declare function getCardTypeByNumber(cardNo: string): string;
export declare function getCardTypeName(cardType: string): string;
export declare function getSex(idCard: string): string;
export declare function getAge(birthday: string): number;
export declare function getBirthdayFromIdCard(idNumber: string, idType: string): string;
export declare function parseIdCard(idCard: string): ParseResult;
export declare function generateIdCard(options?: GenerateOptions): string;
export declare function generateHKMacaoPermit(options?: GenerateOptions): string;
export declare function generateChinesePassport(options?: GenerateOptions): string;
export declare function generateTWPermit(options?: GenerateOptions): string;
export declare function trim(str: string): string;
export declare function trimAll(str: string): string;
export declare function isNull(obj: any): boolean;

// 常量
export declare const state: Record<string, string>;
export declare const cardTypeMap: Record<string, string>;

// 默认导出
declare const IdNumber: IdNumberAPI;
export default IdNumber;
`;

fs.writeFileSync('dist/index.d.ts', tsCode);

console.log('✅ 构建完成！');
console.log('📁 生成的文件:');
console.log('  - dist/index.js (CommonJS)');
console.log('  - dist/index.mjs (ES Module)');
console.log('  - dist/index.umd.js (Browser UMD)');
console.log('  - dist/index.d.ts (TypeScript)');
console.log('');
console.log('🎯 现在只需要维护 src/ 目录下的单一源码！');