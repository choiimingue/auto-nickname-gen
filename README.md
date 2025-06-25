# auto-nickname-js

랜덤 닉네임 생성기 (한국어, 일본어, 중국어 지원)

## 설치

```bash
npm install auto-nickname-js
```

## 사용법

```javascript
const NicknameGenerator = require('auto-nickname-js');

const generator = new NicknameGenerator();

// 랜덤 언어로 닉네임 생성
console.log(generator.generateNickname());
// 예: "행복한 고양이 1234567"

// 특정 언어로 닉네임 생성
console.log(generator.generateNickname('korean'));
console.log(generator.generateNickname('japanese'));
console.log(generator.generateNickname('chinese'));

// 여러 개 닉네임 생성
console.log(generator.generateMultipleNicknames(5, 'korean'));

// 언어별 단어 정보 확인
console.log(generator.getLanguageInfo());
```

## 지원 언어

- 한국어 (Korean)
- 일본어 (Japanese)
- 중국어 (Chinese)

## API

### `generateNickname(language = 'random')`
단일 닉네임을 생성합니다.

**매개변수:**
- `language` (string): 'korean', 'japanese', 'chinese', 'random' 중 하나

**반환값:**
- `string`: 생성된 닉네임

### `generateMultipleNicknames(count = 5, language = 'random')`
여러 개의 닉네임을 생성합니다.

**매개변수:**
- `count` (number): 생성할 닉네임 개수
- `language` (string): 언어 설정

**반환값:**
- `Array<string>`: 생성된 닉네임 배열

### `getLanguageInfo()`
각 언어별 단어 개수 정보를 반환합니다.

**반환값:**
- `object`: 언어별 단어 개수 정보

## 라이선스

MIT 