const { BadRequest } = require('../utils/errors')
const { carJoi, carShareJoi } = require('./joiSchemas')
/**
 * Checks if provided data is covering with created joi schema
 * @param {Record<string, unknown>} data
 * @returns {Joi.ValidationResult}
 */
const joiValidate = (data) => carJoi.validate(data)

/**
 *
 * @param {Record<string, unknown>} data
 * @returns {Promise<Joi.ValidationResult>}
 */
const reqValidation = async (data, isCareShare = { isCareShare: false }) => {
  const joiValidation = joiValidate(data, !isCareShare ? carJoi : carShareJoi)

  if (joiValidation.error) throw new BadRequest(joiValidation.error.details)

  return joiValidation
}

module.exports = {
  reqValidation
}
