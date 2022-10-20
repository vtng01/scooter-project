const Scooter = require('../src/Scooter')
const User = require('../src/User')


//Method tests
describe('scooter methods', () => {
  // tests here!
  const scooter = new Scooter('Kx', 'person1')
  // const timer = async () => {
  //   await new Promise(resolve => setTimeout(resolve, 2000))
  // }
  const toThrowDockError = () => {
    scooter.dock()
  }

// remove test only later
  test.only('Serial is between 1 and 1000', () => {
    expect(scooter.serial).toBeGreaterThanOrEqual(1)
    expect(scooter.serial).toBeLessThanOrEqual(1000)
  })
  //rent method
  test('rent: success when scooter not broken and charge greater than 20', () => {
    scooter.charge = 21
    scooter.isBroken = false
    expect(scooter.rent()).toBe(1)
  })
  //dock method
  test('dock: throw error if no station provided', () => {
    expect(toThrowDockError).toThrow('Docking station required!')
  })

  test('dock: on success, user set to empty string', () => {
    scooter.dock('station')
    expect(scooter.user.length).toBe(0)
  })

  //requestRepair method
  test('requestRepair: on success, scooter is not broken', async () => {
    scooter.requestRepair()
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(scooter.isBroken).toBe(false)
  })

  //recharge method
  test('recharge: on success, charge is 100', async () => {
    scooter.recharge()
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(scooter.charge).toBe(100)
  })
})
