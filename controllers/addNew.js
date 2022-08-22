const queryUtils = require('../database/mongo/queryUtils')
const { reqValidation } = require('../Joi/joiValidation')
const utils = require('../utils/common')
const { AlreadyExists } = require('../utils/errors')
const { validMessages, message, errorMessage } = require('../utils/message')
const { carService, carShareService } = require('../services/index')

/**
 * Add new car in the car sharing park.
 * @param {Record<string, unknown>} body
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise | Error}
 */
exports.addNew = async ({ body }, res) => {
  try {
    //Validate
    await reqValidation(body)

    // Create query for adding new car and checking if there is one with provided vin and registration_number
    const query = queryUtils.addNew(body)

    // Find car
    const getCars = await carService.find(query)

    // If the array is not empty throw error
    if (getCars.length) {
      const errMessage = message(body, validMessages.carExists)

      throw new AlreadyExists(errMessage)
    }

    // Create carShare
    const share = await carShareService.create(body.currentRun)

    // Create car body
    const carBody = utils.carBody({ ...body, currentRun: share })

    // Create Car
    await carService.createCar(carBody)

    // Return message
    res.send(message(undefined, validMessages.newCarAdded, body))
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
}

