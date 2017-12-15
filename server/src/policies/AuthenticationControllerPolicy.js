const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const user = {
      email: JSON.parse(req.body.user).email,
      password: JSON.parse(req.body.user).password
    }
    const { error, value } = Joi.validate(user, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Введите корректный email адрес.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Введенный пароль должен соответствовать следующим требованиям:
              <br/>
              1. Содержать символы: буквенные(в нижнем или верхнем регистре), цифры
              <br/>
              2. Длина должна быть не менее 8 и не превышать 32 символов              
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Не корректная информация'
          })
      }
    } else {
      next()
    }
  }
}
