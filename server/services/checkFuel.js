const Car = require('../database/model/Car')
const queryUtils = require('../database/mongo/queryUtils')
const { validMessages, message } = require('../utils/message')

/**
 * Obtain list of cars that are currently in use and fuel level less than 1/4 of full tank
 * @param {Response<any, Record<string, any>, number>} res
 * @returns {Promise}
 */
exports.checkFuelHandler = async (res) => {
  try {
    const query = queryUtils.checkFuel()

    const data = await Car.find(query)

    res.send(message(null, validMessages.allCarsMachining, data))
  } catch (err) {
    return err
  }
}
