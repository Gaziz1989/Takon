const { Coupon, Service, User, ReleasedCoupon, CouponCreation, CouponTransactionHistory, CouponSellHistory  } = require('../models')

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
      }).then(() => {
        res.send({
          coupon: coupon.toJSON()
        })
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
          ownerId: req.body.organization_id,
          amount: {
            $gt: 0
          }
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
        const _coupons = []
        coupons.map(coupon => {
          _coupons.push(coupon.toJSON())
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
      const _releasedCoupon = await ReleasedCoupon.create(data)
      await Coupon.findOne({
        where: {
          id: _releasedCoupon.couponId
        }
      }).then(_coupon => {
        _coupon.update({
          amount: _coupon.amount - _releasedCoupon.amount
        })
      })
      await Coupon.findOne({
        where: {
          id: _releasedCoupon.couponId
        }
      }).then(_coupon1 => {
        if(_coupon1.amount == 0) {
          _coupon1.update({
            status: 'inactive',
            archived: true
          })
        }
      })
      await User.findOne({
        where: {
          id: _releasedCoupon.ownerId
        }
      }).then(_owner => {
        _owner.update({
          balance: _owner.balance - _releasedCoupon.amount * _releasedCoupon.price
        })
      })
      await User.findOne({
        where: {
          id: _releasedCoupon.organizationId
        }
      }).then(org => {
        org.update({
          balance: org.balance + _releasedCoupon.amount * _releasedCoupon.price
        })
      })
      await CouponSellHistory.create({
        amount: _releasedCoupon.amount,
        date: new Date().getTime(),
        price: _releasedCoupon.price,
        summ: _releasedCoupon.price * _releasedCoupon.amount,
        ownerId: _releasedCoupon.ownerId,
        organizationId: _releasedCoupon.organizationId,
        couponId: _releasedCoupon.couponId
      }).then(() => {
        res.send({
          coupon: _releasedCoupon.toJSON()
        })
      })
    } catch (error) {
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
  },
  async getCouponsForSail (req, res) {
    try {
      await Coupon.findAll({
        where: {
          archived: false,
          status: 'active',
          ownerId: req.body.organization_id,
          amount: {
            $gt: 0
          }
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
        const _coupons = []
        coupons.map(coupon => {
          _coupons.push(coupon.toJSON())
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
  async getRealesedCoupons (req, res) {
    try {
      await ReleasedCoupon.findAll({
        where: {
          archived: false,
          status: 'active',
          ownerId: req.body.organization_id,
          amount: {
            $gt: 0
          }
        }, 
        include: [
          {
            model: Service,
            as: 'service'
          },
          {
            model: Coupon,
            as: 'coupon'
          },
          {
            model: User,
            as: 'organization'
          }
        ]
      }).then(coupons => {
        const _coupons = []
        coupons.map(coupon => {
          _coupons.push(coupon.toJSON())
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
  async getRealesedCoupon (req, res) {
    try {
      await ReleasedCoupon.findById(req.body.id).then(_coupon => {
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
  async donutCoupon (req, res) {
    try {
      const coupon = await ReleasedCoupon.create(JSON.parse(req.body.coupon))
      const old_coupon = await ReleasedCoupon.findOne({
        where: {
          id: req.body.old_coupon
        }
      })
      old_coupon.update({
        amount: old_coupon.amount - coupon.amount
      })
      const old_coupon1 = await ReleasedCoupon.findOne({
        where: {
          id: req.body.old_coupon
        }
      })
      if(old_coupon1.amount == 0) {
        old_coupon1.update({
          status: 'inactive',
          archived: true
        })
      }
      await CouponTransactionHistory.create({
        amount: coupon.amount,
        summ: coupon.amount * coupon.price,
        date: new Date().getTime(),
        price: coupon.price,
        fromId: old_coupon1.ownerId,
        toId: coupon.ownerId,
        couponId: coupon.couponId
      }).then(() => {
        res.send({
          coupon: old_coupon1.toJSON()
        })
      })
    } catch(error) {
      res.status(500).send({
        error: error
      })
    }
  }
}
