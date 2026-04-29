const { fetchUserData } = require('./j1')

beforeEach(() => {
    global.fetch = jest.fn()
})
afterEach(() => {
    jest.resetAllMocks()
})
describe('Test cases for API TESTING', () => {
    test('for successful login', async () => {
        const mockUser = { id: 1, name: "tester" }
        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockUser)
        })
        const result = await fetchUserData(1)
        expect(result).toEqual({ id: 1, name: 'tester' })
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1')
    })
    test('for the failed status', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
        })
        // expect(result).rejects.toThrow('User not found')
        try {
            const result = await fetchUserData()
        } catch (err) {
            expect(err.message).toBe('User not found')
        }

    })
    test('for the Network failure status', async () => {
        global.fetch.mockRejectedValue(new Error('NETWORK ERROR'))
        await expect(fetchUserData(1)).rejects.toThrow()
    })
    test('for the multiple user status', async () => {
        global.fetch.mockRejectedValue(new Error(''))

        await expect(fetchUserData()).rejects.toThrow()
    })

})