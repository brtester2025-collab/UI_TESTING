const { makeRateLimiter } = require('./ratelimiter.js')

describe('RateLimiter-Testing', () => {
    let ratelimiter

    beforeEach(() => {
        ratelimiter = makeRateLimiter({ maxAttempts: 3, windowMs: 3000 })
    })


    describe('Check', () => {
        test('To check for the records', () => {
            const result = ratelimiter.check('user1')
            expect(result.allowed).toBe(true)
            expect(result.remaining).toBe(2)
        })

        test('Allow attempt within the limit', () => {
            ratelimiter.record('user1')
            ratelimiter.record('user1')
            const result = ratelimiter.check('user1')

            expect(result.allowed).toBe(true)
            expect(result.remaining).toBe(0)
        })


        test('block after the max attempt', () => {
            ratelimiter.record('user1')
            ratelimiter.record('user1')
            ratelimiter.record('user1')

            const result = ratelimiter.check('user1')

            expect(result.allowed).toBe(false)
            expect(result.remaining).toBe(0)
            expect(result.retryAfter).toBeGreaterThan(-1)
        })


    })

})