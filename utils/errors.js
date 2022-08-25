/**
 * When incorrect data provided
 */
class BadRequestError extends Error {
  constructor(details) {
    super('BAD_REQUEST')
    this.status = 400
    this.name = 'BAD_REQUEST'
    this.message = details
  }
}

/**
 * No data for provided Id
 */
class NotFoundError extends Error {
  constructor(details = 'Page could not be found') {
    super('NOT_FOUND')

    this.status = 404
    this.name = 'NOT_FOUND'
    this.message = details
  }
}

class DataNotFoundError extends NotFoundError {
  constructor(message) {
    super(message)
  }
}

/**
 * Data Already exists
 */
class AlreadyExistsError extends Error {
  constructor(details) {
    super('CONFLICT')
    this.status = 409
    this.name = 'CONFLICT'
    this.message = details
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  DataNotFoundError,
  AlreadyExistsError
}
