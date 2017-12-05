const ProjectController = require('../controllers/ProjectController')

module.exports = (app) => {
  // app.post('/getuser', UserController.getUser)
  app.post('/trellosync', ProjectController.trelloSync)
  app.get('/getprojects', ProjectController.getProjects)
}
