import Api from '@/services/Api'

export default {
  getUser (_id) {
    const id = JSON.stringify(_id)
    const formData = `id=${id}`
    return Api().post('getuser', formData)
  },
  editUser (_user, _password) {
    const formData = `user=${JSON.stringify(_user)}&password=${JSON.stringify(_password)}`
    return Api().post('edituser', formData)
  },
  getUsers (_type) {
    const formData = `type=${JSON.stringify(_type)}`
    return Api().post('getusers', formData)
  },
  archiveUser (_id) {
    const formData = `id=${_id}`
    return Api().post('archiveuser', formData)
  },
  addUser (_credentials) {
    const formData = `user=${JSON.stringify(_credentials)}`
    return Api().post('adduser', formData)
  },
  addEmployee (_credentials, _id) {
    const formData = `user=${JSON.stringify(_credentials)}&organization_id=${_id}`
    return Api().post('addemployee', formData)
  },
  getEmployees (_id) {
    const formData = `id=${_id}`
    return Api().post('getemployees', formData)
  },
  changeimage (image) {
    let imageFormData = new FormData()
    imageFormData.append('imageFile', image)
    return Api().post('changeimage', imageFormData)
  },
  addBalance (_id, _balance) {
    const formData = `id=${_id}&balance=${_balance}`
    return Api().post('addbalance', formData)
  }
}
