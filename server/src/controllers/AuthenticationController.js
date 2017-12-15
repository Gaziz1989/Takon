const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
module.exports = {
 async register (req, res) {
    try {
      const user = await User.create(JSON.parse(req.body.user))
      res.send({
        user: user.toJSON()
      })
    } catch (err) {
      res.status(400).send({
        error: 'Этот е-мэйл уже используется'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = JSON.parse(req.body.user)

      const user = await User.findOne({
        where: {
          email: email,
          archived: false
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'Предоставленная информация не корректна или пользователь не существует'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        console.log()
        return res.status(403).send({
          error: 'Не правильный пароль'
        })
      }   
      res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON())
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Произошла какая то ошибка'
      })
    }
  }
}
