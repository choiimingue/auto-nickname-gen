const NicknameGenerator = require('../src/index');

const gen = new NicknameGenerator();

console.log('🧪 고급 테스트 시작');
console.log('='.repeat(50));

// 1. 대량 생성 테스트
console.log('📈 대량 생성 테스트 (10개씩)');
console.log('-'.repeat(30));

['korean', 'japanese', 'chinese'].forEach(lang => {
  console.log(`\n${lang.toUpperCase()} 10개:`);
  const nicknames = gen.generateMultipleNicknames(10, lang);
  nicknames.forEach((nick, i) => console.log(`  ${i+1}. ${nick}`));
});

// 2. 중복 확인 테스트
console.log('\n' + '='.repeat(50));
console.log('🔄 중복 확인 테스트 (100개 생성)');
console.log('-'.repeat(30));

const testCount = 100;
const koreanNicknames = gen.generateMultipleNicknames(testCount, 'korean');
const uniqueCount = new Set(koreanNicknames).size;

console.log(`생성된 닉네임: ${testCount}개`);
console.log(`고유한 닉네임: ${uniqueCount}개`);
console.log(`중복률: ${((testCount - uniqueCount) / testCount * 100).toFixed(2)}%`);

// 3. 성능 테스트
console.log('\n' + '='.repeat(50));
console.log('⚡ 성능 테스트 (1000개 생성)');
console.log('-'.repeat(30));

const startTime = Date.now();
gen.generateMultipleNicknames(1000, 'random');
const endTime = Date.now();

console.log(`1000개 생성 시간: ${endTime - startTime}ms`);
console.log(`평균 생성 시간: ${((endTime - startTime) / 1000).toFixed(3)}ms/개`);

console.log('\n' + '='.repeat(50));
console.log('✅ 모든 테스트 완료!'); 