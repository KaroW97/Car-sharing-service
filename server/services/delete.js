const Car = require('../database/model/Car')
const carShare = require('../database/model/CurrentSharing')
const queryUtils = require('../database/mongo/queryUtils')
const { validate } = require('../utils/validate')
const { message, validMessages } = require('../utils/message')

/**
 * remove car by VIN
 * @param {Record<string, unknown>} params
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.deleteHandler = async (params) => {
  // Get vin value
  const { vin } = params

  // Find car and delete
  const car = await Car.findOneAndDelete({ vin })

  // Check if deleted
  validate(car)

  // Delete shares for found car
  const shares = Object.values(car)
    .map((value) => value.currentRun)
    .filter((item) => item !== undefined)

  // Delete car shares for car
  await carShare.deleteMany(queryUtils.deleteManyShares(shares))

  // Return message
  return message(params, validMessages.carDeleted)
}
