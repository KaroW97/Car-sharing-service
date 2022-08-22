const queryUtils = require('../database/mongo/queryUtils')
const carService = require('../services/car')
const { validMessages, message } = require('../utils/message')
const { errorMessage } = require('../utils/message')

/**
 * Obtain list of cars that are currently in use and fuel level less than 1/4 of full tank
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.checkFuel = async (req, res) => {
  try {
    // Create query for checking fuel level
    const query = queryUtils.checkFuel()

    // Find all matching
    const data = await carService.find(query)

    // Return response
    return res.send(message(null, validMessages.allCarsMachining, data))
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
}
