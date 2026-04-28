const { json } = require('node:stream/consumers')
const { fetchUserData } = require('./j1')

beforeEach(() => {
    global.fetch = jest.fn()
})

afterEach(() => {
    jest.resetAllMocks()
})


describe('Test case', () => {
    test('for the success', async () => {
        const mockUser = { id: 1, name: 'test' }
        global.fetch.mockResolvedValue(
            {
                ok: true,
                json: jest.fn().mockResolvedValue(mockUser)
            }

        )
        const result = await fetchUserData(1)
        expect(result).toEqual(mockUser)

        expect(fetch).toHaveBeenCalledWith(`https://api.example.com/users/1`)

    })


    test('for the error cases', async () => {
        const mockUser = { id: 1, name: '' }
        global.fetch.mockResolvedValue(
            {
                ok: false,
                json: jest.fn()
            }
        )
        await expect(fetchUserData(1)).rejects.toThrow('User not found')
    })
})

