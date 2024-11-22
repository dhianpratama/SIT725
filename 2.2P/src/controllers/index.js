const mathService = require('../services')

const add = (req, res) => {
  const { num1, num2 } = req.body
  const result = mathService.add(num1, num2)
  res.send({ result })
}

const subtract = (req, res) => {
  const { num1, num2 } = req.body
  const result = mathService.subtract(num1, num2)
  res.send({ result })
}

const multiply = (req, res) => {
  const { num1, num2 } = req.body
  const result = mathService.multiply(num1, num2)
  res.send({ result })
}

const divide = (req, res) => {
  const { num1, num2 } = req.body
  const result = mathService.divide(num1, num2)
  res.send({ result })
}

const power = (req, res) => {
  const { num1, num2 } = req.body
  const result = mathService.power(num1, num2)
  res.send({ result })
}

const squareRoot = (req, res) => {
  const { num1 } = req.body
  const result = mathService.squareRoot(num1)
  res.send({ result })
}

const modulo = (req, res) => {
  const { num1, num2 } = req.body
  const result = mathService.modulo(num1, num2)
  res.send({ result })
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
