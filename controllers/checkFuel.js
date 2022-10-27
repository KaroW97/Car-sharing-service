const { carService, queryUtils } = require('../services/index')
const { validMessages, message } = require('../utils/index')

/**
 * Obtain list of cars that are currently in use and fuel level less than 1/4 of full tank
 * @returns {Promise}
 */
exports.checkFuel = async () => {
  // Create query for checking fuel level
  const query = queryUtils.checkFuel()

  // Find all matching
  const data = await carService.find(query)

  // Return response
  return message(data, validMessages.allCarsMachining)
}
