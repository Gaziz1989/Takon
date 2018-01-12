const randomNumber = require("random-number-csprng")
const { QR, User, ServiceUseHistory, ServiceTransactionHistory, Service, ReleasedService } = require('../models')

module.exports = {
  async qrScanForPresenting (req, res) {
    try {
      const qrcode = await QR.findOne({
        where: {
          qrstring: req.body.qrstring,
          status: 'active'
        },
        include: [
          {
            model: User,
            as: 'owner',
            include: [
              {
                model: User,
                as: 'employer'
              }
            ]
          },
          {
            model: ReleasedService,
            as: 'takon',
            include: [
              {
                model: Service,
                as: 'service',
                include: [
                  {
                    model: User,
                    as: 'owner'
                  }
                ]
              }
            ]
          }
        ]
      })
      const scanner = await User.findOne({
        where: {
          id: req.user.id
        },
        include: [
          {
            model: User,
            as: 'employer'
          }
        ]
      })
      if (!qrcode) {
        return res.status(400).send({
          error: 'QR не неайден, попробуйте еще раз'
        })
      } else {
        if (qrcode.owner.employerId !== scanner.employerId) {
          const orgName = qrcode.takon.service.owner.name ? qrcode.takon.service.owner.name : qrcode.takon.service.owner.email
          return res.status(400).send({
            error: 'Вы можете передавать таконы только внутри компании ' + orgName
          })
        }
        await qrcode.update({
          scannerId: req.user.id,
          scandate: new Date().getTime(),
          status: 'inactive'
        })
      }
      const takon = await ReleasedService.findOne({
        where: {
          id: qrcode.takonId
        },
        include: [
          {
            model: Service,
            as: 'service',
            include: [
              {
                model: User,
                as: 'owner'
              }
            ]
          }
        ]
      })
      if (takon.amount < qrcode.amount) {
        res.status(400).send({
          error: 'Не достаточное количество таконов'
        })
      }
      let receiverTakon = await ReleasedService.findOne({
        where: {
          ownerId: scanner.id
        },
        include: [
          {
            model: User,
            as: 'owner'
          },
          {
            model: Service,
            as: 'service',
            include: [
              {
                model: User,
                as: 'owner'
              }
            ]
          }
        ]
      })
      if (!receiverTakon) {
        receiverTakon = await ReleasedService.create({
          name: takon.name,
          description: takon.description,
          price: Number(takon.price),
          unit: Number(takon.unit),
          amount: 0,
          ownerId: scanner.id,
          serviceId: takon.serviceId
        })
      }
      await receiverTakon.update({
        amount: Number(receiverTakon.amount) + Number(qrcode.amount)
      })
      await takon.update({
        amount: Number(takon.amount) - Number(qrcode.amount)
      })
      await ServiceTransactionHistory.create({
        amount: Number(qrcode.amount),
        summ: Number(qrcode.amount) * Number(takon.price),
        date: new Date().getTime(),
        price: takon.price,
        fromId: qrcode.ownerId,
        toId: qrcode.scannerId,
        instanceServiceId: takon.serviceId,
        transferedServiceId: qrcode.takonId
      })
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
  async presentTakon (req, res) {
    try {
      const _phone = req.body.phone.split('')
      _phone[0] = 7
      const takon = await ReleasedService.findOne({
        where: {
          id: req.body.takon_id
        },
        include: [
          {
            model: User,
            as: 'owner'
          },
          {
            model: Service,
            as: 'service',
            include: [
              {
                model: User,
                as: 'owner'
              }
            ]
          }
        ]
      })
      const receiver = await User.findOne({
        where: {
          phone: _phone.join('')
        },
        include: [
          {
            model: User,
            as: 'employer'
          }
        ]
      })
      if (!receiver) {
        res.status(400).send({
          error: 'Получатель не найден'
        })
      }
      const sender = await User.findOne({
        where: {
          id: req.user.id
        },
        include: [
          {
            model: User,
            as: 'employer'
          }
        ]
      })
      if (receiver.employerId !== sender.employerId) {
        const orgName = sender.employer.name ? sender.employer.name : sender.employer.email
        res.status(400).send({
          error: 'Вы можете передавать таконы только внутри компании ' + orgName
        })
      }
      if (takon.amount < req.body.amount) {
        return res.status(400).send({
          error: 'Не достаточное количество таконов'
        })
      }
      let receiverTakon = await ReleasedService.findOne({
        where: {
          ownerId: receiver.id
        },
        include: [
          {
            model: User,
            as: 'owner'
          },
          {
            model: Service,
            as: 'service',
            include: [
              {
                model: User,
                as: 'owner'
              }
            ]
          }
        ]
      })
      if (!receiverTakon) {
        receiverTakon = await ReleasedService.create({
          name: takon.name,
          description: takon.description,
          price: Number(takon.price),
          unit: Number(takon.unit),
          amount: 0,
          ownerId: receiver.id,
          serviceId: takon.serviceId,
        })
      }
      await receiverTakon.update({
        amount: Number(receiverTakon.amount) + Number(req.body.amount)
      })
      await takon.update({
        amount: Number(takon.amount) - Number(req.body.amount)
      })
      await ServiceTransactionHistory.create({
        amount: Number(req.body.amount),
        summ: Number(takon.price) * Number(req.body.amount),
        date: new Date().getTime(),
        price: Number(takon.price),
        fromId: sender.id,
        toId: receiver.id,
        instanceServiceId: takon.serviceId,
        transferedServiceId: takon.id
      })
      res.send({
        message: 'Услуга успешно передана'
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  },
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
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  },
  async qrGenerate (req, res) {
    try {
      const randomnumber = await randomNumber(999999, 999999999)
      const _qrstring =  ((new Date().getTime() + randomnumber) + req.user.id).toString('base64')
      const takon = await ReleasedService.findOne({
        where: {
          id: req.body.takon_id
        }
      })
      if (takon.amount < req.body.amount) {
        return res.status(400).send({
          error: 'Вы превысили доступное количество'
        })
      }
      const qr = await QR.create({
        ownerId: req.user.id,
        qrstring: _qrstring,
        amount: req.body.amount,
        takonId: takon.id
      }).then(created => {
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
        },
        include: [
          {
            model: User,
            as: 'owner'
          },
          {
            model: ReleasedService,
            as: 'takon',
            include: [
              {
                model: Service,
                as: 'service',
                include: [
                  {
                    model: User,
                    as: 'owner'
                  }
                ]
              }
            ]
          }
        ]
      })
      const scanner = await User.findOne({
        where: {
          id: req.user.id
        },
        include: [
          {
            model: User,
            as: 'employer'
          }
        ]
      })
      if (!qrcode) {
        return res.status(400).send({
          error: 'QR не неайден, попробуйте еще раз'
        })
      } else {
        if (qrcode.takon.service.ownerId != scanner.employerId) {
          return res.status(401).send({
            error: 'Данный такон принадлежит другой компании'
          })
        }
        await qrcode.update({
          scannerId: req.user.id,
          scandate: new Date().getTime(),
          status: 'inactive'
        })
      }
      const takon = await ReleasedService.findOne({
        where: {
          id: qrcode.takonId
        }
      })
      await takon.update({
        amount: Number(takon.amount) - Number(qrcode.amount)
      })
      await ServiceUseHistory.create({
        date: new Date().getTime(),
        price: Number(takon.price),
        amount: Number(qrcode.amount),
        ownerId: takon.ownerId,
        scanerId: req.user.id,
        serviceId: takon.serviceId,
        takonId: takon.id
      })
      res.send({
        message: 'Сканирование прошло успешно',
        qr: qrcode.toJSON()
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
      if (req.user.type === 'employee' || req.user.type === 'partner') {
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
          },
          {
            model: ReleasedService,
            as: 'takon'
          }
          ]
        }).then(_qrs => {
          _qrs = _qrs.map(qr => {
            return qr.toJSON()
          })
          res.send({
            qrs: _qrs
          })
        })
      } else {
        var _qrs = await QR.findAll({
          where: {
            status: 'inactive',
            ownerId: req.user.id
          },
          include: [
          {
            model: User,
            as: 'scanner'
          },
          {
            model: User,
            as: 'owner'
          },
          {
            model: ReleasedService,
            as: 'takon'
          }
          ]
        })
        _qrs = _qrs.map(qr => {
          return qr.toJSON()
        })
        var _phonetransactions = await ServiceTransactionHistory.findAll({
          where: {
            fromId: req.user.id
          },
          include: [
            {
              model: User,
              as: 'from'
            },
            {
              model: User,
              as: 'to'
            },
            {
              model: Service,
              as: 'instance_service',
              include: [
                {
                  model: User,
                  as: 'owner'
                }
              ]
            },
            {
              model: ReleasedService,
              as: 'transfered_service'
            }
          ]
        })
        _phonetransactions = _phonetransactions.map(phonetransaction => {
          return phonetransaction.toJSON()
        })
        res.send({
          qrs: _qrs,
          phonetransactions: _phonetransactions
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  }
}
