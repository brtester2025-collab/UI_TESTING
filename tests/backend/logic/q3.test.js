const { testing } = require('./q3')

describe('Shipping Amount ', () => {
    test('Should have amount less than 500', () => {
        const value = testing(400)
        expect(value).toBe(50)

    });

    test('should have amount of 499', () => {
        const value = testing(499)
        expect(value).toBe(50)
    })

    test('amount of 500', () => {
        const value = testing(500)
        expect(value).toBe(30)
    })

    test('amount of 501', () => {
        const value = testing(501)
        expect(value).toBe(30)
    })
    test('amount of 1000', () => {
        const value = testing(1000)
        expect(value).toBe(30)
    })
    test('amount of 1001', () => {
        const value = testing(1001)
        expect(value).toBe(0)
    })
    test('amount of 2000', () => {
        const value = testing(2000)
        expect(value).toBe(0)
    })

    test('if amount is negative it should throw error ', () => {
        const value = testing(-1)
        expect(value).toBe(50)
    })

});