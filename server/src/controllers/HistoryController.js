const { Service, User, ReleasedService, ServiceCreation, ServiceUseHistory, ServiceSellHistory, ServiceTransactionHistory } = require('../models')

module.exports = {
  async getDataForAdmin (req, res) {
    try {
      var _takons = await ReleasedService.findAll({
        where: {
          serviceId: req.body.id
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
      _takons = await _takons.map(takon => {
        return takon.toJSON()
      })
      var _service = await Service.findOne({
        where: {
          id: req.body.id
        },
        include: [
          {
            model: User,
            as: 'owner'
          }
        ]
      })

      var _creation = await ServiceCreation.findOne({
        where: {
          serviceId: req.body.id
        }
      })

      var _usings = await ServiceUseHistory.findAll({
        where: {
          serviceId: req.body.id
        },
        include: [
          {
            model: User,
            as: 'owner'
          },
          {
            model: User,
            as: 'scaner',
            include: [
              {
                model: User,
                as: 'employer'
              }
            ]
          },
          {
            model: ReleasedService,
            as: 'takon'
          },
        ]
      })
      _usings = await _usings.map(item => {
        return item.toJSON()
      })

      var _sellings = await ServiceSellHistory.findAll({
        where: {
          serviceId: req.body.id
        },
        include: [
          {
            model: User,
            as: 'organization'
          },
          {
            model: User,
            as: 'owner'
          }
        ]
      })
      _sellings = await _sellings.map(item => {
        return item.toJSON()
      })

      var _transactions = await ServiceTransactionHistory.findAll({
        where: {
          instanceServiceId: req.body.id
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
            model: ReleasedService,
            as: 'transfered_service'
          }
        ]
      })
      _transactions = await _transactions.map(item => {
        return item.toJSON()
      }) 

      res.send({
        service: _service ? _service.toJSON() : 'Нет данных',
        creation: _creation ? _creation.toJSON() : 'Нет данных',
        takons: _takons,
        usings: _usings,
        sellings: _sellings,
        transactions: _transactions
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  }
}