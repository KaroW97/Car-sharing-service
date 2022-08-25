const { validMessages, message } = require('../utils/index')
const { carService, carShareService } = require('../services/index')

/**
 * Add new car in the car sharing park.
 * @param {Record<string, unknown>} body
 * @returns {Promise | Error}
 */
exports.addNew = async (body) => {
  // Check if car already exists
  await carService.checkIfCarExists(body)

  // Create carShare
  const share = await carShareService.create(body.currentRun)

  // Create Car
  await carService.createCar(body, share)

  // Return message
  return message(body, validMessages.newCarAdded)
}
