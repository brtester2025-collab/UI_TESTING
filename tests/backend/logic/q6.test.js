const { testing } = require('./q6')


describe.skip('Estimation Damage and days', () => {

    test('no of days', () => {
        const result = testing(7, true)
        expect(result).toBe(true)

    });

    test('no of days less than 7', () => {
        const result = testing(6, true)
        expect(result).toBe(true)

    });

    test('no of days above 7', () => {
        const result = testing(8, null)
        expect(result).toBe(false)
    })

    test('no of days is -1', () => {
        const result = testing(-1, true)
        expect(result).toBe(false)
    })

    test('no of days is undefined', () => {
        const result = testing(undefined, true)
        expect(result).toBe(false)
    })

    test('no of days is empty', () => {
        const result = testing(' ', true)
        expect(result).toBe(false)
    })

    test('no of days is decimal', () => {
        const result = testing(1.4, true)
        expect(result).toBe(false)
    })

    test('no of days is null', () => {
        const result = testing(null, true)
        expect(result).toBe(false)
    })
    test('is Damaged is true', () => {
        const result = testing(8, false)
        expect(result).toBe(false)
    })

    test('isDamaged is false', () => {
        const result = testing(8, null)
        expect(result).toBe(false)
    })
    test('no of days less than 7 and isDamaged is false', () => {
        const result = testing(6, false)
        expect(result).toBe(true)

    });

});