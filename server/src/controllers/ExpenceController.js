const { Expence } = require('../models')

module.exports = {
  async addExpence (req, res) {
    try {
      const expence = await Expence.create(JSON.parse(req.body.credentials))
      res.send({
        expence: expence.toJSON()
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при создании статического расхода ' + '\"' + req.body.credentials.name + '\"'
      })
    }
  },
  async getExpences (req, res) {
    try {
      await Expence.findAll({
        where: {
          archived: false
        }
      }).then(expences => {
        const _expences = []
        expences.map(function(expence){
          _expences.push(expence.toJSON())
        })
        res.send({
          expences: _expences
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при считывании статических расходов в БД'
      })
    }
  },
    async getExpence (req, res) {
    try {
      await Expence.findById(JSON.parse(req.body.credentials)).then(expence => {
        res.send({
          expence: expence
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при считывании статических расходов в БД'
      })
    }
  },
    async editExpence (req, res) {
    try {
      const editedExpence = JSON.parse(req.body.credentials)
      await Expence.findById(req.body.id).then(_expence => {
        _expence.name = editedExpence.name ? editedExpence.name : _expence.name
        _expence.amount = editedExpence.amount ? editedExpence.amount : _expence.amount
        _expence.save().then(() => {
          res.send({
            expence: _expence.toJSON()
          })
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при попытке изменения статического расхода в БД'
      })
    }
  },
  async archiveExpence (req, res) {
    try {
      await Expence.findById(req.body.id).then(_expence => {
        _expence.archived = true
        _expence.save().then(() => {
          res.send({
            expence: _expence.toJSON()
          })
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'Ошибка произошла при попытке архивации статического расхода в БД'
      })
    }
  }
}
