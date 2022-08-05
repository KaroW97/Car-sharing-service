const Car = require('../database/model/Car')
const carShare = require('../database/model/CurrentSharing')
const queryUtils = require('../database/mongo/queryUtils')
const { message, validMessages } = require('../utils/message')
const { validate } = require('../utils/validate')

/**
 * Add new car renting action
 * @param {Record<string, unknown>} body
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.addNewRunHandler = async (body, res) => {
  try {
    const share = new carShare(body.currentRun)

    const query = queryUtils.addNewCurrentRun(body, share)

    const car = await Car.updateOne(query.filter, query.update)

    validate(car.matchedCount, res)

    await share.save()

    res.send(message(body, validMessages.newSharing))
  } catch (err) {
    return err
  }
}
