const UserController = require('../controllers/UserController')

module.exports = (app) => {
  // app.post('/getuser', UserController.getUser)
  app.post('/changeimage', UserController.changeimage)
  app.post('/getuser', UserController.getUser)
  app.post('/edituser', UserController.editUser)
  app.post('/archiveuser', UserController.archiveUser)
  app.get('/getusers', UserController.getUsers)
}
