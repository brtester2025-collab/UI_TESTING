const { testing } = require('./q7')

describe('School management system', () => {

    test('check it student got passing marks', () => {
        const result = testing(40, 60)
        expect(result).toBe(false);
    })

    test('check if the student got above passing marks', () => {
        const result = testing(60, null)
        expect(result).toBe(false)

    })

    test('check if the student got less the passing marks', () => {
        const result = testing(39, null)
        expect(result).toBe(false)

    })

    test('check if the student got no marks on sheet', () => {
        const result = testing(null, null)
        expect(result).toBe(false)
    })

    test('check if the student got negative marks', () => {
        const result = testing(-1, null)
        expect(result).toBe(false)
    })

    test('check if the student have attendance above 75', () => {
        const result = testing(null, 75)
        expect(result).toBe(true)
    })

    test('if the attendance is less than 75', () => {
        const result = testing(null, 74)
        expect(result).toBe(false)
    })

    test('if the attendance is null', () => {
        const result = testing(null, null)
        expect(result).toBe(false)

    })
    test('if the attendance is greater than 76', () => {
        const result = testing(null, 76)
        expect(result).toBe(true)
    })

})


