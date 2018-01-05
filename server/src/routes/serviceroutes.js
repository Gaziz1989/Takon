const ServiceController = require('../controllers/ServiceController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/addservice', isAuthenticated, ServiceController.addService)
  app.post('/getservices', isAuthenticated, ServiceController.getServices)
  app.post('/getservice', isAuthenticated, ServiceController.getService)
  app.post('/editservice', isAuthenticated, ServiceController.editService)
  app.post('/archiveservice', isAuthenticated, ServiceController.archiveService)
  app.post('/getservsforcoupons', isAuthenticated, ServiceController.getServsForCoupons)
  app.post('/getservsusinghistory', isAuthenticated, ServiceController.getServsUsingHistory)
}
