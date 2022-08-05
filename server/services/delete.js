const Car = require('../database/model/Car')
const carShare = require('../database/model/CurrentSharing')
const queryUtils = require('../database/mongo/queryUtils')
const { validate } = require('../utils/validate')
const { message, validMessages } = require('../utils/message')

/**
 * remove car by VIN
 * @param {Record<string, unknown>} params
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.deleteHandler = async (params, res) => {
  try {
    const { vin } = params

    const car = await Car.findOneAndDelete({ vin })

    validate(car, res)

    const shares = Object.values(car)
      .map((value) => value.currentRun)
      .filter((item) => item !== undefined)

    await carShare.deleteMany(queryUtils.deleteManyShares(shares))

    res.send(message(params, validMessages.carDeleted))
  } catch (err) {
    return err
  }
}
