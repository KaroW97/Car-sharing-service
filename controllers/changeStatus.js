const { validMessages, message } = require('../utils/index')
const carService = require('../services/car')

/**
 * Update any car produced before '01/01/2017' or
 * has mileage greater than 100000 km by setting Status to In Service
 * @returns {Promise}
 */
exports.changeStatus = async () => {
  // Update cars
  await carService.changeStatus()

  // Return message
  return message(null, validMessages.carUpdated)
}
