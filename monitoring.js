// monitoring.js
const { test } = require('@playwright/test');
const { generateReport } = require('./report-generator'); // report-generator 모듈 가져오기

const testResults = []; // 테스트 결과를 저장할 배열

test.beforeEach(async ({ page }) => {
    // ... (기존 코드) ...
    page.on('response', response => {
        console.log(`${response.status()} ${response.url()}`);
    });
});

test.afterEach(async ({ testInfo }) => {
    testResults.push({
        status: testInfo.status,
        duration: testInfo.duration,
        title: testInfo.title,
    });
});

test.afterAll(async () => {
    await generateReport(testResults); // 테스트 후 보고서 생성
});

// ... (테스트 코드) ...