const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../../middleware/authenticationMiddleware')

app.use(authentication)

app.post('/book', (req, res) => {
    const body = req.body
    const result = db.add('book', body)
    res.send(result)
    return
})


module.exports = app