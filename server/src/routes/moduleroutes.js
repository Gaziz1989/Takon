const ModuleController = require('../controllers/ModuleController')

module.exports = (app) => {
  app.post('/addmodule', ModuleController.addModule)
  app.get('/getmodules', ModuleController.getModules)
  app.post('/getmodule', ModuleController.getModule)
  app.post('/editmodule', ModuleController.editModule)
  app.post('/archivemodule', ModuleController.archiveModule)
  // app.post('/changeimage', ModuleController.changeimage)
  // app.post('/getuser', ModuleController.getUser)
  // app.post('/edituser', ModuleController.editUser)
}
