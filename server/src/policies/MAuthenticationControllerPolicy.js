const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      phone: Joi.string().regex(
        new RegExp('^[0-9]{11,32}$')
      )
    }
    // const user = {
    //   email: JSON.parse(req.body.user).email,
    //   password: JSON.parse(req.body.user).password
    // }
    const { error, value } = Joi.validate(req.body, schema)
    if (error) {
      res.status(400).send({
        error: `Введите правильный номер телефона:
                1. Длина номера должна быть 11 символов;`
      })
    } else {
      next()
    }
  }
}
