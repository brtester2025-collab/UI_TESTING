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
            const mocktoken = Buffer.from('a'.repeat(64))
            crypto.randomBytes.mockReturnValue(mocktoken)

            const token = tokenService.generateRefreshToken()

            expect(crypto.randomBytes).toHaveBeenCalledWith(64)
            expect(typeof token).toBe('string')
            expect(token.length).toBeGreaterThan(0)

        })
    })

})


