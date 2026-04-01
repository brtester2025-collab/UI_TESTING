const { testing } = require('./q5')

describe("OTP VERIFICTAION", () => {
    test('if otp verification successed', () => {
        const result = testing(12345, 20)
        expect(result).toBe(true)


    });

    test(' if the verification dont matches', () => {
        const result = testing(1234567, 20)
        expect(result).toBe(true)
    })
})