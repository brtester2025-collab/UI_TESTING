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


        test("missing for the unknown field", async () => {
            sessionRepo.create.mockImplementation((session) =>
                Promise.resolve(session))

            await sessionService.createSession({ userId: 'u1' })
            expect(sessionRepo.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    userAgent: 'unknown',
                    ipAddress: 'unknown',
                })
            )
        })



        test('Throw without userId', async () => {
            await expect(sessionService.createSession({})).rejects.toThrow(
                'userId is required'
            )
        })
    })



    describe('Get Session', () => {
        test('To Check the get session status', async () => {
            sessionRepo.findById.mockResolvedValue({
                id: 'sess_121',
                userId: 'u100',
                isActive: true,
                expiresAt: new Date(Date.now() + 100000)
            })
            const result = await sessionService.getSession('sess_121')
            expect(result).not.toBeNull()
            expect(result.id).toBe('sess_121')
        })

        test('if the session is null', async () => {
            sessionRepo.findById.mockResolvedValue(null)

            const result = await sessionService.getSession(null)
            expect(result).toBe(null)


        })

        test('if the sessionID is null', async () => {
            sessionRepo.findByUserId.mockResolvedValue(null)

            const result = await sessionService.getSession('sess_121')
            expect(result).toBeNull()
        })

        test('if the session is inActive', async () => {
            sessionRepo.findById.mockResolvedValue({
                userId: 'user-1',
                expiresAt: Date.now() + 10000,
                isActive: false

            })

            const result = await sessionService.getSession('sess-121')
            expect(result).toBeNull()
        })

        test('return null if the session expired', async () => {

            sessionRepo.findById.mockResolvedValue({
                userId: 'user-1',
                expiresAt: new Date(Date.now() - 10000),
                isActive: true

            })
            const result = await sessionService.getSession('sess-121')
            expect(result).toBeNull()
        })

    })



    describe('invalidate Session', () => {
        test('To check the invalidate session', async () => {
            sessionRepo.update.mockResolvedValue(true)
            const result = await sessionService.invalidateSession('user123');
            expect(sessionRepo.update('sess-123', { isActive: false }))
            expect(result.success).toBe(true)

        })

        test('To check session id is not null', async () => {
            await expect(sessionService.invalidateSession()).rejects.toThrow(
                'sessionId is required'
            )
        })
    })
})