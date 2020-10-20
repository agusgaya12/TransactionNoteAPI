const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const storesModel = require('../model/storesmodel')
const bookModel = require('../model/booksmodel')
const storageModel = require('../model/storageModel')
const transactionModel = require('../model/transactionModel')

// ⚠️ propietary code, don't change it ⚠️
// this code will create db.json automatically if your folder doesn't have one
// courious? 👀 search for "IIFE function"
let db;
(async () => {
  try {
    const fs = require('fs')
    const util = require('util')
    const readdir = util.promisify(fs.readdir)
    const path = require('path').resolve()
    const dir = await readdir(path)
    if (!dir.includes('db.json'))
      fs.writeFile(path + 'db.json', '', () => 1)

    const adapter = new FileSync('db.json')
    db = low(adapter)
    db.defaults({
      // 👇 table names
      store: [],
      storage: [],
      book: [],
      transaction: []
    })
      .write()
  } catch (error) {
    console.log(error);
  }
})()

function validator(body, model) {
  let result = {}
  let modelCounter = model.length
  let counter = 0
  for (const key in body) {
    if (model.includes(key)) {
      result[key] = body[key]
      counter++
      console.log(counter)
    }
  }
  if (counter < modelCounter) {
    return false
  }
  return result
}

/**
 * Get data
 * @param {String} tableName table name
 * @returns {Object} data
 */
function get(tableName, id) {
  const parsedId = parseInt(id)
  if (parsedId) {
    return db
      .get(tableName)
      .find({ id: parsedId })
      .value()
  } else {
    return db
      .get(tableName)
      .value()
  }
}

/**
 * Add data
 * @param {String} tableName table name
 * @param {Object} body inserted data
 */
function add(tableName, body) {
  let parsedBody
  if (tableName == 'stores') {
    parsedBody = validator(body, storesModel)
  }
  if (tableName == 'storage') {
    parsedBody = validator(body, storageModel)
  }
  if (tableName == 'book') {
    parsedBody = validator(body, bookModel)
  }
  if (tableName == 'transaction') {
    parsedBody = validator(body, transactionModel)
  }
  if (!parsedBody) {
    return false
  }
  return db.get(tableName)
    .push(parsedBody)
    .write()
}

/**
 * Add a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 * @param {Object} body updated data
 */
function edit(tableName, id, body) {
  const parsedId = parseInt(id)
  db.get(tableName)
    .find({ id: parsedId })
    .assign(body)
    .write()
}

/**
 * Remove a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function remove(tableName, id) {
  const parsedId = parseInt(id)
  db.get(tableName)
    .remove({ id: parsedId })
    .write()
}

/**
 * Remove all data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function removeAll(tableName) {
  db.get(tableName)
    .remove({})
    .write()
}

module.exports = {
  get,
  add,
  edit,
  remove,
  removeAll
}