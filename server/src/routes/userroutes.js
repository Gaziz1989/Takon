const UserController = require('../controllers/UserController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/getuser', isAuthenticated, UserController.getUser)
  app.post('/edituser', isAuthenticated, UserController.editUser)
  app.post('/archiveuser', isAuthenticated, UserController.archiveUser)
  app.post('/getusers', isAuthenticated, UserController.getUsers)
  app.post('/adduser', isAuthenticated, AuthenticationControllerPolicy.register, UserController.addUser)
  app.post('/addemployee', isAuthenticated, AuthenticationControllerPolicy.register, UserController.addEmployee)
  app.post('/getemployees', isAuthenticated, UserController.getEmployees)
  app.post('/getorganizations', isAuthenticated, UserController.getOrganizations)
  app.post('/changeimage', isAuthenticated, UserController.changeImage)
  app.post('/addbalance', isAuthenticated, UserController.addBalance)
  app.post('/sendemail', UserController.sendEmail)
  app.post('/getbalance', isAuthenticated, UserController.getBalance)
  app.post('/getbalancehistory', isAuthenticated, UserController.getBalanceHistory)
}
