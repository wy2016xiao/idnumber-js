/**
 * 简化测试文件
 */

const assert = require('assert');
const IdNumber = require('../dist/index.js');

console.log('=== 身份证号码处理工具库测试 ===');

// 1. 验证功能测试
console.log('\n1. 验证功能测试:');
const validId = IdNumber.generate('chinese'); // 生成一个有效身份证
const invalidId = '123456789012345678'; // 无效身份证
console.log(`  有效身份证 ${validId}: ${IdNumber.validate(validId)}`);
console.log(`  无效身份证 ${invalidId}: ${IdNumber.validate(invalidId)}`);
assert.strictEqual(IdNumber.validate(validId), true, '有效身份证验证失败');
assert.strictEqual(IdNumber.validate(invalidId), false, '无效身份证验证失败');

// 2. 获取证件类型测试
console.log('\n2. 获取证件类型测试:');
const cardType = IdNumber.getCardType(validId);
console.log(`  证件类型: ${cardType}`);
assert.strictEqual(cardType, '1', '证件类型获取错误');

const unknownType = IdNumber.getCardType('123456789');
console.log(`  未知证件类型: ${unknownType}`);
assert.strictEqual(unknownType, undefined, '未知证件类型应该返回undefined');

// 3. 生成功能测试
console.log('\n3. 生成功能测试:');
const generatedId = IdNumber.generate('chinese');
console.log('  生成的身份证:', generatedId);
console.log('  验证生成的身份证:', IdNumber.validate(generatedId));
assert.strictEqual(IdNumber.validate(generatedId), true, '生成的身份证验证失败');

// 4. 多类型验证测试
console.log('\n4. 多类型验证测试:');
const hkPermit = IdNumber.generate('hk');
console.log('  香港通行证:', hkPermit);
console.log('  验证香港通行证:', IdNumber.validate(hkPermit, ['G', 'hk']));
assert.strictEqual(IdNumber.validate(hkPermit, ['G', 'hk']), true, '生成的香港通行证验证失败');

const macaoPermit = IdNumber.generate('macao');
console.log('  澳门通行证:', macaoPermit);
console.log('  验证澳门通行证:', IdNumber.validate(macaoPermit, ['M', 'macao']));
assert.strictEqual(IdNumber.validate(macaoPermit, ['M', 'macao']), true, '生成的澳门通行证验证失败');

const chinesePassport = IdNumber.generate('passport');
console.log('  华侨护照:', chinesePassport);
console.log('  验证华侨护照:', IdNumber.validate(chinesePassport, ['L', 'passport']));
assert.strictEqual(IdNumber.validate(chinesePassport, ['L', 'passport']), true, '生成的华侨护照验证失败');

const twPermit = IdNumber.generate('tw');
console.log('  台湾通行证:', twPermit);
console.log('  验证台湾通行证:', IdNumber.validate(twPermit, ['6', 'tw']));
assert.strictEqual(IdNumber.validate(twPermit, ['6', 'tw']), true, '生成的台湾通行证验证失败');

console.log('\n=== 测试完成 ===');
