const Car = require('../database/model/Car')
const queryUtils = require('../database/mongo/queryUtils')
const { validMessages, message } = require('../utils/message')
const { validate } = require('../utils/validate')

/**
 *
 * @param {Record<string, unknown>[]} cars
 * @returns {Record<string, string | number | Record<string, string>>[] }
 */
const createResponse = (cars) =>
  cars.map((car) => ({
    car_info: car.car_info,
    status: car.status,
    bookingHistory: car.bookingHistory.length
  }))

/**
 * update any car that has been booked more than 2 times
 * and aren't In use or Reserved by setting location coordinates to { latitude: 53.8882836, longitude: 27.5442615}
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.updateLocationHandler = async () => {
  // Create query for getting all cars with correct status
  const query = queryUtils.getBookingHistory()

  // Update cars
  const { modifiedCount } = await Car.updateMany(query.filter, query.update)

  // Check if any updated
  validate(modifiedCount, validMessages.noCarUpdate)

  // Get all with changed location currently and in the past
  const cars = await Car.find(queryUtils.getWithChangedLocation())

  // Create response
  const response = createResponse(cars)

  // Return message
  return message({ length: cars.length }, response)
}
