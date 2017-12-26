const { User } = require('../models')
const jwt = require('jsonwebtoken')
const request = require('request')
const config = require('../config/config')
const appKey = 'b60ce3cf8697fa6d2ef145c429eea815128dc7ca'
const path = 'https://api.mobizon.com/service/'
var randomNumber = require("random-number-csprng")

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 1000
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
    } catch (error) {
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
        return res.status(403).send({
          error: 'Не правильный пароль'
        })
      }   
      res.send({
        token: jwtSignUser(user.toJSON())
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла какая то ошибка'
      })
    }
  },
  async mregister (req, res) {
    try {
      const password = await randomNumber(1000, 10000)
      const _phone = req.body.phone.split('')
      _phone[0] = 7
      const user = {
        phone: _phone.join(''),
        password: password
      }
      await User.findOne({
        where: {
          phone: user.phone
        }
      }).then(_user => {
        if (_user) {
          _user.update({
            password: password
          }).then(updated => {
            request({
              method: 'GET',
              uri: path + 'User/GetOwnBalance/?apiKey=' + appKey,
              json: true
            }, async function (_error, response, body) {
              if (_error) {
                res.status(400).send({
                  error: 'Произошла ошибка аутентификации'
                })
              } else {
                if (body.data.balance > 50) {
                  await request({
                    method: 'GET',
                    uri: path + 'Message/SendSMSMessage/?apiKey=' + appKey + '&recipient=' + user.phone + '&text=' + password,
                    json: true
                  }, function (_error2, response2, body2) {
                    if (_error2) {
                      res.status(400).send({
                        error: 'Произошла какая то неведомая хуита'
                      })
                    } else {
                      res.send({
                        message: 'Пользователь изменен!'
                      })
                    }
                  })
                } else if (body.data.balance <= 5) {
                  res.status(400).send({
                    error: 'Произошла какая то неведомая хуита. Пожалуйста свяжитесь с администратором!'
                  })
                } else {
                  request({
                    method: 'GET',
                    uri: path + 'Message/SendSMSMessage/?apiKey=' + appKey + '&recipient=77079048961' + '&text=' + encodeURI('Ваш баланс: ' + body.data.balance + ', срочно пополните баланс Mobizon.kz'),
                    json: true
                  }, async function (_error2, response2, body2) {
                    if (_error2) {
                      res.status(400).send({
                        error: 'Произошла какая то неведомая хуита'
                      })
                    } else {
                      await request({
                        method: 'GET',
                        uri: path + 'Message/SendSMSMessage/?apiKey=' + appKey + '&recipient=' + user.phone + '&text=' + password,
                        json: true
                      }, function (_error3, response3, body3) {
                        if (_error3) {
                          res.status(400).send({
                            error: 'Произошла какая то неведомая хуита'
                          })
                        } else {
                          res.send({
                            message: 'Пользователь изменен!'
                          })
                        }
                      })
                    }
                  })
                }
              }
            })
          })
        } else {
          User.create(user).then(_user1 => {
            if (_user1) {
              request({
                method: 'GET',
                uri: path + 'User/GetOwnBalance/?apiKey=' + appKey,
                json: true
              }, async function (_error, response, body) {
                if (_error) {
                  res.status(400).send({
                    error: 'Произошла ошибка аутентификации'
                  })
                } else {
                  if (body.data.balance > 50) {
                    await request({
                      method: 'GET',
                      uri: path + 'Message/SendSMSMessage/?apiKey=' + appKey + '&recipient=' + user.phone + '&text=' + password,
                      json: true
                    }, function (_error2, response2, body2) {
                      if (_error2) {
                        res.status(400).send({
                          error: 'Произошла какая то неведомая хуита'
                        })
                      } else {
                        res.send({
                          message: 'Пользователь зарегистрирован!'
                        })
                      }
                    })
                  } else if (body.data.balance <= 5) {
                    res.status(400).send({
                      error: 'Произошла какая то неведомая хуита. Пожалуйста свяжитесь с администратором!'
                    })
                  } else {
                    request({
                      method: 'GET',
                      uri: path + 'Message/SendSMSMessage/?apiKey=' + appKey + '&recipient=77079048961' + '&text=' + encodeURI('Ваш баланс меньше 50тг, срочно пополните баланс Mobizon.kz'),
                      json: true
                    }, async function (_error2, response2, body2) {
                      if (_error2) {
                        res.status(400).send({
                          error: 'Произошла какая то неведомая хуита'
                        })
                      } else {
                        await request({
                          method: 'GET',
                          uri: path + 'Message/SendSMSMessage/?apiKey=' + appKey + '&recipient=' + user.phone + '&text=' + password,
                          json: true
                        }, function (_error2, response2, body2) {
                          if (_error2) {
                            res.status(400).send({
                              error: 'Произошла какая то неведомая хуита'
                            })
                          } else {
                            res.send({
                              message: 'Пользователь зарегистрирован!'
                            })
                          }
                        })
                      }
                    })
                  }
                }
              })
            } else {
              res.status(400).send({
                error: 'Не удалось создать пользователя'
              })
            }
          })
        }
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла какая то неведомая хуита'
      })
    }
  },
  async mlogin (req, res) {
    try {
      const password = req.body.password
      const _phone = req.body.phone.split('')
      _phone[0] = 7
      const user = await User.findOne({
        where: {
          phone: _phone.join(''),
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
        return res.status(403).send({
          error: 'Не правильный пароль'
        })
      }   
      res.send({
        token: jwtSignUser(user.toJSON())
      })      
    } catch (error) {
      res.status(500).send({
        error: 'Произошла какая то ошибка'
      })
    }
  }
}
