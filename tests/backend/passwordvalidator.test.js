const { validatePassword, checkPasswordStrength } = require('./passwordvalidator')

describe("password validator", () => {

    describe('Validate password checkers', () => {
        test('check the password', () => {
            const result = validatePassword('SecurePass123!')

            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        })

        test('password cannot be empty', () => {
            const result = validatePassword("")

            expect(result.valid).toBe(false)
            expect(result.errors).toContain("Password is required")
        })

        test('password to check for the empty states', () => {
            const result = validatePassword(null)

            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Password is required')
        })

        test('password to check for the empty states', () => {
            const result = validatePassword(undefined)
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Password is required')
        })

        test('password more than 8 character', () => {
            const result = validatePassword("1234")
            expect(result.valid).toBe(false)
            expect(result.errors).toContain("Password must be at least 8 characters")
        })

        test('password for too long', () => {
            const longPassword = "A".repeat(129) + 'a1';
            const result = validatePassword(longPassword)
            expect(result.errors).toContain("Password must be less than 128 characters")
        })


        test('checking the alphabet uppercase letter', () => {
            const result = validatePassword('hello123!')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain("Password must contain at least one uppercase letter");

        })


        test('checking for lowercase', () => {
            const result = validatePassword('HELLO123!')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain("Password must contain at least one lowercase letter");
        })

        test('check for one number', () => {
            const result = validatePassword('HELLo!')
            expect(result.errors).toContain('Password must contain at least one number')

        })

        test('check for special character', () => {
            const result = validatePassword('Hello123')
            expect(result.errors).toContain("Password must contain at least one special character")
        })

        test('to check the multiple validation', () => {
            const result = validatePassword("weak")

            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Password must contain at least one special character')
            expect(result.errors).toContain('Password must contain at least one number')
            expect(result.errors).toContain("Password must contain at least one uppercase letter");
        })
    });


    describe("Password strength Checker", () => {

        test("password is strength empty", () => {
            const result = checkPasswordStrength('')
            expect(result.score).toBe(0)
            expect(result.strength).toBe('none')
        })

        test('check for the case', () => {
            const result = checkPasswordStrength('ab')
            expect(result.score).toBeLessThan(2)
            expect(result.strength).toBe('weak')
        })

        test('check for medium', () => {
            const result = checkPasswordStrength('Abcdefgh')
            expect(result.score).toBeGreaterThan(2)
            expect(result.score).toBeLessThanOrEqual(4)
            expect(result.strength).toBe('medium')
        })

        test('check for strong', () => {
            const result = checkPasswordStrength('Abcdefgh123@')
            expect(result.score).toBeGreaterThan(4)
            expect(result.score).toBeLessThanOrEqual(6)
            expect(result.strength).toBe('strong')
        })

        test('check for very strong', () => {
            const result = checkPasswordStrength('Va132Abcdefgh1@$')
            expect(result.score).toBeGreaterThan(6)
            expect(result.strength).toBe('very strong')
        })
    })
})