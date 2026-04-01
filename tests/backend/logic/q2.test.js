const { testing } = require('./q2')

describe('Login lock logic', () => {

    describe('fail attempt logic', () => {

        test('failed attempt if user fails 3 times', () => {
            const result = testing(3, null)
            expect(result).toBe(true)
        })

        test('if the user attempts more than 3 times', () => {
            const result = testing(4, null)
            expect(result).toBe(true)
        })

        test('if the user attempts less than 2 times', () => {
            const result = testing(2, null)
            expect(result).toBe(false)
        })

        test('if the user is admin the fail attempt list', () => {
            const result = testing(1, true)
            expect(result).toBe(false)
        })

        test('if the user is admin and limit is above 3', () => {
            const result = testing(4, true)
            expect(result).toBe(false)
        })

        test('if the admin attempts is 5', () => {
            const result = testing(5, true)
            expect(result).toBe(true)
        })

        test('if the admin  attempt the negative values', () => {
            const result = testing(-1, true)
            expect(result).toBe(false)
        })


    })

});