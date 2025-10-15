/**
 * 主入口文件测试用例
 */

import IdNumber, {
  idCardValidate,
  getCardTypeByNumber,
  generateIdCard,
  parseIdCard,
  state,
  cardTypeMap
} from '../src/index.js';

describe('主入口文件测试', () => {
  describe('默认导出', () => {
    test('应该导出默认对象', () => {
      expect(typeof IdNumber).toBe('object');
      expect(IdNumber).toHaveProperty('validate');
      expect(IdNumber).toHaveProperty('getCardType');
      expect(IdNumber).toHaveProperty('generate');
      expect(IdNumber).toHaveProperty('parse');
    });

    test('默认导出的方法应该正常工作', () => {
      const validId = '110101199003071234';
      expect(IdNumber.validate(validId)).toBe(true);
      expect(IdNumber.getCardType(validId)).toBe('1');
      expect(IdNumber.getGender(validId)).toBe('男');
    });
  });

  describe('命名导出', () => {
    test('应该导出所有验证函数', () => {
      expect(typeof idCardValidate).toBe('function');
    });

    test('应该导出所有解析函数', () => {
      expect(typeof getCardTypeByNumber).toBe('function');
    });

    test('应该导出所有生成函数', () => {
      expect(typeof generateIdCard).toBe('function');
    });

    test('应该导出常量', () => {
      expect(typeof state).toBe('object');
      expect(typeof cardTypeMap).toBe('object');
    });
  });

  describe('API一致性测试', () => {
    test('默认导出和命名导出的函数应该一致', () => {
      const validId = '110101199003071234';
      
      expect(IdNumber.validate(validId)).toBe(idCardValidate(validId));
      expect(IdNumber.getCardType(validId)).toBe(getCardTypeByNumber(validId));
    });

    test('解析功能应该完整', () => {
      const validId = '110101199003071234';
      const result = IdNumber.parse(validId);
      
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('typeName');
      expect(result).toHaveProperty('gender');
      expect(result).toHaveProperty('age');
      expect(result).toHaveProperty('birthday');
      expect(result).toHaveProperty('province');
      expect(result).toHaveProperty('error');
    });

    test('生成功能应该完整', () => {
      const idCard = IdNumber.generate();
      expect(typeof idCard).toBe('string');
      expect(idCard.length).toBe(18);
    });
  });

  describe('常量导出测试', () => {
    test('state常量应该包含省份信息', () => {
      expect(state['11']).toBe('北京市');
      expect(state['44']).toBe('广东省');
      expect(state['81']).toBe('香港特别行政区');
    });

    test('cardTypeMap常量应该包含证件类型信息', () => {
      expect(cardTypeMap['1']).toBe('二代居民身份证');
      expect(cardTypeMap['I']).toBe('港澳台居民居住证');
      expect(cardTypeMap['G']).toBe('香港居民来往内地通行证');
    });
  });

  describe('错误处理测试', () => {
    test('应该正确处理无效输入', () => {
      expect(IdNumber.validate('')).toBe(false);
      expect(IdNumber.validate(null)).toBe(false);
      expect(IdNumber.validate(undefined)).toBe(false);
      
      expect(IdNumber.getCardType('')).toBe('');
      expect(IdNumber.getCardType(null)).toBe('');
    });

    test('解析功能应该处理错误情况', () => {
      const result = IdNumber.parse('invalid');
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('功能完整性测试', () => {
    test('应该支持完整的身份证处理流程', () => {
      // 生成身份证
      const idCard = IdNumber.generateIdCard({
        gender: 'male',
        province: '11',
        startYear: 1990,
        endYear: 1990
      });
      
      // 验证身份证
      expect(IdNumber.validate(idCard)).toBe(true);
      
      // 解析身份证
      const result = IdNumber.parse(idCard);
      expect(result.valid).toBe(true);
      expect(result.gender).toBe('男');
      expect(result.birthday).toMatch(/^1990-/);
    });

    test('应该支持多种证件类型', () => {
      // 生成各种证件
      const idCard = IdNumber.generateIdCard();
      const hkPermit = IdNumber.generateHKMacaoPermit({ region: 'HK' });
      const passport = IdNumber.generateChinesePassport();
      
      // 验证各种证件
      expect(IdNumber.validate(idCard)).toBe(true);
      expect(IdNumber.getCardType(hkPermit)).toBe('G');
      expect(IdNumber.getCardType(passport)).toBe('L');
    });
  });
});
