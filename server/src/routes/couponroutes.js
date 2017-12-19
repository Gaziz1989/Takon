const CouponController = require('../controllers/CouponController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/addcoupon', isAuthenticated, CouponController.addCoupon)
  app.post('/getcoupons', isAuthenticated, CouponController.getCoupons)
  app.post('/getcoupon', isAuthenticated, CouponController.getCoupon)
  app.post('/editcoupon', isAuthenticated, CouponController.editCoupon)
  app.post('/buycoupon', isAuthenticated, CouponController.buyCoupon)
  app.post('/archivecoupon', isAuthenticated, CouponController.archiveCoupon)
}
