const ServiceController = require('../controllers/ServiceController')

module.exports = (app) => {
  app.post('/addservice', ServiceController.addService)
  app.post('/getservices', ServiceController.getServices)
  app.post('/getservice', ServiceController.getService)
  app.post('/editservice', ServiceController.editService)
  app.post('/archiveservice', ServiceController.archiveService)
}
