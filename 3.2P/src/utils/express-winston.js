const winston = require('winston')
const ExpressWinston = require('express-winston')
const config = require('../config')

const customFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] [${level}]: ${message}`
})

const buildMessage = (req, _) => {
  let msg = 'HTTP {{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms'
  if (['POST', 'PUT'].includes(req.method)) {
    msg = msg + '; body: {{JSON.stringify(req.body)}}'
  }
  return msg
}

const expressWinston = ExpressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.label({ label: config.APP_SERVICE_NAME }),
    winston.format.timestamp(),
    winston.format.colorize(),
    customFormat
  ),
  meta: true,
  msg: buildMessage,
  colorize: true
})

module.exports = expressWinston
