const fs = require('fs')
const path = require('path')
const storagePath = path.join(__dirname, '/storage.json')
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

function put (key, value) {
  validateKeyAsString(key)
  if (data.hasOwnProperty(key)) {
    throw new Error('Key already exists')
  }

  data[key] = value
}

function get (key) {
  validateKeyAsString(key)
  validateKeyExists(key)

  return data[key]
}

function getAll () {
  if (Object.keys(data).length === 0) {
    return 'There are no items in the storage'
  }
  return data
}

function update (key, newValue) {
  validateKeyAsString(key)
  validateKeyExists(key)

  data[key] = newValue
}

function remove (key) {
  validateKeyAsString(key)
  validateKeyExists(key)
  delete data[key]
}

function clear () {
  data = {}
}

function save () {
  let dataAsString = JSON.stringify(data)
  fs.writeFileSync(dataFile, dataAsString, 'utf-8')
}

function load () {
  if (!fs.existsSync(storagePath)) {
    return
  }

  let dataAsString = fs.readFileSync(dataFile, 'utf8')
  data = JSON.parse(dataAsString)
  return data
}

function removeStorageFile () {
  if (fs.existsSync(storagePath)) {
    fs.unlinkSync(storagePath)
  }
}

module.exports = {
  put,
  get,
  getAll,
  update,
  delete: remove,
  clear,
  save,
  load,
  removeStorageFile
}
