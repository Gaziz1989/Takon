import axios from 'axios'
import Auth from '@/utils/Auth'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      Authorization: `Bearer ${Auth().getToken()}`
    }
  })
}
