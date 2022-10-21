const User = require('./User')

class Scooter {
  // scooter code here
  constructor(station, user) {
    this.station = station
    this.serial = Math.ceil(Math.random() * 1000)
    this.charge = Math.ceil(Math.random() * 100)
    this.isBroken = false
    this.docked = true
    this.user = ''

    if (user instanceof User) {
      if (user.age <= 17) {
        console.log('Too young to ride a scooter, the minimum age is 18!')
      } else {
        this.user = user
      }
    }
  }

  rent() {
    if (this.isBroken == false && this.charge > 20) {
      this.docked = false
      console.log("Enjoy the ride!")
      return 1
    } else if (this.charge <= 20) {
      throw 'Scooter low on battery, please charge.'
    } else {
      throw 'Scooter is broken, please send a repair request.'
    }
  }

  dock(station) {
    if (!station) {
      throw 'Docking station required!'
    } else {
      this.docked = true
      this.user = ''
      this.station = station
    }
    return 1
  }

  distanceLeft() {
    const distance = (this.charge / 100) * 32
    console.log(`This scooter can travel for another ${distance} km`)
    return distance
  }

  async recharge() {
    console.log('Starting charge')

    await new Promise(resolve => setTimeout(resolve, 2000))
    this.charge = 100

    console.log('Charging complete')
  }

  async requestRepair() {
    console.log('Repair in progress')

    await new Promise(resolve => setTimeout(resolve, 2000))
    this.isBroken = false

    console.log('Repair complete')
  }
}


module.exports = Scooter
