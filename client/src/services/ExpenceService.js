import Api from '@/services/Api'

export default {
  addExpences (_credentials) {
    const formData = `credentials=${JSON.stringify(_credentials)}`
    return Api().post('addexpence', formData)
  },
  getExpences () {
    return Api().get('getexpences')
  },
  getExpence (_credentials) {
    const formData = `credentials=${JSON.stringify(_credentials)}`
    return Api().post('getexpence', formData)
  },
  editExpence (_credentials, _id) {
    const formData = `credentials=${JSON.stringify(_credentials)}&id=${_id}`
    return Api().post('editexpence', formData)
  },
  archiveExpence (_id) {
    const formData = `id=${_id}`
    return Api().post('archiveexpence', formData)
  }
}
