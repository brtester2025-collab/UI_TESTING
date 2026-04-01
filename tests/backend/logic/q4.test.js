const { testing } = require('./q4')

describe('Bonus Increment', () => {

    test('if the experience is 5 years', () => {
        const result = testing(5, null)
        expect(result).toBe(10000)
    })

    test('if the experience is less than 5 years', () => {
        const result = testing(4, null)
        expect(result).toBe(0)
    })

    test('if the experience is less than -1', () => {
        const result = testing(-1, null)
        expect(result).toBe(0)
    })
    test('if the experience is more than 5', () => {
        const result = testing(7, null)
        expect(result).toBe(10000)
    });
    test('if the Rating is A', () => {
        const result = testing(null, 'B')
        expect(result).toBe(0)
    });
    test('if the Rating is A', () => {
        const result = testing(null, 'A')
        expect(result).toBe(5000)
    });
    test('if the Rating and experience are apply together', () => {
        const result = testing(4, 'A')
        expect(result).toBe(5000)

    });

    test('should throw error if the experience and rating is null', () => {
        const result = testing(null, null)
        expect(result).toBe(0)
    })

    test('if  experience is 5 and rating is A', () => {
        const result = testing(5, 'A')
        expect(result).toBe(15000)
    })

    test('if  experience is 5 and rating is B', () => {
        const result = testing(5, 'B')
        expect(result).toBe(10000)
    })

    test('if experience is 0 and rating is C', () => {
        const result = testing(0, 'C')
        expect(result).toBe(0)
    })

});