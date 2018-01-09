const { Service, User, ServiceCreation, ServiceUseHistory, ReleasedService, Notification } = require('../models')

module.exports = {
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
      await ReleasedService.findAll({
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
      }).then(services => {
        services = services.map((service) => {
          return service.toJSON()
        })
        res.send({
          notifications: services
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
      // const creationHistory = await ServiceCreation.create({
      //   amount: service.amount,
      //   summ: service.price * service.amount,
      //   price: service.price,
      //   date: new Date().getTime(),
      //   whoId: req.body.organization_id,
      //   serviceId: service.id
      // })
      // .then(() => {
        res.send({
          service: service.toJSON()
        })
      // })
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
      res.status(500).send({
        error: error
      })
    }
  }
}
