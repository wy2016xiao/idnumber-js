/**
 * 身份证号码处理工具类 - 验证器
 */

import { trim, trimAll, isNull } from './utils.js';
import { Wi, ValideCode } from './constants.js';

/**
 * 验证港澳居民来往内地通行证
 * @param {string} cardNo 港澳居民来往内地通行证号码
 * @return {boolean} 是否有效
 */
export function isValidHKMacaoPermit(cardNo) {
  if (!cardNo) return false;
  cardNo = trimAll(cardNo);

  // 港澳居民来往内地通行证：
  // 新版: H/M + 8位数字 或 H/M + 10位数字
  // 旧版: H/M + 字母 + 6位或7位数字
  const newReg = /^[HMhm](\d{8}|\d{10})$/;
  const oldReg = /^[HMhm][a-zA-Z]\d{6,7}$/;

  return newReg.test(cardNo) || oldReg.test(cardNo);
}

/**
 * 验证港澳台居民居住证
 * @param {string} cardNo 港澳台居民居住证号码
 * @return {boolean} 是否有效
 */
export function isValidHKTWResidencePermit(cardNo) {
  if (!cardNo) return false;
  cardNo = trimAll(cardNo);

  // 港澳台居民居住证格式：18位，前两位为81(香港)、82(澳门)、83(台湾)
  // 后续格式遵循类似身份证的规则
  if (!/^(81|82|83)\d{16}$/.test(cardNo)) {
    return false;
  }

  // 验证日期部分（第7-14位）
  var year = parseInt(cardNo.substring(6, 10));
  var month = parseInt(cardNo.substring(10, 12));
  var day = parseInt(cardNo.substring(12, 14));

  if (year < 1900 || year > new Date().getFullYear()) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  // 验证日期有效性
  var date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return false;
  }

  return true;
}

/**
 * 验证台湾居民来往大陆通行证（改进版）
 * @param {string} cardNo 台湾居民来往大陆通行证号码
 * @return {boolean} 是否有效
 */
export function isValidTWPermit(cardNo) {
  if (!cardNo) return false;
  cardNo = trimAll(cardNo).toUpperCase();

  // 台湾居民来往大陆通行证的几种格式：
  // 1. 8位数字
  // 2. 10位数字字母混合
  // 3. 新版可能是18位数字

  // 8位纯数字格式
  if (/^\d{8}$/.test(cardNo)) {
    return true;
  }

  // 10位字母数字混合格式（如：1234567890）
  if (/^\d{10}$/.test(cardNo)) {
    return true;
  }

  // 字母开头的格式（如：T12345678）
  if (/^[A-Z]\d{7,9}$/.test(cardNo)) {
    return true;
  }

  // 18位新版格式
  if (/^\d{18}$/.test(cardNo)) {
    return true;
  }

  return false;
}

/**
 * 验证护照号码（支持世界范围内的护照格式）
 * @param {string} passportNo 护照号码
 * @return {boolean} 是否有效
 */
export function isValidPassport(passportNo) {
  if (!passportNo) return false;
  passportNo = trimAll(passportNo);

  // 世界范围内的护照号码格式：
  // 1. 纯数字型：5-14位数字（部分国家使用）
  // 2. 字母+数字型：1-3位字母 + 5-9位数字（最常见格式）
  // 3. 字母+数字+字母型：一些特殊国家格式
  // 4. 中国护照特殊情况：G/E/D/P/S + 数字

  // 通用格式验证（涵盖大多数国家护照）
  const commonReg = /^[A-Za-z0-9]{5,20}$/;  // 5-20位字母数字混合

  // 一些特定国家格式
  const specificFormatReg = /^[A-Za-z]{1,3}[0-9]{5,9}$/;  // 1-3位字母+5-9位数字
  const reversedFormatReg = /^[0-9]{5,9}[A-Za-z]{1,3}$/;  // 5-9位数字+1-3位字母
  const mixedFormatReg = /^[A-Za-z][0-9]+[A-Za-z]$/;  // 字母开头数字中间字母结尾

  // 纯数字型（少数国家使用）
  const pureNumberReg = /^[0-9]{5,14}$/;

  return commonReg.test(passportNo) ||
    specificFormatReg.test(passportNo) ||
    reversedFormatReg.test(passportNo) ||
    mixedFormatReg.test(passportNo) ||
    pureNumberReg.test(passportNo);
}

/**
 * 验证华侨护照（中国护照，不含外国人护照）
 * @param {string} passportNo 护照号码
 * @return {boolean} 是否为华侨护照
 */
export function isValidChinesePassport(passportNo) {
  if (!passportNo) return false;
  passportNo = trimAll(passportNo).toUpperCase();

  // 中国护照格式规则：
  // 1. 普通护照：
  //    - 旧版：G + 8位数字 (G12345678)
  //    - 新版：E + 8位数字 (E12345678)
  //    - 电子护照：EA/EB/EC/ED/EE/EF + 7位数字 (EA1234567)
  // 2. 公务护照：D + 8位数字 (D12345678)
  // 3. 外交护照：DE + 7位数字 (DE1234567)
  // 4. 香港特区护照：
  //    - 旧版：H + 7位数字或字母 (H1234567, HA123456)
  //    - 新版：K + 7位数字或字母 (K1234567, KA123456)
  // 5. 澳门特区护照：MA + 7位数字 (MA1234567)

  // 普通护照（旧版）：G + 8位数字
  if (/^G\d{8}$/.test(passportNo)) {
    return true;
  }

  // 普通护照（新版）：E + 8位数字
  if (/^E\d{8}$/.test(passportNo)) {
    return true;
  }

  // 电子护照：EA/EB/EC/ED/EE/EF + 7位数字
  if (/^E[A-F]\d{7}$/.test(passportNo)) {
    return true;
  }

  // 公务护照：D + 8位数字
  if (/^D\d{8}$/.test(passportNo)) {
    return true;
  }

  // 外交护照：DE + 7位数字
  if (/^DE\d{7}$/.test(passportNo)) {
    return true;
  }

  // 香港特区护照：H或K开头 + 7位数字或字母数字混合
  if (/^[HK]([A-Z]?\d{6}|\d{7})$/.test(passportNo)) {
    return true;
  }

  // 澳门特区护照：MA + 7位数字
  if (/^MA\d{7}$/.test(passportNo)) {
    return true;
  }

  return false;
}

/**
 * 校验身份证号码是否正确
 * @param {string} idCard 身份证号码
 * @return {boolean} 是否有效
 */
export function idCardValidate(idCard) {
  if (typeof idCard !== 'string') {
    return false;
  }
  idCard = trim(idCard.replace(/ /g, '')); // 去掉字符串头尾空格
  if (/^[A-Z]{3}/.test(idCard)) {
    // 处理PAK等国际编码开头的旧版外国人永居证
    return isValidForeignerOldIdCard(idCard);
  } else if (/^9/.test(idCard)) {
    // 处理9开头的新版永居证
    const a_idCard = idCard.split('');
    return isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeByForeigner18IdCard(a_idCard);
  } else if (idCard.length === 15) {
    if (isValidityBrithBy15IdCard(idCard) && isTrueValidateCodeBy15IdCard(idCard)) {
      // 进行15位身份证的验证
      return true;
    } else {
      return false;
    }
  } else if (idCard.length === 18) {
    var a_idCard = idCard.split(''); // 得到身份证数组
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
      // 进行18位身份证的基本验证和第18位的验证
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param {Array} a_idCard 身份证号码数组
 * @return {boolean} 验证位是否正确
 */
export function isTrueValidateCodeBy18IdCard(a_idCard) {
  if (a_idCard.length !== 18) return false;

  var sum = 0; // 声明加权求和变量
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i]; // 加权求和
  }
  var valCodePosition = sum % 11; // 得到验证码所位置
  var lastCode = a_idCard[17].toUpperCase() === 'X' ? 10 : a_idCard[17];
  if (lastCode == ValideCode[valCodePosition]) {
    return true;
  } else {
    return false;
  }
}

/**
 * 获取身份证号码最后的验证位
 * @param {Array} a_idCard 身份证号码数组
 * @return {string} 验证位
 */
export function getIDCardValidateCode(a_idCard) {
  var sum = 0; // 声明加权求和变量
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i]; // 加权求和
  }
  var valCodePosition = sum % 11; // 得到验证码所位置
  var code = ValideCode[valCodePosition];
  if (code === 10) code = 'X';

  return code;
}

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param {string} idCard18 18位身份证号码
 * @return {boolean} 生日是否有效
 */
export function isValidityBrithBy18IdCard(idCard18) {
  var year = idCard18.substring(6, 10);
  var month = idCard18.substring(10, 12);
  var day = idCard18.substring(12, 14);
  var temp_date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  // 这里用getFullYear()获取年份，避免千年虫问题
  if (temp_date.getHours() !== 0) {
    // 1989-04-16 转换会变成1989-04-15 23:00:00导致判断不通过，所以不是0小时则跳过后面的校验
    return true;
  }
  if (temp_date.getFullYear() !== parseInt(year) || temp_date.getMonth() !== parseInt(month) - 1 || temp_date.getDate() !== parseInt(day)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 验证外国人永居证（旧版15位）格式
 * @param {string} idCard15 15位外国人永居证号码
 * @return {boolean} 是否有效
 */
export function isValidForeignerOldIdCard(idCard15) {
  if (idCard15.length !== 15) return false;

  // 验证前3位是否为大写字母
  if (!/^[A-Z]{3}/.test(idCard15)) return false;

  // 验证中间6位是否为数字
  if (!/^\d{6}$/.test(idCard15.substr(3, 6))) return false;

  // 验证后6位是否为有效日期
  return isValidityBrithBy15IdCard(idCard15);
}

/**
 * 验证外国人永居证（新版18位）校验位
 * @param {Array} a_idCard 身份证号码数组
 * @return {boolean} 校验位是否正确
 */
export function isTrueValidateCodeByForeigner18IdCard(a_idCard) {
  // 新版外国人永居证校验位计算规则
  var ValideCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

  if (a_idCard.length !== 18 || a_idCard[0] !== '9') return false;

  var sum = 0;
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * parseInt(a_idCard[i]);
  }
  var valCodePosition = sum % 11;
  return a_idCard[17].toUpperCase() === ValideCode[valCodePosition];
}

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param {string} idCard15 15位身份证号码
 * @return {boolean} 生日是否有效
 */
export function isValidityBrithBy15IdCard(idCard15) {
  var year;
  var month;
  var day;
  if (/^[A-Z]{3}/.test(idCard15)) { // 旧版外国人永居证
    year = idCard15.substring(7, 9);
    month = idCard15.substring(9, 11);
    day = idCard15.substring(11, 13);
  } else {
    year = idCard15.substring(6, 8);
    month = idCard15.substring(8, 10);
    day = idCard15.substring(10, 12);
  }
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (temp_date.getYear() !== parseFloat(year) || temp_date.getMonth() !== parseFloat(month) - 1 || temp_date.getDate() !== parseFloat(day)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 判断身份证号码为15位时最后的验证位是否正确
 * @param {string} idCard15 15位身份证号码
 * @return {boolean} 验证位是否正确
 */
export function isTrueValidateCodeBy15IdCard(idCard15) {
  var checkCode = {A:10,B:11,C:12,D:13,E:14,F:15,G:16,H:17,I:18,J:19,K:20,L:21,M:22,N:23,O:24,P:25,Q:26,R:27,S:28,T:29,U:30,V:31,W:32,X:33,Y:34,Z:35};
  var weightNumber = [7,3,1];
  if (/^[A-Z]{3}/.test(idCard15)) { // 旧版永居证
    if (!/^[A-Z]{3}[0-9]{12}$/.test(idCard15)) {
      return false;
    }
    var sumNumber = 0;
    for (var i = 0; i < 14; i++) {
      if (i <= 2) {
        sumNumber = sumNumber + weightNumber[i%3] * checkCode[idCard15.substring(i,i+1)];
      } else {
        sumNumber = sumNumber + weightNumber[i%3] * parseInt(idCard15.substring(i,i+1));
      }
    }
    if ((sumNumber%10) === parseInt(idCard15.substring(14,15))) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

/**
 * 其他证件号码规则校验
 * @param {string} words 证件号码
 * @return {boolean} 是否有效
 */
export function checkOtherIDNo(words) {
  // 因为证件有其他类型，所以只做简单的长度校验
  if (words.length === 0) return false;
  if (words.length > 20) return false;
  words += '';
  if (words.indexOf(' ') >= 0 || words.indexOf("'") >= 0 || words.indexOf('"') >= 0 || words.indexOf('\\') >= 0 || words.indexOf('/') >= 0) {
    return false;
  }
  if (words.length === 0) return false;
  var allowReg = /^[a-zA-Z0-9()（）]{1,}$/;
  if (!words.match(allowReg)) return false;
  return true;
}

/**
 * 判断是否国内二代居民身份证
 * @param {string} idCard 身份证号码
 * @return {boolean} 是否为二代居民身份证
 */
export function isChineseIdCard(idCard) {
  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idCard);
}
