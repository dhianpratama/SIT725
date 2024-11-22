const winston = require('winston')
const config = require('../config')

const customFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] [${level}]: ${message}`
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.label({ label: config.APP_SERVICE_NAME }),
    winston.format.timestamp(),
    winston.format.colorize(),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

module.exports = logger
