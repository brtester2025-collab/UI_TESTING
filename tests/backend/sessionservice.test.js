const { makeSessionService } = require('./sessionservice')

describe('session service', () => {


    let sessionService;
    let sessionRepo;

    beforeEach(() => {
        sessionRepo = {
            create: jest.fn(),
            findById: jest.fn(),
            findByUserId: jest.fn(),
            update: jest.fn()
        }

        sessionService = makeSessionService({ sessionRepo })
        jest.clearAllMocks();
    })

    describe('Create session', () => {
        test('Check the  create service', async () => {
            sessionRepo.create.mockImplementation((session) =>
                Promise.resolve(session)
            )


            const result = await sessionService.createSession({
                userId: 'u1',
                userAgent: 'Chrome',
                ipAddress: '192.168.1.1'
            });

            expect(sessionRepo.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    userId: 'u1',
                    userAgent: 'Chrome',
                    ipAddress: '192.168.1.1',
                    isActive: true,
                }))
            expect(result.id).toMatch(/^sess/)



        })
    })

})