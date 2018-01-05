import Api from '@/services/Api'

export default {
  addService (_credentials, _id) {
    const formData = `service=${JSON.stringify(_credentials)}&organization_id=${_id}`
    return Api().post('addservice', formData)
  },
  getServices (_id) {
    const formData = `organization_id=${_id}`
    return Api().post('getservices', formData)
  },
  getService (_id) {
    const formData = `id=${_id}`
    return Api().post('getservice', formData)
  },
  editService (_credentials) {
    const formData = `service=${JSON.stringify(_credentials)}`
    return Api().post('editservice', formData)
  },
  archiveService (_id) {
    const formData = `id=${_id}`
    return Api().post('archiveservice', formData)
  },
  getServsSorSoupons (_id) {
    const formData = `organization_id=${_id}`
    return Api().post('getservsforcoupons', formData)
  }
}
