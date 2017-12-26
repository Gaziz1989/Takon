const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const RateLimit = require('express-rate-limit')
const createAccountLimiter = new RateLimit({
  windowMs: 5 * 60 * 1000,
  delayAfter: 1,
  delayMs: 3 * 1000,
  max: 1,
  skipFailedRequests: true,
  message: 'Отправлено слишком много запросов!'
})

module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
  app.post('/m_register', createAccountLimiter, AuthenticationControllerPolicy.mregister, AuthenticationController.mregister)
  app.post('/m_login', AuthenticationController.mlogin)
}
