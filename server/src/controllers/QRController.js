const QRCode = require('qrcode')
const randomNumber = require("random-number-csprng")
const { QR } = require('../models')
const options = {
  version: 3,
  errorCorrectionLevel: 'L'
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
      var segs = [
        { data: req.user.id, mode: 'byte' },
        { data: randomNumber(10000, 100000) + '', mode: 'byte' }
      ]
      await QRCode.toDataURL( segs, options, (error, _qrstring) => {
        if (error) {
          res.status(400).send({
            error: 'Произошла ошибка при генерации QR кода'
          })
        } else {
          const qr = QR.create({
            ownerId: req.user.id,
            qrstring: _qrstring,
            summ: req.body.summ,
          }).then(created => {
            res.send({
              message: _qrstring
            })
          })
        }
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
          qrstring: req.body.qrstring
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
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  }
}
