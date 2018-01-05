const randomNumber = require("random-number-csprng")
const { QR, User, BalanceHistory, ServiceUseHistory, Service } = require('../models')
const options = {
  version: 1,
  errorCorrectionLevel: 'H'
}
module.exports = {
  async getQRs (req, res) {
    try {
      await QR.findAll({
        where: {
          status: 'active',
          archived: false,
          ownerId: req.user.id
        }
      }).then(_qrs => {
        const qrs = []
        _qrs.map(_qr => {
          qrs.push(_qr.toJSON())
        })
        res.send({
          qrs: qrs
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  },
  async qrGenerate (req, res) {
    try {
      const randomnumber = await randomNumber(999999, 999999999)
      const _qrstring =  ((new Date().getTime() + randomnumber) + req.user.id).toString('base64')
      const creator = await User.findOne({
        where: {
          id: req.user.id
        }
      })
      if (creator.balance < req.body.summ) {
        return res.send({
          message: 'У Вас не достаточно баланса!'
        })
      }
      const qr = await QR.create({
        ownerId: req.user.id,
        qrstring: _qrstring,
        summ: req.body.summ,
      }).then(created => {
        if (req.body.ids) {
          created.update({
            description: req.body.ids.join(',')
          })
        }
        res.send({
          message: _qrstring
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  },
  async qrScan (req, res) {
    try {
      const qrcode = await QR.findOne({
        where: {
          qrstring: req.body.qrstring,
          status: 'active'
        }
      })
      if (!qrcode) {
        return res.send({
          message: 'QR не неайден, попробуйте еще раз'
        })
      } else {
        qrcode.update({
          scannerId: req.user.id,
          status: 'inactive'
        })
      }
      await User.findOne({
        where: {
          id: req.user.id
        }
      }).then(scanner => {
        if (scanner.type === 'employee') {
          User.findOne({
            where: {
              id: scanner.employerId
            }
          }).then(employer => {
            employer.update({
              balance: employer.balance + qrcode.summ
            }).then(() => {
              User.findOne({
                where: {
                  id: qrcode.ownerId
                }
              }).then(qrowner => {
                qrowner.update({
                  balance: qrowner.balance - qrcode.summ
                })
              })
            })
          })
        } else {
          scanner.update({
            balance: scanner.balance + qrcode.summ
          }).then(() => {
              User.findOne({
                where: {
                  id: qrcode.ownerId
                }
              }).then(qrowner => {
                qrowner.update({
                  balance: qrowner.balance - qrcode.summ
                })
              })
            })
        }
      })
      await User.findOne({
        where: {
          id: req.user.id
        }
      }).then(_scanner => {
        if (_scanner.type === 'employee') {
          User.findOne({
            where: {
              id: req.user.id
            }
          }).then(org => {
            BalanceHistory.create({
              date: new Date().getTime(),
              summ: qrcode.summ,
              toId: org.id,
              fromId: qrcode.ownerId
            })
          })
        } else {
          BalanceHistory.create({
            date: new Date().getTime(),
            summ: qrcode.summ,
            toId: _scanner.id,
            fromId: qrcode.ownerId
          })
        }
      })
      if (qrcode.description.length > 0) {
        qrcode.description.split(',').map(_service => {
          Service.findOne({
            where: {
              id: _service
            }
          }).then(service => {
            ServiceUseHistory.create({
              date: new Date().getTime(),
              price: service.price,
              summ: qrcode.summ,
              ownerId: qrcode.ownerId,
              organizationId: service.ownerId,
              employeeId: qrcode.scannerId,
              serviceId: service.id
            })
          })
        })
      }
      res.send({
        message: 'Сканирование прошло успешно'
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  },
  async grArchive (req, res) {
    try {
      await QR.findAll({
        where: {
          status: 'inactive',
          scannerId: req.user.id
        },
        include: [
        {
          model: User,
          as: 'scanner'
        },
        {
          model: User,
          as: 'owner'
        }
        ]
      }).then(_qrs => {
        const qrs = []
        _qrs.map(qr => {
          qrs.push(qr.toJSON())
        })
        res.send({
          qrs: qrs
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  }
}
