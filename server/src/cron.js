const { Coupon, ReleasedCoupon, QR } = require('./models')
const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => {
  try {
    await QR.destroy({
      where: {
        status: 'active'
      }
    })
  } catch (error) {
    console.log(error)
  }
})
