const { validateEmail, extractDomain } = require('./emailvalidation')

describe('Email Validation', () => {

    describe('function validateEmail', () => {


        test('Valid email', () => {
            const result = validateEmail('test123@gmail.com');
            expect(result.valid).toBe(true)
            expect(result.errors).toHaveLength(0)
            expect(result.normalized).toBe('test123@gmail.com')
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


        test('checking for email type', () => {
            const result = validateEmail(12334)
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Email must be a string')
        })

        test('checking for lowerCase', () => {
            const result = validateEmail('USER123@GMAIL.COM')
            expect(result.valid).toBe(true)
            expect(result.normalized).toBe('user123@gmail.com')
        })

        test('checking for empty space', () => {
            const result = validateEmail(" user123@gmail.com ")
            expect(result.valid).toBe(true)
            expect(result.normalized).toBe('user123@gmail.com')
        })

        test('checking for invalid email', () => {
            const result = validateEmail('user123@.com')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Invalid email format')
        })

        test('checking for invalid email 2', () => {
            const result = validateEmail('user@')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Invalid email format')

        })

        test('checking for invalid email 3', () => {
            const result = validateEmail('user @mail.com')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Invalid email format')
        })

        test('email with fake id s', () => {
            const result = validateEmail('user@tempmail.com')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Disposable email addresses are not allowed')
        })

        test('email with fake id s 2', () => {
            const result = validateEmail('user@throwaway.com')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Disposable email addresses are not allowed')
        })

        test('email with fake id s 3', () => {
            const result = validateEmail('user@fakeemail.com')
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Disposable email addresses are not allowed')
        })

        test(' Long email character length', () => {
            const longEmail = 'a'.repeat(254) + '@mail.com'
            const result = validateEmail(longEmail)
            expect(result.valid).toBe(false)
            expect(result.errors).toContain('Email must be less than 254 characters')
        })

    })



    describe('Extract Domain', () => {

        test('email extract domain from it', () => {
            const domain = extractDomain('user@example.com')
            expect(domain).toBe('example.com')
        })

        test('email extract domain from it', () => {
            const domain = extractDomain(null)
            expect(domain).toBeNull()

        })

        test('email extract domain from it', () => {
            const domain = extractDomain("")
            expect(domain).toBeNull()
        })

        test('email extract domain from it 2', () => {
            const domain = extractDomain('Invalid-email')
            expect(domain).toBeNull()
        })

        test('email extract domain from it 3', () => {
            const domain = extractDomain('user@@@mail.com')
            expect(domain).toBeNull
        })
    })
})