const { validMessages, message } = require('../utils/index')
const { carService, carShareService } = require('../services/index')

/**
 * remove car by VIN
 * @param {Record<string, unknown>} params
 * @returns {Promise}
 */
exports.deleteCar = async (params) => {
  // Find car and delete
  const car = await carService.findByVin(params)

  // Delete shares for found car
  await carShareService.deleteCarShares(car)

  // At the end remove car
  await carService.deleteOne(car)

  // Return message
  return message(params, validMessages.carDeleted)
}
