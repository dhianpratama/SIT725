const express = require('express')
const mathRoute = require('./math.route')

const router = express.Router()

router.use('/math', mathRoute)

module.exports = router
