const NicknameGenerator = require('./src/index');

console.log('🎮 auto-nickname-js 실제 사용 예제');
console.log('='.repeat(50));

// 1. 기본 사용법
const generator = new NicknameGenerator();

console.log('\n📝 기본 닉네임 생성:');
console.log(`한국어: ${generator.generateNickname('korean')}`);
console.log(`일본어: ${generator.generateNickname('japanese')}`);
console.log(`중국어: ${generator.generateNickname('chinese')}`);
console.log(`랜덤: ${generator.generateNickname()}`);

// 2. 게임 닉네임 생성
console.log('\n🎯 게임용 닉네임 5개:');
const gameNicknames = generator.generateMultipleNicknames(5, 'korean');
gameNicknames.forEach((nick, i) => {
  console.log(`  ${i+1}. ${nick}`);
});

// 3. 다양한 언어 닉네임
console.log('\n🌍 다국어 닉네임 모음:');
const languages = [
  { name: '한국어', code: 'korean' },
  { name: '일본어', code: 'japanese' },
  { name: '중국어', code: 'chinese' }
];

languages.forEach(lang => {
  const nicknames = generator.generateMultipleNicknames(3, lang.code);
  console.log(`\n${lang.name}:`);
  nicknames.forEach((nick, i) => {
    console.log(`  ${i+1}. ${nick}`);
  });
});

// 4. 랜덤 닉네임 대량 생성
console.log('\n🎲 랜덤 언어 닉네임 10개:');
const randomNicknames = generator.generateMultipleNicknames(10);
randomNicknames.forEach((nick, i) => {
  console.log(`  ${i+1}. ${nick}`);
});

// 5. 언어별 통계 정보
console.log('\n📊 사용 가능한 단어 통계:');
const stats = generator.getLanguageInfo();
Object.entries(stats).forEach(([lang, data]) => {
  const total = data.adjectives + data.nouns;
  console.log(`  ${lang}: 형용사 ${data.adjectives}개 + 명사 ${data.nouns}개 = 총 ${total}개`);
});

console.log('\n' + '='.repeat(50));
console.log('✨ 실제 사용 예제 완료!'); 