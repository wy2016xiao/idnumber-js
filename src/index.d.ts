/**
 * 身份证号码处理工具类 - TypeScript类型定义
 */

// 生成选项接口
export interface GenerateOptions {
  province?: string;
  gender?: 'male' | 'female';
  startYear?: number;
  endYear?: number;
  region?: 'HK' | 'Macao' | 'TW';
  newVersion?: boolean;
  type?: 'ordinary' | 'official' | 'diplomatic' | 'electronic' | 'hk' | 'macao';
  format?: '8digit' | '10digit' | 'letter' | '18digit';
  countryCode?: string;
  country?: string;
}

// 解析结果接口
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

// 日期对象接口
export interface DateObject {
  year: number;
  month: string;
  day: string;
}

// 主要API接口
export interface IdNumberAPI {
  // 验证相关
  validate: (idCard: string) => boolean;
  validateIdCard: (idCard: string) => boolean;
  validateChineseIdCard: (idCard: string) => boolean;
  validateHKMacaoPermit: (cardNo: string) => boolean;
  validateHKTWResidencePermit: (cardNo: string) => boolean;
  validateTWPermit: (cardNo: string) => boolean;
  validatePassport: (passportNo: string) => boolean;
  validateChinesePassport: (passportNo: string) => boolean;
  validateForeignerIdCard: (idCard: string) => boolean;
  
  // 解析相关
  getCardType: (cardNo: string) => string;
  getCardTypeName: (cardType: string) => string;
  getGender: (idCard: string) => string;
  getAge: (birthday: string) => number;
  getBirthday: (idNumber: string, idType: string) => string;
  parse: (idCard: string) => ParseResult;
  
  // 生成相关
  generate: (options?: GenerateOptions) => string;
  generateIdCard: (options?: GenerateOptions) => string;
  generateIdCard15: (options?: GenerateOptions) => string;
  generateHKMacaoPermit: (options?: GenerateOptions) => string;
  generateHKTWResidencePermit: (options?: GenerateOptions) => string;
  generateChinesePassport: (options?: GenerateOptions) => string;
  generateTWPermit: (options?: GenerateOptions) => string;
  generateForeignerIdCard: (options?: GenerateOptions) => string;
  generatePassport: (options?: GenerateOptions) => string;
  
  // 工具函数
  trim: (str: string) => string;
  trimAll: (str: string) => string;
  isNull: (obj: any) => boolean;
  
  // 常量
  state: Record<string, string>;
  cardTypeMap: Record<string, string>;
  genderMap: Record<string, string>;
}

// 验证器函数类型
export declare function idCardValidate(idCard: string): boolean;
export declare function isChineseIdCard(idCard: string): boolean;
export declare function isValidHKMacaoPermit(cardNo: string): boolean;
export declare function isValidHKTWResidencePermit(cardNo: string): boolean;
export declare function isValidTWPermit(cardNo: string): boolean;
export declare function isValidPassport(passportNo: string): boolean;
export declare function isValidChinesePassport(passportNo: string): boolean;
export declare function isValidForeignerOldIdCard(idCard: string): boolean;
export declare function isTrueValidateCodeBy18IdCard(a_idCard: string[]): boolean;
export declare function isTrueValidateCodeBy15IdCard(idCard15: string): boolean;
export declare function isTrueValidateCodeByForeigner18IdCard(a_idCard: string[]): boolean;
export declare function isValidityBrithBy18IdCard(idCard18: string): boolean;
export declare function isValidityBrithBy15IdCard(idCard15: string): boolean;
export declare function getIDCardValidateCode(a_idCard: string[]): string;
export declare function checkOtherIDNo(words: string): boolean;

// 解析器函数类型
export declare function getCardTypeByNumber(cardNo: string): string;
export declare function getCardTypeName(cardType: string): string;
export declare function getSex(idCard: string): string;
export declare function getAge(birthday: string): number;
export declare function getBirthdayFromIdCard(idNumber: string, idType: string): string;
export declare function parseIdCard(idCard: string): ParseResult;

// 生成器函数类型
export declare function generateIdCard(options?: GenerateOptions): string;
export declare function generateIdCard15(options?: GenerateOptions): string;
export declare function generateHKMacaoPermit(options?: GenerateOptions): string;
export declare function generateHKTWResidencePermit(options?: GenerateOptions): string;
export declare function generateChinesePassport(options?: GenerateOptions): string;
export declare function generateTWPermit(options?: GenerateOptions): string;
export declare function generateForeignerIdCard(options?: GenerateOptions): string;
export declare function generatePassport(options?: GenerateOptions): string;

// 工具函数类型
export declare function trim(str: string): string;
export declare function trimAll(str: string): string;
export declare function isNull(obj: any): boolean;

// 常量类型
export declare const state: Record<string, string>;
export declare const Wi: number[];
export declare const ValideCode: number[];
export declare const cardTypeMap: Record<string, string>;
export declare const genderMap: Record<string, string>;

// 默认导出
declare const IdNumber: IdNumberAPI;
export default IdNumber;
