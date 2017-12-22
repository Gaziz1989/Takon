const { Coupon, Service, User, ReleasedCoupon, CouponCreation  } = require('../models')

module.exports = {
  async addCoupon (req, res) {
    try {
      const data = JSON.parse(req.body.coupon)
      data.ownerId = req.body.organization_id
      data.endDate = new Date(data.endDate).getTime()
      const coupon = await Coupon.create(data)
      const creationHistory = await CouponCreation.create({
        amount: coupon.amount,
        summ: coupon.price * coupon.amount,
        price: coupon.price,
        date: new Date().getTime(),
        whoId: req.body.organization_id,
        couponId: coupon.id
      })
      res.send({
        coupon: coupon.toJSON()
      })      
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async getCoupons (req, res) {
    try {
      await Coupon.findAll({
        where: {
          archived: false,
          ownerId: req.body.organization_id
        }, 
        include: [
          {
            model: Service,
            as: 'service',
            include: [
              {
                model: User,
                as: 'owner'
              }
            ]
          }
        ]
      }).then(coupons => {
        const _coupons = coupons.map(function(coupon) {
          return coupon.toJSON()
        })
        res.send({
          coupons: _coupons
        })
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async getCoupon (req, res) {
    try {
      await Coupon.findById(req.body.id).then(_coupon => {
        res.send({
          coupon: _coupon.toJSON()
        })
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async editCoupon (req, res) {
    try {
      const data = JSON.parse(req.body.coupon)
      await Coupon.findById(data.id).then(_coupon => {
        _coupon.update(data)
        res.send({
          coupon: _coupon.toJSON()
        })
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },
  async buyCoupon (req, res) {
    try {
      const data = JSON.parse(req.body.released)
      ReleasedCoupon.create(data).then(_coupon => {
        console.log(_coupon)
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: error
      })
    }
  },
  async archiveCoupon (req, res) {
    try {
      await Coupon.findById(req.body.id).then(_coupon => {
        _coupon.archived = true
        _coupon.status = 'inactive'
        _coupon.save().then(() => {
          res.send({
            coupon: _coupon.toJSON()
          })
        })
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  }
}
