const queryUtils = require('../database/mongo/queryUtils')
const { validate } = require('../utils/validate')
const { message, validMessages, errorMessage } = require('../utils/message')
const carService = require('../services/car')


/**
 * Update any car produced before '01/01/2017' or
 * has mileage greater than 100000 km by setting Status to In Service
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.changeStatus = async (req, res) => {
  try {
    // Create query for updating cars status
    const query = queryUtils.changeStatus()

    // Update cars
    const { modifiedCount } = await carService.updateMany(query)

    // Check if anything was updated
    validate(modifiedCount)

    // Return message
    res.send(message(null, validMessages.carUpdated))
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
}
