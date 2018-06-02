let fs = require('fs')
let data = {}
let dataFile = 'storage.json'

let validateKeyAsString = (key) => {
  if (typeof key !== 'string') {
    throw new Error('Key must be a string')
  }
}

let validateKeyExists = (key) => {
  if (!data.hasOwnProperty(key)) {
    throw new Error('Key does not exists')
  }
}

let put = (key, value) => {
  validateKeyAsString(key)

  if (data.hasOwnProperty(key)) {
    throw new Error('Key already exists')
  }

  data[key] = value
}

let get = (key) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  return data[key]
}

let getAll = () => {
  if (Object.keys(data).length === 0) {
    throw new Error('Storage is empty!')
  }

  return data
}

let update = (key, value) => {
  validateKeyAsString(key)
  validateKeyExists(key)

  data[key] = value
}

let deleteItem = (key) => {
  validateKeyAsString(key)
  validateKeyExists(key)
  delete data[key]
}

let clear = () => {
  data = {}
}

// async save
let saveAsync = (callback) => {
  let dataAsString = JSON.stringify(data)
  fs.writeFile(dataFile, dataAsString, (err) => {
    if (err) {
      console.log(err)
      return
    }

    callback()
  })
}

// save with promise
let saveWithPromise = (callback) => {
  return new Promise((resolve, reject) => {
    let dataAsString = JSON.stringify(data)
    fs.writeFile(dataFile, dataAsString, err => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

// async load
let loadAsync = (callback) => {
  fs.readFile(dataFile, 'utf8', (err, dataJson) => {
    if (err) {
      console.log(err)
      return
    }
    data = JSON.parse(dataJson)
    callback()
  })
}

let loadWithPromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'utf8', (err, dataJson) => {
      if (err) {
        reject(err)
        return
      }
      data = JSON.parse(dataJson)
      resolve()
    })
  })
}

module.exports = {
  put: put,
  get: get,
  getAll: getAll,
  update: update,
  delete: deleteItem,
  clear: clear,
  save: saveAsync,
  load: loadAsync,
  saveProm: saveWithPromise,
  loadProm: loadWithPromise
}
