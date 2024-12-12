// report-generator.js
const fs = require('node:fs/promises');

const calculateAverage = (numbers) => {
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

const calculatePercentile = (numbers, percentile) => {
    if (numbers.length === 0) return 0;
    numbers.sort((a, b) => a - b);
    const index = (percentile / 100) * (numbers.length - 1);
    return numbers[Math.floor(index)];
};

const generateReport = async (results) => {
    const report = {
        summary: {
            total: results.length,
            passed: results.filter(r => r.status === 'passed').length,
            failed: results.filter(r => r.status === 'failed').length,
        },
        performance: {
            avgResponseTime: calculateAverage(results.map(r => r.duration)),
            p95ResponseTime: calculatePercentile(results.map(r => r.duration), 95),
        },
    };

    try {
        await fs.writeFile('report.json', JSON.stringify(report, null, 2));
        console.log('Report generated successfully!');
    } catch (error) {
        console.error('Error generating report:', error);
    }
};

module.exports = { generateReport }; // 모듈로 내보내기