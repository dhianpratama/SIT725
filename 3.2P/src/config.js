// All configurations from process.env will be stored here
// So all configurations will be centralized, instead of putting process.env everywhere

// Port number, default to 3000 if value from process.env is not given
const PORT = process.env.PORT || 3000
const APP_SERVICE_NAME = process.env.APP_SERVICE_NAME || 'math-api'

module.exports = {
  PORT,
  APP_SERVICE_NAME
}
