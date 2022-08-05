const { DataNotFound } = require('../utils/errors')
const message = require('../utils/message')
const { validMessages } = message

/**
 *
 * @param {Record<string, unknown>[] | Number } data
 * @param {Response<any, Record<string, any>, number>} res
 * @param {string} info - error message
 */
exports.validate = (data, res, info = validMessages.noCarFound) => {
  if (!data) {
    const error = message.errorMessage(new DataNotFound(info))

    throw res.send(error)
  }
}
