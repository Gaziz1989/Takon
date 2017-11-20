const UserController = require('../controllers/UserController')

module.exports = (app) => {
  // app.post('/getuser', UserController.getUser)
  app.post('/changeimage', UserController.changeimage)
  app.post('/getuser', UserController.getUser)
  app.post('/edituser', UserController.editUser)
}
