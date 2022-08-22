const router = require('express').Router()
const carController = require('../controllers/index')

//TODO: add initial validation as first callback in some endpoints
//TODO: create new message function to decrease amount of elements in controller

/**
 *  Http request to obtain list of cars that are currently in use and fuel level less than 1/4 of full tank
 */
router.get('/checkFuel', carController.checkFuel)

/**
 * Http request to obtain all cars that has been reserved, but driver credit/debit card
 * hasn't been authorized. Return VIN, location, driver first/last name and driver license number.
 */
router.get('/getReservedNotAuth', carController.notAuth)

/**
 * Http request to add new car in the car sharing park.
 */
router.post('/addNew', carController.addNew)

/**
 * Request to add new car renting action
 */
router.put('/addNewCurrentRun', carController.addNewRun)

/**
 * Http request to update any car produced before '01/01/2017' or
 * has mileage greater than 100000 km by setting Status to In Service
 */
router.put('/changeStatus', carController.changeStatus)

/**
 * Http request to update any car that has been booked more than 2 times
 * and aren't In use or Reserved by setting location coordinates to { latitude: 53.8882836, longitude: 27.5442615}
 */
router.put('/updateLocation', carController.updateLocation)

/**
 * Http request to remove car by VIN
 */
router.delete('/delete/:vin', carController.deleteCar)

module.exports = router
