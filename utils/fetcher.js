import axios from 'axios'
import { getAuth } from './cookie'

export const fetcher = async (url) => {
  const headers = {}
  const token = getAuth()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return axios.get(url, { headers })
}
