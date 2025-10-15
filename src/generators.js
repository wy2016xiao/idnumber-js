/**
 * 身份证号码处理工具类 - 生成器
 */

import { 
  generateRandomNumbers, 
  generateRandomLetters, 
  generateRandomAlphanumeric, 
  randomChoice, 
  generateRandomDate 
} from './utils.js';
import { state, Wi, ValideCode } from './constants.js';
import { getIDCardValidateCode } from './validators.js';

/**
 * 生成随机的18位身份证号码
 * @param {Object} options 生成选项
 * @param {string} options.province 省份代码（如：'11'表示北京）
 * @param {string} options.gender 性别（'male'或'female'）
 * @param {number} options.startYear 出生年份范围开始
 * @param {number} options.endYear 出生年份范围结束
 * @return {string} 生成的身份证号码
 */
export function generateIdCard(options = {}) {
  const {
    province = null,
    gender = null,
    startYear = 1950,
    endYear = 2005
  } = options;

  // 1. 生成地区代码（前6位）
  let areaCode;
  if (province) {
    // 使用指定省份代码
    const provinceCode = province.toString().padStart(2, '0');
    areaCode = provinceCode + generateRandomNumbers(4);
  } else {
    // 随机选择省份
    const provinceCodes = Object.keys(state);
    const randomProvince = randomChoice(provinceCodes);
    areaCode = randomProvince + generateRandomNumbers(4);
  }

  // 2. 生成出生日期（第7-14位）
  const birthDate = generateRandomDate(startYear, endYear);
  const birthCode = birthDate.year + birthDate.month + birthDate.day;

  // 3. 生成顺序码（第15-17位）
  let sequenceCode = generateRandomNumbers(2);
  
  // 第17位用于表示性别：奇数为男，偶数为女
  if (gender === 'male') {
    sequenceCode += randomChoice(['1', '3', '5', '7', '9']);
  } else if (gender === 'female') {
    sequenceCode += randomChoice(['0', '2', '4', '6', '8']);
  } else {
    sequenceCode += generateRandomNumbers(1);
  }

  // 4. 组合前17位
  const first17 = areaCode + birthCode + sequenceCode;

  // 5. 计算校验位（第18位）
  const checkCode = getIDCardValidateCode(first17.split(''));

  return first17 + checkCode;
}

/**
 * 生成随机的15位身份证号码（老版本）
 * @param {Object} options 生成选项
 * @param {string} options.province 省份代码
 * @param {string} options.gender 性别
 * @param {number} options.startYear 出生年份范围开始
 * @param {number} options.endYear 出生年份范围结束
 * @return {string} 生成的15位身份证号码
 */
export function generateIdCard15(options = {}) {
  const {
    province = null,
    gender = null,
    startYear = 1950,
    endYear = 1999
  } = options;

  // 1. 生成地区代码（前6位）
  let areaCode;
  if (province) {
    const provinceCode = province.toString().padStart(2, '0');
    areaCode = provinceCode + generateRandomNumbers(4);
  } else {
    const provinceCodes = Object.keys(state);
    const randomProvince = randomChoice(provinceCodes);
    areaCode = randomProvince + generateRandomNumbers(4);
  }

  // 2. 生成出生日期（第7-12位，年份只取后两位）
  const birthDate = generateRandomDate(startYear, endYear);
  const birthCode = birthDate.year.slice(-2) + birthDate.month + birthDate.day;

  // 3. 生成顺序码（第13-15位）
  let sequenceCode = generateRandomNumbers(2);
  
  // 第15位用于表示性别
  if (gender === 'male') {
    sequenceCode += randomChoice(['1', '3', '5', '7', '9']);
  } else if (gender === 'female') {
    sequenceCode += randomChoice(['0', '2', '4', '6', '8']);
  } else {
    sequenceCode += generateRandomNumbers(1);
  }

  return areaCode + birthCode + sequenceCode;
}

/**
 * 生成随机的港澳居民来往内地通行证号码
 * @param {Object} options 生成选项
 * @param {string} options.region 地区（'HK'或'Macao'）
 * @param {boolean} options.newVersion 是否使用新版格式
 * @return {string} 生成的通行证号码
 */
export function generateHKMacaoPermit(options = {}) {
  const { region = 'HK', newVersion = true } = options;
  
  const prefix = region === 'HK' ? 'H' : 'M';
  
  if (newVersion) {
    // 新版格式：H/M + 8位或10位数字
    const length = Math.random() > 0.5 ? 8 : 10;
    return prefix + generateRandomNumbers(length);
  } else {
    // 旧版格式：H/M + 字母 + 6位或7位数字
    const letter = generateRandomLetters(1);
    const length = Math.random() > 0.5 ? 6 : 7;
    return prefix + letter + generateRandomNumbers(length);
  }
}

/**
 * 生成随机的港澳台居民居住证号码
 * @param {Object} options 生成选项
 * @param {string} options.region 地区（'HK'、'Macao'或'TW'）
 * @param {number} options.startYear 出生年份范围开始
 * @param {number} options.endYear 出生年份范围结束
 * @return {string} 生成的居住证号码
 */
export function generateHKTWResidencePermit(options = {}) {
  const { region = 'HK', startYear = 1950, endYear = 2005 } = options;
  
  // 地区代码
  const regionCode = region === 'HK' ? '81' : region === 'Macao' ? '82' : '83';
  
  // 生成出生日期
  const birthDate = generateRandomDate(startYear, endYear);
  const birthCode = birthDate.year + birthDate.month + birthDate.day;
  
  // 生成顺序码和性别码
  const sequenceCode = generateRandomNumbers(3);
  
  // 组合前17位
  const first17 = regionCode + generateRandomNumbers(4) + birthCode + sequenceCode;
  
  // 计算校验位（使用身份证的校验算法）
  const checkCode = getIDCardValidateCode(first17.split(''));
  
  return first17 + checkCode;
}

/**
 * 生成随机的华侨护照号码
 * @param {Object} options 生成选项
 * @param {string} options.type 护照类型（'ordinary'、'official'、'diplomatic'、'electronic'、'hk'、'macao'）
 * @return {string} 生成的护照号码
 */
export function generateChinesePassport(options = {}) {
  const { type = 'ordinary' } = options;
  
  switch (type) {
    case 'ordinary':
      // 普通护照：G + 8位数字 或 E + 8位数字
      const prefix = Math.random() > 0.5 ? 'G' : 'E';
      return prefix + generateRandomNumbers(8);
      
    case 'electronic':
      // 电子护照：EA/EB/EC/ED/EE/EF + 7位数字
      const electronicPrefix = 'E' + randomChoice(['A', 'B', 'C', 'D', 'E', 'F']);
      return electronicPrefix + generateRandomNumbers(7);
      
    case 'official':
      // 公务护照：D + 8位数字
      return 'D' + generateRandomNumbers(8);
      
    case 'diplomatic':
      // 外交护照：DE + 7位数字
      return 'DE' + generateRandomNumbers(7);
      
    case 'hk':
      // 香港特区护照：H或K开头 + 7位数字或字母数字混合
      const hkPrefix = randomChoice(['H', 'K']);
      const hkSuffix = Math.random() > 0.5 ? 
        generateRandomNumbers(7) : 
        generateRandomAlphanumeric(7);
      return hkPrefix + hkSuffix;
      
    case 'macao':
      // 澳门特区护照：MA + 7位数字
      return 'MA' + generateRandomNumbers(7);
      
    default:
      return 'G' + generateRandomNumbers(8);
  }
}

/**
 * 生成随机的台湾居民来往大陆通行证号码
 * @param {Object} options 生成选项
 * @param {string} options.format 格式类型（'8digit'、'10digit'、'letter'、'18digit'）
 * @return {string} 生成的通行证号码
 */
export function generateTWPermit(options = {}) {
  const { format = '8digit' } = options;
  
  switch (format) {
    case '8digit':
      // 8位纯数字格式
      return generateRandomNumbers(8);
      
    case '10digit':
      // 10位数字格式
      return generateRandomNumbers(10);
      
    case 'letter':
      // 字母开头的格式
      const letter = generateRandomLetters(1);
      const length = Math.floor(Math.random() * 3) + 7; // 7-9位
      return letter + generateRandomNumbers(length);
      
    case '18digit':
      // 18位新版格式
      return generateRandomNumbers(18);
      
    default:
      return generateRandomNumbers(8);
  }
}

/**
 * 生成随机的外国人永久居留身份证号码
 * @param {Object} options 生成选项
 * @param {boolean} options.newVersion 是否使用新版格式（18位）
 * @param {string} options.countryCode 国家代码（仅旧版使用）
 * @return {string} 生成的永居证号码
 */
export function generateForeignerIdCard(options = {}) {
  const { newVersion = true, countryCode = null } = options;
  
  if (newVersion) {
    // 新版18位格式：9开头 + 17位数字
    const first17 = '9' + generateRandomNumbers(16);
    const checkCode = getIDCardValidateCode(first17.split(''));
    return first17 + checkCode;
  } else {
    // 旧版15位格式：3位字母 + 12位数字
    const letters = countryCode || generateRandomLetters(3);
    const numbers = generateRandomNumbers(12);
    return letters + numbers;
  }
}

/**
 * 生成随机的护照号码（通用格式）
 * @param {Object} options 生成选项
 * @param {string} options.country 国家（影响格式）
 * @return {string} 生成的护照号码
 */
export function generatePassport(options = {}) {
  const { country = 'generic' } = options;
  
  // 通用格式：1-3位字母 + 5-9位数字
  const letterCount = Math.floor(Math.random() * 3) + 1;
  const numberCount = Math.floor(Math.random() * 5) + 5;
  
  const letters = generateRandomLetters(letterCount);
  const numbers = generateRandomNumbers(numberCount);
  
  return letters + numbers;
}
