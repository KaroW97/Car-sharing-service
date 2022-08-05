const services = require('../services/index')
const router = require('express').Router()
//TODO: Add joi schema validation for PUT and POST to check if valid value has been passed

/**
 *  Http request to obtain list of cars that are currently in use and fuel level less than 1/4 of full tank
 */
router.get(
  '/checkFuel',
  async (req, res) => await services.checkFuelHandler(res).catch((err) => err)
)

/**
 * Http request to obtain all cars that has been reserved, but driver credit/debit card
 * hasn't been authorized. Return VIN, location, driver first/last name and driver license number.
 */
router.get(
  '/getReservedNotAuth',
  async (req, res) => await services.notAuthHandler(res).catch((err) => err)
)

/**
 * Http request to add new car in the car sharing park.
 */
router.post(
  '/addNew',
  async ({ body }, res) => {
    try {
      await services.addNewHandler(body, res)

    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

/**
 * Request to add new car renting action
 */
router.put(
  '/addNewCurrentRun',
  async ({ body }, res) =>
    await services.addNewRunHandler(body, res).catch((err) => err)
)

/**
 * Http request to update any car produced before '01/01/2017' or
 * has mileage greater than 100000 km by setting Status to In Service
 */
router.put(
  '/changeStatus',
  async (req, res) =>
    await services.changeStatusHandler(res).catch((err) => err)
)

/**
 * Http request to update any car that has been booked more than 2 times
 * and aren't In use or Reserved by setting location coordinates to { latitude: 53.8882836, longitude: 27.5442615}
 */
router.put(
  '/updateLocation',
  async (req, res) =>
    await services.updateLocationHandler(res).catch((err) => err)
)

/**
 * Http request to remove car by VIN
 */
router.delete(
  '/delete/:vin',
  async ({ params }, res) =>
    await services.deleteHandler(params, res).catch((err) => err)
)

module.exports = router
