const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Car = require('./routers/car')
const { errorMessage } = require('./utils/message')
const errors = require('./utils/errors')
mongoose.connect('mongodb://localhost:27017/car', {
  useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.log('JESTEM')
  console.error(error)
})

app.use(bodyParser.json())
app.use('/car', Car)

/**
 * When page is not in the scope throw error
 */
app.use((req, res) => {
  res.status(404)

  res.send(errorMessage(new errors.NotFound()))
})

app.listen(3000)
