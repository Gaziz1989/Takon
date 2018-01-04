const CouponController = require('../controllers/CouponController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.post('/addcoupon', isAuthenticated, CouponController.addCoupon)
  app.post('/getcoupons', isAuthenticated, CouponController.getCoupons)
  app.post('/getcouponsforsail', isAuthenticated, CouponController.getCouponsForSail)
  app.post('/getrealesedcoupons', isAuthenticated, CouponController.getRealesedCoupons)
  app.post('/getrealesedcoupon', isAuthenticated, CouponController.getRealesedCoupon)
  app.post('/getcoupon', isAuthenticated, CouponController.getCoupon)
  app.post('/editcoupon', isAuthenticated, CouponController.editCoupon)
  app.post('/buycoupon', isAuthenticated, CouponController.buyCoupon)
  app.post('/donutcoupon', isAuthenticated, CouponController.donutCoupon)
  app.post('/archivecoupon', isAuthenticated, CouponController.archiveCoupon)
}
