import axios from 'axios'
import Auth from '@/utils/Auth'

export default () => {
  return axios.create({
    baseURL: `http://195.93.152.79:8081/`,
    headers: {
      Authorization: `Bearer ${Auth().getToken()}`
    }
  })
}
