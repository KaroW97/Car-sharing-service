const { carService, carShareService } = require('../services/index')
const { message } = require('../utils/message')

/**
 * Obtain all cars that has been reserved, but driver credit/debit card
 * hasn't been authorized. Return VIN, location, driver first/last name and driver license number.
 * @returns {Promise}
 */
exports.notAuth = async () => {
  // Find all cars with RESERVED status
  const data = await carService.findAllReserved()

  // Get customers with invalid credit card
  const response = await carShareService.getInvalidCustomers(data)

  // Return message
  return message(null, response)
}
