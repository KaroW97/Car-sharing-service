const validMessages = {
  noCarFound: 'No car was found',
  carDeleted: 'Car with given VIN has been deleted',
  carUpdated: 'Updated all cars',
  newSharing: 'New renting has been added',
  newCarAdded: 'Car registered',
  carExists: 'Car with given VIN or registration number exists',
  noUnauthorizeFound: 'No customer with unauthorized card found',
  noCarUpdate: 'No car was found to be updated',
  allCarsMachining: 'All cars machining to the request'
}

/**
 * Create details for message
 * @param {Record<string, unknown>} body
 * @returns {Record<string, string | number | Record<string, string>>[]}
 */
const createDetails = (body) => {
  if (!body) return

  return (Array.isArray(body) ? body : [body]).map((c) => ({
    status: c.status,
    vin: c.vin,
    registration_number: c.registration_number,
    fuelLevel: c.fuelLevel,
    car: c.car_info
  }))
}

const message = (body, message, details) => {
  const { vin, registration_number, length } = body || {}

  return {
    data: JSON.parse(
      JSON.stringify({
        length,
        vin,
        registration_number,
        message,
        details: createDetails(details)
      })
    )
  }
}

/**
 * Creates error message
 * @param {Record<string, unknown>} param0
 * @returns {Record<string, Record<string, unknown>>}
 */
const errorMessage = ({ name, message, status }) => ({
  error: { status, name, message }
})

module.exports = {
  errorMessage,
  createDetails,
  message,
  validMessages
}
