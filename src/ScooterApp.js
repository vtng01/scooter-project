const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here

  static scooterSessions = []

  constructor() {
    this.stations = {
      'Manhattan': [],
      'Brooklyn': [],
      'Queens': [],
      'Bronx': [],
      'StatenIsland': []
    }

    this.registeredUsers = []
    ScooterApp.scooterSessions.push(this)
  }

  register(user) {
    if (Object.keys(this.registeredUsers).indexOf(user.username) < 0) {
      if (user.age <= 17) {
        console.log('too young to register!')
      } else {
        this.registeredUsers[user.username] = {
          password: user.password,
          age: user.age,
          loggedIn: false,
          accountChange: 0}
        console.log('user has been registered')
        return 1
      }
    } else {
      console.log('already registered!')
    }

  }

  logIn(username, password) {
    if (Object.keys(this.registeredUsers).indexOf(username) >= 0 && this.registeredUsers[username].password == password) {
      console.log(`${username} login success`)
      this.registeredUsers[username].loggedIn = true
      return 1
    } else {
      console.log('Username or password is incorrect.')
    }
  }

  addScooter(location, scooter) {
    if (!(scooter instanceof Scooter) || !(typeof location == 'string')) {
      console.log('Please input valid data types: location (String) and scooter (Scooter)')
      return
    }
    scooter.station = location
    this.stations[location].push(scooter)
  }

  RemoveScooter(scooterToRemove) {
    const serial = scooterToRemove.serial
    for (let i = 0; i < Object.keys(this.stations).length; i++) {
      const location = Object.keys(this.stations)[i]
      const lenBefore = this.stations[location].length
      this.stations[location] = this.stations[location].filter(e => e.serial != serial)
      if (lenBefore > this.stations[location].length) {
        console.log(`Scooter with serial ${serial} is removed from station ${location}`)
        return 1
      }
    }
    throw 'Scooter not found'
}



}

const user1 = new User('username1', 'password', 20)
const scooterApp = new ScooterApp()
scooterApp.register(user1)
scooterApp.register(user1)
const user2 = new User("username2", 'password', 8)
scooterApp.register(user2)
console.log(scooterApp.registeredUsers)
scooterApp.logIn("username1", 'password')
scooterApp.logIn("username2", 'password')

const scooter1 = new Scooter('Manhattan', user1)
const scooter2 = new Scooter('Queens', user2)
// console.log(scooter1 instanceof User)
// console.log(scooterApp.stations)
scooterApp.addScooter('Queens', scooter1)
scooterApp.addScooter('Queens', scooter2)
console.log('hi')
scooterApp.addScooter(1, scooter1)
console.log(scooterApp.stations)
// scooterApp.RemoveScooter(scooter1)
// console.log(scooterApp.stations)


module.exports = ScooterApp
