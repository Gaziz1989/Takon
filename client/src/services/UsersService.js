import Api from '@/services/Api'

export default {
  changeimage (image, id) {
    let imageFormData = new FormData()
    imageFormData.append('imageFile', image)
    imageFormData.append('userId', id)
    return Api().post('changeimage', imageFormData)
  },
  getUser (_id) {
    const id = JSON.stringify(_id)
    const formData = `id=${id}`
    return Api().post('getuser', formData)
  },
  editUser (_user, _password) {
    const formData = `user=${JSON.stringify(_user)}&password=${JSON.stringify(_password)}`
    return Api().post('edituser', formData)
  },
  getUsers () {
    return Api().get('getusers')
  },
  archiveUser (_id) {
    const formData = `id=${_id}`
    return Api().post('archiveuser', formData)
  }
}
