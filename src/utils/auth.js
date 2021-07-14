import Cookies from 'js-cookie'

const TokenKey = 'X-Auth-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 90 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
