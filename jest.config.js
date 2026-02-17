module.exports = {
    testMatch: ['**/tests/**/*.test.js'],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './jest-report',
                filename: 'index.html',
                expand: true,
            },
        ],
    ],
    // only unit folder
};
