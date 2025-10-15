/**
 * 身份证号码处理工具类 - 工具函数
 */

/**
 * 去掉字符串头尾空格
 * @param {string} str 输入字符串
 * @return {string} 处理后的字符串
 */
export function trim(str) {
  if (typeof str === 'string') {
    str = str.replace(/ /g, '');
    return str.replace(/(^\s*)|(\s*$)/g, '');
  } else {
    return str;
  }
}

/**
 * 去掉字符串中所有空格
 * @param {string} str 输入字符串
 * @return {string} 处理后的字符串
 */
export function trimAll(str) {
  if (!str) {
    return str;
  }
  str = str.toString(); // 确保字符串
  return str.replace(/\s+/g, '');
}

/**
 * 判断传入的参数是否为null或undefined
 * @param {any} obj 输入参数
 * @return {boolean} 是否为null或undefined
 */
export function isNull(obj) {
  if (obj == null || obj == undefined || typeof obj === 'undefined') {
    return true;
  } else {
    return false;
  }
}

/**
 * 生成指定长度的随机数字字符串
 * @param {number} length 长度
 * @return {string} 随机数字字符串
 */
export function generateRandomNumbers(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

/**
 * 生成指定长度的随机字母字符串
 * @param {number} length 长度
 * @param {boolean} uppercase 是否大写
 * @return {string} 随机字母字符串
 */
export function generateRandomLetters(length, uppercase = true) {
  const letters = uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

/**
 * 生成指定长度的随机字母数字混合字符串
 * @param {number} length 长度
 * @param {boolean} uppercase 字母是否大写
 * @return {string} 随机字母数字混合字符串
 */
export function generateRandomAlphanumeric(length, uppercase = true) {
  const chars = uppercase ? 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' : 
    'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 从数组中随机选择一个元素
 * @param {Array} array 数组
 * @return {any} 随机选择的元素
 */
export function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 生成指定范围内的随机日期
 * @param {number} startYear 开始年份
 * @param {number} endYear 结束年份
 * @return {Object} 包含年月日的对象
 */
export function generateRandomDate(startYear = 1950, endYear = 2005) {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // 使用28避免月份天数问题
  
  return {
    year: year,
    month: month.toString().padStart(2, '0'),
    day: day.toString().padStart(2, '0')
  };
}
