const mongoose = require('mongoose')
const { Schema } = mongoose

const carShare = new Schema({
  startDate: Date,
  startFuelLevel: Number,
  startMilage: Number,
  finishFuelLevel: Number,
  finishMilage: Number,
  rentingDriver: {
    licenseNumber: String,
    firstName: String,
    lastName: String,
    creditCard: {
      number: String,
      owner: String,
      validThrough: Date
    }
  }
})

module.exports = mongoose.model('carShare', carShare)
