import Api from '@/services/Api'

export default {
  getDataForAdmin () {
    return Api().post('getdataforadmin')
  }
}
