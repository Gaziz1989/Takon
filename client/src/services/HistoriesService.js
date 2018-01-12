import Api from '@/services/Api'

export default {
  getAdminServices (_id) {
    const formData = `id=${_id}`
    return Api().post('getdataforadmin', formData)
  }
}
