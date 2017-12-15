import Api from '@/services/Api'

export default {
  addCoupon (_credentials, _id) {
    const formData = `coupon=${JSON.stringify(_credentials)}&organization_id=${_id}`
    return Api().post('addcoupon', formData)
  },
  getCoupons (_id) {
    const formData = `organization_id=${_id}`
    return Api().post('getcoupons', formData)
  },
  getCoupon (_id) {
    const formData = `id=${_id}`
    return Api().post('getcoupon', formData)
  },
  editCoupon (_credentials) {
    const formData = `coupon=${JSON.stringify(_credentials)}`
    return Api().post('editcoupon', formData)
  },
  buyCoupon (_credentials) {
    const formData = `released=${JSON.stringify(_credentials)}`
    return Api().post('buycoupon', formData)
  },
  archiveCoupon (_id) {
    const formData = `id=${_id}`
    return Api().post('archivecoupon', formData)
  }
}
