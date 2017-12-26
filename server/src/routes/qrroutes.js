const QRController = require('../controllers/QRController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/qrgenerate', isAuthenticated, QRController.qrgenerate)
  app.post('/qrscan', isAuthenticated, QRController.qrScan)
  app.post('/get_qrs', isAuthenticated, QRController.getQRs)
}
