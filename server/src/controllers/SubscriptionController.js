const { Subscribtion, User } = require('../models')

module.exports = {
  async addSubscription (req, res) {
    try {
      const data = {
        ownerId: req.user.id,
        organizationId: req.body.id
      }
      const _subscription = await Subscribtion.create(data)
      res.send({
        message: 'Вы успешно подписаны'
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Произошла ошибка'
      })
    }
  },
  async getSubscription (req, res) {
    try {
      await Subscribtion.findAll({
        where: {
          ownerId: req.user.id
        },
        include: [
          {
            model: User,
            as: 'organization'
          }
        ]
      }).then(_subscriptions => {
        const subscribtion = []
        _subscriptions.map( _subscription => {
          subscribtion.push(_subscription.toJSON())
        })
        res.send({
          subscribtion: subscribtion
        })
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async deleteSubscription (req, res) {
    try {
      await Subscribtion.destroy({
        where: {
          id: req.body.id
        }
      }).then(deleted => {
        res.send({
          message: 'Вы успешно отписаны'
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
