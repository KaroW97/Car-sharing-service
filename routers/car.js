const { validation, errorMessage } = require('../utils/index')
const carController = require('../controllers/index')
const router = require('express').Router()

//TODO: create new message function to decrease amount of elements in controller

/**
 *  Http request to obtain list of cars that are currently in use and fuel level less than 1/4 of full tank
 */
router.get('/checkFuel', async (req, res) => {
  try {
    const checkFuel = await carController.checkFuel()

    // Return response
    return res.send(checkFuel)
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
    const notAuth = await carController.notAuth()

    // Return message
    res.send(notAuth)
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
router.post('/addNew', validation.reqValidation, async ({ body }, res) => {
  try {
    const addNew = await carController.addNew(body)

    // Return message
    res.send(addNew)
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
router.put(
  '/addNewCurrentRun',
  validation.reqValidation,
  async ({ body }, res) => {
    try {
      const addNewRun = await carController.addNewRun(body)

      // Return message
      res.send(addNewRun)
    } catch (error) {
      const { status } = error.error ?? error

      // If status is undefined set 500 as unknown error
      res.status(status ?? 500).json(errorMessage(error))

      throw error
    }
  }
)

/**
 * Http request to update any car produced before '01/01/2017' or
 * has mileage greater than 100000 km by setting Status to In Service
 */
router.put('/changeStatus', async (req, res) => {
  try {
    const changeStatus = await carController.changeStatus()

    // Return message
    res.send(changeStatus)
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
    const updateLocation = await carController.updateLocation()

    // Return message
    res.send(updateLocation)
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
    const deleteCar = await carController.deleteCar(params)

    // Return message
    res.send(deleteCar)
  } catch (error) {
    const { status } = error.error ?? error

    // If status is undefined set 500 as unknown error
    res.status(status ?? 500).json(errorMessage(error))

    throw error
  }
})

module.exports = router
