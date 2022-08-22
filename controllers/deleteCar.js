const queryUtils = require('../database/mongo/queryUtils')
const { validate } = require('../utils/validate')
const { message, validMessages, errorMessage } = require('../utils/message')
const { carService, carShareService } = require('../services/index')

/**
 * remove car by VIN
 * @param {Record<string, unknown>} params
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.deleteCar = async ({ params }, res) => {
  try {
    // Find car and delete
    const car = await carService.findOneAndDelete(params)

    // Check if deleted
    validate(car)

    // Delete shares for found car
    const shares = Object.values(car)
      .map((value) => value.currentRun)
      .filter((item) => item !== undefined)

    // Delete car shares for car
    await carShareService.delete(queryUtils.deleteManyShares(shares))

    // Return message
    res.send(message(params, validMessages.carDeleted))
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
}
