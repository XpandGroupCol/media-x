import axios from 'axios'
import { getAuth } from 'utils/cookie'

export const axiosFetcher = (path, { token, headers = {}, ...arg }) => {
  const access = token ?? getAuth()

  if (access) {
    arg.headers = {
      ...headers,
      Authorization: `Bearer ${access}`
    }
  }

  return axios({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    url: path,
    // timeout: 2000,
    ...arg
  })
}
