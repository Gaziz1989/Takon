const SubscriptionController = require('../controllers/SubscriptionController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/addsubscription', isAuthenticated, SubscriptionController.addSubscription)
  app.post('/getsubscription', isAuthenticated, SubscriptionController.getSubscription)
  app.post('/deletesubscription', isAuthenticated, SubscriptionController.deleteSubscription)
}
