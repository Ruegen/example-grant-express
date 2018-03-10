const fetch = require('isomorphic-fetch')

it('should fetch user data', async () => {
    const url = 'http://localhost:3000/' //?
    const response = await fetch(url) //?
    const data = await response.json()
    expect(data).toEqual({
        hello: "world"
    })
})

it('should fetch one user with status 200', async () => {
    const url = 'http://localhost:3000/users/1'
    const response = await fetch(url) //?
    response //?
    const user = await response.json() //?
    user //?
    expect(user).toEqual({first_name: 'Ruegen'}) //?
    expect(response.status).toEqual(200)
})

it('should get all users with status 200', async () => {
    const url = 'http://localhost:3000/users'
    const response = await fetch(url) //?
    const users = await response.json() //?
    expect(response.status).toEqual(200)
    expect(users).toEqual([{
        first_name: 'Ruegen'
    }])
})