import Api from '@/services/Api'

export default {
  addModule (_credentials) {
    const formData = `credentials=${JSON.stringify(_credentials)}`
    return Api().post('addmodule', formData)
  },
  getModules () {
    return Api().get('getmodules')
  },
  getModule (_credentials) {
    const formData = `credentials=${JSON.stringify(_credentials)}`
    return Api().post('getmodule', formData)
  },
  editModule (_credentials, _id) {
    const formData = `credentials=${JSON.stringify(_credentials)}&id=${_id}`
    return Api().post('editmodule', formData)
  },
  archiveModule (_id) {
    const formData = `id=${_id}`
    return Api().post('archivemodule', formData)
  }
}
