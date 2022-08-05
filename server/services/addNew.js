const Car = require('../database/model/Car')
const carShare = require('../database/model/CurrentSharing')
const queryUtils = require('../database/mongo/queryUtils')
const utils = require('../utils/common')
const { AlreadyExists } = require('../utils/errors')
const { validMessages, message, errorMessage } = require('../utils/message')

/**
 * Add new car in the car sharing park.
 * @param {Record<string, unknown>} body
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.addNewHandler = async (body, res) => {
  try {
    const getCars = await Car.find(queryUtils.addNew(body))

    if (!getCars.length) {
      const share = new carShare(body.currentRun)

      const car = new Car(utils.carBody({ ...body, currentRun: share }))

      await share.save()

      await car.save()

      return res.send(message(undefined, validMessages.newCarAdded, body))
    }

    const errMessage = message(body, validMessages.carExists)

    const error = errorMessage(new AlreadyExists(errMessage))

    res.send(error)

    throw error
  } catch (err) {
    throw err
  }
}
