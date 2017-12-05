const ExpenceController = require('../controllers/ExpenceController')

module.exports = (app) => {
  app.post('/addexpence', ExpenceController.addExpence)
  app.get('/getexpences', ExpenceController.getExpences)
  app.post('/getexpence', ExpenceController.getExpence)
  app.post('/editexpence', ExpenceController.editExpence)
  app.post('/archiveexpence', ExpenceController.archiveExpence)
  // app.post('/changeimage', ModuleController.changeimage)
  // app.post('/getuser', ModuleController.getUser)
  // app.post('/edituser', ModuleController.editUser)
}
