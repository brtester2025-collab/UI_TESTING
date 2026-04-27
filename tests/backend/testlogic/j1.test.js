const { fetchUserData } = require('./j1')



beforeEach(() => {
    global.fetch = jest.fn()

})

afterEach(() => {
    jest.resetAllMocks()
})
describe("Fetch the user data", () => {
    test('to check the user get data fetched', async () => {
        const mockUser = { id: 1, name: 'John' }
        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockUser),
        });
        const result = await fetchUserData(1)
        expect(fetch).toHaveBeenCalledWith(`https://api.example.com/users/1`)
        expect(result).toEqual({ id: 1, name: 'John' })
    })
    test('check the dummy data in the api of the user', async () => {
        const mockUser = { id: 2, name: 'test' }

        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockUser)
        })

        const result = await fetchUserData(2)
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/2')

        expect(result).toEqual({ id: 2, name: 'test' })
    })
    test('to check the failure of the api', async () => {

        const mockUser = { id: undefined, name: undefined }

        global.fetch.mockResolvedValue({
            ok: false,
            json: jest.fn()
        })
        await expect(fetchUserData(1)).rejects.toThrow('User not found')
    })
})



/**
 * 
 * 
 * Write a complete Jest test suite that covers:

✅ Successful fetch — resolves with user data
❌ Failed fetch — rejects when response.ok is false
🌐 Network failure — rejects when fetch itself throws
 */