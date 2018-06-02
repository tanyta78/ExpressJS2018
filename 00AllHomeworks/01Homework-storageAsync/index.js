const storage = require('./storage')

storage.put('first', 'some value')
storage.put('second', true)
storage.put('third', 1)

let somev = storage.get('first')
console.log(somev)

storage.update('first', 'one new storage')

let newval = storage.get('first')
console.log(newval)

storage.delete('first')

storage.clear()

storage.put('first', 'first value')
storage.put('second', 'second value')
storage.put('third', 'third value')

// storage async without promise
storage.save(() => {
  storage.clear()

  storage.load(() => {
    let afterLoadValue = storage.get('second')
    console.log(afterLoadValue)
  })
})

// storage with promise
storage
  .saveProm()
  .then(() => {
    storage.clear()

    storage
      .loadProm()
      .then(() => {
        let afterLoadValue = storage.get('second')
        console.log(afterLoadValue)
      })
  })
