const User = require('../src/User')

// User tests here
describe('testing User constructor', () => {
    const name = 'name'
    const password = 'pw'
    const age = 19

    const user = new User(name, password, age)
// test username
test('username set', () => {
    expect(user.username).toEqual(name)
})

// test password
test('password set', () => {
    expect(user.password).toEqual(password)
})
// test age
test('age set', () => {
    expect(user.age).toBe(age)
})
})

