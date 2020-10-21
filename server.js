const express = require('express')
const bodyParser = require('body-parser')
const rootRoute = require('./routes/rootRoute')
const addBook = require('./routes/book/addBook')
const getBook = require('./routes/book/getBook')
const addStorage = require('./routes/storage/addStorages')
const getStorage = require('./routes/storage/getStorage')
const addStores = require('./routes/stores/addStores')
const getStores = require('./routes/stores/getStores')
const addTransaction = require('./routes/transaction/addTransaction')
const getTransaction = require('./routes/transaction/getTransaction')
const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoutes')

const app = express()
app.use(bodyParser.json())

app.use(rootRoute)
app.use(addBook)
app.use(getBook)
app.use(getStores)
app.use(addStores)
app.use(addStorage)
app.use(getStorage)
app.use(addTransaction)
app.use(getTransaction)
app.use(registerRoute)
app.use(loginRoute)

const port = 3000
app.listen(port, () => {
  console.log(`Backend app is running in http://localhost:${port}`);
})
