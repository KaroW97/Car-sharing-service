const Car = require('../database/model/Car')
const queryUtils = require('../database/mongo/queryUtils')
const { validate } = require('../utils/validate')
const { message, validMessages } = require('../utils/message')
/**
 * Update any car produced before '01/01/2017' or
 * has mileage greater than 100000 km by setting Status to In Service
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.changeStatusHandler = async () => {
  // Create query for updating cars status
  const query = queryUtils.changeStatus()

  // Update cars
  const { modifiedCount } = await Car.updateMany(query.filter, query.update)

  // Check if anything was updated
  validate(modifiedCount)

  // Return message
  return message(null, validMessages.carUpdated)
}
