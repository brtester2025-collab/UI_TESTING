module.exports = {
    testMatch: ['**/tests/backend/**/*.test.js'],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './jest-report',
                filename: 'report.html',
                expand: true,
            },
        ],
    ],
    fullyParallel: true,  // only unit folder
};
