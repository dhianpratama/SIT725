const express = require('express')
const validation = require('../validations')
const controller = require('../controllers')
const validate = require('../middleware/validate')

const router = express.Router()

router.post('/add', validate(validation.add), controller.add)
router.post('/subtract', validate(validation.subtract), controller.subtract)
router.post('/multiply', validate(validation.multiply), controller.multiply)
router.post('/divide', validate(validation.divide), controller.divide)

module.exports = router
