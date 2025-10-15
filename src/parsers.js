/**
 * 身份证号码处理工具类 - 解析器
 */

import { trimAll } from './utils.js';
import { cardTypeMap, state } from './constants.js';
import { 
  isValidHKTWResidencePermit, 
  isValidHKMacaoPermit, 
  isValidChinesePassport, 
  isChineseIdCard, 
  isValidForeignerOldIdCard, 
  isValidTWPermit,
  idCardValidate
} from './validators.js';

/**
 * 根据证件号码判断证件类型，返回对应的类型代码
 * @param {string} cardNo 证件号码
 * @return {string} 证件类型代码：
 *   '1' - 二代居民身份证
 *   'I' - 港澳台居民居住证
 *   'L' - 华侨护照（不含外国人护照）
 *   'G' - 香港居民来往内地通行证
 *   'M' - 澳门居民来往内地通行证
 *   '6' - 台湾居民来往大陆通行证
 *   '8' - 外国人永久居留身份证
 *   '' - 无法识别的证件类型
 */
export function getCardTypeByNumber(cardNo) {
  if (!cardNo) return '';

  cardNo = trimAll(cardNo);

  // 1. 外国人永久居留身份证：优先判断
  // 新版：9开头的18位数字
  if (/^9\d{17}$/.test(cardNo)) {
    return '8';
  }

  // 旧版：前3位大写字母+12位数字，使用专门验证函数
  if (/^[A-Z]{3}\d{12}$/.test(cardNo) && cardNo.length === 15) {
    if (isValidForeignerOldIdCard(cardNo)) {
      return '8';
    }
  }

  // 2. 港澳台居民居住证：优先判断，避免被身份证误判
  if (isValidHKTWResidencePermit(cardNo)) {
    return 'I';
  }

  // 3. 港澳居民来往内地通行证：分别处理香港和澳门
  // 香港居民来往内地通行证：H开头
  if (/^[Hh]/.test(cardNo) && isValidHKMacaoPermit(cardNo)) {
    return 'G';
  }

  // 澳门居民来往内地通行证：M开头
  if (/^[Mm]/.test(cardNo) && isValidHKMacaoPermit(cardNo)) {
    return 'M';
  }

  // 4. 华侨护照：优先于台湾通行证判断，避免误判
  if (isValidChinesePassport(cardNo)) {
    return 'L';
  }

  // 5. 二代居民身份证
  if (isChineseIdCard(cardNo)) {
    return '1';
  }

  // 6. 15位身份证（老版本）
  if (cardNo.length === 15 && /^\d{15}$/.test(cardNo) && idCardValidate(cardNo)) {
    return '1';
  }

  // 7. 台湾居民来往大陆通行证：放在最后，避免误判其他证件
  if (isValidTWPermit(cardNo)) {
    return '6';
  }

  // 无法识别的证件类型
  return '';
}

/**
 * 获取证件类型名称
 * @param {string} cardType 证件类型代码
 * @return {string} 证件类型名称
 */
export function getCardTypeName(cardType) {
  return cardTypeMap[cardType] || '未知证件类型';
}

/**
 * 通过身份证判断性别
 * @param {string} idCard 身份证号码
 * @return {string} 性别（男/女）
 */
export function getSex(idCard) {
  var sexStr = "";
  if (idCard.length === 15 || idCard.length === 18) {
    if (parseInt(idCard.slice(-2, -1)) % 2 === 1) {
      sexStr = "男";
    } else {
      sexStr = "女";
    }
  }
  return sexStr;
}

/**
 * 根据出生日期获取年龄
 * @param {string} birthday 出生日期（YYYYMMDD格式）
 * @return {number} 年龄
 */
export function getAge(birthday) {
  if (!birthday) return 0;
  let d = new Date();
  let year = birthday.slice(0, 4);
  let month = birthday.slice(4, 6);
  let day = birthday.slice(6, 8);
  let age = d.getFullYear() - parseInt(year);
  if (parseInt(month) > d.getMonth() + 1) {
    age--;
  }
  return age;
}

/**
 * 安全地从证件号码中提取生日信息
 * @param {string} idNumber 证件号码
 * @param {string} idType 证件类型代码
 * @return {string} 生日字符串（YYYY-MM-DD格式）或空字符串
 */
export function getBirthdayFromIdCard(idNumber, idType) {
  // 基本验证
  if (!idNumber || !idType) {
    return '';
  }

  const trimmedId = idNumber.trim();
  if (trimmedId.length === 0) {
    return '';
  }

  // 只有身份证类型才支持生日提取
  if (idType !== '1') {
    return '';
  }

  // 验证身份证号码有效性
  const detectedType = getCardTypeByNumber(trimmedId);
  if (detectedType !== '1') {
    return ''; // 不是有效的身份证号码
  }

  // 提取生日信息
  try {
    if (trimmedId.length === 15) {
      // 15位身份证：第7-12位是生日
      const year = '19' + trimmedId.substring(6, 8);
      const month = trimmedId.substring(8, 10);
      const day = trimmedId.substring(10, 12);
      return year + '-' + month + '-' + day;
    } else if (trimmedId.length === 18) {
      // 18位身份证：第7-14位是生日
      const year = trimmedId.substring(6, 10);
      const month = trimmedId.substring(10, 12);
      const day = trimmedId.substring(12, 14);
      return year + '-' + month + '-' + day;
    }
  } catch (error) {
    console.error('提取生日信息失败:', error);
    return '';
  }

  return '';
}

/**
 * 解析身份证号码，返回详细信息
 * @param {string} idCard 身份证号码
 * @return {Object} 解析结果
 */
export function parseIdCard(idCard) {
  const result = {
    valid: false,
    type: '',
    typeName: '',
    gender: '',
    age: 0,
    birthday: '',
    province: '',
    error: ''
  };

  if (!idCard) {
    result.error = '身份证号码不能为空';
    return result;
  }

  // 验证身份证号码
  if (!idCardValidate(idCard)) {
    result.error = '身份证号码格式不正确';
    return result;
  }

  // 获取证件类型
  result.type = getCardTypeByNumber(idCard);
  result.typeName = getCardTypeName(result.type);
  result.valid = true;

  // 只有身份证类型才解析详细信息
  if (result.type === '1') {
    result.gender = getSex(idCard);
    result.birthday = getBirthdayFromIdCard(idCard, result.type);
    result.age = getAge(result.birthday.replace(/-/g, ''));
    
    // 解析省份（仅对18位身份证有效）
    if (idCard.length === 18) {
      const provinceCode = idCard.substring(0, 2);
      result.province = state[provinceCode] || '未知省份';
    }
  }

  return result;
}
