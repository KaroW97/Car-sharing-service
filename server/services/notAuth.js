const Car = require('../database/model/Car')
const queryUtils = require('../database/mongo/queryUtils')
const { validMessages, message } = require('../utils/message')
const { validate } = require('../utils/validate')

/**
 * Obtain all cars that has been reserved, but driver credit/debit card
 * hasn't been authorized. Return VIN, location, driver first/last name and driver license number.
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.notAuthHandler = async () => {
  // Create query for all cars with RESERVED status
  const query = queryUtils.getReservedNotAuth()

  // Find all
  const data = await Car.find(query)

  // Check if there are any
  validate(data.length)

  // Get customers with invalid credit card
  const response = await queryUtils.getInvalidCustomers(data)

  // Check if there are any
  validate(response.length, validMessages.noUnauthorizeFound)

  // Return message
  return message(null, response)
}
