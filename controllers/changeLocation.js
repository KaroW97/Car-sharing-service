const { message } = require('../utils/message')
const carService = require('../services/car')

/**
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
 * @returns {Promise}
 */
exports.updateLocation = async () => {
  // Update cars
  await carService.changeLocation()

  // Get all with changed location currently and in the past
  const cars = await carService.findAllWithCords()
  //TODO: put messages to service or change message module
  // Create response
  const response = createResponse(cars)

  // Return message
  return message({ length: cars.length }, response)
}
