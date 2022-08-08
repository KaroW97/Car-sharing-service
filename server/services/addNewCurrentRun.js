const Car = require('../database/model/Car')
const carShare = require('../database/model/CurrentSharing')
const queryUtils = require('../database/mongo/queryUtils')
const { reqValidation } = require('../Joi/joiValidation')
const { message, validMessages } = require('../utils/message')
const { validate } = require('../utils/validate')

/**
 * Add new car renting action
 * @param {Record<string, unknown>} body
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.addNewRunHandler = async (body) => {
  // Validate and use careShare schema
  await reqValidation(body, { isCareShare: true })

  // Create carShere schema
  const share = new carShare(body.currentRun)

  // Create query for adding new element to the array book history and current run
  const query = queryUtils.addNewCurrentRun(body, share)

  // Update correct car book array
  const car = await Car.updateOne(query.filter, query.update)

  // Check if anything was updated
  validate(car.matchedCount)

  // Save changes for shareCar collection
  await share.save()

  // Return message
  return message(body, validMessages.newSharing)
}
