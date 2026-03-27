const { calculateShippingCost } = require('./cal')

describe("calculateShipping cost", () => {

    describe("Normalized user Type", () => {
        test('for checking the valid input', () => {
            const value = calculateShippingCost('Regular', 0, false)
            const value2 = calculateShippingCost('regular', " ", false)
            expect(value).toBe(0)
            expect(value2).toBe(0)
        })


        test('Free shipping (only domestic)', () => {
            const value = calculateShippingCost('Regular', 3000, false)
            expect(value).toBe(0)
        })



        test('for domestic shipping type regular 1', () => {
            const value = calculateShippingCost('Regular', 300, false)
            expect(value).toBe(50)

        })
        test('for domestic shipping type regular 2', () => {
            const value = calculateShippingCost('Regular', 600, false)
            expect(value).toBe(30)

        })
        test('for domestic shipping type regular 3', () => {
            const value = calculateShippingCost('Regular', 500, false)
            expect(value).toBe(50)

        })
        test('for domestic shipping type Premium 1', () => {
            const value = calculateShippingCost('Premium', 500, false)
            expect(value).toBe(20)

        })

        test('for domestic shipping type Premium 2', () => {
            const value = calculateShippingCost('Premium', 2000, false)
            expect(value).toBe(0)

        })

        test('for domestic shipping type Premium 3', () => {
            const value = calculateShippingCost('Premium', 1000, false)
            expect(value).toBe(20)

        })


        test('International shipping', () => {
            const cost = 200;
            const result = calculateShippingCost('', 2000, true)
            expect(total).toBe(300)

            const result2 = calculateShippingCost('', 4000, true)
            expect(total).toBe(total)
        })

    })

})