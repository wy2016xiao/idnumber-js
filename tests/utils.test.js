/**
 * 工具函数测试用例
 */

import {
  trim,
  trimAll,
  isNull,
  generateRandomNumbers,
  generateRandomLetters,
  generateRandomAlphanumeric,
  randomChoice,
  generateRandomDate
} from '../src/utils.js';

describe('工具函数测试', () => {
  describe('trim', () => {
    test('应该去掉字符串头尾空格', () => {
      expect(trim('  hello world  ')).toBe('hello world');
      expect(trim('hello world')).toBe('hello world');
      expect(trim('')).toBe('');
    });

    test('应该处理非字符串输入', () => {
      expect(trim(123)).toBe(123);
      expect(trim(null)).toBe(null);
      expect(trim(undefined)).toBe(undefined);
    });
  });

  describe('trimAll', () => {
    test('应该去掉字符串中所有空格', () => {
      expect(trimAll('  hello   world  ')).toBe('helloworld');
      expect(trimAll('hello world')).toBe('helloworld');
      expect(trimAll('')).toBe('');
    });

    test('应该处理非字符串输入', () => {
      expect(trimAll(123)).toBe('123');
      expect(trimAll(null)).toBe(null);
      expect(trimAll(undefined)).toBe(undefined);
    });
  });

  describe('isNull', () => {
    test('应该正确识别null和undefined', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(true);
    });

    test('应该正确识别非null值', () => {
      expect(isNull('')).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull(false)).toBe(false);
      expect(isNull('hello')).toBe(false);
      expect(isNull([])).toBe(false);
      expect(isNull({})).toBe(false);
    });
  });

  describe('generateRandomNumbers', () => {
    test('应该生成指定长度的数字字符串', () => {
      const numbers = generateRandomNumbers(5);
      expect(numbers).toHaveLength(5);
      expect(numbers).toMatch(/^\d{5}$/);
    });

    test('应该生成不同长度的数字字符串', () => {
      const numbers1 = generateRandomNumbers(1);
      const numbers10 = generateRandomNumbers(10);
      
      expect(numbers1).toHaveLength(1);
      expect(numbers10).toHaveLength(10);
      expect(numbers1).toMatch(/^\d$/);
      expect(numbers10).toMatch(/^\d{10}$/);
    });
  });

  describe('generateRandomLetters', () => {
    test('应该生成指定长度的大写字母字符串', () => {
      const letters = generateRandomLetters(5);
      expect(letters).toHaveLength(5);
      expect(letters).toMatch(/^[A-Z]{5}$/);
    });

    test('应该生成指定长度的小写字母字符串', () => {
      const letters = generateRandomLetters(5, false);
      expect(letters).toHaveLength(5);
      expect(letters).toMatch(/^[a-z]{5}$/);
    });
  });

  describe('generateRandomAlphanumeric', () => {
    test('应该生成指定长度的字母数字混合字符串', () => {
      const alphanumeric = generateRandomAlphanumeric(10);
      expect(alphanumeric).toHaveLength(10);
      expect(alphanumeric).toMatch(/^[A-Z0-9]{10}$/);
    });

    test('应该生成小写字母数字混合字符串', () => {
      const alphanumeric = generateRandomAlphanumeric(10, false);
      expect(alphanumeric).toHaveLength(10);
      expect(alphanumeric).toMatch(/^[a-z0-9]{10}$/);
    });
  });

  describe('randomChoice', () => {
    test('应该从数组中随机选择一个元素', () => {
      const array = ['a', 'b', 'c', 'd', 'e'];
      const choice = randomChoice(array);
      expect(array).toContain(choice);
    });

    test('应该处理单个元素数组', () => {
      const array = ['single'];
      const choice = randomChoice(array);
      expect(choice).toBe('single');
    });

    test('应该处理数字数组', () => {
      const array = [1, 2, 3, 4, 5];
      const choice = randomChoice(array);
      expect(array).toContain(choice);
    });
  });

  describe('generateRandomDate', () => {
    test('应该生成指定年份范围内的日期', () => {
      const date = generateRandomDate(1990, 2000);
      expect(date.year).toBeGreaterThanOrEqual(1990);
      expect(date.year).toBeLessThanOrEqual(2000);
      expect(date.month).toMatch(/^\d{2}$/);
      expect(date.day).toMatch(/^\d{2}$/);
    });

    test('应该生成有效的月份和日期', () => {
      const date = generateRandomDate(1990, 2000);
      const month = parseInt(date.month);
      const day = parseInt(date.day);
      
      expect(month).toBeGreaterThanOrEqual(1);
      expect(month).toBeLessThanOrEqual(12);
      expect(day).toBeGreaterThanOrEqual(1);
      expect(day).toBeLessThanOrEqual(28); // 使用28避免月份天数问题
    });

    test('应该使用默认年份范围', () => {
      const date = generateRandomDate();
      expect(date.year).toBeGreaterThanOrEqual(1950);
      expect(date.year).toBeLessThanOrEqual(2005);
    });
  });

  describe('工具函数集成测试', () => {
    test('trim和trimAll应该配合使用', () => {
      const str = '  hello   world  ';
      const trimmed = trim(str);
      const trimmedAll = trimAll(str);
      
      expect(trimmed).toBe('hello   world');
      expect(trimmedAll).toBe('helloworld');
    });

    test('生成器函数应该产生不同的结果', () => {
      const numbers1 = generateRandomNumbers(5);
      const numbers2 = generateRandomNumbers(5);
      
      // 虽然理论上可能相同，但概率极低
      // 这里主要测试函数能正常执行
      expect(numbers1).toHaveLength(5);
      expect(numbers2).toHaveLength(5);
    });

    test('randomChoice应该能处理各种数组类型', () => {
      const stringArray = ['a', 'b', 'c'];
      const numberArray = [1, 2, 3];
      const mixedArray = ['a', 1, true, null];
      
      expect(stringArray).toContain(randomChoice(stringArray));
      expect(numberArray).toContain(randomChoice(numberArray));
      expect(mixedArray).toContain(randomChoice(mixedArray));
    });
  });
});
