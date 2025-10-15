/**
 * 基本使用示例
 */

const IdNumber = require('../dist/index.js');

console.log('=== idnumber-js 基本使用示例 ===\n');

// 1. 验证身份证号码
console.log('1. 验证功能:');
const validId = '110101199003071234';
const invalidId = '123456789012345678';

console.log(`  有效身份证 ${validId}: ${IdNumber.validate(validId)}`);
console.log(`  无效身份证 ${invalidId}: ${IdNumber.validate(invalidId)}`);

// 2. 解析身份证信息
console.log('\n2. 解析功能:');
const parseResult = IdNumber.parse(validId);
console.log('  解析结果:', JSON.stringify(parseResult, null, 2));

// 3. 生成身份证号码
console.log('\n3. 生成功能:');
const generatedId = IdNumber.generate({
  gender: 'male',
  province: '11', // 北京
  startYear: 1990,
  endYear: 1995
});
console.log(`  生成的身份证: ${generatedId}`);
console.log(`  验证生成的身份证: ${IdNumber.validate(generatedId)}`);

// 4. 生成其他证件
console.log('\n4. 其他证件生成:');
const hkPermit = IdNumber.generateHKMacaoPermit({ region: 'HK' });
const macaoPermit = IdNumber.generateHKMacaoPermit({ region: 'Macao' });
const passport = IdNumber.generateChinesePassport({ type: 'ordinary' });
const twPermit = IdNumber.generateTWPermit({ format: '8digit' });

console.log(`  香港通行证: ${hkPermit}`);
console.log(`  澳门通行证: ${macaoPermit}`);
console.log(`  华侨护照: ${passport}`);
console.log(`  台湾通行证: ${twPermit}`);

// 5. 识别证件类型
console.log('\n5. 证件类型识别:');
console.log(`  身份证类型: ${IdNumber.getCardType(generatedId)} (${IdNumber.getCardTypeName(IdNumber.getCardType(generatedId))})`);
console.log(`  香港通行证类型: ${IdNumber.getCardType(hkPermit)} (${IdNumber.getCardTypeName(IdNumber.getCardType(hkPermit))})`);
console.log(`  华侨护照类型: ${IdNumber.getCardType(passport)} (${IdNumber.getCardTypeName(IdNumber.getCardType(passport))})`);
console.log(`  台湾通行证类型: ${IdNumber.getCardType(twPermit)} (${IdNumber.getCardTypeName(IdNumber.getCardType(twPermit))})`);

// 6. 批量生成和验证
console.log('\n6. 批量生成和验证:');
console.log('  生成10个随机身份证:');
for (let i = 0; i < 10; i++) {
  const id = IdNumber.generate();
  const isValid = IdNumber.validate(id);
  const gender = IdNumber.getGender(id);
  console.log(`    ${i + 1}. ${id} - ${isValid ? '有效' : '无效'} - ${gender}`);
}

console.log('\n=== 示例完成 ===');
