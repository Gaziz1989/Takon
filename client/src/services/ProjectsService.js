import Api from '@/services/Api'

export default {
  trelloSync () {
    return Api().post('trellosync')
  },
  getProjects () {
    return Api().get('getprojects')
  }
}
