const { Service, User, ReleasedService, ServiceCreation, ServiceUseHistory, ServiceSellHistory, ServiceTransactionHistory } = require('../models')

module.exports = {
  async getDataForJUser (req, res) {
    try {
      const _takon = await ReleasedService.findOne({
        where: {
          id: req.body.id
        },
        include: [
          {
            model: User,
            as: 'owner'
          },
          {
            model: Service,
            as: 'service'
          }
        ]
      })
      const _selling = await ServiceSellHistory.findOne({
        where: {
          serviceId: _takon.serviceId,
          ownerId: req.user.id
        }
      })

      var _transactions = await ServiceTransactionHistory.findAll({
        where: {
          fromId: req.user.id,
          transferedServiceId: _takon.id
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

      var _jusersEmpls = await User.findAll({
        where: {
          employerId: req.user.id
        }
      })
      _jusersEmpls = await _jusersEmpls.map((item, index) => {
        return item.toJSON().id
      })

      var _employeeTransactions = await ServiceTransactionHistory.findAll({
        where: {
          instanceServiceId: _takon.serviceId,
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
      _employeeTransactions = await _employeeTransactions.map((item, index) => {
        return item.toJSON()
      })

      var _emplTransfers = []
      await _employeeTransactions.filter((_transaction, index) => {
        _jusersEmpls.map(item => {
          if (_transaction.fromId === item) {
            _emplTransfers.push(_transaction)
          }
        })
      })

      var _emplTakons = await ReleasedService.findAll({
        where: {
          serviceId: _takon.serviceId 
        },
        include: [
          {
            model: User,
            as: 'owner'
          }
        ]
      })
      _emplTakons = await _emplTakons.map((item, index) => {
        return item.toJSON()
      })

      var _takons = []
      await _emplTakons.filter((takon, index) => {
        _jusersEmpls.map(item => {
          if (takon.ownerId === item) {
            _takons.push(takon)
          }
        })
      })

      var _history = await ServiceUseHistory.findAll({
        where: {
          serviceId: _takon.serviceId
        },
        include: [
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
            model: User,
            as: 'owner'
          }
        ]
      })
      _history = await _history.map(_his => {
        return _his.toJSON()
      })
      var _usings = []
      await _history.filter((_his, index) => {
        _jusersEmpls.map(item => {
          if (_his.ownerId === item) {
            _usings.push(_his)
          }
        })
      })

      res.send({
        takon: _takon.toJSON(),
        selling: _selling.toJSON(),
        transactions: _transactions,
        employees: _jusersEmpls,
        emplTransfers: _emplTransfers,
        usings: _usings,
        takons: _takons
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла неведомая хуита!'
      })
    }
  },
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