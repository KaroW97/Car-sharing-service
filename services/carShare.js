const carShare = require('../models/CurrentSharing')
const queryUtils = require('../services/mongo/queryUtils')
const {
  validation,
  validMessages,
  invalidCustomerResponse
} = require('../utils/index')

exports.create = (data) => carShare.create(data)

/**
 * Returns response with all drivers with not verified credit card
 * @param {Record<string, unknown>} car
 * @returns {Promise<Record<string, unknown>>[]}
 */
exports.getInvalidCustomers = async (car) => {
  const drivers = await car.map(async (item) => {
    const query = queryUtils.getInvalidCreditCards(item.currentRun)

    const shares = await carShare.find(query)

    if (shares.length) return invalidCustomerResponse(shares, item)
  })

  const response = (await Promise.all(drivers))
    .filter((data) => data !== undefined)
    .flat()

  // Check if there are any
  validation.validate(response.length, validMessages.noUnauthorizeFound)

  return response
}

/**
 * Delete car shares
 * @param {Record<string, unknown>} data
 */
exports.deleteCarShares = async (data) => {
  const shares = Object.values(data)
    .map((value) => value.bookingHistory)
    .filter((item) => item !== undefined)

  const query = queryUtils.deleteManyShares(shares.flat())

  await carShare.deleteMany(query)
}
