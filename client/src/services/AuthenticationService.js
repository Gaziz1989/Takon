import Api from '@/services/Api'

export default {
  register (_credentials) {
    const credentials = JSON.stringify(_credentials)
    const formData = `user=${credentials}`
    return Api().post('register', formData)
  },
  login (_credentials) {
    const credentials = JSON.stringify(_credentials)
    const formData = `user=${credentials}`
    return Api().post('login', formData)
  }
}
