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
  app.post('/getnotifications', isAuthenticated, ServiceController.getNotifications)
  app.post('/getreleased', isAuthenticated, ServiceController.getReleased)
  app.post('/approvenotification', isAuthenticated, ServiceController.approveNotification)
  app.post('/getapproved', isAuthenticated, ServiceController.getApproved)
  app.post('/donutservice', isAuthenticated, ServiceController.donutService)
  app.post('/gettakons', isAuthenticated, ServiceController.getTakons)
}
