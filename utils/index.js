module.exports = {
  common: require('./common'),
  validation: require('./validation'),
  errors: require('./errors'),
  validMessages: require('./message').validMessages,
  message: require('./message').message,
  invalidCustomerResponse: require('./message').createInvalidCustomerResponse,
  errorMessage: require('./message').errorMessage
}
