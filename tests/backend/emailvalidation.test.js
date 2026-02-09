const { validateEmail } = require('./emailvalidation')

describe('Email Validation', () => {

    describe('function validateEmail', () => {


        test('Valid email', () => {
            const result = validateEmail('test123@gmail.com');
            expect(result.valid).toBe(true)
            expect(result.errors).toHaveLength(0)
        })


        test('email required', () => {
            const result = validateEmail('')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Email is required')
        })

        test('email required for null', () => {
            const result = validateEmail(null)
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Email is required')

        })

        test('email required for undefined', () => {
            const result = validateEmail(undefined)
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Email is required')
        })



    })
})