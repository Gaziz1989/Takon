const randomNumber = require("random-number-csprng")
const { QR, User } = require('../models')
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
  async qrgenerate (req, res) {
    try {
      const _qrstring = req.user.id.toString('base64')
      const qr = QR.create({
        ownerId: req.user.id,
        qrstring: _qrstring,
        summ: req.body.summ,
      }).then(created => {
        res.send({
          message: _qrstring
        })
      })
    } catch (error) {
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  },
  async qrScan (req, res) {
    try {
      await QR.findOne({
        where: {
          qrstring: req.body.qrstring,
          status: 'active'
        }
      }).then(qrcode => {
        if (!qrcode) {
          res.send({
            message: 'QR не неайден, попробуйте еще раз'
          })
        } else {
          qrcode.update({
            scannerId: req.user.id,
            status: 'inactive'
          })
          res.send({
            message: 'Сканирование прошло успешно'
          })
        }
      })
    } catch (error) {
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
