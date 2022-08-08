const Joi = require('joi')

const carShareJoi = Joi.object({
  startDate: Joi.date(),
  startFuelLevel: Joi.number().min(0).max(1),
  startMilage: Joi.number(),
  finishFuelLevel: Joi.number().min(0).max(1),
  finishMilage: Joi.number(),
  rentingDriver: {
    licenseNumber: Joi.string().pattern(/^\d{5}\/\d{2}\/\d{4}$/),
    firstName: Joi.string(),
    lastName: Joi.string(),
    creditCard: {
      number: Joi.string().pattern(/^(\d{4}\s){3}\d{4}$/),
      owner: Joi.string(),
      validThrough: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}/)
    }
  }
})

const carJoi = Joi.object({
  vin: Joi.string().length(17).required(),
  registration_number: Joi.string().length(6).required(),
  fuelLevel: Joi.number().min(0).max(1),
  mileage: Joi.number(),
  currentRun: carShareJoi,
  car_info: {
    brand: Joi.string(),
    model: Joi.string(),
    date: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}/)
  },
  status: Joi.string().valid(
    'Free',
    'Reserved',
    'In use',
    'Unavailable',
    'In Service'
  ),
  location: {
    type: Joi.string().default('Point'),
    coordinates: Joi.array().length(2)
  },
  bookingHistory: [carShareJoi]
})

module.exports = {
  carJoi,
  carShareJoi
}
