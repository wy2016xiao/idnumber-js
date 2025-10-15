/**
 * ES模块使用示例
 */

// 方式1：导入默认导出
import IdNumber from '../dist/index.mjs';

// 方式2：导入命名导出
import { 
  idCardValidate, 
  parseIdCard, 
  generateIdCard,
  getCardType,
  getCardTypeName 
} from '../dist/index.mjs';

console.log('=== ES模块使用示例 ===\n');

// 使用默认导出
console.log('1. 使用默认导出:');
const isValid1 = IdNumber.validate('110101199003071234');
console.log(`  验证结果: ${isValid1}`);

const generatedId1 = IdNumber.generate({ gender: 'male' });
console.log(`  生成的身份证: ${generatedId1}`);

// 使用命名导出
console.log('\n2. 使用命名导出:');
const isValid2 = idCardValidate('110101199003071234');
console.log(`  验证结果: ${isValid2}`);

const generatedId2 = generateIdCard({ gender: 'female', province: '31' });
console.log(`  生成的身份证: ${generatedId2}`);

// 解析功能
console.log('\n3. 解析功能:');
const parseResult = parseIdCard(generatedId2);
console.log('  解析结果:', JSON.stringify(parseResult, null, 2));

// 证件类型识别
console.log('\n4. 证件类型识别:');
const idCard = generateIdCard();
const hkPermit = IdNumber.generateHKMacaoPermit({ region: 'HK' });
const passport = IdNumber.generateChinesePassport();

console.log(`  身份证: ${idCard} - 类型: ${getCardType(idCard)} (${getCardTypeName(getCardType(idCard))})`);
console.log(`  香港通行证: ${hkPermit} - 类型: ${getCardType(hkPermit)} (${getCardTypeName(getCardType(hkPermit))})`);
console.log(`  华侨护照: ${passport} - 类型: ${getCardType(passport)} (${getCardTypeName(getCardType(passport))})`);

// 批量生成测试
console.log('\n5. 批量生成测试:');
console.log('  生成5个随机身份证:');
for (let i = 0; i < 5; i++) {
  const id = generateIdCard();
  const isValid = idCardValidate(id);
  const gender = IdNumber.getGender(id);
  console.log(`    ${i + 1}. ${id} - ${isValid ? '有效' : '无效'} - ${gender}`);
}

console.log('\n=== ES模块示例完成 ===');
