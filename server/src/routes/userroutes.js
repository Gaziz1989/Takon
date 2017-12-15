const UserController = require('../controllers/UserController')

module.exports = (app) => {
  // app.post('/getuser', UserController.getUser)
  app.post('/getuser', UserController.getUser)
  app.post('/edituser', UserController.editUser)
  app.post('/archiveuser', UserController.archiveUser)
  app.post('/getusers', UserController.getUsers)
  app.post('/adduser', UserController.addUser)
  app.post('/addemployee', UserController.addEmployee)
  app.post('/getemployees', UserController.getEmployees)
}
