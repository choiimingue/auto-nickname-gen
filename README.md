# auto-nickname-js

랜덤 닉네임 생성기 (한국어, 일본어, 중국어 지원) - CSV 파일 기반, 20자 길이 제한

## 🆕 v1.1.0 새로운 기능

- **CSV 파일 지원**: 구조화된 데이터 관리
- **20자 길이 제한**: 디자이너 요구사항 완벽 준수
- **10자리 난수**: 고유성 보장 (100억 개 조합)
- **708개 단어**: 한국어 206개, 일본어 207개, 중국어 295개
- **다양한 카테고리**: 동물, 음식, 색상, 감정, 음악, 자연, 문화 등

## 설치

```bash
npm install auto-nickname-js
```

## 사용법

```javascript
const NicknameGenerator = require('auto-nickname-js');

const generator = new NicknameGenerator();

// 랜덤 언어로 닉네임 생성 (최대 20자)
console.log(generator.generateNickname());
// 예: "역대급 찜질방 3747922082" (20자)

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

- **한국어 (Korean)**: 206개 단어 (형용사 63개 + 명사 143개)
- **일본어 (Japanese)**: 207개 단어 (형용사 63개 + 명사 144개)
- **중국어 (Chinese)**: 295개 단어 (형용사 98개 + 명사 197개)

## 닉네임 예시

### 한국어
- "역대급 찜질방 3747922082"
- "유머러스한 숲 5388426235"
- "신나는 언니 5469256053"
- "청량한 딸기 0378092764"

### 일본어
- "シックな 橙 9651334419"
- "おかしい 熊 0748299318"
- "夢のような 和聲 3905695287"

### 중국어
- "精緻的 鳳梨 0050348164"
- "動聽的 珍珠奶茶 2759770605"
- "開朗的 太陽餅 6518098426"

## API

### `generateNickname(language = 'random')`
단일 닉네임을 생성합니다. (최대 20자)

**매개변수:**
- `language` (string): 'korean', 'japanese', 'chinese', 'random' 중 하나

**반환값:**
- `string`: 생성된 닉네임 (최대 20자)

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

## 길이 제한

- **단어 조합**: 최대 10자 (형용사 5자 + 명사 5자)
- **난수**: 10자리
- **총 길이**: 최대 20자
- **공백**: 포함

## 데이터 구조

CSV 파일 기반으로 관리됩니다:
- `kr_words.csv`: 한국어 단어
- `jp_words.csv`: 일본어 단어  
- `tw_words.csv`: 중국어 단어

각 파일은 Type, Category, Word, Translation 컬럼으로 구성됩니다.

## 라이선스

MIT 