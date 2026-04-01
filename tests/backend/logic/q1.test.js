const { testing } = require('./q1')

describe('testing function', () => {

    describe('Cart Discount', () => {

        test("if cart value is greater than 1000 user get discount", () => {
            const result = testing(1500, false, null);
            expect(result).toBe(10)
        })

        test('to check if cart value less than 1000 user get no discount', () => {
            const result = testing(1000, false, null);
            expect(result).toBe(0)
        })

        test('to check if cart is empty user get no discount', () => {
            const result = testing(1001, false, null);
            expect(result).toBe(10)
        })

        test('to check the Maximum discount', () => {
            const result = testing(2000, true, "SAVE20")
            expect(result).toBe(35)
        })

        test('to check the Minimum discount', () => {
            const result = testing(1000, true, null)
            expect(result).toBe(5)
        })

        test('if value are empty ', () => {
            const result = testing(undefined, null, null)
            expect(result).toBe(0)
        })


        test('if Premium discount is available', () => {
            const result = testing(undefined, true, null)
            expect(result).toBe(5)
        })

        test('if coupon code matches', () => {
            const result = testing(undefined, false, 'SAVE20')
            expect(result).toBe(20)
        })
        test('if coupon code not matches', () => {
            const result = testing(undefined, false, 'ZXR')
            expect(result).toBe(0)
        })
    })




})