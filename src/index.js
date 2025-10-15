/**
 * 身份证号码处理工具类 - 主入口文件
 * 基于服务器端 idNumber.js 适配客户端使用
 */

// 导入验证器
import {
  idCardValidate,
  isChineseIdCard,
  isValidHKMacaoPermit,
  isValidHKTWResidencePermit,
  isValidTWPermit,
  isValidPassport,
  isValidChinesePassport,
  isValidForeignerOldIdCard,
  isTrueValidateCodeBy18IdCard,
  isTrueValidateCodeBy15IdCard,
  isTrueValidateCodeByForeigner18IdCard,
  isValidityBrithBy18IdCard,
  isValidityBrithBy15IdCard,
  getIDCardValidateCode,
  checkOtherIDNo
} from './validators.js';

// 导入解析器
import {
  getCardTypeByNumber,
  getCardTypeName,
  getSex,
  getAge,
  getBirthdayFromIdCard,
  parseIdCard
} from './parsers.js';

// 导入生成器
import {
  generateIdCard,
  generateIdCard15,
  generateHKMacaoPermit,
  generateHKTWResidencePermit,
  generateChinesePassport,
  generateTWPermit,
  generateForeignerIdCard,
  generatePassport
} from './generators.js';

// 导入工具函数
import {
  trim,
  trimAll,
  isNull
} from './utils.js';

// 导入常量
import {
  state,
  Wi,
  ValideCode,
  cardTypeMap,
  genderMap
} from './constants.js';

// 主要API导出
export {
  // 验证相关
  idCardValidate,
  isChineseIdCard,
  isValidHKMacaoPermit,
  isValidHKTWResidencePermit,
  isValidTWPermit,
  isValidPassport,
  isValidChinesePassport,
  isValidForeignerOldIdCard,
  isTrueValidateCodeBy18IdCard,
  isTrueValidateCodeBy15IdCard,
  isTrueValidateCodeByForeigner18IdCard,
  isValidityBrithBy18IdCard,
  isValidityBrithBy15IdCard,
  getIDCardValidateCode,
  checkOtherIDNo,
  
  // 解析相关
  getCardTypeByNumber,
  getCardTypeName,
  getSex,
  getAge,
  getBirthdayFromIdCard,
  parseIdCard,
  
  // 生成相关
  generateIdCard,
  generateIdCard15,
  generateHKMacaoPermit,
  generateHKTWResidencePermit,
  generateChinesePassport,
  generateTWPermit,
  generateForeignerIdCard,
  generatePassport,
  
  // 工具函数
  trim,
  trimAll,
  isNull,
  
  // 常量
  state,
  Wi,
  ValideCode,
  cardTypeMap,
  genderMap
};

// 默认导出（主要功能）
export default {
  // 验证
  validate: idCardValidate,
  validateIdCard: idCardValidate,
  validateChineseIdCard: isChineseIdCard,
  validateHKMacaoPermit: isValidHKMacaoPermit,
  validateHKTWResidencePermit: isValidHKTWResidencePermit,
  validateTWPermit: isValidTWPermit,
  validatePassport: isValidPassport,
  validateChinesePassport: isValidChinesePassport,
  validateForeignerIdCard: isValidForeignerOldIdCard,
  
  // 解析
  getCardType: getCardTypeByNumber,
  getCardTypeName: getCardTypeName,
  getGender: getSex,
  getAge: getAge,
  getBirthday: getBirthdayFromIdCard,
  parse: parseIdCard,
  
  // 生成
  generate: generateIdCard,
  generateIdCard: generateIdCard,
  generateIdCard15: generateIdCard15,
  generateHKMacaoPermit: generateHKMacaoPermit,
  generateHKTWResidencePermit: generateHKTWResidencePermit,
  generateChinesePassport: generateChinesePassport,
  generateTWPermit: generateTWPermit,
  generateForeignerIdCard: generateForeignerIdCard,
  generatePassport: generatePassport,
  
  // 工具
  trim: trim,
  trimAll: trimAll,
  isNull: isNull,
  
  // 常量
  state: state,
  cardTypeMap: cardTypeMap,
  genderMap: genderMap
};
