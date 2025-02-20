const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')


// ScooterApp tests here
describe('testing ScooterApp constructor', () => {

    beforeEach(() => {
        scooterApp = new ScooterApp()
    })

    test('object should have stations on initialisation', () => {
        expect(scooterApp.stations).toEqual({
            'Manhattan': [],
            'Brooklyn': [],
            'Queens': [],
            'Bronx': [],
            'StatenIsland': []
        })
    })

    test('new ScooterApp object are added to static property scooterSessions', () => {
        const lenBefore = ScooterApp.scooterSessions.length
        const scooterApp2 = new ScooterApp()
        const lenAfter = lenBefore + 1
        expect(ScooterApp.scooterSessions.length).toBe(lenAfter)
    })
})

describe('testing ScooterApp methods', () => {
    beforeEach(() => {
        user = new User('name', 'pw', 18)
        userYoung = new User('young', 'pw', 17)
        scooter = new Scooter('Manhattan', user)
        scooterPrivate = new Scooter('Queens', userYoung)
        scooterApp = new ScooterApp()
    })

    const toThrowRemoveError = () => {
        scooterApp.RemoveScooter(scooterPrivate)
    }
    // register user
    test('register user when age > 17 and not currently registered', () => {
        expect(scooterApp.register(user)).toBe(1)
    })

    test('does not register if age <= 17', () => {
        expect(scooterApp.register(userYoung)).not.toBe(1)
    })

    test('does not register if user already registered', () => {
        expect(scooterApp.register(user)).toBe(1)
        expect(scooterApp.register(user)).not.toBe(1)
    })

    // login
    test('login fail when user not found in system', () => {
        expect(scooterApp.logIn(userYoung.username, userYoung.password)).not.toBe(1)
    })

    test('login success when user is found in system', () => {
        scooterApp.register(user)
        expect(scooterApp.logIn(user.username, user.password)).toBe(1)
    })

    // add scooter
    test("on success addScooter, the scooter's location is changed and the scooter is listed under that station name", () => {
        scooterApp.addScooter('Brooklyn', scooter)
        expect(scooter.station).toEqual('Brooklyn')
        expect(scooterApp.stations['Brooklyn'].indexOf(scooter)).toBeGreaterThanOrEqual(0)
    })

    test('fail addScooter when location is not a string', () => {
        expect(scooterApp.addScooter(1, scooter)).not.toBe(1)
    })

    test('fail addScooter when not given scooter object', () => {
        expect(scooterApp.addScooter('Manhattan', "not a scooter object")).not.toBe(1)
    })

    // remove scooter
    test('on success RemoveScooter, scooter is removed from the station it was docked at', () => {
        scooterApp.addScooter('Manhattan', scooter)
        expect(scooterApp.RemoveScooter(scooter)).toBe(1)
        expect(scooterApp.stations['Manhattan'].indexOf(scooter)).toBe(-1)
    })

    test('throw error that "Scooter not found" when serial number not located', () => {
        scooterApp.addScooter('Manhattan', scooter)
        expect(toThrowRemoveError).toThrow('Scooter not found')
    })
})

