const queryUtils = require('../database/mongo/queryUtils')
const carService = require('../services/car')
const { validMessages, message } = require('../utils/message')
const { errorMessage } = require('../utils/message')
const { validate } = require('../utils/validate')

/**
 * Obtain all cars that has been reserved, but driver credit/debit card
 * hasn't been authorized. Return VIN, location, driver first/last name and driver license number.
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.notAuth = async (req, res) => {
  try {
    // Create query for all cars with RESERVED status
    const query = queryUtils.getReservedNotAuth()

    // Find all
    const data = await carService.find(query)

    // Check if there are any
    validate(data.length)

    // Get customers with invalid credit card
    const response = await queryUtils.getInvalidCustomers(data)

    // Check if there are any
    validate(response.length, validMessages.noUnauthorizeFound)

    // Return message
    res.send(message(null, response))
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
}
