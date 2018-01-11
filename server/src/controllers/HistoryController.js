const { Service, User, ReleasedService, ServiceCreation, ServiceUseHistory, ServiceSellHistory, ServiceTransactionHistory } = require('../models')

module.exports = {
  async getDataForAdmin (req, res) {
    try {

      console.log(req.user)
      res.send({
        message: 'Уже'
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  }
}