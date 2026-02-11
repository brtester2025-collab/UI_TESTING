const { makeUserService } = require('./userservice')

describe('Make User service', () => {

    let userRepo
    let userService

    beforeEach(() => {
        userRepo = {
            findByEmail: jest.fn(),
            findById: jest.fn(),
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

            //creating the fake database for testing

            userRepo.findByEmail.mockResolvedValue(null)
            userRepo.create.mockResolvedValue({
                id: 'u1',
                name: 'johnathan',
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

        test('check for the name is empty', async () => {
            await expect(userService.createUser({ email: 'john@example.com' }))
                .rejects.toMatchObject({
                    message: 'Name and email are required',
                    status: 400
                })

            expect(userRepo.create).not.toHaveBeenCalled()
        })

        test('check for the email is empty', async () => {
            await expect(userService.createUser({ name: 'john' }))
                .rejects.toMatchObject({
                    message: 'Name and email are required',
                    status: 400
                })

            expect(userRepo.create).not.toHaveBeenCalled()
        })

        test('check for user id already exists', async () => {
            userRepo.findByEmail.mockResolvedValue({ id: 'existing' })
            await expect(userService.createUser({ name: 'john', email: 'john@example.com' }))
                .rejects.toMatchObject({
                    message: 'User already exists',
                    status: 409
                })
            expect(userRepo.create).not.toHaveBeenCalled()
        })
    })

    describe('GetUser By id', () => {
        test('check the user id', async () => {

            // creating the fake user DataBase
            userRepo.findById.mockResolvedValue(null)
            userRepo.findById.mockResolvedValue({
                id: 'u1',
                name: 'test',
                email: 'test@gmail.com'
            })
            const result = await userService.getUserById('u1')
            expect(userRepo.findById).toHaveBeenCalledWith('u1')
            expect(result.name).toBe('test')
        })

        test('check the user with blank id', async () => {
            await expect(userService.getUserById())
                .rejects.toMatchObject({
                    message: 'User ID is required',
                    status: 400
                })
            expect(userRepo.findById).not.toHaveBeenCalled()
        })

        test('check the user id is not found', async () => {
            await expect(userService.getUserById('u99'))
                .rejects.toMatchObject({
                    message: ''
                })
        })
    })



})

