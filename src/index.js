const fs = require('fs');
const path = require('path');

function loadWordListFromCSV(filename) {
  const filePath = path.join(__dirname, 'data', filename);
  const lines = fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const adjectives = [];
  const nouns = [];
  
  for (const line of lines) {
    if (line.startsWith('Type')) continue; // 헤더 스킵
    const [type, category, word, translation] = line.split(',');
    if (type === 'Adjective') {
      adjectives.push(word);
    } else if (type === 'Noun') {
      nouns.push(word);
    }
  }
  
  return { adjectives, nouns };
}

class NicknameGenerator {
  constructor() {
    // CSV 파일에서 단어 로드
    const korean = loadWordListFromCSV('kr_words.csv');
    const japanese = loadWordListFromCSV('jp_words.csv');
    const chinese = loadWordListFromCSV('tw_words.csv');
    
    // 단어 조합이 10자를 넘지 않도록 필터링
    this.koreanAdjectives = this.filterWordsByLength(korean.adjectives, 5);
    this.koreanNouns = this.filterWordsByLength(korean.nouns, 5);
    this.japaneseAdjectives = this.filterWordsByLength(japanese.adjectives, 5);
    this.japaneseNouns = this.filterWordsByLength(japanese.nouns, 5);
    this.chineseAdjectives = this.filterWordsByLength(chinese.adjectives, 5);
    this.chineseNouns = this.filterWordsByLength(chinese.nouns, 5);
  }

  // 단어 길이를 제한하는 필터 함수
  filterWordsByLength(words, maxLength) {
    return words.filter(word => word.length <= maxLength);
  }

  generateRandomNumber(digits = 10) {
    let num = '';
    for (let i = 0; i < digits; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }

  pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  generateNickname(language = 'random') {
    let adjectives, nouns;
    if (language === 'korean') {
      adjectives = this.koreanAdjectives;
      nouns = this.koreanNouns;
    } else if (language === 'japanese') {
      adjectives = this.japaneseAdjectives;
      nouns = this.japaneseNouns;
    } else if (language === 'chinese') {
      adjectives = this.chineseAdjectives;
      nouns = this.chineseNouns;
    } else {
      const langs = ['korean', 'japanese', 'chinese'];
      return this.generateNickname(this.pick(langs));
    }
    
    const adjective = this.pick(adjectives);
    const noun = this.pick(nouns);
    const randomNum = this.generateRandomNumber(10);
    
    return `${adjective} ${noun} ${randomNum}`;
  }

  generateMultipleNicknames(count = 5, language = 'random') {
    return Array.from({ length: count }, () => this.generateNickname(language));
  }

  getLanguageInfo() {
    return {
      korean: {
        adjectives: this.koreanAdjectives.length,
        nouns: this.koreanNouns.length
      },
      japanese: {
        adjectives: this.japaneseAdjectives.length,
        nouns: this.japaneseNouns.length
      },
      chinese: {
        adjectives: this.chineseAdjectives.length,
        nouns: this.chineseNouns.length
      }
    };
  }
}

module.exports = NicknameGenerator; 