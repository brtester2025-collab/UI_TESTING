const { makeTokenService } = require('./tokenservice')

const jwt = require('jsonwebtoken')
const crypto = require('crypto')


jest.mock('jsonwebtoken')
jest.mock('crypto')

describe('MakeToken service', () => {
    const jwtSecret = 'test-secret';
    const jwtExpiresIn = '1h';

    let tokenService;

    beforeEach(() => {
        tokenService = makeTokenService({ jwtSecret, jwtExpiresIn })
        jest.clearAllMocks();
    })


    describe('Generate Token Access', () => {
        test('Checking the user sign-in', () => {
            jwt.sign.mockReturnValue('mock-secret')
            const token = tokenService.generateAccessToken({ userId: 'T1' })

            expect(jwt.sign).toHaveBeenCalledWith(
                { userId: 'T1' },
                jwtSecret,
                {
                    expiresIn: jwtExpiresIn
                }
            )
            expect(token).toBe('mock-secret')
        })

        test('Checking the user with additional information', () => {
            jwt.sign.mockReturnValue('mock-secret')

            const token = tokenService.generateAccessToken({
                userId: 'T1',
                username: 'tester',
                email: 'test@email.com'
            })

            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    userId: 'T1',
                    username: 'tester',
                    email: 'test@email.com'
                }, jwtSecret,
                {
                    expiresIn: jwtExpiresIn
                }
            )
        })



    })


    describe('GetRefresh token', () => {

        test('to check the cases for Refresh token', () => {
            const mockToken = Buffer.from('a'.repeat(64))
            crypto.randomBytes.mockReturnValue(mockToken)

            const token = tokenService.generateRefreshToken()

            expect(crypto.randomBytes).toHaveBeenCalledWith(64)
            expect(typeof token).toBe('string')
            expect(token.length).toBeGreaterThan(0)

        })
    })

    describe('Verify Access token', () => {

        test('verifying token', () => {
            const mockPayload = { userId: 't1', twi: '123', exp: '456' }
            jwt.verify.mockReturnValue(mockPayload)

            const result = tokenService.verifyAccessToken('test-id')

            expect(jwt.verify).toHaveBeenCalledWith('test-id', jwtSecret)
            expect(result.valid).toBe(true)
            expect(result.payload).toEqual(mockPayload)
        })

        test('verifying the token ID requirement', () => {
            expect(() => {
                tokenService.verifyAccessToken(null)
            }).toThrow('Token is required')

        })

        test('verification of expired token', () => {
            const ExpiredError = new Error('jwt-expired')
            ExpiredError.name = 'TokenExpiredError'
            jwt.verify.mockImplementation(() => {
                throw ExpiredError
            })

            const result = tokenService.verifyAccessToken('expired-token')

            expect(result.valid).toBe(false)
            expect(result.error).toBe('TOKEN_EXPIRED')
        })


        test('verification of web Token', () => {
            const ExpiredError = new Error('WebToken Expired')
            ExpiredError.name = 'JsonWebTokenError'
            jwt.verify.mockImplementation(() => {
                throw ExpiredError
            })
            const result = tokenService.verifyAccessToken('expired-token')
            expect(result.valid).toBe(false)
            expect(result.error).toBe('TOKEN_INVALID')
        })

    })

})


