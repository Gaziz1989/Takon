const randomNumber = require("random-number-csprng")
const { QR, User, BalanceHistory, ServiceUseHistory, Service, ReleasedService } = require('../models')
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
        }
      })
      if (!qrcode) {
        return res.status(400).send({
          error: 'QR не неайден, попробуйте еще раз'
        })
      } else {
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
        amount: takon.amount - qrcode.amount
      })
      await ServiceUseHistory.create({
        date: new Date().getTime(),
        
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
