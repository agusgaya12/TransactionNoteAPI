
const express = require('express')
const hyperId = require('hyperid')
const app = express.Router()
const db = require('../controller/dbController')

app.post('/login', (req, res) => {
  const users = db.get('users')
  const instance = hyperId()
  const token = instance()

  if (users) {
    users.token = token
    console.log(token);
    res.send(users)
  } else {
    res.status(404).send('not found')
  }
})


module.exports = app