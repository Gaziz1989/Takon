const { Module } = require('../models')

module.exports = {
  async addModule (req, res) {
    try {
      const module = await Module.create(JSON.parse(req.body.credentials))
      res.send({
        module: module.toJSON()
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при создании модуля ' + '\"' + req.body.credentials.name + '\"'
      })
    }
  },
  async getModules (req, res) {
    try {
      await Module.findAll({
        where: {
          archived: false
        }
      }).then(modules => {
        const _modules = []
        modules.map(function(module){
          _modules.push(module.toJSON())
        })
        res.send({
          modules: _modules
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при считывании модулей в БД'
      })
    }
  },
  async getModule (req, res) {
    try {
      await Module.findById(JSON.parse(req.body.credentials)).then(_module => {
        res.send({
          module: _module.toJSON()
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при считывании модуля в БД'
      })
    }
  },
  async editModule (req, res) {
    try {
      const editedModule = JSON.parse(req.body.credentials)
      await Module.findById(req.body.id).then(_module => {
        _module.name = editedModule.name ? editedModule.name : _module.name
        _module.junSum = editedModule.junSum ? editedModule.junSum : _module.junSum
        _module.midSum = editedModule.midSum ? editedModule.midSum : _module.midSum
        _module.senSum = editedModule.senSum ? editedModule.senSum : _module.senSum
        _module.jundeadline = editedModule.jundeadline ? editedModule.jundeadline : _module.jundeadline
        _module.middeadline = editedModule.middeadline ? editedModule.middeadline : _module.middeadline
        _module.sendeadline = editedModule.sendeadline ? editedModule.sendeadline : _module.sendeadline
        _module.type = editedModule.type ? editedModule.type : _module.type
        _module.save().then(() => {
          res.send({
            module: _module.toJSON()
          })
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при попытке изменения модуля в БД'
      })
    }
  },
  async archiveModule (req, res) {
    try {
      await Module.findById(req.body.id).then(_module => {
        _module.archived = true
        _module.save().then(() => {
          res.send({
            module: _module.toJSON()
          })
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при попытке архивации модуля в БД'
      })
    }
  }
}
