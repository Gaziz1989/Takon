const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const MAuthenticationControllerPolicy = require('../policies/MAuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/m_register',
    MAuthenticationControllerPolicy.register, AuthenticationController.mregister)
  app.post('/login', AuthenticationController.login)
  app.post('/m_login', AuthenticationController.mlogin)
}
