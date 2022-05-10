import axios from 'axios'
import { BASE_URL } from 'utils/config'
import { getAuth } from 'utils/cookie'

export const changePassword = async (payload) => {
  try {
    const { data } = await axios(`${BASE_URL}/users/change-password`, {
      method: 'PUT',
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuth()}`
      }
    })
    return data
  } catch (e) {
    console.log(e.response)
    return Promise.reject(e)
  }
}

export const companyProfile = async (payload) => {
  try {
    const { data } = await axios(`${BASE_URL}/users/company-profile`, {
      method: 'PUT',
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuth()}`
      }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
