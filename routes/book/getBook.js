const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../../middleware/authenticationMiddleware')

app.use(authentication)

app.get('/book', (req, res) => {
    res.send(db.get('book'))
})

module.exports = app