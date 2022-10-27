const errors = require('./errors')
const { carJoi, carShareJoi } = require('../JoiSchemas/joiSchemas')
const { validMessages } = require('./message')

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
const reqValidation = async ({ body }, res, next) => {
  const { model_type } = body

  const joiValidation = joiValidate(
    body,
    model_type === 'Car' ? carJoi : carShareJoi
  )

  if (joiValidation.error)
    throw new errors.BadRequestError(joiValidation.error.details)

  return next()
}

/**
 *
 * @param {Record<string, unknown>[] | Number } data
 * @param {Response<any, Record<string, any>, number>} res
 * @param {string} info - error message
 */
const validate = (data, info = validMessages.noCarFound) => {
  if (!data) throw new errors.NotFoundError(info)
}

module.exports = {
  reqValidation,
  validate
}
