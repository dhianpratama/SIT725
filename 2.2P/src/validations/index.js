const Joi = require('joi')

const add = {
  body: Joi.object().keys({
    num1: Joi.number().required(),
    num2: Joi.number().required()
  })
}

const subtract = {
  body: Joi.object().keys({
    num1: Joi.number().required(),
    num2: Joi.number().required()
  })
}

const multiply = {
  body: Joi.object().keys({
    num1: Joi.number().required(),
    num2: Joi.number().required()
  })
}

const divide = {
  body: Joi.object().keys({
    num1: Joi.number().required(),
    num2: Joi.number().required().not(0)
  })
}

const power = {
  body: Joi.object().keys({
    num1: Joi.number().required(),
    num2: Joi.number().required()
  })
}

const squareRoot = {
  body: Joi.object().keys({
    num1: Joi.number().required()
  })
}

const modulo = {
  body: Joi.object().keys({
    num1: Joi.number().required(),
    num2: Joi.number().required().not(0)
  })
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  power,
  squareRoot,
  modulo
}
