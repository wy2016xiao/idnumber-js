/**
 * 身份证号码处理工具类 - 主入口文件
 */

// 导入验证器
import {
  isChineseIdCard,
  isValidHKMacaoPermit,
  isValidHKTWResidencePermit,
  isValidTWPermit,
  isValidPassport,
  isValidChinesePassport,
  isValidForeignerOldIdCard
} from './validators.js';

// 导入解析器
import {
  getCardTypeByNumber,
  getCardTypeName
} from './parsers.js';

// 导入生成器
import {
  generateIdCard as generateChineseIdCard,
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
  Wi,
  ValideCode,
  state,
  cardTypeMap,
  genderMap
} from './constants.js';

// ==================== 三个核心API ====================

/**
 * 验证证件号码是否有效
 * @param {string} idCard 证件号码
 * @param {number|string|Array} types 证件类型，支持单个类型或类型数组
 * @returns {boolean} 是否有效
 */
function validateIdCard(idCard, types = null) {
  if (!idCard) return false;
  
  // 如果没有指定类型，自动检测类型并验证
  if (types === null) {
    const detectedType = getCardType(idCard);
    if (!detectedType) return false;
    return validateIdCard(idCard, detectedType);
  }
  
  // 支持单个类型
  if (!Array.isArray(types)) {
    types = [types];
  }
  
  // 验证是否匹配任一指定类型
  for (const type of types) {
    if (validateSingleType(idCard, type)) {
      return true;
    }
  }
  
  return false;
}

/**
 * 验证单个证件类型
 * @param {string} idCard 证件号码
 * @param {string|number} type 证件类型
 * @returns {boolean} 是否有效
 */
function validateSingleType(idCard, type) {
  switch (type) {
    case 1:
    case '1':
      return isChineseIdCard(idCard);
    case 'G':
      return isValidHKMacaoPermit(idCard);
    case 'M':
      return isValidHKMacaoPermit(idCard);
    case 'L':
      return isValidChinesePassport(idCard);
    case '6':
      return isValidTWPermit(idCard);
    case 'I':
      return isValidHKTWResidencePermit(idCard);
    case '8':
      return isValidForeignerOldIdCard(idCard);
    case 'P':
      return isValidPassport(idCard);
    default:
      return false;
  }
}

/**
 * 获取证件类型
 * @param {string} idCard 证件号码
 * @returns {string|undefined} 证件类型代码，没找到返回undefined
 */
function getCardType(idCard) {
  if (!idCard) return undefined;
  return getCardTypeByNumber(idCard) || undefined;
}

/**
 * 生成证件号码
 * @param {string|number} type 证件类型
 * @param {object} options 选项
 * @returns {string} 生成的证件号码
 */
function generateIdCard(type, options = {}) {
  switch (type) {
    case 1:
    case '1':
      return generateChineseIdCard(options);
    case 'G':
      return generateHKMacaoPermit({ ...options, region: 'HK' });
    case 'M':
      return generateHKMacaoPermit({ ...options, region: 'MAC' });
    case 'L':
      return generateChinesePassport(options);
    case '6':
      return generateTWPermit(options);
    case 'I':
      return generateHKTWResidencePermit(options);
    case '8':
      return generateForeignerIdCard(options);
    case 'P':
      return generatePassport(options);
    default:
      throw new Error(`不支持的证件类型: ${type}`);
  }
}

// ==================== 导出API ====================

// 命名导出
export {
  validateIdCard,
  getCardType,
  generateIdCard
};

// 默认导出
export default {
  validateIdCard,
  getCardType,
  generateIdCard
};