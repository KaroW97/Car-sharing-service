const { errors, errorMessage } = require('./utils/index')
const bodyParser = require('body-parser')
const Car = require('./routers/car')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

app.use(bodyParser.json())
app.use('/car', Car)

/**
 * When page is not in the scope throw error
 */
app.use((req, res) => {
  res.status(404)

  res.send(errorMessage(new errors.NotFoundError()))
})

app.listen(process.env.PORT || 4000)
