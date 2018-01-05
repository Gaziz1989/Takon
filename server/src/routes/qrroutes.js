const QRController = require('../controllers/QRController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/qrgenerate', isAuthenticated, QRController.qrGenerate)
  app.post('/qrscan', isAuthenticated, QRController.qrScan)
  app.post('/get_qrs', isAuthenticated, QRController.getQRs)
  app.post('/gr_archive', isAuthenticated, QRController.grArchive)
}
