const express = require('express')
const app = express.Router()
const db = require('../../controller/dbController')
const authentication = require('../../middleware/authenticationMiddleware')

app.use(authentication)

app.delete("/book", function (req, res) {
    let id = req.query.id
    const result = db.remove('book', id)
    if (result) {
        res.send(result)
    }
    else {
        res.status(404).send('Not Found')
    }
})

module.exports = app