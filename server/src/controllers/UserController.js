const { User, Subscribtion, BalanceHistory } = require('../models')
const multiparty = require('multiparty')
const fs = require('fs')
const randomNumber = require('random-number-csprng')
const mailsender = require('../config/mail')

module.exports = {
  async getBalanceHistory (req, res) {
    try {
      const debet = await BalanceHistory.findAll({
        where: {
          toId: req.user.id
        }
      })
      const credit = await BalanceHistory.findAll({
        where: {
          fromId: req.user.id
        }
      })
      res.send({
        debet: debet,
        credit: credit
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async getBalance (req, res) {
    try {
      const user = await User.findById(req.user.id)
      delete user.password
      res.send({
        user: user.toJSON()
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async getUser (req, res) {
    try {
      await User.findById(JSON.parse(req.body.id)).then(user => {
        res.send({
          user: user.toJSON()
        })
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async editUser (req, res) {
    try {
      const _user = JSON.parse(req.body.user)
      const _password = JSON.parse(req.body.password)
      await User.findById(_user.id).then(user => {
        user.update({
          name: _user.name ? _user.name : user.name,
          phone: _user.phone ? _user.phone : user.phone,
          email: _user.email ? _user.email : user.email,
          adress: _user.adress ? _user.adress : user.adress,
          status: _user.status ? _user.status : user.status,
          password: _password ? _password : user.password,
          bio: _user.bio ? _user.bio : user.bio,
          balance: _user.balance ? _user.balance : user.balance
        }, {
          where: {
            id: _user.id
          },
          individualHooks: true
        }).then(() => {
          res.send({
            user: user.toJSON()
          })
        }).catch(error => {
          if (error.message === 'Validation error: Validation isEmail failed') {
            res.status(400).send({
              error: 'Введите корректный email адрес.'
            })
          } else {
            res.status(400).send({
              error: error
            })
          }
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Ошибка произошла при изменении профиля пользователя'
      })
    }
  },
  async getUsers (req, res) {
    try {
      await User.findAll({
        where: {
          archived: false,
          type: JSON.parse(req.body.type)
        }
      }).then(users => {
        const _users = []
        users.map(function(user){
          _users.push(user.toJSON())
        })
        res.send({
          users: _users
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Error ocured when trying to read users in DB'
      })
    }
  },
  async archiveUser (req, res) {
    try {
      await User.findById(req.body.id).then(_user => {
        _user.archived = true
        _user.status = 'inactive'
        _user.save().then(() => {
          res.send({
            user: _user.toJSON()
          })
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Ошибка произошла при попытке архивации пользователя в БД'
      })
    }
  },
  async addUser (req, res) {
    try {
      const user = await User.create(JSON.parse(req.body.user))
      res.send({
        user: user.toJSON()
      })
    } catch (error) {
      if (error.errors[0].message === 'email must be unique') {
        res.status(500).send({
          error: 'Такой email уже используется'
        })
      } else if (error.errors[0].message === 'phone must be unique'){
        res.status(500).send({
          error: 'Такой телефон уже используется'
        })
      } else {
        res.status(500).send({
          error: error
        })
      }
    }
  },
  async addEmployee (req, res) {
    try {
      var data = JSON.parse(req.body.user)
      data.employerId = req.body.organization_id
      const user = await User.create(data)
      res.send({
        user: user.toJSON()
      })
    } catch (error) {
      if (error.errors[0].message === 'email must be unique') {
        res.status(500).send({
          error: 'Такой email уже используется'
        })
      } else if (error.errors[0].message === 'phone must be unique'){
        res.status(500).send({
          error: 'Такой телефон уже используется'
        })
      } else {
        res.status(500).send({
          error: error
        })
      }
    }
  },
  async getEmployees (req, res) {
    try {
      const users = await User.findAll({
        where: {
          employerId: req.body.id,
          archived: false
        }
      }).then(users => {
        var _users = users.map(function(user) {
          return user.toJSON()
        })
        res.send({
          users: _users
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла ошибка при считывании сотрудников из БД'
      })
    }
  },
  async getOrganizations (req, res) {
    try {
      await User.findAll({
        where: {
          archived: false,
          type: 'partner'
        }
      }).then(_organizations => {
        Subscribtion.findAll({
          where: {
            ownerId: req.user.id,
            status: 'active'
          }
        }).then(_subscriptions => {
          const organizations = []
          _subscriptions.map((subs) => {
            _organizations.map((org) => {
              if (org.id == subs.organizationId) {
                _organizations.splice(_organizations.indexOf(org), 1)
              }
            })
          })
          res.send({
            organizations: _organizations
          })
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла ошибка при считывании сотрудников из БД'
      })
    }
  },
  async changeImage (req, res) {
    try {
      const form = new multiparty.Form()
      await form.parse(req, function (err, fields, files) {
        if (err) {
          res.status(400).send({
            error: 'Error ocured when PARSE the file'
          })
        } else {
          var tempPath = files.imageFile[0].path
          var fileName = 'user-img/' + files.imageFile[0].originalFilename
          const copyToPath = 'static/user-img/' + files.imageFile[0].originalFilename
          fs.readFile(tempPath, function (err, data) {
            if (err) {
              res.status(400).send({
                error: 'Error ocured when READING the file'
              })
            } else {
              fs.writeFile(copyToPath, data, function (err) {
                if (err) {
                  res.status(400).send({
                    error: 'Error ocured when WRITING the file'
                  })
                } else {
                  User.findById(req.user.id).then(user => {
                    user.image = fileName
                    user.save().then(() => {
                      fs.unlink(tempPath, function () {
                        res.send({
                          user: user.toJSON()
                        })
                      })
                    })
                  })
                }
              })
            }
          })
        }
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла ошибка при записи в БД'
      })
    }
  },
  async sendEmail (req, res) {
    try {
      const password = await randomNumber(1000, 10000)
      await User.findOne({
        where: {
          email: req.body.email
        }
      }).then(_user => {
        if (_user && _user.email) {
          mailsender(_user.email, 'Смена пароля Такон!', 'Ваш временный пароль: "' + password + '"').then(result => {
            _user.update({
              password: password ? password : _user.password,
            }, {
              where: {
                id: _user.id
              },
              individualHooks: true
            }).then(() => {
              res.send({
                message: 'Пароль отправлен на указанный email'
              })
            })
          })
        } else {
          res.status(400).send({
            error: 'Email не найден!'
          })
        }
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла ошибка при записи в БД'
      })
    }
  },
  async addBalance (req, res) {
    try {
      if (req.user.type === 'partner') {
        res.send({
          message: 'Вы не можете пополнить баланс сотрудников'
        })
      } else {
        await User.findOne({
          where: {
            id: req.body.id
          }
        }).then(_user => {
          _user.update({
            balance: req.body.balance ? _user.balance + Number(req.body.balance) : _user.balance
          }).then(() => {
            BalanceHistory.create({
              date: new Date().getTime(),
              summ: Number(req.body.balance),
              initSumm: _user.balance - Number(req.body.balance),
              fromId: req.user.id,
              toId: req.body.id
            }).then(_balance => {
              res.send({
                message: 'Баланс успешно добавлен!'
              })
            })
          })
        })
      }
    } catch (error) {
      res.status(500).send({
        error: 'Произошла ошибка при добавлении баланса'
      })
    }
  }
}
