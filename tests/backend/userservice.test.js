const { makeUserService } = require('./userservice')

describe('Make User service', () => {

    let userRepo
    let userService

    beforeEach(() => {
        userRepo = {
            findByEmail: jest.fn(),
            findByRole: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn()



        }

        userService = makeUserService({ userRepo })
        jest.clearAllMocks()
    })

    describe('create user', () => {

        test('user created successfully', async () => {

            userRepo.findByEmail.mockResolvedValue(null)
            userRepo.create.mockResolvedValue({
                id: 'u1',
                name: 'john',
                email: 'john@example.com',
                role: 'user',
            })


            const result = await userService.createUser({
                name: 'john',
                email: 'john@example.com'

            })

            expect(userRepo.findByEmail).toHaveBeenCalledWith('john@example.com')
            expect(userRepo.create).toHaveBeenCalledWith({
                name: 'john',
                email: 'john@example.com',
                role: 'user',
                createdAt: expect.any(Date)
            })
            expect(result.id).toBe('u1')

        })
    })



})

