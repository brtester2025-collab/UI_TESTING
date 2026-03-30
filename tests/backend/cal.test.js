const { calculateShippingCost } = require('./cal')

describe("calculateShipping cost", () => {

    describe("Normalized user Type", () => {

        describe("Invalid validation", () => {
            test('for checking the valid input', () => {
                const value = calculateShippingCost('Regular', 0, false)
                const value2 = calculateShippingCost('regular', " ", false)
                expect(value).toBe(0)
                expect(value2).toBe(0)
            })

        })

        describe('Free shipping', () => {
            test('Free shipping (only domestic)', () => {
                const value = calculateShippingCost('Regular', 3000, false)
                expect(value).toBe(0)
            })
        })


        describe('Domestic Shipping', () => {
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


        })


        describe("International Shipping discount", () => {
            test('International shipping', () => {
                expect(calculateShippingCost('Premium', 5000, true)).toBe(270)

            })
            test('Regular User should not have Premium Discount', () => {
                expect(calculateShippingCost('Regular', 5000, true)).toBe(300)
            })
            test('Unknown user type', () => {
                expect(calculateShippingCost('VIP', 4000, true)).toBe(300)

            })
        })
    })

})