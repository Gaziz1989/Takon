import jwtdecode from 'jwt-decode'

const getToken = () => {
  return window.localStorage['token']
}

const saveToken = token => {
  window.localStorage['token'] = token
}

const isLoggedIn = () => {
  const token = getToken()
  let payload
  if (token) {
    payload = jwtdecode(token)
    return payload.exp > Date.now() / 1000
  } else {
    return false
  }
}

const currentUser = () => {
  if (isLoggedIn()) {
    let payload = jwtdecode(getToken())
    return payload
  }
}

const logout = () => {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem('token')
    resolve(true)
  })
}

export default () => {
  return {
    getToken,
    isLoggedIn,
    logout,
    currentUser,
    saveToken
  }
}
