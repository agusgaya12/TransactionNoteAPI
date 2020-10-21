
const express = require('express')
const app = express.Router()
const db = require('../controller/dbController')

app.post('/register', (req, res) => {
  const body = req.body
  const result = db.add('users', body)
  if (!result) {
    res.status(400).send('bad format')
  } else {
    res.send(result)
  }
})

module.exports = app