const HistoryController = require('../controllers/HistoryController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/balance_adding_history', isAuthenticated, HistoryController.AddBalanceHistory)
  app.post('/balance_adding_history', isAuthenticated, HistoryController.AddBalanceHistory)
  app.post('/balance_adding_history', isAuthenticated, HistoryController.AddBalanceHistory)
  app.post('/balance_adding_history', isAuthenticated, HistoryController.AddBalanceHistory)
  app.post('/balance_adding_history', isAuthenticated, HistoryController.AddBalanceHistory)
  app.post('/balance_adding_history', isAuthenticated, HistoryController.AddBalanceHistory)
}
