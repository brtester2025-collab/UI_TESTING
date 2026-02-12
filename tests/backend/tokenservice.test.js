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
    })

})


