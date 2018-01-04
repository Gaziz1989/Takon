const { Coupon, ReleasedCoupon } = require('./models')
const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => {
  try {

    await Coupon.findAll({
      where: {
        archived: false,
        status: 'active',
        endDate: {
          $lt: new Date().getTime()
        }
      }
    }).then(_coupons => {
      if (_coupons) {
        _coupons.map((_coupon) => {
          _coupon.update({
            archived: true,
            status: 'inactive'
          })
        })
      }
    })

    await ReleasedCoupon.findAll({
      where: {
        archived: false,
        status: 'active',
        endDate: {
          $lt: new Date().getTime()
        }
      }
    }).then(_coupons => {
      if (_coupons) {
        _coupons.map((_coupon) => {
          _coupon.update({
            archived: true,
            status: 'inactive'
          })
        })
      }
    })
    
  } catch (error) {
    console.log(error)
  }
})
