const CouponController = require('../controllers/CouponController')

module.exports = (app) => {
  app.post('/addcoupon', CouponController.addCoupon)
  app.post('/getcoupons', CouponController.getCoupons)
  app.post('/getcoupon', CouponController.getCoupon)
  app.post('/editcoupon', CouponController.editCoupon)
  app.post('/buycoupon', CouponController.buyCoupon)
  app.post('/archivecoupon', CouponController.archiveCoupon)
}
