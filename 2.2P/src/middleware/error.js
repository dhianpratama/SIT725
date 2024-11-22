const logger = require('../utils/logger')

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err
  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message
  }

  logger.error(err)

  res.status(statusCode).send(response)
}

module.exports = {
  errorHandler
}
