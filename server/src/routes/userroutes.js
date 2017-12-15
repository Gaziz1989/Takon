const UserController = require('../controllers/UserController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // app.post('/getuser', UserController.getUser)
  app.post('/getuser', UserController.getUser)
  app.post('/edituser', UserController.editUser)
  app.post('/archiveuser', UserController.archiveUser)
  app.post('/getusers', UserController.getUsers)
  app.post('/adduser', AuthenticationControllerPolicy.register, UserController.addUser)
  app.post('/addemployee', AuthenticationControllerPolicy.register, UserController.addEmployee)
  app.post('/getemployees', UserController.getEmployees)
}
