const { validMessages, message } = require('../utils/index')
const { carService, carShareService } = require('../services/index')

/**
 * Add new car renting action
 * @param {Record<string, unknown>} body
 * @returns {Promise}
 */
exports.addNewRun = async (body) => {
  // Create carShare schema
  const share = await carShareService.create(body.currentRun)

  // Update correct car book array
  await carService.updateOne(body, share)

  // Save changes for shareCar collection
  await share.save()

  // Return message
  return message(body, validMessages.newSharing)
}
