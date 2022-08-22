const queryUtils = require('../database/mongo/queryUtils')
const { reqValidation } = require('../Joi/joiValidation')
const { message, validMessages, errorMessage } = require('../utils/message')
const { validate } = require('../utils/validate')
const { carService, carShareService } = require('../services/index')

/**
 * Add new car renting action
 * @param {Record<string, unknown>} body
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.addNewRun = async ({ body }, res) => {
  try {
    // Validate and use careShare schema
    await reqValidation(body, { isCareShare: true })

    // Create carShare schema
    const share = carShareService.create(body.currentRun)

    // Create query for adding new element to the array book history and current run
    const query = queryUtils.addNewCurrentRun(body, share)

    // Update correct car book array
    const car = await carService.updateOne(query)

    // Check if anything was updated
    validate(car.matchedCount)

    // Save changes for shareCar collection
    await share.save()

    // Return message
    res.send(message(body, validMessages.newSharing))
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
}
