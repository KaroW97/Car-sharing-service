const Car = require('../database/model/Car')
const carShare = require('../database/model/CurrentSharing')
const queryUtils = require('../database/mongo/queryUtils')
const { reqValidation } = require('../Joi/joiValidation')
const utils = require('../utils/common')
const { AlreadyExists } = require('../utils/errors')
const { validMessages, message } = require('../utils/message')

/**
 * Add new car in the car sharing park.
 * @param {Record<string, unknown>} body
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise | Error}
 */
const addNewHandler = async (body) => {
  //Validate
  await reqValidation(body)

  // Create query for adding new car and checking if there is one with provided vin and registration_number
  const query = queryUtils.addNew(body)

  // Find car
  const getCars = await Car.find(query)

  // If the array is not empty throw error
  if (getCars.length) {
    const errMessage = message(body, validMessages.carExists)

    throw new AlreadyExists(errMessage)
  }

  // Create carShare model
  const share = new carShare(body.currentRun)

  // Create Car model
  const car = new Car(utils.carBody({ ...body, currentRun: share }))

  // Save share
  await share.save()

  // Save car
  await car.save()

  // Return message
  return message(undefined, validMessages.newCarAdded, body)
}

module.exports = {
  addNewHandler
}
