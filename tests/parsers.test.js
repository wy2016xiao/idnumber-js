/**
 * 解析器测试用例
 */

import {
  getCardTypeByNumber,
  getCardTypeName,
  getSex,
  getAge,
  getBirthdayFromIdCard,
  parseIdCard
} from '../src/parsers.js';

describe('解析器测试', () => {
  describe('getCardTypeByNumber', () => {
    test('应该正确识别身份证类型', () => {
      expect(getCardTypeByNumber('110101199003071234')).toBe('1');
      expect(getCardTypeByNumber('110101900307123')).toBe('1');
    });

    test('应该正确识别港澳台居住证', () => {
      expect(getCardTypeByNumber('811010199003071234')).toBe('I');
      expect(getCardTypeByNumber('821010199003071234')).toBe('I');
      expect(getCardTypeByNumber('831010199003071234')).toBe('I');
    });

    test('应该正确识别港澳通行证', () => {
      expect(getCardTypeByNumber('H12345678')).toBe('G');
      expect(getCardTypeByNumber('M12345678')).toBe('M');
    });

    test('应该正确识别华侨护照', () => {
      expect(getCardTypeByNumber('G12345678')).toBe('L');
      expect(getCardTypeByNumber('E12345678')).toBe('L');
    });

    test('应该正确识别台湾通行证', () => {
      expect(getCardTypeByNumber('12345678')).toBe('6');
      expect(getCardTypeByNumber('T12345678')).toBe('6');
    });

    test('应该正确识别外国人永居证', () => {
      expect(getCardTypeByNumber('911010199003071234')).toBe('8');
    });

    test('应该返回空字符串对于无效证件', () => {
      expect(getCardTypeByNumber('')).toBe('');
      expect(getCardTypeByNumber('123456789')).toBe('');
      expect(getCardTypeByNumber('invalid')).toBe('');
    });
  });

  describe('getCardTypeName', () => {
    test('应该返回正确的证件类型名称', () => {
      expect(getCardTypeName('1')).toBe('二代居民身份证');
      expect(getCardTypeName('I')).toBe('港澳台居民居住证');
      expect(getCardTypeName('G')).toBe('香港居民来往内地通行证');
      expect(getCardTypeName('M')).toBe('澳门居民来往内地通行证');
      expect(getCardTypeName('L')).toBe('华侨护照');
      expect(getCardTypeName('6')).toBe('台湾居民来往大陆通行证');
      expect(getCardTypeName('8')).toBe('外国人永久居留身份证');
    });

    test('应该返回未知类型对于无效代码', () => {
      expect(getCardTypeName('X')).toBe('未知证件类型');
      expect(getCardTypeName('')).toBe('未知证件类型');
    });
  });

  describe('getSex', () => {
    test('应该正确识别男性', () => {
      expect(getSex('110101199003071234')).toBe('男');
      expect(getSex('11010119900307123')).toBe('男');
    });

    test('应该正确识别女性', () => {
      expect(getSex('110101199003071235')).toBe('女');
      expect(getSex('11010119900307124')).toBe('女');
    });

    test('应该处理无效输入', () => {
      expect(getSex('')).toBe('');
      expect(getSex('123')).toBe('');
    });
  });

  describe('getAge', () => {
    test('应该正确计算年龄', () => {
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - 25;
      const birthday = birthYear.toString() + '0307';
      const age = getAge(birthday);
      expect(age).toBe(25);
    });

    test('应该处理无效输入', () => {
      expect(getAge('')).toBe(0);
      expect(getAge(null)).toBe(0);
      expect(getAge(undefined)).toBe(0);
    });
  });

  describe('getBirthdayFromIdCard', () => {
    test('应该从18位身份证提取生日', () => {
      const birthday = getBirthdayFromIdCard('110101199003071234', '1');
      expect(birthday).toBe('1990-03-07');
    });

    test('应该从15位身份证提取生日', () => {
      const birthday = getBirthdayFromIdCard('110101900307123', '1');
      expect(birthday).toBe('1990-03-07');
    });

    test('应该处理非身份证类型', () => {
      expect(getBirthdayFromIdCard('H12345678', 'G')).toBe('');
    });

    test('应该处理无效输入', () => {
      expect(getBirthdayFromIdCard('', '1')).toBe('');
      expect(getBirthdayFromIdCard('110101199003071234', '')).toBe('');
    });
  });

  describe('parseIdCard', () => {
    test('应该正确解析有效的身份证', () => {
      const result = parseIdCard('110101199003071234');
      expect(result.valid).toBe(true);
      expect(result.type).toBe('1');
      expect(result.typeName).toBe('二代居民身份证');
      expect(result.gender).toBe('男');
      expect(result.birthday).toBe('1990-03-07');
      expect(result.province).toBe('北京市');
      expect(result.error).toBe('');
    });

    test('应该处理无效的身份证', () => {
      const result = parseIdCard('123456789012345678');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('身份证号码格式不正确');
    });

    test('应该处理空输入', () => {
      const result = parseIdCard('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('身份证号码不能为空');
    });

    test('应该解析15位身份证', () => {
      const result = parseIdCard('110101900307123');
      expect(result.valid).toBe(true);
      expect(result.type).toBe('1');
      expect(result.gender).toBe('男');
      expect(result.birthday).toBe('1990-03-07');
    });
  });
});
