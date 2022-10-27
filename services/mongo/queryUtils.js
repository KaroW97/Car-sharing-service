const { queries, MongoQuery } = require('./Query')
const { createUpdateQuery } = require('./queryHelpers')
const mongoQuery = new MongoQuery()

/**
 * Returns query for getting elements with "fuelLevel" beneath 0.25 or "status" in use
 * @returns {Record<string, unknown>}
 */
exports.checkFuel = () =>
  mongoQuery
    .queryOr(['fuelLevel', queries.LT(0.25)])
    .queryOr(['status', 'In use'])
    .build()

/**
 * Returns query for getting elements with "status" Reserved
 * @returns {Record<string, unknown>}
 */
exports.getReservedNotAuth = () =>
  mongoQuery.queryPlain(['status', 'Reserved']).build().$plain

/**
 * Returns query for getting elements with proper "vin" or "registration_number"
 * @param {string} param0
 * @returns {Record<string, unknown>}
 */
exports.addNew = ({ vin, registration_number }) =>
  mongoQuery
    .queryOr(['vin', vin])
    .queryOr(['registration_number', registration_number])
    .build()

/**
 * Returns query for getting elements with proper "id" and "rentingDriver.creditCard.validThrough" beneath current date
 * @param {string} id
 * @returns {Record<string, unknown>}
 */
exports.getInvalidCreditCards = (id) =>
  mongoQuery
    .queryAnd(['_id', id])
    .queryAnd([
      'rentingDriver.creditCard.validThrough',
      queries.LT(new Date().toISOString())
    ])
    .build()

/**
 * Returns query for getting elements with proper "location.coordinates"
 * @returns {Record<string, unknown>}
 */
exports.getWithChangedLocation = () =>
  mongoQuery
    .queryPlain(['location.coordinates', [53.8882836, 27.5442615]])
    .build().$plain

/**
 * Returns query for deleting elements with which are in "id" array scope
 * @param {ObjectId[]} shares
 * @returns {Record<string, unknown>}
 */
exports.deleteManyShares = (shares) =>
  mongoQuery.queryPlain(['_id', queries.IN(shares)]).build().$plain

/**
 * Returns query for getting elements with which have "status" Reserved or In use
 * and bookingHistory contains at least 2 elements
 * then the location will be set to [53.8882836, 27.5442615]
 * @returns {Record<string, unknown>}
 */
exports.setNewLocation = () => {
  const filter = mongoQuery
    .queryAnd(['status', queries.NOT(['Reserved', 'In use'], 'IN')])
    .queryAnd([
      'bookingHistory',
      { operationType: 'EXPR', checkType: 'GT', size: 1 }
    ])
    .querySet(['location.coordinates', [53.8882836, 27.5442615]])
    .build()

  return createUpdateQuery(filter)
}
/**
 * Returns query for getting element with proper "vin" and "registration_number"
 * then set "currentRun", "mileage" and "fuelLevel" to proper values
 * and add value to bookingHistory
 * @param {string} param0
 * @param {Record<string, unknown>} share
 * @returns {Record<string, unknown>}
 */
exports.addNewCurrentRun = ({ vin, registration_number }, share) => {
  const filter = mongoQuery
    .queryAnd(['vin', vin])
    .queryAnd(['registration_number', registration_number])
    .querySet(['currentRun', share])
    .querySet(['mileage', share.finishMilage])
    .querySet(['fuelLevel', share.finishFuelLevel])
    .queryPush(['bookingHistory', [share]])
    .build()

  return createUpdateQuery(filter)
}

/**
 * Returns query for getting element with "mileage" >= 100000 or "car_info.date" <= 2017-01-01
 * then set "status" to "In Service"
 * @returns {Record<string, unknown>}
 */
exports.changeStatus = () => {
  const filter = mongoQuery
    .queryOr(['mileage', queries.GTE(100000)])
    .queryOr([
      'car_info.date',
      queries.LTE(new Date('2017-01-01').toISOString())
    ])
    .querySet(['status', 'In Service'])
    .build()

  return createUpdateQuery(filter)
}
