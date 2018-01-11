const HistoryController = require('../controllers/HistoryController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/getdataforadmin', isAuthenticated, HistoryController.getDataForAdmin)
}
