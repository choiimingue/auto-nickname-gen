const fs = require('fs');
const path = require('path');

function loadWordList(filename) {
  const filePath = path.join(__dirname, 'data', filename);
  return fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}

class NicknameGenerator {
  constructor() {
    this.koreanAdjectives = loadWordList('korean_adjectives.txt');
    this.koreanNouns = loadWordList('korean_nouns.txt');
    this.japaneseAdjectives = loadWordList('japanese_adjectives.txt');
    this.japaneseNouns = loadWordList('japanese_nouns.txt');
    this.chineseAdjectives = loadWordList('chinese_adjectives.txt');
    this.chineseNouns = loadWordList('chinese_nouns.txt');
  }

  generateRandomNumber(digits = 7) {
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
    return `${this.pick(adjectives)} ${this.pick(nouns)} ${this.generateRandomNumber(7)}`;
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