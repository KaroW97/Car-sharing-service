const Car = require('../database/model/Car')
const queryUtils = require('../database/mongo/queryUtils')
const { validMessages, message } = require('../utils/message')

/**
 * Obtain list of cars that are currently in use and fuel level less than 1/4 of full tank
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.checkFuelHandler = async () => {
  // Create query for checking fuel level
  const query = queryUtils.checkFuel()

  // Find all matching
  const data = await Car.find(query)

  // Return response
  return message(null, validMessages.allCarsMachining, data)
}
