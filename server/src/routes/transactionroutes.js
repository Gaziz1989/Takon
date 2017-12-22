const TransactionsController = require('../controllers/TransactionsController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/getbalance', isAuthenticated, TransactionsController.getBalance)
}
