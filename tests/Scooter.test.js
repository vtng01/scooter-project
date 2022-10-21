const Scooter = require('../src/Scooter')
const User = require('../src/User')


//Method tests
describe('scooter methods', () => {
  // tests here!
  beforeEach(() => {
    user = new User('username', 'pw', 18)
    scooter = new Scooter('Manhattan', user)
  })

  const toThrowLowBatteryMessage = () => {
    scooter.charge = 19
    scooter.isBroken = false
    scooter.rent(scooter)
  }

  const toThrowRequestForRepairMessage = () => {
    scooter.isBroken = true
    scooter.charge = 21
    scooter.rent(scooter)
  }

  const toThrowDockError = () => scooter.dock()

// testing the constructor
  test('Serial is between 1 and 1000', () => {
    expect(scooter.serial).toBeGreaterThanOrEqual(1)
    expect(scooter.serial).toBeLessThanOrEqual(1000)
  })

  test('user is set to empty if not given User object', () => {
    const scooter2 = new Scooter('Queens', 'not a scooter')
    expect(scooter2.user).toEqual('')
  })

  test('user is set to empty string if age < 18', () => {
    const user2 = new User('name', 'pw', 0)
    const scooter2 = new Scooter('Manhattan', user2)
    expect(scooter2.user).toEqual('')
  })

  test('user is set when age >= 18', () => {
    expect(scooter.user).not.toBe('')
  })
  //rent method
  test('rent: success when scooter not broken and charge greater than 20', () => {
    scooter.charge = 21
    scooter.isBroken = false
    expect(scooter.rent()).toBe(1)
  })

  test('rent: throw low battery message when charge <= 20', () => {
    expect(toThrowLowBatteryMessage).toThrow('Scooter low on battery, please charge.')
  })

  test('rent: throw request for repair error when broken', () => {
    expect(toThrowRequestForRepairMessage).toThrow('Scooter is broken, please send a repair request.')
  })
  //dock method
  test('dock: throw error if no station provided', () => {
    expect(toThrowDockError).toThrow('Docking station required!')
  })

  test('dock: on success, user set to empty string', () => {
    scooter.dock('station')
    expect(scooter.user.length).toBe(0)
  })

  test('dock: on success, scooter station changed', () => {
    scooter.dock('Manhattan')
    expect(scooter.station).toEqual('Manhattan')
  })

  //distanceLeft method
  test('distanceLeft: calculate the total distance left it can travel', () => {
    scooter.charge = 50
    expect(scooter.distanceLeft()).toBe(16)
  })

  //requestRepair method
  test('requestRepair: on success, scooter is not broken', async () => {
    scooter.isBroken = true
    await scooter.requestRepair()
    expect(scooter.isBroken).toBe(false)
  })

  //recharge method
  test('recharge: on success, charge is 100', async () => {
    scooter.charge = 10
    await scooter.recharge()
    expect(scooter.charge).toBe(100)
  })
})
