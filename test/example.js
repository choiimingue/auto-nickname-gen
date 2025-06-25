const NicknameGenerator = require('../src/index');

const gen = new NicknameGenerator();

console.log('🎯 빠른 닉네임 생성 테스트');
console.log('='.repeat(40));

const langs = [
  ['🇰🇷 한국어', 'korean'],
  ['🇯🇵 일본어', 'japanese'],
  ['🇹🇼 대만어', 'chinese'],
  ['🌍 랜덤', 'random']
];

langs.forEach(([label, code]) => {
  console.log(`${label}: ${gen.generateNickname(code)}`);
});

console.log('\n' + '='.repeat(40));
console.log('🎲 여러 개 닉네임 생성 테스트');
console.log('='.repeat(40));

console.log('🇰🇷 한국어 3개:');
gen.generateMultipleNicknames(3, 'korean').forEach((n, i) => console.log(`  ${i+1}. ${n}`));

console.log('\n🇯🇵 일본어 3개:');
gen.generateMultipleNicknames(3, 'japanese').forEach((n, i) => console.log(`  ${i+1}. ${n}`));

console.log('\n🇹🇼 대만어 3개:');
gen.generateMultipleNicknames(3, 'chinese').forEach((n, i) => console.log(`  ${i+1}. ${n}`));

console.log('\n' + '='.repeat(40));
console.log('📊 언어별 단어 개수');
console.log('='.repeat(40));
console.log(gen.getLanguageInfo()); 