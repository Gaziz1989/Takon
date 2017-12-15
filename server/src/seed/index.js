const { sequelize, User } = require('../models')
const Promise = require('bluebird')
const users = require('./users.json')

sequelize.sync({
  force: true
})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
  })