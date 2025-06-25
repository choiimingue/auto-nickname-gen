const express = require('express');
const NicknameGenerator = require('./src/index');

const app = express();
const port = 3000;

// JSON 파싱 미들웨어
app.use(express.json());

// 정적 파일 서빙
app.use(express.static('.'));

// 닉네임 생성기 인스턴스
const generator = new NicknameGenerator();

// CORS 설정
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// 기본 라우트
app.get('/', (req, res) => {
    res.json({
        message: 'Auto Nickname Generator API',
        version: '1.0.0',
        endpoints: {
            '/api/nickname': '단일 닉네임 생성',
            '/api/nicknames': '다중 닉네임 생성',
            '/api/stats': '언어별 통계',
            '/web-demo.html': '웹 데모 페이지'
        }
    });
});

// 단일 닉네임 생성 API
app.get('/api/nickname', (req, res) => {
    try {
        const language = req.query.language || 'random';
        const nickname = generator.generateNickname(language);
        
        res.json({
            success: true,
            nickname: nickname,
            language: language,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 다중 닉네임 생성 API
app.get('/api/nicknames', (req, res) => {
    try {
        const language = req.query.language || 'random';
        const count = parseInt(req.query.count) || 5;
        
        // 개수 제한 (1-50개)
        const safeCount = Math.min(Math.max(count, 1), 50);
        
        const nicknames = generator.generateMultipleNicknames(safeCount, language);
        
        res.json({
            success: true,
            nicknames: nicknames,
            count: safeCount,
            language: language,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 언어별 통계 API
app.get('/api/stats', (req, res) => {
    try {
        const stats = generator.getLanguageInfo();
        
        res.json({
            success: true,
            stats: stats,
            total: {
                korean: stats.korean.adjectives + stats.korean.nouns,
                japanese: stats.japanese.adjectives + stats.japanese.nouns,
                chinese: stats.chinese.adjectives + stats.chinese.nouns
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// POST 요청으로 닉네임 생성
app.post('/api/generate', (req, res) => {
    try {
        const { language = 'random', count = 1 } = req.body;
        const safeCount = Math.min(Math.max(parseInt(count), 1), 50);
        
        let result;
        if (safeCount === 1) {
            result = generator.generateNickname(language);
        } else {
            result = generator.generateMultipleNicknames(safeCount, language);
        }
        
        res.json({
            success: true,
            result: result,
            count: safeCount,
            language: language,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`🚀 Auto Nickname Generator 서버가 포트 ${port}에서 실행 중입니다!`);
    console.log(`📱 웹 데모: http://localhost:${port}/web-demo.html`);
    console.log(`🔗 API 문서: http://localhost:${port}/`);
    console.log('');
    console.log('📋 사용 가능한 API 엔드포인트:');
    console.log(`  GET  /api/nickname?language=korean`);
    console.log(`  GET  /api/nicknames?language=japanese&count=10`);
    console.log(`  GET  /api/stats`);
    console.log(`  POST /api/generate`);
    console.log('');
    console.log('💡 예시:');
    console.log(`  curl http://localhost:${port}/api/nickname?language=korean`);
    console.log(`  curl http://localhost:${port}/api/nicknames?count=5&language=random`);
}); 