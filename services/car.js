const Car = require('../models/Car')
const queryUtils = require('../services/mongo/queryUtils')
const {
  common,
  validation,
  errors,
  validMessages,
  message
} = require('../utils/index')

exports.find = (query) => Car.find(query)

exports.findAllReserved = async () => {
  // Create query for all cars with RESERVED status
  const query = queryUtils.getReservedNotAuth()

  // Find all
  const data = await Car.find(query)

  // Check if there are any
  validation.validate(data.length)

  return data
}

exports.findAllWithCords = async () => {
  const query = queryUtils.getWithChangedLocation()

  // Get all with changed location currently and in the past
  return await Car.find(query)
}

exports.createCar = async (body, share) => {
  // Create car body
  const carBody = common.carBody({ ...body, currentRun: share })

  await Car.create(carBody)
}

exports.checkIfCarExists = async (body) => {
  // Create query for adding new car and checking if there is one with provided vin and registration_number
  const query = queryUtils.addNew(body)

  const getCars = await Car.find(query)

  // If the array is not empty throw error
  if (getCars.length) {
    const errMessage = message(body, validMessages.carExists)

    throw new errors.AlreadyExistsError(errMessage)
  }
}

exports.updateOne = async (body, share) => {
  // Create query for adding new element to the array book history and current run
  const { filter, update } = queryUtils.addNewCurrentRun(body, share)

  const { matchedCount } = await Car.updateOne(filter, update)

  validation.validate(matchedCount, validMessages.noCarUpdate)
}

exports.changeStatus = async () => {
  // Create query for updating cars status
  const { filter, update } = queryUtils.changeStatus()

  const { modifiedCount } = await Car.updateMany(filter, update)

  validation.validate(modifiedCount, validMessages.noCarUpdate)
}

exports.changeLocation = async () => {
  const { filter, update } = queryUtils.setNewLocation()

  const { modifiedCount } = await Car.updateMany(filter, update)

  validation.validate(modifiedCount, validMessages.noCarUpdate)
}

exports.findByVin = async ({ vin }) => {
  const car = await Car.findOne({ vin })

  validation.validate(car)

  return car
}

exports.deleteOne = async (car) => Car.deleteOne(car)
