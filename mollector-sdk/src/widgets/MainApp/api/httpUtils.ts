import http, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

import configurations from '~/configurations'

import { getFromLocalStorage } from '../components/MarketplaceList/utils/localStorage'
import { AUTH_TOKEN, IAuthToken } from '../components/MarketplaceList/utils/types'

const Http = http.create({
  baseURL: `${configurations.API_URL}`,
})

export const addHeaders = (headers: AxiosRequestHeaders) => {
  Http.defaults.headers = {
    ...Http.defaults.headers,
    ...headers,
  }
}

export const getToken = () => {
  const authInfo = getFromLocalStorage<IAuthToken>(AUTH_TOKEN)
  if (authInfo) {
    return authInfo.token
  }

  return null
}

Http.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken()
  const newHeaders = config.headers || {}
  if (token !== null) {
    newHeaders.authorization = `${token}`
  }
  newHeaders['Content-Type'] = 'application/json'
  config.headers = newHeaders
  return config
})

Http.defaults.params = {}

export default Http
