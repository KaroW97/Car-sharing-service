const Car = require('../database/model/Car')
const queryUtils = require('../database/mongo/queryUtils')
const { validMessages, message } = require('../utils/message')
const { validate } = require('../utils/validate')

/**
 * Obtain all cars that has been reserved, but driver credit/debit card
 * hasn't been authorized. Return VIN, location, driver first/last name and driver license number.
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.notAuthHandler = async (res) => {
  try {
    const data = await Car.find(queryUtils.getReservedNotAuth())

    validate(data.length, res)

    const response = await queryUtils.getInvalidCustomers(data)

    validate(response.length, res, validMessages.noUnauthorizeFound)

    res.send(message(null, response))
  } catch (err) {
    return err
  }
}
