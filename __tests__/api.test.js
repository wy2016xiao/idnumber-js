/**
 * 核心API测试 - 使用Jest和现代JavaScript
 */

import { validateIdCard, getCardType, generateIdCard } from '../src/index.js';

describe('核心API测试', () => {
  describe('validateIdCard', () => {
    test('应该验证有效的身份证', () => {
      const validId = '110101199003074515';
      expect(validateIdCard(validId)).toBe(true);
    });

    test('应该拒绝无效的身份证', () => {
      const invalidId = '12345678901234567X';
      expect(validateIdCard(invalidId)).toBe(false);
    });

    test('应该支持指定类型验证', () => {
      const validId = '110101199003074515';
      expect(validateIdCard(validId, 1)).toBe(true);
      expect(validateIdCard(validId, ['1', 1])).toBe(true);
    });

    test('应该支持多类型验证', () => {
      const validId = '110101199003074515';
      expect(validateIdCard(validId, [1, 'G', 'M'])).toBe(true);
    });
  });

  describe('getCardType', () => {
    test('应该返回正确的证件类型', () => {
      const chineseId = '110101199003074515';
      expect(getCardType(chineseId)).toBe('1');
    });

    test('应该对无效证件返回undefined', () => {
      const invalidId = '12345678901234567X';
      expect(getCardType(invalidId)).toBeUndefined();
    });
  });

  describe('generateIdCard', () => {
    test('应该生成有效的身份证', () => {
      const generatedId = generateIdCard(1);
      expect(typeof generatedId).toBe('string');
      expect(generatedId).toHaveLength(18);
      expect(validateIdCard(generatedId)).toBe(true);
    });

    test('应该生成香港通行证', () => {
      const generatedId = generateIdCard('G');
      expect(typeof generatedId).toBe('string');
      expect(validateIdCard(generatedId, 'G')).toBe(true);
    });

    test('应该生成澳门通行证', () => {
      const generatedId = generateIdCard('M');
      expect(typeof generatedId).toBe('string');
      expect(validateIdCard(generatedId, 'M')).toBe(true);
    });

    test('应该支持选项参数', () => {
      const generatedId = generateIdCard(1, { 
        gender: 'male',
        startYear: 1990,
        endYear: 2000
      });
      expect(typeof generatedId).toBe('string');
      expect(validateIdCard(generatedId)).toBe(true);
    });
  });
});
