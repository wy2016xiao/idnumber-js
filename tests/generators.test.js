/**
 * 生成器测试用例
 */

import {
  generateIdCard,
  generateIdCard15,
  generateHKMacaoPermit,
  generateHKTWResidencePermit,
  generateChinesePassport,
  generateTWPermit,
  generateForeignerIdCard,
  generatePassport
} from '../src/generators.js';

import {
  idCardValidate,
  getCardTypeByNumber,
  getSex,
  getAge,
  getBirthdayFromIdCard
} from '../src/validators.js';

describe('生成器测试', () => {
  describe('generateIdCard', () => {
    test('应该生成有效的18位身份证', () => {
      const idCard = generateIdCard();
      expect(idCard).toHaveLength(18);
      expect(idCardValidate(idCard)).toBe(true);
    });

    test('应该根据选项生成指定性别的身份证', () => {
      const maleId = generateIdCard({ gender: 'male' });
      const femaleId = generateIdCard({ gender: 'female' });
      
      expect(getSex(maleId)).toBe('男');
      expect(getSex(femaleId)).toBe('女');
    });

    test('应该根据选项生成指定省份的身份证', () => {
      const beijingId = generateIdCard({ province: '11' });
      expect(beijingId).toMatch(/^11/);
    });

    test('应该根据选项生成指定年份范围的身份证', () => {
      const idCard = generateIdCard({ startYear: 1990, endYear: 1995 });
      const birthday = getBirthdayFromIdCard(idCard, '1');
      const year = parseInt(birthday.split('-')[0]);
      expect(year).toBeGreaterThanOrEqual(1990);
      expect(year).toBeLessThanOrEqual(1995);
    });
  });

  describe('generateIdCard15', () => {
    test('应该生成有效的15位身份证', () => {
      const idCard = generateIdCard15();
      expect(idCard).toHaveLength(15);
      expect(idCardValidate(idCard)).toBe(true);
    });

    test('应该根据选项生成指定性别的15位身份证', () => {
      const maleId = generateIdCard15({ gender: 'male' });
      const femaleId = generateIdCard15({ gender: 'female' });
      
      expect(getSex(maleId)).toBe('男');
      expect(getSex(femaleId)).toBe('女');
    });
  });

  describe('generateHKMacaoPermit', () => {
    test('应该生成有效的香港通行证', () => {
      const permit = generateHKMacaoPermit({ region: 'HK' });
      expect(permit).toMatch(/^H/);
      expect(permit.length).toBeGreaterThanOrEqual(9);
      expect(permit.length).toBeLessThanOrEqual(11);
    });

    test('应该生成有效的澳门通行证', () => {
      const permit = generateHKMacaoPermit({ region: 'Macao' });
      expect(permit).toMatch(/^M/);
      expect(permit.length).toBeGreaterThanOrEqual(9);
      expect(permit.length).toBeLessThanOrEqual(11);
    });

    test('应该生成新版格式的通行证', () => {
      const permit = generateHKMacaoPermit({ newVersion: true });
      expect(permit).toMatch(/^[HM]\d{8,10}$/);
    });

    test('应该生成旧版格式的通行证', () => {
      const permit = generateHKMacaoPermit({ newVersion: false });
      expect(permit).toMatch(/^[HM][A-Z]\d{6,7}$/);
    });
  });

  describe('generateHKTWResidencePermit', () => {
    test('应该生成有效的香港居住证', () => {
      const permit = generateHKTWResidencePermit({ region: 'HK' });
      expect(permit).toMatch(/^81/);
      expect(permit).toHaveLength(18);
    });

    test('应该生成有效的澳门居住证', () => {
      const permit = generateHKTWResidencePermit({ region: 'Macao' });
      expect(permit).toMatch(/^82/);
      expect(permit).toHaveLength(18);
    });

    test('应该生成有效的台湾居住证', () => {
      const permit = generateHKTWResidencePermit({ region: 'TW' });
      expect(permit).toMatch(/^83/);
      expect(permit).toHaveLength(18);
    });
  });

  describe('generateChinesePassport', () => {
    test('应该生成有效的普通护照', () => {
      const passport = generateChinesePassport({ type: 'ordinary' });
      expect(passport).toMatch(/^[GE]\d{8}$/);
    });

    test('应该生成有效的电子护照', () => {
      const passport = generateChinesePassport({ type: 'electronic' });
      expect(passport).toMatch(/^E[A-F]\d{7}$/);
    });

    test('应该生成有效的公务护照', () => {
      const passport = generateChinesePassport({ type: 'official' });
      expect(passport).toMatch(/^D\d{8}$/);
    });

    test('应该生成有效的外交护照', () => {
      const passport = generateChinesePassport({ type: 'diplomatic' });
      expect(passport).toMatch(/^DE\d{7}$/);
    });

    test('应该生成有效的香港特区护照', () => {
      const passport = generateChinesePassport({ type: 'hk' });
      expect(passport).toMatch(/^[HK]/);
      expect(passport.length).toBeGreaterThanOrEqual(8);
      expect(passport.length).toBeLessThanOrEqual(9);
    });

    test('应该生成有效的澳门特区护照', () => {
      const passport = generateChinesePassport({ type: 'macao' });
      expect(passport).toMatch(/^MA\d{7}$/);
    });
  });

  describe('generateTWPermit', () => {
    test('应该生成8位数字格式的台湾通行证', () => {
      const permit = generateTWPermit({ format: '8digit' });
      expect(permit).toMatch(/^\d{8}$/);
    });

    test('应该生成10位数字格式的台湾通行证', () => {
      const permit = generateTWPermit({ format: '10digit' });
      expect(permit).toMatch(/^\d{10}$/);
    });

    test('应该生成字母开头的台湾通行证', () => {
      const permit = generateTWPermit({ format: 'letter' });
      expect(permit).toMatch(/^[A-Z]\d{7,9}$/);
    });

    test('应该生成18位数字格式的台湾通行证', () => {
      const permit = generateTWPermit({ format: '18digit' });
      expect(permit).toMatch(/^\d{18}$/);
    });
  });

  describe('generateForeignerIdCard', () => {
    test('应该生成有效的新版外国人永居证', () => {
      const idCard = generateForeignerIdCard({ newVersion: true });
      expect(idCard).toMatch(/^9\d{17}$/);
      expect(idCardValidate(idCard)).toBe(true);
    });

    test('应该生成有效的旧版外国人永居证', () => {
      const idCard = generateForeignerIdCard({ newVersion: false });
      expect(idCard).toMatch(/^[A-Z]{3}\d{12}$/);
      expect(idCard).toHaveLength(15);
    });

    test('应该使用指定的国家代码', () => {
      const idCard = generateForeignerIdCard({ 
        newVersion: false, 
        countryCode: 'USA' 
      });
      expect(idCard).toMatch(/^USA\d{12}$/);
    });
  });

  describe('generatePassport', () => {
    test('应该生成有效的通用护照', () => {
      const passport = generatePassport();
      expect(passport.length).toBeGreaterThanOrEqual(6);
      expect(passport.length).toBeLessThanOrEqual(12);
      expect(passport).toMatch(/^[A-Za-z0-9]+$/);
    });

    test('应该生成指定国家的护照', () => {
      const passport = generatePassport({ country: 'US' });
      expect(passport.length).toBeGreaterThanOrEqual(6);
      expect(passport.length).toBeLessThanOrEqual(12);
    });
  });

  describe('生成器集成测试', () => {
    test('生成的身份证应该能被正确解析', () => {
      const idCard = generateIdCard({ 
        gender: 'male', 
        province: '11',
        startYear: 1990,
        endYear: 1990
      });
      
      expect(idCardValidate(idCard)).toBe(true);
      expect(getCardTypeByNumber(idCard)).toBe('1');
      expect(getSex(idCard)).toBe('男');
      
      const birthday = getBirthdayFromIdCard(idCard, '1');
      const year = parseInt(birthday.split('-')[0]);
      expect(year).toBe(1990);
    });

    test('生成的证件应该符合预期格式', () => {
      const hkPermit = generateHKMacaoPermit({ region: 'HK', newVersion: true });
      expect(hkPermit).toMatch(/^H\d{8,10}$/);
      
      const passport = generateChinesePassport({ type: 'ordinary' });
      expect(passport).toMatch(/^[GE]\d{8}$/);
      
      const twPermit = generateTWPermit({ format: '8digit' });
      expect(twPermit).toMatch(/^\d{8}$/);
    });
  });
});
