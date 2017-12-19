const path = require('path')
module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../takon.sqlite')
  },
  test: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../takon.sqlite')
  },
  production: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../takon.sqlite')
  },
  port: process.env.PORT || 8081,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'super secret string like secretString or SECRETSTRING'
  }
}
