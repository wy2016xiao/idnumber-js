/**
 * 简化测试文件
 */

const assert = require('assert');
const IdNumber = require('../dist/index.js');

console.log('=== 身份证号码处理工具库测试 ===');

// 1. 验证功能测试
console.log('\n1. 验证功能测试:');
const validId = IdNumber.generate(); // 生成一个有效身份证
const invalidId = '123456789012345678'; // 无效身份证
console.log(`  有效身份证 ${validId}: ${IdNumber.validate(validId)}`);
console.log(`  无效身份证 ${invalidId}: ${IdNumber.validate(invalidId)}`);
assert.strictEqual(IdNumber.validate(validId), true, '有效身份证验证失败');
assert.strictEqual(IdNumber.validate(invalidId), false, '无效身份证验证失败');

// 2. 解析功能测试
console.log('\n2. 解析功能测试:');
const parseResult = IdNumber.parse(validId);
console.log('  解析结果:', parseResult);
assert.strictEqual(parseResult.valid, true, '解析有效身份证失败');
assert.strictEqual(parseResult.type, '1', '证件类型解析错误');
assert.strictEqual(typeof parseResult.gender, 'string', '性别解析错误');
assert.strictEqual(typeof parseResult.birthday, 'string', '生日解析错误');
assert.strictEqual(typeof parseResult.age, 'number', '年龄解析错误');
assert.strictEqual(typeof parseResult.province, 'string', '省份解析错误');

// 3. 生成功能测试
console.log('\n3. 生成功能测试:');
const generatedId = IdNumber.generate();
console.log('  生成的身份证:', generatedId);
console.log('  验证生成的身份证:', IdNumber.validate(generatedId));
assert.strictEqual(IdNumber.validate(generatedId), true, '生成的身份证验证失败');

// 4. 其他证件生成测试
console.log('\n4. 其他证件生成测试:');
const hkPermit = IdNumber.generateHKMacaoPermit('HK');
console.log('  香港通行证:', hkPermit);
assert.strictEqual(IdNumber.isValidHKMacaoPermit(hkPermit), true, '生成的香港通行证验证失败');

const macaoPermit = IdNumber.generateHKMacaoPermit('MAC');
console.log('  澳门通行证:', macaoPermit);
assert.strictEqual(IdNumber.isValidHKMacaoPermit(macaoPermit), true, '生成的澳门通行证验证失败');

const chinesePassport = IdNumber.generateChinesePassport();
console.log('  华侨护照:', chinesePassport);
assert.strictEqual(IdNumber.isValidChinesePassport(chinesePassport), true, '生成的华侨护照验证失败');

const twPermit = IdNumber.generateTWPermit();
console.log('  台湾通行证:', twPermit);
assert.strictEqual(IdNumber.isValidTWPermit(twPermit), true, '生成的台湾通行证验证失败');

console.log('\n=== 测试完成 ===');
