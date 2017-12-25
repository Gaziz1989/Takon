const UserController = require('../controllers/UserController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
// const EditingControlerPolicy = require('../policies/EditingControlerPolicy')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  // app.post('/getuser', UserController.getUser)
  app.post('/getuser', isAuthenticated, UserController.getUser)
  app.post('/edituser', /* EditingControlerPolicy.editUser,*/ isAuthenticated, UserController.editUser)
  app.post('/archiveuser', isAuthenticated, UserController.archiveUser)
  app.post('/getusers', isAuthenticated, UserController.getUsers)
  app.post('/adduser', isAuthenticated, AuthenticationControllerPolicy.register, UserController.addUser)
  app.post('/addemployee', isAuthenticated, AuthenticationControllerPolicy.register, UserController.addEmployee)
  app.post('/getemployees', isAuthenticated, UserController.getEmployees)
}
