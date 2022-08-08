const services = require('../services/index')
const { errorMessage } = require('../utils/message')
const router = require('express').Router()

/**
 *  Http request to obtain list of cars that are currently in use and fuel level less than 1/4 of full tank
 */
router.get('/checkFuel', async (req, res) => {
  try {
    const message = await services.checkFuelHandler()

    res.send(message)
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
})

/**
 * Http request to obtain all cars that has been reserved, but driver credit/debit card
 * hasn't been authorized. Return VIN, location, driver first/last name and driver license number.
 */
router.get('/getReservedNotAuth', async (req, res) => {
  try {
    const message = await services.notAuthHandler()

    res.send(message)
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
})

/**
 * Http request to add new car in the car sharing park.
 */
router.post('/addNew', async ({ body }, res) => {
  try {
    const message = await services.addNewHandler(body)

    res.send(message)
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
})

/**
 * Request to add new car renting action
 */
router.put('/addNewCurrentRun', async ({ body }, res) => {
  try {
    const message = await services.addNewRunHandler(body)

    res.send(message)
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
})

/**
 * Http request to update any car produced before '01/01/2017' or
 * has mileage greater than 100000 km by setting Status to In Service
 */
router.put('/changeStatus', async (req, res) => {
  try {
    const message = await services.changeStatusHandler(res)

    res.send(message)
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
})

/**
 * Http request to update any car that has been booked more than 2 times
 * and aren't In use or Reserved by setting location coordinates to { latitude: 53.8882836, longitude: 27.5442615}
 */
router.put('/updateLocation', async (req, res) => {
  try {
    const message = await services.updateLocationHandler()

    res.send(message)
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
})

/**
 * Http request to remove car by VIN
 */
router.delete('/delete/:vin', async ({ params }, res) => {
  try {
    const message = await services.deleteHandler(params)

    res.send(message)
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
})

module.exports = router
