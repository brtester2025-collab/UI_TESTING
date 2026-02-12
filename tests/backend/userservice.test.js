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
            await expect(userService.getUserById('u1'))
                .rejects.toMatchObject({
                    message: 'User not found',
                    status: 404
                })

        })
    })


    describe('Update user', () => {

        test('checking the existing user', async () => {
            userRepo.findById.mockResolvedValue({
                id: 't1',
                name: 'john'
            })
            userRepo.update.mockResolvedValue({
                id: 't1',
                name: 'tester'
            })

            const result = await userService.updateUser('t1', { name: 'tester' })
            expect(userRepo.update).toHaveBeenCalledWith('t1', { name: 'tester' })
            expect(result.name).toBe('tester')
        })

        test('checking if user id is not present', async () => {
            await expect(userService.updateUser(null, { name: 'test' }))
                .rejects.toMatchObject({
                    message: 'User ID is required',
                    status: 400
                })
        })

        test('checking the user is not found', async () => {
            await expect(userService.updateUser('t1', { name: '' }))
                .rejects.toMatchObject({
                    message: 'User not found',
                    status: 404
                })
        })

        test('user without any input field', async () => {
            await expect(userService.updateUser(null, { invalid: 'field' }))
                .rejects.toMatchObject({
                    status: 400
                })
        })

        test('user without any invalid id and name', async () => {
            await expect(userService.updateUser('', { name: "" }))
                .rejects.toMatchObject({
                    status: 400
                })
        })
    })


    describe("Delete the user ", () => {
        test('Checking the existing user', async () => {
            userRepo.findById.mockResolvedValue({
                id: 't1',
            })
            userRepo.delete.mockResolvedValue(true)
            const result = await userService.deleteUser('t1')

            expect(userRepo.delete).toHaveBeenCalledWith('t1')
            expect(result.success).toBe(true)
        })

        test('Checking the user id not found', async () => {
            await expect(userService.deleteUser())
                .rejects.toMatchObject({
                    message: "User ID is required",
                    status: 400
                })
        })

        test('Checking the user is not found', async () => {
            userRepo.findById.mockResolvedValue(null)
            await expect(userService.deleteUser('u999'))
                .rejects.toMatchObject({
                    message: 'User not found',
                    status: 404
                })
            expect(userRepo.delete).not.toHaveBeenCalled()
        })
    })



    describe('List user', () => {

        test('To check the number of users in the DB', async () => {
            userRepo.findAll.mockResolvedValue([
                {
                    id: 'u1',
                    name: 'john'
                },
                {
                    id: 'u2',
                    name: 'test'
                }
            ])
            userRepo.count.mockResolvedValue(25);
            const result = await userService.listUsers({ page: 1, limit: 10 })
            expect(userRepo.findAll).toHaveBeenCalledWith({
                offset: 0,
                limit: 10,
                filters: {}
            })
            expect(result.users).toHaveLength(2);
            expect(result.pagination).toEqual({
                imit: 10,
                total: 25,
                totalPages: 3,

            })
        })

    })
})

