const { makeRateLimiter } = require('./ratelimiter.js')

describe('RateLimiter-Testing', () => {
    let ratelimiter

    beforeEach(() => {
        ratelimiter = makeRateLimiter({ maxAttempts: 3, windowMs: 1000 })
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

        test('different keys for independent user', () => {
            ratelimiter.record('user1')
            ratelimiter.record('user1')
            ratelimiter.record('user1')

            const result1 = ratelimiter.check('user1')
            const result2 = ratelimiter.check('user2')

            expect(result1.allowed).toBe(false)
            expect(result2.allowed).toBe(true)

        })
        test('after checking all the details', async () => {

            ratelimiter.record('user1')
            ratelimiter.record('user1')
            ratelimiter.record('user1')

            await new Promise((resolve) => setTimeout(resolve, 1100))
            const result = ratelimiter.check('user1')
            expect(result.allowed).toBe(true)

        })
    })

})