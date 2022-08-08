/**
 * When incorrect data provided
 */
class BadRequest extends Error {
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
class NotFound extends Error {
  constructor(details = 'Page could not be found') {
    super('NOT_FOUND')

    this.status = 404
    this.name = 'NOT_FOUND'
    this.message = details
  }
}

class DataNotFound extends NotFound {
  constructor(message) {
    super(message)
  }
}

/**
 * Data Already exists
 */
class AlreadyExists extends Error {
  constructor(details) {
    super('CONFLICT')
    this.status = 409
    this.name = 'CONFLICT'
    this.message = details
  }
}

module.exports = {
  BadRequest,
  NotFound,
  DataNotFound,
  AlreadyExists
}
