const { Notification, Service, User, ReleasedService, ServiceCreation, ServiceUseHistory, ServiceSellHistory, ServiceTransactionHistory } = require('../models')

module.exports = {
  async getTakons (req, res) {
    try {
      await ReleasedService.findAll({
        where: {
          serviceId: req.body.service_id,
          ownerId: req.user.id
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
          },
          {
            model: User,
            as: 'owner'
          }
        ]
      }).then(_takons => {
        _takons = _takons.map(takon => {
          return takon.toJSON()
        })
        res.send({
          takons: _takons
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async donutService (req, res) {
    try {
      const data = JSON.parse(req.body.released)
      const old = await ReleasedService.findById(req.body.old_service)
      if (old.amount === 0) {
        return res.status(400).send({
          error: 'Не достаточное количество'
        })
      }
      await old.update({
        amount: Number(old.amount) - Number(data.amount)
      })
      let donuted = await ReleasedService.findOne({
        where: {
          ownerId: data.ownerId,
          serviceId: data.serviceId
        }
      })
      if (donuted) {
        await donuted.update({
          amount: donuted.amount + Number(data.amount)
        })
      } else {
        donuted = await ReleasedService.create(data)
      }
      const history = await ServiceTransactionHistory.create({
        amount: donuted.amount,
        summ: donuted.price * donuted.amount,
        date: new Date().getTime(),
        price: donuted.price,
        fromId: req.body.organization_id,
        toId: donuted.ownerId,
        instanceServiceId: donuted.serviceId,
        transferedServiceId: old.id
      })
      res.send({
        message: 'Услуга успешно передана'
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async getApproved (req, res) {
    try {
      await ReleasedService.findAll({
        where: {
          ownerId: req.body.organization_id,
          status: 'active',
          amount: {
            $gt: 0
          }
        },
        include: [
          {
            model: User,
            as: 'owner'
          }
        ]
      }).then(_services => {
        _services = _services.map(_service => {
          return _service.toJSON()
        })
        res.send({
          services: _services
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async approveNotification (req, res) {
    try {
      const data = await JSON.parse(req.body.notification)
      data.status = 'active'
      const released = await ReleasedService.findOne({
        where: {
          serviceId: data.serviceId
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
      if (released) {
        await released.update({
          amount: released.amount + data.amount
        })
        const sellHistory = await ServiceSellHistory.create({
          amount: released.amount,
          date: new Date().getTime(),
          price: released.price,
          summ: released.price * released.amount,
          ownerId: released.ownerId,
          organizationId: released.service.ownerId,
          serviceId: released.serviceId
        })
        await Notification.findOne({
          where: {
            id: data.id
          }
        }).then(note => {
          note.update({
            archived: true,
            status:'inactive'
          })
        })
        res.send({
          message: 'Заявка подтверждена успешно!'
        })
      } else {
        const _released = await ReleasedService.create(data)
        const released = await ReleasedService.findOne({
          where: {
            id: _released.id
          },
          include: [
            {
              model: Service,
              as: 'service'
            }
          ]
        })
        const sellHistory = await ServiceSellHistory.create({
          amount: released.amount,
          date: new Date().getTime(),
          price: released.price,
          summ: released.price * released.amount,
          ownerId: released.ownerId,
          organizationId: released.service.ownerId,
          serviceId: released.serviceId
        })
        await Notification.findOne({
          where: {
            id: data.id
          }
        }).then(note => {
          note.update({
            archived: true,
            status:'inactive'
          })
        })
        res.send({
          message: 'Заявка подтверждена успешно!'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async getNotification (req, res) {
    try {
      await Notification.findOne({
        where: {
          id: req.body.notification_id
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
      }).then(_released => {
        res.send({
          released: _released.toJSON()
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async getReleased (req, res) {
    try {
      await ReleasedService.findOne({
        where: {
          id: req.body.released_id
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
      }).then(_released => {
        res.send({
          released: _released.toJSON()
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async getNotifications (req, res) {
    try {
      await Notification.findAll({
        where: {
          status: 'unapproved'
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
      }).then(notifications => {
        notifications = notifications.map((notification) => {
          return notification.toJSON()
        })
        res.send({
          notifications: notifications
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async getServsUsingHistory (req, res) {
    try {
      var _histories = await ServiceUseHistory.findAll({
        where: {
          ownerId: req.user.id
        },
        include: [
          {
            model: User,
            as: 'owner'
          },
          {
            model: User,
            as: 'organization'
          },
          {
            model: User,
            as: 'employee'
          },
          {
            model: Service,
            as: 'service'
          },
        ]
      })
      _histories = _histories.map(_history => {
        return _history.toJSON()
      })
      res.send({
        histories: _histories
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async addService (req, res) {
    try {
      var data = JSON.parse(req.body.service)
      data.ownerId = req.body.organization_id
      const service = await Service.create(data)
      const creationHistory = await ServiceCreation.create({
        price: service.price,
        date: new Date().getTime(),
        whoId: req.body.organization_id,
        serviceId: service.id
      })
      res.send({
        service: service.toJSON()
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async getServices (req, res) {
    try {
      await Service.findAll({
        where: {
          archived: false,
          ownerId: req.body.organization_id
        },
        include: [
          {
            model: User,
            as: 'owner'
          }
        ]
      }).then(services => {
        const _services = services.map(function(service) {
          return service.toJSON()
        })
        res.send({
          services: _services
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async getServsForCoupons (req, res) {
    try {
      await Service.findAll({
        where: {
          archived: false,
          ownerId: req.body.organization_id,
          status: 'active'
        },
        include: [
          {
            model: User,
            as: 'owner'
          }
        ]
      }).then(services => {
        const _services = services.map(function(service) {
          return service.toJSON()
        })
        res.send({
          services: _services
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async getService (req, res) {
    try {
      await Service.findById(req.body.id).then(_service => {
        res.send({
          service: _service.toJSON()
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async editService (req, res) {
    try {
      const data = JSON.parse(req.body.service)
      await Service.findById(data.id).then(_service => {
        _service.update(data)
        res.send({
          service: _service.toJSON()
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async archiveService (req, res) {
    try {
      await Service.findById(req.body.id).then(_service => {
        _service.archived = true
        _service.status = 'inactive'
        _service.save().then(() => {
          res.send({
            service: _service.toJSON()
          })
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  }
}
