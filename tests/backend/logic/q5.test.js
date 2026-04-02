const { testing } = require('./q5')

describe("OTP VERIFICATION", () => {
    test('if otp verification success', () => {
        const result = testing(1234, 20)
        expect(result).toBe(true)


    });

    test(' if the otp verification not matches', () => {
        const result = testing(1432, 20)
        expect(result).toBe(false)
    })

    test('if the otp is empty', () => {
        const result = testing(null, 20)
        expect(result).toBe(false)
    })

    test("if the otp is string", () => {
        const result = testing('Sting', 20)
        expect(result).toBe(false)
    })

    test('if the otp is valid and time limit expires', () => {
        const result = testing(1234, 30)
        expect(result).toBe(false)
    })

    test("if the otp is valid and time limit exceeds", () => {
        const result = testing(1234, 31)
        expect(result).toBe(false)
    })
    test('if the otp is valid and time limit is null', () => {
        const result = testing(1234, null)
        expect(result).toBe(false)
    })

    test(' if the otp is null and time is null', () => {
        const result = testing(null, null)
        expect(result).toBe(false)
    })

    test('if the otp is more than 4 digit', () => {
        const result = testing(12345, null)
        expect(result).toBe(false)
    })
})