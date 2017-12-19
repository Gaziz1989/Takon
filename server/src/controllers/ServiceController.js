const { Service, User } = require('../models')

module.exports = {
  async addService (req, res) {
    try {
      var data = JSON.parse(req.body.service)
      data.ownerId = req.body.organization_id
      const service = await Service.create(data)
      res.send({
        service: service.toJSON()
      })      
    } catch (error) {
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
