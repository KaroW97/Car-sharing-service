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
exports.updateLocationHandler = async (res) => {
  try {
    const query = queryUtils.getBookingHistory()

    const updated = await Car.updateMany(query.filter, query.update)

    validate(updated.modifiedCount, res, validMessages.noCarUpdate)

    const cars = await Car.find(queryUtils.getWithChangedLocation())

    validate(cars.length, res, validMessages.noCarUpdate)

    const response = createResponse(cars)

    const valid = message({ length: cars.length }, response)

    res.send(valid)
  } catch (err) {
    return err
  }
}
