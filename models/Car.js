const mongoose = require('mongoose')
const Point = require('./Point')
const { Schema } = mongoose

const carSchema = new Schema({
  vin: String,
  registration_number: String,
  fuelLevel: Number,
  mileage: Number,
  currentRun: { type: Schema.Types.ObjectId, ref: 'carShare' },
  car_info: {
    brand: String,
    model: String,
    date: Date
  },
  status: {
    type: String,
    default: 'Free',
    enum: ['Free', 'Reserved', 'In use', 'Unavailable', 'In Service']
  },
  location: {
    type: Point,
    required: true
  },
  bookingHistory: [{ type: Schema.Types.ObjectId, ref: 'carShare' }]
})

module.exports = mongoose.model('Car', carSchema)
